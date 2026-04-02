import { useState, useEffect } from 'react'
import { Table, Input, Select, Button, Space, Modal, Form, Popconfirm, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { getTagList, createTag, updateTag, deleteTag } from '../api/tag'
import type { Tag } from '../api/tag'

export default function TagManage() {
  const [data, setData] = useState<Tag[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [keyword, setKeyword] = useState('')
  const [category, setCategory] = useState<string | undefined>(undefined)
  const [pageNum, setPageNum] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<Tag | null>(null)
  const [form] = Form.useForm()

  useEffect(() => { loadData() }, [pageNum, pageSize])

  const loadData = async () => {
    setLoading(true)
    try {
      const res = await getTagList({ pageNum, pageSize, keyword, category })
      setData(res.list)
      setTotal(res.total)
    } catch { /* */ }
    finally { setLoading(false) }
  }

  const handleSearch = () => { setPageNum(1); loadData() }

  const openModal = (item?: Tag) => {
    setEditing(item || null)
    if (item) form.setFieldsValue(item)
    else form.resetFields()
    setModalOpen(true)
  }

  const handleSave = async () => {
    const values = await form.validateFields()
    try {
      if (editing) await updateTag(editing.id, values)
      else await createTag(values)
      message.success('保存成功')
      setModalOpen(false)
      loadData()
    } catch { /* */ }
  }

  const handleDelete = async (id: number) => {
    await deleteTag(id)
    message.success('删除成功')
    loadData()
  }

  const columns = [
    { title: 'ID', dataIndex: 'id', width: 60 },
    { title: '标签名称', dataIndex: 'name' },
    { title: '分类', dataIndex: 'category', width: 120 },
    { title: '创建时间', dataIndex: 'createdAt', width: 170 },
    {
      title: '操作', width: 140,
      render: (_: unknown, record: Tag) => (
        <Space size="small">
          <a onClick={() => openModal(record)}>编辑</a>
          <Popconfirm title="确认删除？" onConfirm={() => handleDelete(record.id)}>
            <a style={{ color: '#ff4d4f' }}>删除</a>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  return (
    <div>
      <div style={{ marginBottom: 16, display: 'flex', gap: 8 }}>
        <Input placeholder="搜索标签" value={keyword} onChange={e => setKeyword(e.target.value)} onPressEnter={handleSearch} style={{ width: 200 }} allowClear />
        <Select placeholder="分类" value={category} onChange={setCategory} allowClear style={{ width: 120 }}
          options={['菜系', '口味', '场景', '食材'].map(c => ({ label: c, value: c }))} />
        <Button type="primary" onClick={handleSearch}>搜索</Button>
        <Button type="primary" icon={<PlusOutlined />} style={{ background: '#FF6B35', borderColor: '#FF6B35' }} onClick={() => openModal()}>新建标签</Button>
      </div>
      <Table columns={columns} dataSource={data} rowKey="id" loading={loading}
        pagination={{ current: pageNum, pageSize, total, showSizeChanger: true, showTotal: t => `共 ${t} 条`, onChange: (p, ps) => { setPageNum(p); setPageSize(ps) } }} />
      <Modal title={editing ? '编辑标签' : '新建标签'} open={modalOpen} onOk={handleSave} onCancel={() => setModalOpen(false)} destroyOnClose>
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="标签名称" rules={[{ required: true, message: '请输入标签名称' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="category" label="分类" rules={[{ required: true, message: '请选择分类' }]}>
            <Select options={['菜系', '口味', '场景', '食材'].map(c => ({ label: c, value: c }))} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
