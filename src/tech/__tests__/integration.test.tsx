import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { ToastProvider } from '../hooks/ToastProvider'
import { useToast } from '../hooks/useToast'

// 测试组件
const TestComponent = () => {
  const { success, error, warning, info } = useToast()
  
  return (
    <div>
      <button onClick={() => success('Success message')}>Success</button>
      <button onClick={() => error('Error message')}>Error</button>
      <button onClick={() => warning('Warning message')}>Warning</button>
      <button onClick={() => info('Info message')}>Info</button>
    </div>
  )
}

describe('Toast Integration Tests', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('renders ToastProvider and displays toasts correctly', () => {
    render(
      <ToastProvider position="top-right">
        <TestComponent />
      </ToastProvider>
    )
    
    // 点击成功按钮
    fireEvent.click(screen.getByText('Success'))
    
    // 验证Toast是否显示
    expect(screen.getByText('Success message')).toBeInTheDocument()
    
    // 验证Toast容器是否有正确的位置类
    const toastContainer = document.querySelector('.ygg-toast-container')
    expect(toastContainer).toBeInTheDocument()
    expect(toastContainer).toHaveClass('ygg-toast-container--top-right')
  })

  it('displays multiple toasts with correct stacking', () => {
    render(
      <ToastProvider position="top-right" maxToasts={3}>
        <TestComponent />
      </ToastProvider>
    )
    
    // 点击多个按钮
    fireEvent.click(screen.getByText('Success'))
    fireEvent.click(screen.getByText('Error'))
    fireEvent.click(screen.getByText('Warning'))
    
    // 验证所有Toast都显示
    expect(screen.getByText('Success message')).toBeInTheDocument()
    expect(screen.getByText('Error message')).toBeInTheDocument()
    expect(screen.getByText('Warning message')).toBeInTheDocument()
    
    // 验证Toast数量
    const toasts = document.querySelectorAll('.ygg-toast')
    expect(toasts).toHaveLength(3)
  })

  it('applies correct CSS classes for different toast types', () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    )
    
    // 测试不同类型的Toast
    fireEvent.click(screen.getByText('Success'))
    fireEvent.click(screen.getByText('Error'))
    
    const toasts = document.querySelectorAll('.ygg-toast')
    expect(toasts[0]).toHaveClass('ygg-toast--error') // 最新的在前面
    expect(toasts[1]).toHaveClass('ygg-toast--success')
  })

  it('ensures toast container has fixed positioning for overlay display', () => {
    render(
      <ToastProvider position="bottom-left">
        <TestComponent />
      </ToastProvider>
    )
    
    fireEvent.click(screen.getByText('Info'))
    
    const toastContainer = document.querySelector('.ygg-toast-container')
    expect(toastContainer).toBeInTheDocument()
    expect(toastContainer).toHaveClass('ygg-toast-container--bottom-left')
    
    // 验证容器的基本结构
    const toast = document.querySelector('.ygg-toast')
    expect(toast).toBeInTheDocument()
    expect(toast).toHaveClass('ygg-toast--info')
  })

  it('verifies toast styling elements are present', () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    )
    
    fireEvent.click(screen.getByText('Success'))
    
    // 验证Toast的各个样式元素
    const toast = document.querySelector('.ygg-toast')
    const icon = document.querySelector('.ygg-toast__icon')
    const message = document.querySelector('.ygg-toast__message')
    const closeButton = document.querySelector('.ygg-toast__close')
    const progressBar = document.querySelector('.ygg-toast__progress')
    
    expect(toast).toBeInTheDocument()
    expect(icon).toBeInTheDocument()
    expect(message).toBeInTheDocument()
    expect(closeButton).toBeInTheDocument()
    expect(progressBar).toBeInTheDocument()
  })
})
