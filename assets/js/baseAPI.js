//每次调用$.get()或$.post()或$.ajax()的时候
//会调用ajaxPrefilter这个函数
//在这个函数中，可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter(function(options){
    
    //发起真正的ajax之前同意拼接url字符串地址
    options.url = 'http://ajax.frontend.itheima.net'+ options.url;
    console.log(options.url);
})