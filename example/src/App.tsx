
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { toast } from 'yggjs_rtoast/tech'
import { HomePage } from './pages/HomePage'
import { ToastDemoPage } from './pages/ToastDemoPage'
import './styles/global.css'
import './styles/toast.css'

function App() {
  // 可选：启动时来一条欢迎信息
  React.useEffect(() => {
    const timer = setTimeout(() => {
      toast.info('欢迎使用 YggJS RToast 科技风全局消息组件！', { duration: 2000 })
    }, 300)
    return () => clearTimeout(timer)
  }, [])
  return (
      <Router>
        <div className="tech-container">
          <h1 className="tech-title">YggJS RToast</h1>
          <p style={{ textAlign: 'center', marginBottom: '2rem', color: '#888' }}>
            专为React打造的科技风消息通知组件库
          </p>

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/demo" element={<ToastDemoPage />} />
          </Routes>
        </div>
      </Router>
  )
}

export default App
