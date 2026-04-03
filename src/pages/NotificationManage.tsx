import { useState, useEffect } from 'react'
import { Table, Button, Tag, Popconfirm, message, Space, Select } from 'antd'
import { getNotificationList, deleteNotification, batchMarkRead, type Notification } from '../api/notification'

export default function NotificationManage() {
  const [data, setData] = useState<Notification[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([])
  const [typeFilter, setTypeFilter] = useState<string>()

  const fetchData = async () => {
    setLoading(true)
    try {
      const res = await getNotificationList({ pageNum: page, pageSize, type: typeFilter })
      setData(res.records || [])
      setTotal(res.total || 0)
    } catch { message.error('获取通知列表失败') }
    setLoading(false)
  }

  useEffect(() => { fetchData() }, [page, pageSize, typeFilter])

  const handleDelete = async (id: number) => {
    try { await deleteNotification(id); message.success('删除成功'); fetchData() }
    catch { message.error('删除失败') }
  }

  const handleBatchRead = async () => {
    if (!selectedRowKeys.length) return message.warning('请选择通知')
    try { await batchMarkRead(selectedRowKeys); message.success('批量已读成功'); fetchData(); setSelectedRowKeys([]) }
    catch { message.error('操作失败') }
  }

  const columns = [
    { title: 'ID', dataIndex: 'id', width: 60 },
    { title: '用户', dataIndex: 'username', width: 100 },
    { title: '标题', dataIndex: 'title', width: 180 },
    { title: '内容', dataIndex: 'content', ellipsis: true },
    { title: '类型', dataIndex: 'type', width: 100, render: (v: string) => <Tag>{v || '系统'}</Tag> },
    { title: '状态', dataIndex: 'read', width: 80, render: (v: boolean) => <Tag color={v ? 'green' : 'orange'}>{v ? '已读' : '未读'}</Tag> },
    { title: '时间', dataIndex: 'createdAt', width: 170 },
    {
      title: '操作', width: 80,
      render: (_: unknown, row: Notification) => (
        <Popconfirm title="确认删除？" onConfirm={() => handleDelete(row.id)}>
          <Button type="link" danger size="small">删除</Button>
        </Popconfirm>
      ),
    },
  ]

  return (
    <Space direction="vertical" size="middle" style={{ width: '100%' }}>
      <Space>
        <Select placeholder="类型筛选" allowClear style={{ width: 140 }}
          options={[{ value: 'system', label: '系统' }, { value: 'comment', label: '评论' }, { value: 'like', label: '点赞' }]}
          onChange={v => { setTypeFilter(v); setPage(1) }} />
        <Button type="primary" onClick={handleBatchRead}>批量已读</Button>
      </Space>
      <Table rowKey="id" columns={columns} dataSource={data} loading={loading}
        rowSelection={{ selectedRowKeys, onChange: (keys) => setSelectedRowKeys(keys as number[]) }}
        pagination={{ current: page, pageSize, total, showSizeChanger: true, showTotal: t => `共 ${t} 条`,
          onChange: (p, ps) => { setPage(p); setPageSize(ps) } }} />
    </Space>
  )
}
