import axios from "axios"

//最佳回调方式
export function request(config) {
    // 1.创建axios的实例
    const instance = axios.create({
      baseURL: "http://106.54.54.237:8000/api/v1",
      // baseURL: "http://123.207.32.32:8000/api/v2",
      timeout: 4000
    })

    //2.axios的拦截器(此处只是对axios的实例进行拦截，也可以对axios的全局进行拦截)
    // 2.1请求拦截
    instance.interceptors.request.use(  
      config => {
      return config  //如果进行拦截，此处也必须进行返回
      },err => {
      }
    )

    // 2.2响应拦截
    instance.interceptors.response.use(  
      res => { // 响应成功
        // console.log(res)
        return res.data  //此处拦截响应之后必须返回res，否则main.js中回调不到，此处只需要res中的data，所以只返回了data
      },
      err => {// 响应失败(当用户传入的url错误)
        console.log(err)
      }
    )
  
    // 3.发送真正的网络请求
    return instance(config)  //instance本身就会返回Promise，因此没有必要再新建一个
  }
