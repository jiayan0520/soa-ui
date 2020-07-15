// import router from '@/router/index'
// import store from '@/store'
//
// router.beforeEach((to, from, next) => {
//   if (to.path === '/author' || store.state.user.userInfo.ACCOUNT) {
//     next();
//     return;
//   }
//   if (!store.getters.userInfo.ACCOUNT) {
//     console.log('未授权');
//     // store.commit('updateRouteToUrl', to.fullPath);
//     next({
//       path: '/author',
//       replace: true
//     });
//   }
// })
//
// router.afterEach((to) => {
// })
