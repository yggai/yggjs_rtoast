
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastProvider } from 'yggjs_rtoast/tech'
import { Navigation } from './components/Navigation'
import { HomePage } from './pages/HomePage'
import { ToastDemoPage } from './pages/ToastDemoPage'
import { DocumentationPage } from './pages/DocumentationPage'
import './styles/global.css'
import './styles/toast.css'

function App() {
  return (
    <ToastProvider position="top-right" maxToasts={5}>
      <Router>
        <div className="tech-container">
          <h1 className="tech-title">YggJS RToast</h1>
          <p style={{ textAlign: 'center', marginBottom: '2rem', color: '#888' }}>
            专为React打造的科技风消息通知组件库
          </p>
          
          <Navigation />
          
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/demo" element={<ToastDemoPage />} />
            <Route path="/docs" element={<DocumentationPage />} />
          </Routes>
        </div>
      </Router>
    </ToastProvider>
  )
}

export default App
