import { useState } from 'react'
import { Card, Input, Button, Table, message, Space } from 'antd'
import { getShareByCode, type ShareLink } from '../api/share'

export default function ShareManage() {
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<ShareLink | null>(null)

  const handleSearch = async () => {
    if (!code.trim()) return message.warning('请输入分享码')
    setLoading(true)
    try {
      const res = await getShareByCode(code.trim())
      setData(res)
    } catch { message.error('查询失败，分享码可能不存在') }
    setLoading(false)
  }

  const columns = [
    { title: 'ID', dataIndex: 'id', width: 60 },
    { title: '分享码', dataIndex: 'code', width: 120 },
    { title: '菜谱ID', dataIndex: 'recipeId', width: 80 },
    { title: '菜谱名', dataIndex: 'recipeName', width: 150 },
    { title: '用户', dataIndex: 'username', width: 100 },
    { title: '创建时间', dataIndex: 'createdAt', width: 170 },
  ]

  return (
    <Space direction="vertical" size="middle" style={{ width: '100%' }}>
      <Card title="分享链接查询">
        <Space>
          <Input placeholder="输入分享码" value={code} onChange={e => setCode(e.target.value)} onPressEnter={handleSearch} style={{ width: 300 }} />
          <Button type="primary" loading={loading} onClick={handleSearch}>查询</Button>
        </Space>
      </Card>
      {data && (
        <Table rowKey="id" columns={columns} dataSource={[data]} pagination={false} />
      )}
      <Card title="说明">
        <p style={{ color: '#999' }}>当前后端暂无管理员查询所有分享链接的接口，仅支持按分享码查询单条记录。</p>
      </Card>
    </Space>
  )
}
