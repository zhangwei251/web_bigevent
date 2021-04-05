//每次调用$.get()或$.post()或$.ajax()的时候
//会调用ajaxPrefilter这个函数
//在这个函数中，可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter(function(options){
    
    //发起真正的ajax之前同意拼接url字符串地址
    options.url = 'http://ajax.frontend.itheima.net'+ options.url;

    //统一为有权限的接口设置headers请求头
    if(options.url.indexOf('/my') !== -1){
        options.headers = {
            Authorization: localStorage.getItem('token') || ""
        }
    }

    //全局挂载complete 回调函数
     options.complete =function(res){
          //在complete 回调函数中，可以使用res.response.JSON拿到服务器响应回来的数据
          if(res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！'){
            //强制情况token
            localStorage.removeItem('token')
            //跳转到登录页面
            location.href = '/login.html'
        }
        
     }
    
})