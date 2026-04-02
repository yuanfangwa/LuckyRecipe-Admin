import { useState } from 'react'
import { Form, Input, Button, Card, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { login } from '../api/auth'

export default function Login() {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const onFinish = async (values: { username: string; password: string }) => {
    setLoading(true)
    try {
      const res = await login(values)
      localStorage.setItem('admin_token', res.token)
      localStorage.setItem('admin_user', JSON.stringify(res))
      message.success('登录成功')
      navigate('/admin/dashboard')
    } catch {
      // error handled by interceptor
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    }}>
      <Card
        style={{ width: 400, borderRadius: 12, boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}
        bordered={false}
      >
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>🍳</div>
          <h1 style={{ fontSize: 24, color: '#FF6B35', margin: 0 }}>LuckyRecipe Admin</h1>
          <p style={{ color: '#999', marginTop: 8 }}>管理后台登录</p>
        </div>
        <Form onFinish={onFinish} size="large" autoComplete="off">
          <Form.Item name="username" rules={[{ required: true, message: '请输入用户名' }]}>
            <Input prefix={<UserOutlined />} placeholder="用户名" />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
            <Input.Password prefix={<LockOutlined />} placeholder="密码" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
              style={{ background: '#FF6B35', borderColor: '#FF6B35', height: 44 }}
            >
              登 录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}
