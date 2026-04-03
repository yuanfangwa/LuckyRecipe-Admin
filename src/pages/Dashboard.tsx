import { useState, useEffect } from 'react'
import { Row, Col, Card, Statistic, Spin, Tag, Typography } from 'antd'
import { FileTextOutlined, UserOutlined, MessageOutlined, EyeOutlined, CheckCircleOutlined, WarningOutlined, CloseCircleOutlined } from '@ant-design/icons'
import { Line, Pie, Column } from '@ant-design/charts'
import { getOverview, getTrend, getContentRecipes, getHealthStatus, getUserBehavior } from '../api/dashboard'
import type { Overview, TrendItem, CategoryItem, HealthStatus, HourlyActivity } from '../api/dashboard'

const { Title } = Typography

const statusConfig: Record<string, { color: string; icon: React.ReactNode }> = {
  UP: { color: 'success', icon: <CheckCircleOutlined /> },
  HEALTHY: { color: 'success', icon: <CheckCircleOutlined /> },
  OK: { color: 'success', icon: <CheckCircleOutlined /> },
  WARNING: { color: 'warning', icon: <WarningOutlined /> },
  DEGRADED: { color: 'warning', icon: <WarningOutlined /> },
  DOWN: { color: 'error', icon: <CloseCircleOutlined /> },
  ERROR: { color: 'error', icon: <CloseCircleOutlined /> },
}

export default function Dashboard() {
  const [overview, setOverview] = useState<Overview | null>(null)
  const [trend, setTrend] = useState<TrendItem[]>([])
  const [categories, setCategories] = useState<CategoryItem[]>([])
  const [health, setHealth] = useState<HealthStatus | null>(null)
  const [hourly, setHourly] = useState<HourlyActivity[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setLoading(true)
    try {
      const [ov, tr, cr, hs, ub] = await Promise.allSettled([
        getOverview(),
        getTrend(),
        getContentRecipes(),
        getHealthStatus(),
        getUserBehavior(),
      ])
      if (ov.status === 'fulfilled') setOverview(ov.value)
      if (tr.status === 'fulfilled') setTrend(tr.value)
      if (cr.status === 'fulfilled') setCategories(cr.value.categoryAnalysis ?? [])
      if (hs.status === 'fulfilled') setHealth(hs.value)
      if (ub.status === 'fulfilled') setHourly(ub.value.hourlyActivityPattern ?? [])
    } catch {
      // ignore
    } finally {
      setLoading(false)
    }
  }

  const stats = overview ?? { totalRecipes: 0, totalUsers: 0, totalComments: 0, todayVisits: 0, activeExperiments: 0 }

  const lineConfig = {
    data: trend,
    xField: 'date',
    yField: 'value',
    colorField: 'type',
    transform: [{ type: 'fold', fields: ['recipes', 'users', 'visits'], key: 'type', value: 'value' }],
    smooth: true,
    point: { size: 4 },
    legend: { position: 'top-right' as const },
    axis: { y: { labelFormatter: (v: string) => Number(v).toLocaleString() } },
  }

  const pieConfig = {
    data: categories.map(c => ({ type: c.category, value: c.count })),
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    innerRadius: 0.6,
    label: { text: 'type', position: 'outside' as const },
    legend: { position: 'bottom' as const },
  }

  const columnConfig = {
    data: hourly.map(h => ({ hour: `${h.hour}:00`, activity: h.activity })),
    xField: 'hour',
    yField: 'activity',
    label: { text: 'activity', textBaseline: 'bottom' as const },
    axis: {
      x: { labelAutoRotate: true },
      y: { labelFormatter: (v: string) => Number(v).toLocaleString() },
    },
  }

  return (
    <Spin spinning={loading}>
      {/* Overview Stats */}
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

      {/* Trend + Category */}
      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} lg={14}>
          <Card title="近7天趋势">
            <Line {...lineConfig} />
          </Card>
        </Col>
        <Col xs={24} lg={10}>
          <Card title="菜谱分类分布">
            <Pie {...pieConfig} />
          </Card>
        </Col>
      </Row>

      {/* Health + Hourly Activity */}
      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} lg={10}>
          <Card title="系统健康状态">
            {health ? (
              <div>
                <Tag color={health.status === 'UP' || health.status === 'HEALTHY' ? 'success' : 'warning'} style={{ marginBottom: 16 }}>
                  整体状态: {health.status}
                </Tag>
                {health.components.map(c => {
                  const cfg = statusConfig[c.status.toUpperCase()] ?? { color: 'default', icon: null }
                  return (
                    <div key={c.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid #f0f0f0' }}>
                      <span>{c.name}</span>
                      <Tag color={cfg.color} icon={cfg.icon}>{c.status}</Tag>
                    </div>
                  )
                })}
              </div>
            ) : <Typography.Text type="secondary">暂无数据</Typography.Text>}
          </Card>
        </Col>
        <Col xs={24} lg={14}>
          <Card title="24小时用户活跃度">
            <Column {...columnConfig} />
          </Card>
        </Col>
      </Row>
    </Spin>
  )
}
