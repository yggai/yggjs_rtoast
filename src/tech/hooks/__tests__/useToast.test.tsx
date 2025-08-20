import React from 'react'
import { renderHook, act } from '@testing-library/react'
import { ToastProvider } from '../ToastProvider'
import { useToast } from '../useToast'

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <ToastProvider>{children}</ToastProvider>
)

describe('useToast Hook', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('throws error when used outside ToastProvider', () => {
    // 使用 console.error 来捕获错误而不是让测试失败
    const originalError = console.error
    console.error = jest.fn()
    
    expect(() => {
      renderHook(() => useToast())
    }).toThrow('useToast must be used within a ToastProvider')
    
    console.error = originalError
  })

  it('provides toast methods when used within ToastProvider', () => {
    const { result } = renderHook(() => useToast(), { wrapper })
    
    expect(result.current).toHaveProperty('toast')
    expect(result.current).toHaveProperty('success')
    expect(result.current).toHaveProperty('error')
    expect(result.current).toHaveProperty('warning')
    expect(result.current).toHaveProperty('info')
    expect(result.current).toHaveProperty('dismiss')
    expect(result.current).toHaveProperty('dismissAll')
    expect(result.current).toHaveProperty('toasts')
  })

  it('adds toast to the list', () => {
    const { result } = renderHook(() => useToast(), { wrapper })
    
    act(() => {
      result.current.toast('Test message')
    })
    
    expect(result.current.toasts).toHaveLength(1)
    expect(result.current.toasts[0].message).toBe('Test message')
  })

  it('adds success toast with correct type', () => {
    const { result } = renderHook(() => useToast(), { wrapper })
    
    act(() => {
      result.current.success('Success message')
    })
    
    expect(result.current.toasts[0].type).toBe('success')
    expect(result.current.toasts[0].message).toBe('Success message')
  })

  it('dismisses specific toast by id', () => {
    const { result } = renderHook(() => useToast(), { wrapper })
    
    let toastId: string
    act(() => {
      toastId = result.current.toast('Test message')
    })
    
    expect(result.current.toasts).toHaveLength(1)
    
    act(() => {
      result.current.dismiss(toastId)
    })
    
    expect(result.current.toasts).toHaveLength(0)
  })

  it('dismisses all toasts', () => {
    const { result } = renderHook(() => useToast(), { wrapper })
    
    act(() => {
      result.current.toast('Message 1')
      result.current.toast('Message 2')
      result.current.toast('Message 3')
    })
    
    expect(result.current.toasts).toHaveLength(3)
    
    act(() => {
      result.current.dismissAll()
    })
    
    expect(result.current.toasts).toHaveLength(0)
  })
})
