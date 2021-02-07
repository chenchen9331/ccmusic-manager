import axios from 'axios'
import VueRouter from 'vue-router';
// 连接超时时间
axios.defaults.timeout = 50000;
// 开启跨域访问
axios.defaults.withCredentials = true;
// Content-Type响应头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
// base url
axios.defaults.baseURL = "http://127.0.0.1:8888";

// 响应拦截器
axios.interceptors.response.use(
    response => {
        if (response.status == 200) {
            return Promise.resolve(response);
        } else {
            return Promise.reject(response);
        }
    },
    error => {
        if (error.response.status) {
            switch(error.response.status) {
                case 401:    // 未登录
                    router.replace({
                        path: '/',
                        query:{
                            redirect:router.currentRoute.fullPath
                        }
                    });
                    break;
                case 404:
                    break;
            }
        }
        return Promise.reject(error.response);
    }
);

// get方法
export function get(url, params={}) {
    return new Promise((resolve, reject) => {
        axios.get(url, {params:params}).then(response => {
            resolve(response.data)
        }).catch(err => {
            reject(err);
        })
    })
}

// post方法
export function post(url, data={}) {
    return new Promise((resolve, reject) => {
        axios.post(url, data).then(response => {
            resolve(response.data)
        }).catch(err => {
            reject(err);
        })
    })
}
