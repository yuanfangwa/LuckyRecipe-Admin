import { Breadcrumb, Typography } from 'antd'

const { Title } = Typography

interface PageHeaderProps {
  title: string
  breadcrumbs?: string[]
}

export default function PageHeader({ title, breadcrumbs }: PageHeaderProps) {
  return (
    <div style={{ marginBottom: 24 }}>
      {breadcrumbs && (
        <Breadcrumb style={{ marginBottom: 8 }}>
          {breadcrumbs.map((item, i) => (
            <Breadcrumb.Item key={i}>{item}</Breadcrumb.Item>
          ))}
        </Breadcrumb>
      )}
      <Title level={4} style={{ margin: 0 }}>{title}</Title>
    </div>
  )
}
