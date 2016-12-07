let server = '';
// let server2 = '';

//线上环境也用nginx反向代理/api地址实现跨域
/* eslint-disable no-undef */
// if (DEV) {
//   server2 = '/v2api'
// }
// server2 = '/v2api'

server = '/api';

const API = {
  // getbanner: `${server}/app/public/getbanner?token=${TOKEN}`,
  user_login: `${server}/basic/checkloginajax/imall/queryUser/1`,
}

export default API;
