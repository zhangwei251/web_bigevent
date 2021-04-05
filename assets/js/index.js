$(function(){
    // 获取用户基本信息函数
    getUserInfo(); 
    //退出登录
    $('#btnLogout').on('click',function(){
    //提示用户是否退出
    layer.confirm('是否退出？', {icon: 3, title:'提示'}, function(index){
        //清除本地存储中的  token
        localStorage.removeItem('token')
        //重新跳转到登录页
        location.href = '/login.html'
        //关闭fonfrim问框
        layer.close(index);
  });
  })
})
 //从layui中获取layer对象
var layer = layui.layer;
    // 获取用户信息
function getUserInfo(){
    $.ajax({
        method : 'GET',
        url : '/my/userinfo',
        //请求头配置对象
        // headers : {
        //     Authorization: localStorage.getItem('token') || ""
        // },
        success:function(res){
           if(res.status !== 0){
               return  layer.msg('获取用户信息失败');
           }
           //渲染用户头像
           renderAvatar(res.data)
        },
        //不论成功还是失败，最终都会调用complete函数回调
        // complete : function(res){
        //     //在complete 回调函数中，可以使用res.response.JSON拿到服务器响应回来的数据
        //     if(res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！'){
        //         //强制情况token
        //         localStorage.removeItem('token')
        //         //跳转到登录页面
        //         location.href = '/login.html'
        //     }
        // }
    })
}
//渲染用户的头像
function  renderAvatar(user){
    //获取用户名称
   var name = user.nickname || user.username
   //渲染用户名称
   $('#welcome').html('欢迎&nbsp;&nbsp;'+name);
   //按需渲染用户头像

   if(user.user_pic !== null){
        // 渲染图片头像
        $('.layui-nav-img').attr('src',user.user_pic).show();
        $('.text-avatar').hide();
   }else{
    //渲染文本头像
    $('.layui-nav-img').hide();
    var first = name[0].toUpperCase();
   $('.text-avatar').html(first).show();
   }
}