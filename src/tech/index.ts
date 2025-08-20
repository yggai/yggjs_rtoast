// 全局 Toast（默认导出）
export { default as default } from './global/toastManager'
export { default as toast } from './global/toastManager'
export { default as defaultToast } from './global/toastManager'

// 兼容导出组件与Hook（保留但不再推荐）
export { Toast } from './components/Toast'
export { ToastContainer } from './components/ToastContainer'
export { useToast } from './hooks/useToast'
export { ToastProvider, ToastContext } from './hooks/ToastProvider'

// 类型导出
export type {
  ToastType,
  ToastPosition,
  ToastAnimation,
  ToastOptions,
  ToastData,
  ToastContainerOptions,
  ToastContextType,
  UseToastReturn,
} from './types'

// 样式导出 - 确保样式被正确打包
import './styles/toast.css'
