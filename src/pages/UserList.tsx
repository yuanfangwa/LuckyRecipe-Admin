import { useState, useEffect, useCallback } from 'react'
import { Table, Card, Button, Tag, Space, Input, Modal, message, Transfer } from 'antd'
import { ReloadOutlined, EditOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'
import { getUserList, getRoles, updateUserRole } from '../api/user'
import type { User, Role } from '../api/user'

export default function UserList() {
  const [users, setUsers] = useState<User[]>([])
  const [roles, setRoles] = useState<Role[]>([])
  const [total, setTotal] = useState(0)
  const [, setPages] = useState(1)
  const [pageNum, setPageNum] = useState(1)
  const [pageSize] = useState(10)
  const [keyword, setKeyword] = useState('')
  const [loading, setLoading] = useState(false)
  const [editUser, setEditUser] = useState<User | null>(null)
  const [selectedRoleIds, setSelectedRoleIds] = useState<number[]>([])
  const [submitting, setSubmitting] = useState(false)

  const loadUsers = useCallback(async () => {
    setLoading(true)
    try {
      const res = await getUserList({ pageNum, pageSize, keyword: keyword || undefined })
      setUsers(res.records)
      setTotal(res.total)
      setPages(res.pages)
    } catch {
      message.error('加载用户列表失败')
    } finally {
      setLoading(false)
    }
  }, [pageNum, pageSize, keyword])

  const loadRoles = useCallback(async () => {
    try {
      const res = await getRoles()
      setRoles(res.data?.records ?? [])
    } catch {
      // ignore
    }
  }, [])

  useEffect(() => {
    loadUsers()
  }, [loadUsers])

  useEffect(() => {
    loadRoles()
  }, [loadRoles])

  const handleEditRoles = (user: User) => {
    setEditUser(user)
    setSelectedRoleIds(user.roles?.map(r => r.id) ?? [])
  }

  const handleRoleSubmit = async () => {
    if (!editUser) return
    setSubmitting(true)
    try {
      await updateUserRole(editUser.id, selectedRoleIds)
      message.success('角色修改成功')
      setEditUser(null)
      loadUsers()
    } catch {
      message.error('角色修改失败')
    } finally {
      setSubmitting(false)
    }
  }

  const columns: ColumnsType<User> = [
    { title: 'ID', dataIndex: 'id', width: 60 },
    { title: '用户名', dataIndex: 'username', width: 120 },
    { title: '昵称', dataIndex: 'nickname', width: 120 },
    { title: '手机号', dataIndex: 'phone', width: 140 },
    {
      title: '角色',
      dataIndex: 'roles',
      width: 200,
      render: (roles: Role[]) => roles?.map(r => <Tag key={r.id} color="blue">{r.roleName}</Tag>) ?? '-',
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 80,
      render: (status: number) => (
        <Tag color={status === 1 ? 'green' : 'red'}>{status === 1 ? '正常' : '禁用'}</Tag>
      ),
    },
    {
      title: '操作',
      width: 100,
      render: (_, record) => (
        <Button type="link" icon={<EditOutlined />} onClick={() => handleEditRoles(record)}>修改角色</Button>
      ),
    },
  ]

  const transferDataSource = roles.map(r => ({ key: r.id, title: r.roleName, description: r.description }))

  return (
    <>
      <Card
        title="用户管理"
        extra={
          <Space>
            <Input.Search
              placeholder="搜索用户名/昵称"
              allowClear
              onSearch={val => { setKeyword(val); setPageNum(1) }}
              style={{ width: 220 }}
            />
            <Button icon={<ReloadOutlined />} onClick={loadUsers}>刷新</Button>
          </Space>
        }
      >
        <Table
          columns={columns}
          dataSource={users}
          rowKey="id"
          loading={loading}
          pagination={{
            current: pageNum,
            pageSize,
            total,
            showTotal: t => `共 ${t} 条`,
            onChange: p => setPageNum(p),
          }}
        />
      </Card>

      <Modal
        title={`修改角色 - ${editUser?.nickname ?? editUser?.username ?? ''}`}
        open={!!editUser}
        onOk={handleRoleSubmit}
        onCancel={() => setEditUser(null)}
        confirmLoading={submitting}
        width={500}
      >
        <Transfer
          dataSource={transferDataSource}
          titles={['可选角色', '已选角色']}
          targetKeys={selectedRoleIds}
          onChange={keys => setSelectedRoleIds(keys as number[])}
          render={item => item.title}
          listStyle={{ width: 200, height: 300 }}
          showSearch
        />
      </Modal>
    </>
  )
}
