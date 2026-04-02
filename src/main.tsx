import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import App from './App'
import './index.css'

// MSW mock disabled — using real backend API
// async function enableMocking() {
//   if (import.meta.env.DEV) {
//     const { worker } = await import('./mock/browser')
//     return worker.start({
//       onUnhandledRequest: 'bypass',
//     })
//   }
// }

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConfigProvider locale={zhCN} theme={{
      token: { colorPrimary: '#FF6B35' },
    }}>
      <App />
    </ConfigProvider>
  </StrictMode>
)
