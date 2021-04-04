$(function(){
    //点击"去注册账户"的链接
   $('#link_reg').on('click',function(){
    $('.login-box').hide();
    $('.reg-box').show();
   });


    //点击"去登录"的链接
    $('#link_login').on('click',function(){
        $('.login-box').show();
        $('.reg-box').hide();
    });

    //密码的校验
    //从layui中获取form对象
    var form  = layui.form;
    //通过form.verify()自定义校验规则
    form.verify({
        // 自定义密码pwd校验规则e
        pwd:[
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ] ,
          //教研两次密码是否一致的规则
          repwd:function(value){
            //形参拿到的是确认密码的值
            //还需要拿到密码框内容
            //然后进行一次等于判断
            //如果判断失败,则return一个提示消息即可
           var pwd = $('.reg-box [name=password]').val();
           if(pwd !== value){
               return '两次密码不一致';
           }
          }
    });

    //从layui中获取layer对象
    var layer = layui.layer;
    //监听注册表单的提交事件
    $('#form_reg').on('submit',function(e){
        //阻止默认提交行为
        e.preventDefault();
        // 发起ajax请求POST
        var data = {
            username : $('#form_reg [name=username]').val(),
            password : $('#form_reg [name=password]').val()
        };
        $.post('api/reguser',data,function(res){
            if(res.status !== 0){
                return layer.msg('用户名被占用，请更换其他用户名');
            }
            layer.msg('注册成功请登录');
            //登录成功自动跳转
            $('#link_login').click();
        }
        )   
    });
     // 监听登录表单的提交事件
  $('#form_login').submit(function(e) {
    // 阻止默认提交行为
    e.preventDefault()
    $.ajax({
      url: '/api/login',
      method: 'POST',
      // 快速获取表单中的数据
      data: $(this).serialize(),
      success: function(res) {
        if (res.status !== 0) {
            console.log(res);
          return layer.msg('登录失败！')
        }
        layer.msg('登录成功！')
        // 将登录成功得到的 token 字符串，保存到 localStorage 中
        localStorage.setItem('token', res.token)
        // 跳转到后台主页
        location.href = '/index.html'
      }
    })
  })
})