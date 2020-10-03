
import request from '../utils/request';

const conf = {
  baseUrl: 'http://localhost:8112'
};
let baseUrl = conf.baseUrl;

/*
* 测试 get 请求
* */
export function testGet(obj) {
  return request(baseUrl + '/test_get', {
    method: 'get',
  });
}

/*
* 测试 post 请求
* */
export function testPost(obj) {
  return request({
    url: baseUrl + '/test_post',
    method: 'POST',
    data: obj
  });
}

/*
* 文件上传接口
* */
export function uploadFile(obj) {
  return request({
    url: baseUrl + '/api/upload',
    method: 'POST',
    data: obj,
  });
}
/*
* 上传图片之后，报错图片到数据库
* */
export function saveImg(obj) {
  // 参数
  // obj = {
  //   origin_url
  // }
  return request({
    url: baseUrl + '/save_img',
    method: 'POST',
    data: obj,
  });
}
/*
* 通过上传的url获取，检测结果
* */
export function getCheckRes(obj) {
  // 参数
  // obj = {
  //   origin_url
  // }
  return request({
    url: baseUrl + '/get_check_res',
    method: 'POST',
    data: obj,
  });
}
/*
* 获取全部图片
* */
export function getDataSource() {
  return request({
    url: baseUrl + '/get_all',
    method: 'POST',
  });
}
/*
* 删除指定图片
* */
export function del(obj) {
  // 参数
  // obj = {
  //   origin_url
  // }
  return request({
    url: baseUrl + '/del',
    method: 'POST',
    data: obj,
  });
}

