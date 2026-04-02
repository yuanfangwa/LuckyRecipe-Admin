import { useState, useEffect } from 'react'
import { Form, Input, InputNumber, Select, Button, Space, Card, message } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { useNavigate, useParams } from 'react-router-dom'
import { getRecipeDetail, createRecipe, updateRecipe } from '../api/recipe'

const categories = ['中餐', '西餐', '日料', '韩餐', '东南亚', '甜品', '饮品', '其他']
const difficulties = ['简单', '普通', '困难']

export default function RecipeEdit() {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { id } = useParams()

  const isEdit = !!id

  useEffect(() => {
    if (isEdit) {
      setLoading(true)
      getRecipeDetail(Number(id))
        .then(data => form.setFieldsValue(data))
        .catch(() => {})
        .finally(() => setLoading(false))
    }
  }, [id])

  const onFinish = async (values: any) => {
    setLoading(true)
    try {
      if (isEdit) {
        await updateRecipe(Number(id), values)
      } else {
        await createRecipe({ ...values, status: 0 })
      }
      message.success('保存成功')
      navigate('/admin/recipes')
    } catch {
      // error handled
    } finally {
      setLoading(false)
    }
  }

  return (
    <Form form={form} layout="vertical" onFinish={onFinish} style={{ maxWidth: 800 }}>
      <Card title="基本信息" style={{ marginBottom: 16 }}>
        <Form.Item name="title" label="菜谱名称" rules={[{ required: true, message: '请输入菜谱名称' }]}>
          <Input />
        </Form.Item>
        <Space style={{ display: 'flex' }} size="large">
          <Form.Item name="category" label="分类" rules={[{ required: true }]}>
            <Select options={categories.map(c => ({ label: c, value: c }))} style={{ width: 200 }} />
          </Form.Item>
          <Form.Item name="difficulty" label="难度" rules={[{ required: true }]}>
            <Select options={difficulties.map(d => ({ label: d, value: d }))} style={{ width: 200 }} />
          </Form.Item>
        </Space>
        <Form.Item name="description" label="简介">
          <Input.TextArea rows={3} />
        </Form.Item>
        <Form.Item name="coverImage" label="封面图URL">
          <Input placeholder="https://..." />
        </Form.Item>
      </Card>

      <Card title="食材清单" style={{ marginBottom: 16 }}>
        <Form.List name="ingredients">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                  <Form.Item {...restField} name={[name, 'name']} rules={[{ required: true, message: '食材名' }]}>
                    <Input placeholder="食材名称" style={{ width: 200 }} />
                  </Form.Item>
                  <Form.Item {...restField} name={[name, 'amount']}>
                    <Input placeholder="用量" style={{ width: 150 }} />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>添加食材</Button>
            </>
          )}
        </Form.List>
      </Card>

      <Card title="制作步骤" style={{ marginBottom: 16 }}>
        <Form.List name="steps">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }, index) => (
                <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                  <span style={{ width: 30, textAlign: 'center' }}>{index + 1}.</span>
                  <Form.Item {...restField} name={[name, 'order']} initialValue={index + 1} hidden>
                    <InputNumber />
                  </Form.Item>
                  <Form.Item {...restField} name={[name, 'description']} rules={[{ required: true, message: '步骤描述' }]}>
                    <Input.TextArea placeholder="步骤描述" style={{ width: 500 }} rows={2} />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>添加步骤</Button>
            </>
          )}
        </Form.List>
      </Card>

      <Space>
        <Button type="primary" htmlType="submit" loading={loading} style={{ background: '#FF6B35', borderColor: '#FF6B35' }}>
          保存
        </Button>
        <Button onClick={() => navigate('/admin/recipes')}>取消</Button>
      </Space>
    </Form>
  )
}
