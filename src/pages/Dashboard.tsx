import { useState, useEffect } from 'react'
import { Row, Col, Card, Statistic, Spin } from 'antd'
import { FileTextOutlined, UserOutlined, MessageOutlined, EyeOutlined } from '@ant-design/icons'
import { getOverview } from '../api/dashboard'
import type { Overview } from '../api/dashboard'

export default function Dashboard() {
  const [overview, setOverview] = useState<Overview | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadOverview()
  }, [])

  const loadOverview = async () => {
    setLoading(true)
    try {
      const data = await getOverview()
      setOverview(data)
    } catch {
      // ignore
    } finally {
      setLoading(false)
    }
  }

  const stats = overview ?? { totalRecipes: 0, totalUsers: 0, totalComments: 0, todayVisits: 0, activeExperiments: 0 }

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
    </Spin>
  )
}
