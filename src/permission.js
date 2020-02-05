import router from './router'
import store from './store'

const whiteList = ['/login'] // 无需令牌白名单

router.beforeEach(async (to, from, next) => {

  // 获取令牌判断用户是否登录
  const hasToken = localStorage.getItem('token')

  // 已登录
  if (hasToken) {
    if (to.path === '/login') {
      // 若已登录没有必要显示登录页，重定向至首页
      next('/')
    } else {
      const hasRoles = store.getters.roles && store.getters.roles.length > 0;

      if (hasRoles) {
        // 说明用户已获取过角色信息，放行
        next()
      } else {
        try {
          // 先请求获取用户信息
          const { roles } = await store.dispatch('user/getInfo')

          // 根据当前用户角色过滤出可访问路由
          const accessRoutes = await store.dispatch('permission/generateRoutes', roles)

          // 添加至路由器
          router.addRoutes(accessRoutes)

          // 继续路由切换，确保addRoutes完成
          next({ ...to, replace: true })
        } catch (error) {
          // 出错需重置令牌并重新登录（令牌过期、网络错误等原因）
          await store.dispatch('user/resetToken')
          next(`/login?redirect=${to.path}`)
          alert(error || '未知错误')
        }
      }
    }
  } else {// 未登录
    if (whiteList.indexOf(to.path) !== -1) {
      // 白名单中路由放过
      next()
    } else {
      // 重定向至登录页
      next(`/login?redirect=${to.path}`)
    }
  }
})