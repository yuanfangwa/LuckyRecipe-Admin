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
  CommentOutlined,
  ClockCircleOutlined,
  TrophyOutlined,
  BellOutlined,
  FolderOpenOutlined,
  HeartOutlined,
  ShareAltOutlined,
  FileOutlined,
  BarChartOutlined,
} from '@ant-design/icons'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'

const { Header, Sider, Content } = Layout

const menuItems = [
  { key: '/admin/dashboard', icon: <DashboardOutlined />, label: '数据分析' },
  {
    key: 'content', icon: <ProfileOutlined />, label: '内容管理',
    children: [
      { key: '/admin/recipes', icon: <ProfileOutlined />, label: '菜谱管理' },
      { key: '/admin/comments', icon: <CommentOutlined />, label: '评论管理' },
      { key: '/admin/checkin', icon: <ClockCircleOutlined />, label: '打卡动态' },
    ],
  },
  {
    key: 'user-ops', icon: <UserOutlined />, label: '用户运营',
    children: [
      { key: '/admin/users', icon: <UserOutlined />, label: '用户管理' },
      { key: '/admin/user-profile', icon: <BarChartOutlined />, label: '用户画像' },
      { key: '/admin/favorites', icon: <HeartOutlined />, label: '收藏管理' },
      { key: '/admin/achievements', icon: <TrophyOutlined />, label: '成就管理' },
    ],
  },
  {
    key: 'system', icon: <SettingOutlined />, label: '系统工具',
    children: [
      { key: '/admin/ingredients', icon: <ShoppingOutlined />, label: '食材管理' },
      { key: '/admin/tags', icon: <TagsOutlined />, label: '标签管理' },
      { key: '/admin/notifications', icon: <BellOutlined />, label: '通知管理' },
      { key: '/admin/files', icon: <FileOutlined />, label: '文件管理' },
      { key: '/admin/shares', icon: <ShareAltOutlined />, label: '分享管理' },
      { key: '/admin/abtest', icon: <ExperimentOutlined />, label: 'A/B 实验' },
      { key: '/admin/recommendation', icon: <AimOutlined />, label: '推荐管理' },
      { key: '/admin/timers', icon: <ClockCircleOutlined />, label: '烹饪计时' },
      { key: '/admin/config', icon: <SettingOutlined />, label: '系统配置' },
    ],
  },
]

const breadcrumbMap: Record<string, string[]> = {
  '/admin/dashboard': ['首页', '数据分析'],
  '/admin/recipes': ['首页', '内容管理', '菜谱管理'],
  '/admin/comments': ['首页', '内容管理', '评论管理'],
  '/admin/checkin': ['首页', '内容管理', '打卡动态'],
  '/admin/users': ['首页', '用户运营', '用户管理'],
  '/admin/user-profile': ['首页', '用户运营', '用户画像'],
  '/admin/favorites': ['首页', '用户运营', '收藏管理'],
  '/admin/achievements': ['首页', '用户运营', '成就管理'],
  '/admin/tags': ['首页', '系统工具', '标签管理'],
  '/admin/ingredients': ['首页', '系统工具', '食材管理'],
  '/admin/notifications': ['首页', '系统工具', '通知管理'],
  '/admin/files': ['首页', '系统工具', '文件管理'],
  '/admin/shares': ['首页', '系统工具', '分享管理'],
  '/admin/abtest': ['首页', '系统工具', 'A/B 实验'],
  '/admin/recommendation': ['首页', '系统工具', '推荐管理'],
  '/admin/timers': ['首页', '系统工具', '烹饪计时'],
  '/admin/config': ['首页', '系统工具', '系统配置'],
}

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { token: { colorBgContainer } } = theme.useToken()

  const allMenuKeys = menuItems.flatMap(item =>
    item.children ? item.children.map(c => c.key) : [item.key]
  )
  const selectedKey = allMenuKeys.find(key =>
    location.pathname.startsWith(key)
  ) || '/admin/dashboard'

  const path = location.pathname
  const defaultOpenKeys = path.startsWith('/admin/recipes') || path.startsWith('/admin/comments') || path.startsWith('/admin/checkin')
    ? ['content']
    : path.startsWith('/admin/users') || path.startsWith('/admin/user-profile') || path.startsWith('/admin/favorites') || path.startsWith('/admin/achievements')
    ? ['user-ops']
    : !path.startsWith('/admin/dashboard')
    ? ['system']
    : []

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
          defaultOpenKeys={defaultOpenKeys}
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
