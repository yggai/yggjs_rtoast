
import { Link, useLocation } from 'react-router-dom'

export const Navigation: React.FC = () => {
  const location = useLocation()

  const navItems = [
    { path: '/', label: '首页', icon: '🏠' },
    { path: '/demo', label: 'Toast演示', icon: '🚀' },
    { path: '/docs', label: '文档', icon: '📚' },
  ]

  return (
    <nav className="tech-nav">
      {navItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`tech-nav-link ${location.pathname === item.path ? 'active' : ''}`}
        >
          <span style={{ marginRight: '8px' }}>{item.icon}</span>
          {item.label}
        </Link>
      ))}
    </nav>
  )
}
