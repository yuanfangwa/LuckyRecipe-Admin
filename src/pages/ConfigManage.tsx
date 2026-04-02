import { useState, useEffect } from 'react'
import { Card, Table, Tag, Switch, InputNumber, Input, Button, Space, message, Spin, Select, Tooltip } from 'antd'
import { getConfigList, updateConfig } from '../api/config'
import type { ConfigItem } from '../api/config'
import { ReloadOutlined, SaveOutlined } from '@ant-design/icons'

const CATEGORIES = ['DATABASE', 'CACHE', 'ALGORITHM', 'SECURITY', 'SYSTEM', 'FEATURE']
const CATEGORY_LABELS: Record<string, string> = {
  DATABASE: '数据库', CACHE: '缓存', ALGORITHM: '算法', SECURITY: '安全', SYSTEM: '系统', FEATURE: '功能'
}

export default function ConfigManage() {
  const [data, setData] = useState<ConfigItem[]>([])
  const [loading, setLoading] = useState(false)
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  const [category, setCategory] = useState<string | undefined>()
  const [editing, setEditing] = useState<Record<number, string>>({})

  const loadData = async () => {
    setLoading(true)
    try {
      const res = await getConfigList({ current: page, size: pageSize, category })
      setData(res.records)
      setTotal(res.total)
    } catch { /* */ }
    finally { setLoading(false) }
  }

  useEffect(() => { loadData() }, [page, pageSize, category])

  const handleToggle = async (record: ConfigItem) => {
    try {
      await updateConfig(record.id, { isEnabled: !record.isEnabled })
      message.success(record.isEnabled ? '已禁用' : '已启用')
      loadData()
    } catch { message.error('操作失败') }
  }

  const handleSave = async (record: ConfigItem) => {
    const newValue = editing[record.id]
    if (newValue === undefined || newValue === record.configValue) {
      setEditing(prev => { const n = { ...prev }; delete n[record.id]; return n })
      return
    }
    try {
      await updateConfig(record.id, { configValue: newValue })
      message.success('保存成功')
      setEditing(prev => { const n = { ...prev }; delete n[record.id]; return n })
      loadData()
    } catch { message.error('保存失败') }
  }

  const columns = [
    {
      title: '配置项', dataIndex: 'configKey', width: 260,
      render: (key: string, record: ConfigItem) => (
        <Tooltip title={record.description}>
          <code style={{ fontSize: 12 }}>{key}</code>
        </Tooltip>
      )
    },
    { title: '说明', dataIndex: 'description', width: 180, ellipsis: true },
    {
      title: '值', dataIndex: 'configValue', width: 220,
      render: (val: string, record: ConfigItem) => {
        if (record.isSensitive) {
          return <span style={{ color: '#999' }}>••••••••</span>
        }
        const isEditing = editing[record.id] !== undefined
        if (record.dataType === 'INTEGER') {
          return isEditing ? (
            <Space>
              <InputNumber size="small" value={Number(editing[record.id])} onChange={v => setEditing({ ...editing, [record.id]: String(v ?? val) })} />
              <Button size="small" type="link" onClick={() => handleSave(record)}>保存</Button>
            </Space>
          ) : (
            <Input
              size="small" value={val} style={{ width: 120 }}
              onChange={e => setEditing({ ...editing, [record.id]: e.target.value })}
              onBlur={() => handleSave(record)}
            />
          )
        }
        return isEditing ? (
          <Space>
            <Input size="small" value={editing[record.id]} onChange={e => setEditing({ ...editing, [record.id]: e.target.value })} />
            <Button size="small" type="link" onClick={() => handleSave(record)}>保存</Button>
          </Space>
        ) : (
          <Input
            size="small" value={val} style={{ width: 180 }}
            onChange={e => setEditing({ ...editing, [record.id]: e.target.value })}
            onBlur={() => handleSave(record)}
          />
        )
      }
    },
    {
      title: '分类', dataIndex: 'category', width: 90,
      render: (cat: string) => <Tag>{CATEGORY_LABELS[cat] || cat}</Tag>
    },
    {
      title: '类型', dataIndex: 'dataType', width: 80,
      render: (t: string) => <Tag color="blue">{t}</Tag>
    },
    {
      title: '重启', dataIndex: 'requireRestart', width: 70,
      render: (v: boolean) => v ? <Tag color="orange">需重启</Tag> : '-'
    },
    {
      title: '状态', dataIndex: 'isEnabled', width: 80,
      render: (v: boolean, record: ConfigItem) => (
        <Switch size="small" checked={v} onChange={() => handleToggle(record)} />
      )
    }
  ]

  return (
    <Spin spinning={loading}>
      <Card
        title="系统配置"
        extra={
          <Space>
            <Select
              placeholder="分类筛选" allowClear style={{ width: 120 }}
              value={category} onChange={setCategory}
              options={CATEGORIES.map(c => ({ label: CATEGORY_LABELS[c], value: c }))}
            />
            <Button icon={<ReloadOutlined />} onClick={loadData}>刷新</Button>
          </Space>
        }
      >
        <Table
          rowKey="id" columns={columns} dataSource={data}
          pagination={{ current: page, pageSize, total, onChange: setPage, showTotal: t => `共 ${t} 条` }}
          size="small" scroll={{ x: 1000 }}
        />
      </Card>
    </Spin>
  )
}
