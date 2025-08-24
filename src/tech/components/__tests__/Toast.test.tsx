import React from 'react'
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react'
import { Toast } from '../Toast'
import { ToastData } from '../../types'

const mockToast: ToastData = {
  id: 'test-toast',
  message: 'Test message',
  type: 'info',
  duration: 4000,
  closable: true,
  animation: 'slide',
  pauseOnHover: true,
  createdAt: Date.now(),
}

const mockOnDismiss = jest.fn()

describe('Toast Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('renders toast message correctly', () => {
    render(<Toast toast={mockToast} onDismiss={mockOnDismiss} />)
    expect(screen.getByText('Test message')).toBeInTheDocument()
  })

  it('renders with correct type class', () => {
    render(<Toast toast={mockToast} onDismiss={mockOnDismiss} />)
    const toastElement = screen.getByRole('alert')
    expect(toastElement).toHaveClass('ygg-toast--info')
  })

  it('applies correct CSS classes for styling', async () => {
    render(<Toast toast={mockToast} onDismiss={mockOnDismiss} />)
    const toastElement = screen.getByRole('alert')
    
    // 验证基础样式类
    expect(toastElement).toHaveClass('ygg-toast')
    expect(toastElement).toHaveClass('ygg-toast--info')
    
    // 等待动画类出现
    await waitFor(() => {
      expect(toastElement).toHaveClass('ygg-toast--slide-enter')
    })
    
    // 验证图标容器
    const iconContainer = document.querySelector('.ygg-toast__icon')
    expect(iconContainer).toBeInTheDocument()
    
    // 验证消息容器
    const messageContainer = document.querySelector('.ygg-toast__message')
    expect(messageContainer).toBeInTheDocument()
    
    // 验证关闭按钮
    const closeButton = document.querySelector('.ygg-toast__close')
    expect(closeButton).toBeInTheDocument()
  })

  it('shows close button when closable is true', () => {
    render(<Toast toast={mockToast} onDismiss={mockOnDismiss} />)
    expect(screen.getByLabelText('关闭通知')).toBeInTheDocument()
  })

  it('hides close button when closable is false', () => {
    const nonClosableToast = { ...mockToast, closable: false }
    render(<Toast toast={nonClosableToast} onDismiss={mockOnDismiss} />)
    expect(screen.queryByLabelText('关闭通知')).not.toBeInTheDocument()
  })

  it('calls onDismiss when close button is clicked', () => {
    render(<Toast toast={mockToast} onDismiss={mockOnDismiss} />)
    fireEvent.click(screen.getByLabelText('关闭通知'))
    
    // 等待动画完成
    act(() => {
      jest.advanceTimersByTime(300)
    })
    expect(mockOnDismiss).toHaveBeenCalledWith('test-toast')
  })

  it('auto dismisses after duration', () => {
    render(<Toast toast={mockToast} onDismiss={mockOnDismiss} />)
    
    // 快进到自动关闭时间
    act(() => {
      jest.advanceTimersByTime(4000 + 300) // duration + animation time
    })
    expect(mockOnDismiss).toHaveBeenCalledWith('test-toast')
  })

  it('shows progress bar when duration > 0', () => {
    render(<Toast toast={mockToast} onDismiss={mockOnDismiss} />)
    const progressBar = document.querySelector('.ygg-toast__progress')
    expect(progressBar).toBeInTheDocument()
  })

  it('renders custom icon when provided', () => {
    const customIcon = <span data-testid="custom-icon">🚀</span>
    const toastWithIcon = { ...mockToast, icon: customIcon }
    render(<Toast toast={toastWithIcon} onDismiss={mockOnDismiss} />)
    
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument()
  })
})
