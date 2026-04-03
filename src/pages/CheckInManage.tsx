import { useState, useEffect } from 'react'
import { Table, Card, Input, Button, Statistic, Row, Col, Avatar, Tag, Space, message } from 'antd'
import { getCheckInFeed, getCheckInStats, type CheckIn } from '../api/checkin'

export default function CheckInManage() {
  const [data, setData] = useState<CheckIn[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [stats, setStats] = useState({ totalCheckIns: 0, todayCheckIns: 0, activeUsers: 0 })

  const fetchStats = async () => {
    try { setStats(await getCheckInStats()) } catch { /* ignore */ }
  }

  const fetchData = async () => {
    setLoading(true)
    try {
      const res = await getCheckInFeed({ pageNum: page, pageSize })
      setData(res.records || [])
      setTotal(res.total || 0)
    } catch { message.error('获取动态列表失败') }
    setLoading(false)
  }

  useEffect(() => { fetchStats(); fetchData() }, [page, pageSize])

  const columns = [
    { title: 'ID', dataIndex: 'id', width: 60 },
    { title: '用户', dataIndex: 'username', width: 100, render: (v: string, r: CheckIn) => (
      <Space><Avatar size="small" src={r.avatar} />{v}</Space>
    )},
    { title: '菜谱', dataIndex: 'recipeName', width: 120 },
    { title: '内容', dataIndex: 'content', ellipsis: true },
    { title: '图片', dataIndex: 'image', width: 80, render: (v: string) => v ? <Avatar shape="square" size={40} src={v} /> : '-' },
    { title: '时间', dataIndex: 'createdAt', width: 170 },
  ]

  return (
    <Space direction="vertical" size="middle" style={{ width: '100%' }}>
      <Row gutter={16}>
        <Col span={8}><Card><Statistic title="总打卡数" value={stats.totalCheckIns} /></Card></Col>
        <Col span={8}><Card><Statistic title="今日打卡" value={stats.todayCheckIns} /></Card></Col>
        <Col span={8}><Card><Statistic title="活跃用户" value={stats.activeUsers} /></Card></Col>
      </Row>
      <Table rowKey="id" columns={columns} dataSource={data} loading={loading}
        pagination={{ current: page, pageSize, total, showSizeChanger: true, showTotal: t => `共 ${t} 条`,
          onChange: (p, ps) => { setPage(p); setPageSize(ps) } }} />
    </Space>
  )
}
