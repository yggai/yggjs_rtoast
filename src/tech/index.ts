// 全局 Toast（默认导出 + 命名导出）
export { default as default } from './global/toastManager'
export { default as toast } from './global/toastManager'
export { default as defaultToast } from './global/toastManager'

// 仅导出类型
export type {
  ToastType,
  ToastPosition,
  ToastAnimation,
  ToastOptions,
  ToastData,
  ToastContainerOptions,
  ToastContextType,
  UseToastReturn,
  ToastAPI,
} from './types'

// 样式导出 - 确保样式被正确打包
import './styles/toast.css'
