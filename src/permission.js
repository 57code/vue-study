import router from './router'

const whiteList = ['/login'] // 无需令牌白名单

router.beforeEach((to, from, next) => {

  // 获取令牌判断用户是否登录
  const hasToken = localStorage.getItem('token')

  // 已登录
  if (hasToken) {
    if (to.path === '/login') {
      // 若已登录没有必要显示登录页，重定向至首页
      next('/')
    } else {        
      // 去其他路由，暂时放过
      next()  
      // 接下来执行用户角色逻辑, todo
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