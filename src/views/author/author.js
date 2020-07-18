const config = {
  'StudentWork': '/StudentWork/',
  'web': '/web/'
}
function createStudentWorkUrl (route) {
  return config['StudentWork'] + route;
}
module.exports = {
  getAuthLogin() {
    return createStudentWorkUrl('/ding/authLogin')
  },
  getDingUserInfo() {
    return createStudentWorkUrl('/ding/getDingUserInfo')
  }

}
