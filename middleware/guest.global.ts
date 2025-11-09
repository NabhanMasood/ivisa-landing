// middleware/guest.global.ts
export default defineNuxtRouteMiddleware((to, from) => {
  // Only check for login/signup pages
  if (to.path === '/login' || to.path === '/sign-up') {
    const token = useCookie('auth_token')
    const adminInfo = useCookie('admin_info')
    
    console.log('👤 Guest Middleware - Checking if already logged in for:', to.path)
    
    // If already authenticated, redirect to my-account
    if (token.value && adminInfo.value) {
      console.log('✅ Already logged in, redirecting to my-account')
      return navigateTo('/my-account')
    }
    
    console.log('✅ Not logged in, allowing access to', to.path)
  }
})