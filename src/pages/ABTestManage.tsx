import { useState, useEffect } from 'react'
import { Table, Button, Modal, Form, Input, InputNumber, Space, Popconfirm, message, Tag } from 'antd'
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons'
import { getExperiments, createExperiment, updateExperiment, deleteExperiment } from '../api/abtest'
import type { ABExperiment } from '../api/abtest'

export default function ABTestManage() {
  const [data, setData] = useState<ABExperiment[]>([])
  const [loading, setLoading] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<ABExperiment | null>(null)
  const [form] = Form.useForm()

  useEffect(() => { loadData() }, [])

  const loadData = async () => {
    setLoading(true)
    try { setData(await getExperiments()) } catch { /* */ }
    finally { setLoading(false) }
  }

  const openModal = (item?: ABExperiment) => {
    setEditing(item || null)
    if (item) {
      form.setFieldsValue({ ...item, variants: item.variants || [] })
    } else {
      form.resetFields()
      form.setFieldsValue({ trafficPercent: 100, variants: [{ name: 'control', weight: 50, config: '{}' }, { name: 'variant_a', weight: 50, config: '{}' }] })
    }
    setModalOpen(true)
  }

  const handleSave = async () => {
    const values = await form.validateFields()
    try {
      if (editing) await updateExperiment(editing.id, values)
      else await createExperiment({ ...values, status: 'running' })
      message.success('保存成功')
      setModalOpen(false)
      loadData()
    } catch { /* */ }
  }

  const handleDelete = async (id: number) => {
    await deleteExperiment(id)
    message.success('删除成功')
    loadData()
  }

  const columns = [
    { title: 'ID', dataIndex: 'id', width: 60 },
    { title: '实验名称', dataIndex: 'name' },
    { title: '描述', dataIndex: 'description', ellipsis: true },
    { title: '流量比例', dataIndex: 'trafficPercent', width: 80, render: (v: number) => `${v}%` },
    { title: '变体数', dataIndex: 'variants', width: 80, render: (v: any[]) => v?.length || 0 },
    {
      title: '状态', dataIndex: 'status', width: 80,
      render: (s: string) => {
        const map: Record<string, string> = { running: '运行中', stopped: '已停止', draft: '草稿' }
        const colorMap: Record<string, string> = { running: 'green', stopped: 'default', draft: 'orange' }
        return <Tag color={colorMap[s]}>{map[s] || s}</Tag>
      },
    },
    { title: '创建时间', dataIndex: 'createdAt', width: 170 },
    {
      title: '操作', width: 140,
      render: (_: unknown, record: ABExperiment) => (
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
      <div style={{ marginBottom: 16 }}>
        <Button type="primary" icon={<PlusOutlined />} style={{ background: '#FF6B35', borderColor: '#FF6B35' }} onClick={() => openModal()}>新建实验</Button>
      </div>
      <Table columns={columns} dataSource={data} rowKey="id" loading={loading} />
      <Modal title={editing ? '编辑实验' : '新建实验'} open={modalOpen} onOk={handleSave} onCancel={() => setModalOpen(false)} width={600} destroyOnClose>
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="实验名称" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="description" label="描述">
            <Input.TextArea rows={2} />
          </Form.Item>
          <Form.Item name="trafficPercent" label="流量比例(%)" rules={[{ required: true }]}>
            <InputNumber min={0} max={100} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item label="变体配置">
            <Form.List name="variants">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                      <Form.Item {...restField} name={[name, 'name']} rules={[{ required: true }]}><Input placeholder="变体名" style={{ width: 120 }} /></Form.Item>
                      <Form.Item {...restField} name={[name, 'weight']} rules={[{ required: true }]}><InputNumber placeholder="权重" min={0} max={100} style={{ width: 100 }} /></Form.Item>
                      <Form.Item {...restField} name={[name, 'config']}><Input placeholder="配置JSON" style={{ width: 200 }} /></Form.Item>
                      {fields.length > 1 && <MinusCircleOutlined onClick={() => remove(name)} />}
                    </Space>
                  ))}
                  <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>添加变体</Button>
                </>
              )}
            </Form.List>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
