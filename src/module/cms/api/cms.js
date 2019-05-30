import http from '../../../base/api/public'
import querystring from 'querystring'

let sysConfig = require('@/../config/sysConfig')
let apiUrl = sysConfig.xcApiUrlPre;

/**************************页面操作******************************/
//根据查询条件进行页面分页查询
export const page_list = (page, size, params) => {
  let stringify = querystring.stringify(params);
  return http.requestQuickGet(apiUrl + '/cms/page/list/' + page + '/' + size + '?' + stringify)
}


//新增页面
export const page_add = params => {
  return http.requestPost(apiUrl + '/cms/page/add', params);
}

//根据主键id获取页面信息
export const page_get = id => {
  return http.requestGet(apiUrl + '/cms/page/get/' + id);
}

//根据主键修改页面信息
export const page_edit = (id, params) => {
  return http.requestPut(apiUrl + '/cms/page/edit/' + id, params);
}

//根据主键id删除页面
export const page_del = id => {
  return http.requestDelete(apiUrl + '/cms/page/del/' + id);
}

//根据主键id发布新页面
export const page_postPage = id => {
  return http.requestPost(apiUrl + '/cms/page/postPage/' + id);
}




/**************************模板操作******************************/

//根据查询条件进行模板分页查询
export const template_list = (page, size, params) => {
  let stringify = querystring.stringify(params);
  return http.requestQuickGet(apiUrl + '/cms/template/list/' + page + '/' + size + '?' + stringify)
}

//新增页面
export const template_add = params => {
  return http.requestPost(apiUrl + '/cms/template/add', params);
}

//根据主键id获取页面信息
export const template_get = id => {
  return http.requestGet(apiUrl + '/cms/template/get/' + id);
}

//根据主键修改页面信息
export const template_edit = (id, params) => {
  return http.requestPut(apiUrl + '/cms/template/edit/' + id, params);
}

//根据主键id删除页面
export const template_del = id => {
  return http.requestDelete(apiUrl + '/cms/template/del/' + id);
}
