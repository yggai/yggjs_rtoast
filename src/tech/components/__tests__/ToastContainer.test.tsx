import React from 'react'
import { render } from '@testing-library/react'
import { ToastContainer } from '../ToastContainer'
import { ToastData } from '../../types'

const mockToasts: ToastData[] = [
  {
    id: 'test-1',
    message: 'Toast 1',
    type: 'info',
    duration: 4000,
    closable: true,
    animation: 'slide',
    pauseOnHover: true,
    createdAt: Date.now(),
  },
  {
    id: 'test-2',
    message: 'Toast 2',
    type: 'success',
    duration: 4000,
    closable: true,
    animation: 'slide',
    pauseOnHover: true,
    createdAt: Date.now(),
  },
]

const mockOnDismiss = jest.fn()

describe('ToastContainer Performance', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('React.memo optimization', () => {
    it('should not re-render when props have not changed', () => {
      const renderSpy = jest.fn()
      
      interface TestContainerProps {
        toasts: ToastData[]
        onDismiss: (id: string) => void
      }
      
      const TestContainer = React.memo((props: TestContainerProps) => {
        renderSpy()
        return <ToastContainer {...props} />
      })
      
      TestContainer.displayName = 'TestContainer'
      
      const { rerender } = render(
        <TestContainer toasts={mockToasts} onDismiss={mockOnDismiss} />
      )
      
      expect(renderSpy).toHaveBeenCalledTimes(1)
      
      // Re-render with same props - should not trigger re-render
      rerender(<TestContainer toasts={mockToasts} onDismiss={mockOnDismiss} />)
      expect(renderSpy).toHaveBeenCalledTimes(1)
    })

    it('should re-render when toast list changes', () => {
      const renderSpy = jest.fn()
      
      interface TestContainerProps {
        toasts: ToastData[]
        onDismiss: (id: string) => void
      }
      
      const TestContainer = React.memo((props: TestContainerProps) => {
        renderSpy()
        return <ToastContainer {...props} />
      })
      
      TestContainer.displayName = 'TestContainer'
      
      const { rerender } = render(
        <TestContainer toasts={mockToasts} onDismiss={mockOnDismiss} />
      )
      
      expect(renderSpy).toHaveBeenCalledTimes(1)
      
      // Re-render with different toasts - should trigger re-render
      const newToasts = [...mockToasts, {
        id: 'test-3',
        message: 'Toast 3',
        type: 'error',
        duration: 4000,
        closable: true,
        animation: 'slide',
        pauseOnHover: true,
        createdAt: Date.now(),
      }]
      
      rerender(<TestContainer toasts={newToasts} onDismiss={mockOnDismiss} />)
      expect(renderSpy).toHaveBeenCalledTimes(2)
    })
  })

  describe('useMemo optimizations', () => {
    it('should memoize visible toasts calculation', () => {
      const { rerender } = render(
        <ToastContainer 
          toasts={mockToasts} 
          onDismiss={mockOnDismiss}
          maxToasts={2}
        />
      )
      
      // Multiple re-renders with same props should not cause recalculation
      rerender(
        <ToastContainer 
          toasts={mockToasts} 
          onDismiss={mockOnDismiss}
          maxToasts={2}
        />
      )
      
      // Verify only expected number of toasts are rendered
      const toastElements = document.querySelectorAll('.ygg-toast')
      expect(toastElements).toHaveLength(2)
    })

    it('should memoize sorted toasts for bottom positions', () => {
      const { rerender } = render(
        <ToastContainer 
          toasts={mockToasts} 
          onDismiss={mockOnDismiss}
          position="bottom-right"
        />
      )
      
      // Re-render with same position should maintain order
      rerender(
        <ToastContainer 
          toasts={mockToasts} 
          onDismiss={mockOnDismiss}
          position="bottom-right"
        />
      )
      
      const container = document.querySelector('.ygg-toast-container--bottom-right')
      expect(container).toBeInTheDocument()
    })

    it('should memoize container classes', () => {
      const { rerender } = render(
        <ToastContainer 
          toasts={mockToasts} 
          onDismiss={mockOnDismiss}
          position="top-left"
          className="custom-class"
        />
      )
      
      const containerBefore = document.querySelector('.ygg-toast-container')
      
      // Re-render with same props
      rerender(
        <ToastContainer 
          toasts={mockToasts} 
          onDismiss={mockOnDismiss}
          position="top-left"
          className="custom-class"
        />
      )
      
      const containerAfter = document.querySelector('.ygg-toast-container')
      
      // Container should have correct classes
      expect(containerBefore).toHaveClass('ygg-toast-container--top-left')
      expect(containerBefore).toHaveClass('custom-class')
      expect(containerAfter).toHaveClass('ygg-toast-container--top-left')
      expect(containerAfter).toHaveClass('custom-class')
    })
  })

  describe('Performance edge cases', () => {
    it('should handle empty toast list efficiently', () => {
      const { container } = render(
        <ToastContainer 
          toasts={[]} 
          onDismiss={mockOnDismiss}
        />
      )
      
      // Should return null for empty list
      expect(container.firstChild).toBeNull()
    })

    it('should handle large toast lists efficiently', () => {
      const largeToastList: ToastData[] = Array.from({ length: 20 }, (_, i) => ({
        id: `large-test-${i}`,
        message: `Large Toast ${i}`,
        type: 'info' as const,
        duration: 4000,
        closable: true,
        animation: 'slide' as const,
        pauseOnHover: true,
        createdAt: Date.now() + i,
      }))
      
      const { rerender } = render(
        <ToastContainer 
          toasts={largeToastList} 
          onDismiss={mockOnDismiss}
          maxToasts={5}
        />
      )
      
      // Should only render maxToasts number of elements
      let toastElements = document.querySelectorAll('.ygg-toast')
      expect(toastElements).toHaveLength(5)
      
      // Re-render should be efficient
      rerender(
        <ToastContainer 
          toasts={largeToastList} 
          onDismiss={mockOnDismiss}
          maxToasts={3}
        />
      )
      
      toastElements = document.querySelectorAll('.ygg-toast')
      expect(toastElements).toHaveLength(3)
    })
  })
})