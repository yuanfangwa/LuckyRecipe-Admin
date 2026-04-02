import { useState, useEffect } from 'react'
import { Row, Col, Card, Statistic, Table, Tag, Spin } from 'antd'
import { FileTextOutlined, UserOutlined, MessageOutlined, EyeOutlined } from '@ant-design/icons'
import { getOverview, getTrend } from '../api/dashboard'
import type { Overview, TrendItem } from '../api/dashboard'

export default function Dashboard() {
  const [overview, setOverview] = useState<Overview | null>(null)
  const [trend, setTrend] = useState<TrendItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setLoading(true)
    try {
      const [ov, tr] = await Promise.all([getOverview(), getTrend()])
      setOverview(ov)
      setTrend(tr)
    } catch {
      // use empty defaults
    } finally {
      setLoading(false)
    }
  }

  const stats = overview || { totalRecipes: 0, totalUsers: 0, totalComments: 0, todayVisits: 0 }

  const trendColumns = [
    { title: '日期', dataIndex: 'date', key: 'date' },
    { title: '新增菜谱', dataIndex: 'recipes', key: 'recipes' },
    { title: '新增用户', dataIndex: 'users', key: 'users' },
    { title: '访问量', dataIndex: 'visits', key: 'visits' },
  ]

  const activityColumns = [
    { title: '时间', dataIndex: 'time', key: 'time' },
    { title: '事件', dataIndex: 'event', key: 'event' },
    { title: '状态', dataIndex: 'status', key: 'status', render: (s: string) => (
      <Tag color={s === '成功' ? 'green' : 'orange'}>{s}</Tag>
    )},
  ]

  return (
    <Spin spinning={loading}>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic title="总菜谱数" value={stats.totalRecipes} prefix={<FileTextOutlined style={{ color: '#FF6B35' }} />} />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic title="总用户数" value={stats.totalUsers} prefix={<UserOutlined style={{ color: '#1890ff' }} />} />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic title="总评论数" value={stats.totalComments} prefix={<MessageOutlined style={{ color: '#52c41a' }} />} />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic title="今日访问量" value={stats.todayVisits} prefix={<EyeOutlined style={{ color: '#722ed1' }} />} />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} lg={16}>
          <Card title="趋势数据">
            <Table columns={trendColumns} dataSource={trend} rowKey="date" pagination={false} size="small" />
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title="最近活动">
            <Table
              columns={activityColumns}
              dataSource={[
                { key: 1, time: '10:30', event: '新菜谱发布', status: '成功' },
                { key: 2, time: '09:15', event: '用户注册', status: '成功' },
                { key: 3, time: '08:00', event: '系统备份', status: '成功' },
                { key: 4, time: '昨日', event: '推荐算法更新', status: '成功' },
              ]}
              pagination={false}
              size="small"
            />
          </Card>
        </Col>
      </Row>
    </Spin>
  )
}
