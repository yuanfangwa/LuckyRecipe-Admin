import { useState } from 'react'
import { Upload, Button, Card, message, Space, Typography, Empty } from 'antd'
import { InboxOutlined } from '@ant-design/icons'
import { uploadImage, deleteFile } from '../api/file'

const { Dragger } = Upload

export default function FileManage() {
  const [fileList, setFileList] = useState<{ url: string; name: string }[]>([])

  const handleUpload = async (file: File) => {
    try {
      const url = await uploadImage(file)
      setFileList(prev => [...prev, { url, name: file.name }])
      message.success('上传成功')
    } catch { message.error('上传失败') }
    return false
  }

  const handleDelete = async (url: string) => {
    try { await deleteFile(url); setFileList(prev => prev.filter(f => f.url !== url)); message.success('删除成功') }
    catch { message.error('删除失败') }
  }

  return (
    <Space direction="vertical" size="middle" style={{ width: '100%' }}>
      <Card title="文件上传">
        <Dragger customRequest={({ file }) => handleUpload(file as File)} showUploadList={false} multiple>
          <p className="ant-upload-drag-icon"><InboxOutlined /></p>
          <p className="ant-upload-text">点击或拖拽文件到此区域上传</p>
          <p className="ant-upload-hint">支持 JPG、PNG、GIF、WebP 格式</p>
        </Dragger>
      </Card>
      <Card title="已上传文件">
        {fileList.length === 0 ? (
          <Empty description="暂无文件记录" />
        ) : (
          fileList.map((f, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f0f0f0' }}>
              <Typography.Text ellipsis style={{ maxWidth: 400 }}>{f.name}</Typography.Text>
              <Space>
                {f.url && <a href={f.url} target="_blank" rel="noreferrer">查看</a>}
                <Button type="link" danger onClick={() => handleDelete(f.url)}>删除</Button>
              </Space>
            </div>
          ))
        )}
      </Card>
      <Card title="说明">
        <Typography.Paragraph type="secondary">
          文件管理功能依赖后端文件列表 API。当前仅支持上传和单文件删除操作。
          如需批量管理，请联系后端提供文件列表接口。
        </Typography.Paragraph>
      </Card>
    </Space>
  )
}
