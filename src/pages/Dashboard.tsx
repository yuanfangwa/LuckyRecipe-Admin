import { useState, useEffect } from 'react'
import { Row, Col, Card, Statistic, Table, Tag, Spin, Empty } from 'antd'
import { FileTextOutlined, UserOutlined, MessageOutlined, EyeOutlined } from '@ant-design/icons'
import { getOverview, getHealthStatus } from '../api/dashboard'
import type { ContentAnalytics } from '../api/dashboard'

export default function Dashboard() {
  const [analytics, setAnalytics] = useState<ContentAnalytics | null>(null)
  const [health, setHealth] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setLoading(true)
    try {
      const [ov, hs] = await Promise.all([
        getOverview().catch(() => null),
        getHealthStatus().catch(() => null),
      ])
      setAnalytics(ov)
      setHealth(hs)
    } catch {
      // use empty defaults
    } finally {
      setLoading(false)
    }
  }

  const stats: Record<string, any> = analytics || {}

  return (
    <Spin spinning={loading}>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic title="总菜谱数" value={stats.totalRecipes ?? 0} prefix={<FileTextOutlined style={{ color: '#FF6B35' }} />} />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic title="总用户数" value={stats.totalUsers ?? '-'} prefix={<UserOutlined style={{ color: '#1890ff' }} />} />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic title="总评论数" value={stats.totalComments ?? '-'} prefix={<MessageOutlined style={{ color: '#52c41a' }} />} />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic title="今日访问量" value={stats.todayVisits ?? '-'} prefix={<EyeOutlined style={{ color: '#722ed1' }} />} />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} lg={12}>
          <Card title="系统健康状态">
            {health ? (
              <Table
                columns={[
                  { title: '指标', dataIndex: 'label', key: 'label' },
                  { title: '状态', dataIndex: 'value', key: 'value', render: (v: any) => (
                    <Tag color={typeof v === 'boolean' ? (v ? 'green' : 'red') : 'blue'}>{String(v)}</Tag>
                  )},
                ]}
                dataSource={Object.entries(health).map(([k, v], i) => ({ key: i, label: k, value: v }))}
                rowKey="key"
                pagination={false}
                size="small"
              />
            ) : (
              <Empty description="暂无数据" />
            )}
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="内容概览">
            {analytics ? (
              <Table
                columns={[
                  { title: '指标', dataIndex: 'label', key: 'label' },
                  { title: '值', dataIndex: 'value', key: 'value' },
                ]}
                dataSource={Object.entries(analytics)
                  .filter(([, v]) => typeof v === 'number' || typeof v === 'string')
                  .map(([k, v], i) => ({ key: i, label: k, value: v }))}
                rowKey="key"
                pagination={false}
                size="small"
              />
            ) : (
              <Empty description="暂无数据" />
            )}
          </Card>
        </Col>
      </Row>
    </Spin>
  )
}
