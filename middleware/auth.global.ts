// middleware/auth.ts
export default defineNuxtRouteMiddleware((to, from) => {
    // Only check auth for routes that start with /my-account
    if (to.path.startsWith('/my-account')) {
      const token = useCookie('auth_token')
      const adminInfo = useCookie('admin_info')
      
      
      // If not authenticated, redirect to login
      if (!token.value || !adminInfo.value) {
        console.log('❌ Not authenticated, redirecting to login')
        return navigateTo({
          path: '/login',
          query: {
            redirect: to.fullPath // Save where they were trying to go
          }
        })
      }
      
    }
  })