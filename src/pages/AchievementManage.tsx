import { useState, useEffect } from 'react'
import { Table, Tag, Card, Descriptions } from 'antd'
import { getAchievementList, type Achievement } from '../api/achievement'

export default function AchievementManage() {
  const [data, setData] = useState<Achievement[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    getAchievementList().then(d => setData(d || [])).catch(() => {}).finally(() => setLoading(false))
  }, [])

  const columns = [
    { title: 'ID', dataIndex: 'id', width: 60 },
    { title: '图标', dataIndex: 'icon', width: 60, render: (v: string) => <span style={{ fontSize: 24 }}>{v || '🏆'}</span> },
    { title: '名称', dataIndex: 'name', width: 150 },
    { title: '描述', dataIndex: 'description', ellipsis: true },
    { title: '类型', dataIndex: 'type', width: 100, render: (v: string) => <Tag>{v}</Tag> },
    { title: '条件值', dataIndex: 'condition', width: 80 },
    { title: '创建时间', dataIndex: 'createdAt', width: 170 },
  ]

  return (
    <Card title="成就列表">
      <Table rowKey="id" columns={columns} dataSource={data} loading={loading}
        pagination={{ pageSize: 20, showTotal: t => `共 ${t} 条` }} />
    </Card>
  )
}
