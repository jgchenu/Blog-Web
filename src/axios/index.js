import axios from 'axios'
import '../../node_modules/nprogress/nprogress.css'
import NProgress from 'nprogress'
import {
    message
} from 'antd'

const instance = axios.create({
    baseURL: '/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json;charset=UTF-8'
    }
});
instance.interceptors.request.use((config) => {
    // if (config.method === 'post') {
    //     //如果是post请求则进行序列化处理
    //     config.data = qs.stringify(config.data);
    // }
    const token = localStorage.getItem('token');
    config.headers.common['Authorization'] = 'Bearer ' + token;
    NProgress.start()

    return config;
}, (error) => {
    return Promise.reject(error);
});
instance.interceptors.response.use((res) => {

    NProgress.done()

    return res;
}, (error) => {
    //404等问题可以在这里处理
    NProgress.done()
    if (error.response.status === 401) {
        message.error('请重新登录');
        localStorage.clear();
    } else if (error.response.status === 500) {
        message.error('500 报错，请检查网络')
    }
    return Promise.reject(error);
});
export default instance