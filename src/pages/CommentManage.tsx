import { useState, useEffect } from 'react'
import { Table, Input, Button, Popconfirm, message, Rate, Tag, Space } from 'antd'
import { getCommentList, deleteComment, type Comment } from '../api/comment'

export default function CommentManage() {
  const [data, setData] = useState<Comment[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [keyword, setKeyword] = useState('')

  const fetchData = async () => {
    setLoading(true)
    try {
      const res = await getCommentList({ pageNum: page, pageSize, keyword })
      setData(res.records || [])
      setTotal(res.total || 0)
    } catch { message.error('获取评论列表失败') }
    setLoading(false)
  }

  useEffect(() => { fetchData() }, [page, pageSize])

  const handleDelete = async (id: number) => {
    try { await deleteComment(id); message.success('删除成功'); fetchData() }
    catch { message.error('删除失败，可能需要管理员权限') }
  }

  const columns = [
    { title: 'ID', dataIndex: 'id', width: 60 },
    { title: '用户', dataIndex: 'username', width: 100 },
    { title: '菜谱', dataIndex: 'recipeName', width: 120, ellipsis: true },
    { title: '内容', dataIndex: 'content', ellipsis: true },
    { title: '评分', dataIndex: 'rating', width: 120, render: (v: number) => <Rate disabled defaultValue={v} allowHalf /> },
    { title: '时间', dataIndex: 'createdAt', width: 170 },
    {
      title: '操作', width: 80,
      render: (_: unknown, row: Comment) => (
        <Popconfirm title="确认删除该评论？" onConfirm={() => handleDelete(row.id)}>
          <Button type="link" danger size="small">删除</Button>
        </Popconfirm>
      ),
    },
  ]

  return (
    <Space direction="vertical" size="middle" style={{ width: '100%' }}>
      <Input.Search placeholder="搜索评论内容" allowClear onSearch={v => { setKeyword(v); setPage(1) }} style={{ maxWidth: 400 }} />
      <Table rowKey="id" columns={columns} dataSource={data} loading={loading}
        pagination={{ current: page, pageSize, total, showSizeChanger: true, showTotal: t => `共 ${t} 条`,
          onChange: (p, ps) => { setPage(p); setPageSize(ps) } }} />
    </Space>
  )
}
