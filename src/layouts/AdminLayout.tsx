import { useState } from 'react'
import { Layout, Menu, Avatar, Dropdown, Breadcrumb, theme } from 'antd'
import {
  DashboardOutlined,
  ProfileOutlined,
  UserOutlined,
  TagsOutlined,
  ShoppingOutlined,
  ExperimentOutlined,
  AimOutlined,
  SettingOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LogoutOutlined,
} from '@ant-design/icons'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'

const { Header, Sider, Content } = Layout

const menuItems = [
  { key: '/admin/dashboard', icon: <DashboardOutlined />, label: '数据分析' },
  { key: '/admin/recipes', icon: <ProfileOutlined />, label: '菜谱管理' },
  { key: '/admin/users', icon: <UserOutlined />, label: '用户管理' },
  { key: '/admin/tags', icon: <TagsOutlined />, label: '标签管理' },
  { key: '/admin/ingredients', icon: <ShoppingOutlined />, label: '食材管理' },
  { key: '/admin/abtest', icon: <ExperimentOutlined />, label: 'A/B 实验' },
  { key: '/admin/recommendation', icon: <AimOutlined />, label: '推荐管理' },
  { key: '/admin/config', icon: <SettingOutlined />, label: '系统配置' },
]

const breadcrumbMap: Record<string, string[]> = {
  '/admin/dashboard': ['首页', '数据分析'],
  '/admin/recipes': ['首页', '菜谱管理'],
  '/admin/users': ['首页', '用户管理'],
  '/admin/tags': ['首页', '标签管理'],
  '/admin/ingredients': ['首页', '食材管理'],
  '/admin/abtest': ['首页', 'A/B 实验'],
  '/admin/recommendation': ['首页', '推荐管理'],
  '/admin/config': ['首页', '系统配置'],
}

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { token: { colorBgContainer } } = theme.useToken()

  const selectedKey = menuItems.find(item =>
    location.pathname.startsWith(item.key)
  )?.key || '/admin/dashboard'

  const user = JSON.parse(localStorage.getItem('admin_user') || '{}')

  const handleLogout = () => {
    localStorage.removeItem('admin_token')
    localStorage.removeItem('admin_user')
    navigate('/admin/login')
  }

  const dropdownItems = [
    { key: 'logout', icon: <LogoutOutlined />, label: '退出登录', onClick: handleLogout },
  ]

  const currentBreadcrumbs = Object.entries(breadcrumbMap).find(([path]) =>
    location.pathname.startsWith(path)
  )?.[1] || ['首页']

  if (location.pathname.includes('/admin/recipes/edit') || location.pathname === '/admin/recipes/new') {
    currentBreadcrumbs.push('编辑菜谱')
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        trigger={null}
        style={{ background: '#001529' }}
      >
        <div style={{
          height: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#FF6B35',
          fontSize: collapsed ? 16 : 18,
          fontWeight: 'bold',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
        }}>
          {collapsed ? '🍳' : '🍳 LuckyRecipe Admin'}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKey]}
          items={menuItems}
          onClick={({ key }) => navigate(key)}
        />
      </Sider>
      <Layout>
        <Header style={{
          padding: '0 24px',
          background: colorBgContainer,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
        }}>
          <div
            style={{ fontSize: 18, cursor: 'pointer' }}
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </div>
          <Dropdown menu={{ items: dropdownItems }} placement="bottomRight">
            <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
              <Avatar style={{ backgroundColor: '#FF6B35' }}>
                {(user.nickname || user.username || 'A')[0].toUpperCase()}
              </Avatar>
              <span>{user.nickname || user.username || '管理员'}</span>
            </div>
          </Dropdown>
        </Header>
        <Content style={{ margin: 24 }}>
          <Breadcrumb items={currentBreadcrumbs.map(item => ({ title: item }))} />
          <div style={{
            padding: 24,
            background: colorBgContainer,
            borderRadius: 8,
            marginTop: 16,
            minHeight: 360,
          }}>
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}
