import { useState, useEffect } from 'react'
import { Form, Input, Button, Card, Switch, Spin, message, Divider } from 'antd'
import { getConfig, saveConfig } from '../api/config'
import type { ConfigItem } from '../api/config'

export default function ConfigManage() {
  const [config, setConfig] = useState<ConfigItem[]>([])
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [values, setValues] = useState<Record<string, string>>({})

  useEffect(() => { loadData() }, [])

  const loadData = async () => {
    setLoading(true)
    try {
      const data = await getConfig()
      setConfig(data)
      const init: Record<string, string> = {}
      data.forEach(item => { init[item.key] = item.value })
      setValues(init)
    } catch { /* */ }
    finally { setLoading(false) }
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      await saveConfig(values)
      message.success('保存成功')
    } catch { /* */ }
    finally { setSaving(false) }
  }

  const renderField = (item: ConfigItem) => {
    switch (item.type) {
      case 'boolean':
        return <Switch checked={values[item.key] === 'true'} onChange={v => setValues({ ...values, [item.key]: String(v) })} />
      case 'textarea':
        return <Input.TextArea value={values[item.key]} onChange={e => setValues({ ...values, [item.key]: e.target.value })} rows={3} />
      case 'number':
        return <Input type="number" value={values[item.key]} onChange={e => setValues({ ...values, [item.key]: e.target.value })} style={{ width: 200 }} />
      default:
        return <Input value={values[item.key]} onChange={e => setValues({ ...values, [item.key]: e.target.value })} style={{ width: 400 }} />
    }
  }

  return (
    <Spin spinning={loading}>
      <Card title="系统配置">
        <Form layout="vertical">
          {config.map((item, i) => (
            <div key={item.key}>
              <Form.Item label={item.label} help={item.key}>
                {renderField(item)}
              </Form.Item>
              {i < config.length - 1 && <Divider style={{ margin: '8px 0' }} />}
            </div>
          ))}
        </Form>
        <Button type="primary" onClick={handleSave} loading={saving} style={{ background: '#FF6B35', borderColor: '#FF6B35' }}>
          保存配置
        </Button>
      </Card>
    </Spin>
  )
}
