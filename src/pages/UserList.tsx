import { useState, useEffect } from 'react'
import { Table, Modal, Select, message } from 'antd'
import { getUserList, updateUserRole } from '../api/user'
import type { User } from '../api/user'

const roles = ['user', 'admin', 'editor']

export default function UserList() {
  const [data, setData] = useState<User[]>([])
  const [loading, setLoading] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [role, setRole] = useState('')

  useEffect(() => { loadData() }, [])

  const loadData = async () => {
    setLoading(true)
    try { setData(await getUserList()) } catch { /* */ }
    finally { setLoading(false) }
  }

  const openRoleModal = (user: User) => {
    setSelectedUser(user)
    setRole(user.role)
    setModalOpen(true)
  }

  const handleRoleChange = async () => {
    if (!selectedUser) return
    await updateUserRole(selectedUser.id, role)
    message.success('角色更新成功')
    setModalOpen(false)
    loadData()
  }

  const columns = [
    { title: '用户ID', dataIndex: 'id', width: 80 },
    { title: '用户名', dataIndex: 'username' },
    { title: '昵称', dataIndex: 'nickname' },
    {
      title: '角色', dataIndex: 'role', width: 100,
      render: (r: string) => {
        const map: Record<string, string> = { admin: '管理员', editor: '编辑', user: '用户' }
        return map[r] || r
      },
    },
    { title: '创建时间', dataIndex: 'createdAt', width: 170 },
    {
      title: '操作', width: 100,
      render: (_: unknown, record: User) => (
        <a onClick={() => openRoleModal(record)}>修改角色</a>
      ),
    },
  ]

  return (
    <div>
      <Table columns={columns} dataSource={data} rowKey="id" loading={loading} />
      <Modal title="修改角色" open={modalOpen} onOk={handleRoleChange} onCancel={() => setModalOpen(false)}>
        <p>用户: {selectedUser?.username}</p>
        <Select value={role} onChange={setRole} style={{ width: '100%' }}
          options={roles.map(r => ({ label: r, value: r }))} />
      </Modal>
    </div>
  )
}
