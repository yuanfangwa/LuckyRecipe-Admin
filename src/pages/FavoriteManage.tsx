import { useState, useEffect } from 'react'
import { Table, Card, Tag, message, Space } from 'antd'
import { getFavoriteFolders, type FavoriteFolder } from '../api/favorite'

export default function FavoriteManage() {
  const [data, setData] = useState<FavoriteFolder[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    getFavoriteFolders().then(d => setData(d || [])).catch(() => message.error('获取收藏夹列表失败')).finally(() => setLoading(false))
  }, [])

  const columns = [
    { title: 'ID', dataIndex: 'id', width: 60 },
    { title: '用户', dataIndex: 'username', width: 100 },
    { title: '收藏夹名称', dataIndex: 'name', width: 180 },
    { title: '收藏数量', dataIndex: 'recipeCount', width: 100, render: (v: number) => <Tag color="blue">{v}</Tag> },
    { title: '创建时间', dataIndex: 'createdAt', width: 170 },
  ]

  return (
    <Card title="收藏夹列表">
      <Table rowKey="id" columns={columns} dataSource={data} loading={loading}
        pagination={{ pageSize: 20, showTotal: t => `共 ${t} 条` }} />
    </Card>
  )
}
