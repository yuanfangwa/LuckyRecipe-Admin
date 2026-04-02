import { useState, useEffect } from 'react'
import { Table, Modal, Select, message } from 'antd'
import { getStrategies, createStrategy, updateStrategy } from '../api/recommendation'
import type { Strategy } from '../api/recommendation'

export default function RecommendManage() {
  const [data, setData] = useState<Strategy[]>([])
  const [loading, setLoading] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<Strategy | null>(null)
  const [form, setForm] = useState({ name: '', type: 'collaborative', description: '', enabled: true, config: '' })

  useEffect(() => { loadData() }, [])

  const loadData = async () => {
    setLoading(true)
    try { setData(await getStrategies()) } catch { /* */ }
    finally { setLoading(false) }
  }

  const openModal = (item?: Strategy) => {
    setEditing(item || null)
    setForm(item ? { name: item.name, type: item.type, description: item.description, enabled: item.enabled, config: item.config } : { name: '', type: 'collaborative', description: '', enabled: true, config: '' })
    setModalOpen(true)
  }

  const handleSave = async () => {
    if (!form.name) return message.warning('请输入策略名称')
    try {
      if (editing) await updateStrategy(editing.id, form)
      else await createStrategy(form)
      message.success('保存成功')
      setModalOpen(false)
      loadData()
    } catch { /* */ }
  }

  const columns = [
    { title: 'ID', dataIndex: 'id', width: 60 },
    { title: '策略名称', dataIndex: 'name' },
    { title: '类型', dataIndex: 'type', width: 120 },
    { title: '描述', dataIndex: 'description', ellipsis: true },
    { title: '状态', dataIndex: 'enabled', width: 80, render: (v: boolean) => (
      <Select value={v} size="small" style={{ width: 80 }} options={[{ label: '启用', value: true }, { label: '禁用', value: false }]}
        onChange={async (val) => { await updateStrategy(data.find(d => d.enabled === v)!.id, { enabled: val }); loadData() }} />
    )},
    { title: '创建时间', dataIndex: 'createdAt', width: 170 },
    { title: '操作', width: 80, render: (_: unknown, r: Strategy) => (
      <a onClick={() => openModal(r)}>编辑</a>
    )},
  ]

  return (
    <div>
      <Table columns={columns} dataSource={data} rowKey="id" loading={loading} />
      <Modal title={editing ? '编辑策略' : '新建策略'} open={modalOpen} onOk={handleSave} onCancel={() => setModalOpen(false)}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div>名称: <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} style={{ width: '100%', padding: '4px 8px' }} /></div>
          <div>类型: <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} style={{ width: '100%', padding: '4px 8px' }}>
            <option value="collaborative">协同过滤</option>
            <option value="content">内容推荐</option>
            <option value="hot">热门推荐</option>
            <option value="random">随机推荐</option>
          </select></div>
          <div>描述: <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} style={{ width: '100%', padding: '4px 8px' }} rows={3} /></div>
        </div>
      </Modal>
    </div>
  )
}
