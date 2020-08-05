// import router from '@/router/index'
// import store from '@/store'

// router.beforeEach((to, from, next) => {
//   if (to.path === '/author' || store.getters.userAccount) {
//     next();
//     return;
//   }
//   if (!store.getters.userAccount) {
//     console.log('未授权');
//     store.dispatch('UpdateRouteToUrl', to.fullPath);
//     next({
//       path: '/author',
//       replace: true
//     });
//   }
// })

// router.afterEach((to) => {
// })
