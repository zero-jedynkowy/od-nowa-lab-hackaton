export default defineNuxtRouteMiddleware(async () => {
  const { status } = useAuth()

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

  if (status.value !== 'authenticated') {
    return navigateTo({
      path: '/login',
      query: { redirect: '/market/add' },
    })
  }
})