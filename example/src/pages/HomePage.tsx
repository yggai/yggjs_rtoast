
import { Link } from 'react-router-dom'

export const HomePage: React.FC = () => {


  return (
    <div>
      <div className="tech-card">
        <h2 className="tech-subtitle">欢迎使用 YggJS RToast</h2>
        <p style={{ marginBottom: '1.5rem', lineHeight: '1.6' }}>
          YggJS RToast 是一个专为React应用设计的现代化消息通知组件库。
          它采用科技风格的视觉设计，提供丰富的功能和优秀的用户体验。
        </p>
        
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <Link to="/demo" className="tech-button">
            🚀 开始体验
          </Link>
          <Link to="/docs" className="tech-button">
            📚 查看文档
          </Link>
        </div>
      </div>

      <div className="tech-card">
        <h2 className="tech-subtitle">快速导航</h2>
        <div className="tech-grid">
          <a
            href="/demo"
            target="_blank"
            rel="noopener noreferrer"
            className="tech-card"
            style={{ margin: 0, textDecoration: 'none', color: 'inherit', display: 'block' }}
          >
            <h3 style={{ color: '#00d4ff', marginBottom: '0.5rem' }}>
              🚀 科技消息示例页
            </h3>
            <p style={{ color: '#ccc', lineHeight: '1.5' }}>
              点击后在新标签打开，演示所有消息类型与功能
            </p>
          </a>
        </div>
      </div>
    </div>
  )
}
