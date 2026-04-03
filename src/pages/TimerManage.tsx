import { useState, useEffect } from 'react'
import { Table, Tag, Card, message } from 'antd'
import { getTimerList, type CookingTimer } from '../api/timer'

export default function TimerManage() {
  const [data, setData] = useState<CookingTimer[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    getTimerList().then(d => setData(d || [])).catch(() => message.error('获取计时列表失败')).finally(() => setLoading(false))
  }, [])

  const statusMap: Record<string, { color: string; text: string }> = {
    running: { color: 'green', text: '进行中' },
    paused: { color: 'orange', text: '已暂停' },
    completed: { color: 'default', text: '已完成' },
  }

  const columns = [
    { title: 'ID', dataIndex: 'id', width: 60 },
    { title: '用户', dataIndex: 'username', width: 100 },
    { title: '菜谱', dataIndex: 'recipeName', width: 120 },
    { title: '步骤', dataIndex: 'step', ellipsis: true },
    { title: '时长(秒)', dataIndex: 'duration', width: 90 },
    { title: '剩余(秒)', dataIndex: 'remaining', width: 90 },
    { title: '状态', dataIndex: 'status', width: 100, render: (v: string) => {
      const s = statusMap[v] || { color: 'default', text: v }
      return <Tag color={s.color}>{s.text}</Tag>
    }},
    { title: '创建时间', dataIndex: 'createdAt', width: 170 },
  ]

  return (
    <Card title="烹饪计时列表">
      <Table rowKey="id" columns={columns} dataSource={data} loading={loading}
        pagination={{ pageSize: 20, showTotal: t => `共 ${t} 条` }} />
    </Card>
  )
}
