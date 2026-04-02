import { useState, useEffect } from 'react'
import { Table, Input, Select, Button, Space, Tag, Popconfirm, message } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { getRecipeList, deleteRecipe, updateRecipeStatus } from '../api/recipe'
import type { Recipe } from '../api/recipe'

const statusMap: Record<number, { text: string; color: string }> = {
  1: { text: '已发布', color: 'green' },
  0: { text: '草稿', color: 'orange' },
  2: { text: '已下架', color: 'default' },
}

export default function RecipeList() {
  const [data, setData] = useState<Recipe[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [keyword, setKeyword] = useState('')
  const [status, setStatus] = useState<number | undefined>(undefined)
  const [pageNum, setPageNum] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const navigate = useNavigate()

  useEffect(() => {
    loadData()
  }, [pageNum, pageSize])

  const loadData = async () => {
    setLoading(true)
    try {
      const res = await getRecipeList({ pageNum, pageSize, keyword, status })
      setData(res.list)
      setTotal(res.total)
    } catch {
      // empty
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = () => {
    setPageNum(1)
    loadData()
  }

  const handleDelete = async (id: number) => {
    await deleteRecipe(id)
    message.success('删除成功')
    loadData()
  }

  const handleToggleStatus = async (record: Recipe) => {
    const newStatus = record.status === 1 ? 2 : 1
    await updateRecipeStatus(record.id, newStatus)
    message.success('操作成功')
    loadData()
  }

  const columns = [
    { title: 'ID', dataIndex: 'id', width: 60 },
    { title: '名称', dataIndex: 'title', ellipsis: true },
    { title: '分类', dataIndex: 'category', width: 100 },
    { title: '难度', dataIndex: 'difficulty', width: 80 },
    {
      title: '状态', dataIndex: 'status', width: 80,
      render: (s: number) => {
        const info = statusMap[s] || { text: '未知', color: 'default' }
        return <Tag color={info.color}>{info.text}</Tag>
      },
    },
    { title: '浏览量', dataIndex: 'viewCount', width: 80, sorter: (a: Recipe, b: Recipe) => a.viewCount - b.viewCount },
    { title: '点赞数', dataIndex: 'likeCount', width: 80, sorter: (a: Recipe, b: Recipe) => a.likeCount - b.likeCount },
    { title: '创建时间', dataIndex: 'createdAt', width: 170 },
    {
      title: '操作', width: 200, fixed: 'right' as const,
      render: (_: unknown, record: Recipe) => (
        <Space size="small">
          <Button type="link" size="small" icon={<EditOutlined />} onClick={() => navigate(`/admin/recipes/edit/${record.id}`)}>
            编辑
          </Button>
          <Button type="link" size="small" onClick={() => handleToggleStatus(record)}>
            {record.status === 1 ? '下架' : '上架'}
          </Button>
          <Popconfirm title="确认删除？" onConfirm={() => handleDelete(record.id)}>
            <Button type="link" size="small" danger icon={<DeleteOutlined />}>删除</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  return (
    <div>
      <div style={{ marginBottom: 16, display: 'flex', gap: 8 }}>
        <Input
          placeholder="搜索菜谱名称"
          value={keyword}
          onChange={e => setKeyword(e.target.value)}
          onPressEnter={handleSearch}
          style={{ width: 200 }}
          allowClear
        />
        <Select
          placeholder="状态"
          value={status}
          onChange={setStatus}
          allowClear
          style={{ width: 120 }}
          options={[
            { label: '已发布', value: 1 },
            { label: '草稿', value: 0 },
            { label: '已下架', value: 2 },
          ]}
        />
        <Button type="primary" onClick={handleSearch}>搜索</Button>
        <Button type="primary" icon={<PlusOutlined />} style={{ background: '#FF6B35', borderColor: '#FF6B35' }}
          onClick={() => navigate('/admin/recipes/new')}>
          新建菜谱
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        loading={loading}
        scroll={{ x: 1200 }}
        pagination={{
          current: pageNum,
          pageSize,
          total,
          showSizeChanger: true,
          showTotal: t => `共 ${t} 条`,
          onChange: (p, ps) => { setPageNum(p); setPageSize(ps) },
        }}
      />
    </div>
  )
}
