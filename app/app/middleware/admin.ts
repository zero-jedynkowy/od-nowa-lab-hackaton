export default defineNuxtRouteMiddleware(async () => {
  const { status, data } = useAuth()

  if (status.value === 'loading') {
    await new Promise<void>((resolve) => {
      const stop = watch(status, (currentStatus) => {
        if (currentStatus !== 'loading') {
          stop()
          resolve()
        }
      })
    })
  }

  if (status.value !== 'authenticated' || data.value?.user?.role !== 'ADMIN') {
    return navigateTo('/')
  }
})