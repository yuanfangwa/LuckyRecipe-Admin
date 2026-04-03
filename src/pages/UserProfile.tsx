import { useState, useEffect } from 'react'
import { Card, Descriptions, Tag, Spin, Empty, Input, Button, message, Row, Col, Statistic } from 'antd'
import { getUserProfile, type UserProfile as UserProfileType } from '../api/userProfile'

export default function UserProfilePage() {
  const [profile, setProfile] = useState<UserProfileType | null>(null)
  const [userId, setUserId] = useState<number>()
  const [loading, setLoading] = useState(false)

  const fetchProfile = async () => {
    setLoading(true)
    try {
      const res = await getUserProfile(userId)
      setProfile(res)
    } catch { message.error('获取用户画像失败') }
    setLoading(false)
  }

  useEffect(() => { fetchProfile() }, [])

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Card title="用户画像查询">
          <span>用户ID：</span>
          <Input type="number" placeholder="留空查当前用户" style={{ width: 200, marginRight: 16 }}
            onChange={e => setUserId(e.target.value ? Number(e.target.value) : undefined)} />
          <Button type="primary" onClick={fetchProfile}>查询</Button>
        </Card>
      </Col>
      {loading ? <Col span={24}><Spin /></Col> : profile ? (
        <>
          <Col span={8}><Card><Statistic title="烹饪次数" value={profile.cookingCount} /></Card></Col>
          <Col span={8}><Card><Statistic title="打卡次数" value={profile.checkInCount} /></Card></Col>
          <Col span={8}><Card><Statistic title="注册时间" value={profile.createdAt?.slice(0, 10)} /></Card></Col>
          <Col span={24}>
            <Card title="用户详情">
              <Descriptions column={2}>
                <Descriptions.Item label="用户名">{profile.username}</Descriptions.Item>
                <Descriptions.Item label="昵称">{profile.nickname}</Descriptions.Item>
                <Descriptions.Item label="饮食类型"><Tag color="green">{profile.dietType || '未设置'}</Tag></Descriptions.Item>
                <Descriptions.Item label="口味偏好"><Tag color="orange">{profile.tastePreference || '未设置'}</Tag></Descriptions.Item>
                <Descriptions.Item label="过敏原" span={2}>
                  {profile.allergens?.length ? profile.allergens.map(a => <Tag key={a} color="red">{a}</Tag>) : <span style={{ color: '#999' }}>无</span>}
                </Descriptions.Item>
              </Descriptions>
            </Card>
          </Col>
        </>
      ) : (
        <Col span={24}><Empty description="暂无数据" /></Col>
      )}
    </Row>
  )
}
