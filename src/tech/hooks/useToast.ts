import { useContext } from 'react'
import { ToastContext } from './ToastProvider'
import { UseToastReturn } from '../types'

/**
 * useToast Hook
 * 用于在组件中使用 Toast 功能
 */
export const useToast = (): UseToastReturn => {
  const context = useContext(ToastContext)
  
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  
  return context
}
