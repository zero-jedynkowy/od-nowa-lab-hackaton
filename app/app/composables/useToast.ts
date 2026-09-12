export type ToastVariant = 'primary' | 'success' | 'danger'

type ToastState = {
  message: string
  variant: ToastVariant
}

let hideTimer: ReturnType<typeof setTimeout> | undefined

export const useToast = () => {
  const toast = useState<ToastState | null>('global-toast', () => null)

  const showToast = (message: string, variant: ToastVariant = 'primary') => {
    if (hideTimer) {
      clearTimeout(hideTimer)
    }

    toast.value = { message, variant }
    hideTimer = setTimeout(() => {
      toast.value = null
    }, 5000)
  }

  const hideToast = () => {
    if (hideTimer) {
      clearTimeout(hideTimer)
      hideTimer = undefined
    }

    toast.value = null
  }

  return { toast, showToast, hideToast }
}