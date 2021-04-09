$(function(){
    var form =layui.form;
    var layer = layui.layer
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ],
          samepwd:function(value){
              if(value === $('[name=oldpwd]').val()){
                  return '新旧密码不能一样'
              }
          },
          repwd:function(value){
              if($("[name=newpwd]").val() !== value){
                return '两次密码输入不一致'
              }
          }
    })

    $('.layui-form').on('submit',function(e){
        e.preventDefault();
        console.log($(this).serialize());
        $.ajax({
            method : 'POST',
            url:'/my/updatepwd',
            data:$(this).serialize(),
            success : function(res){
                if(res.status !== 0){
                    return layer.msg('密码重置失败'); 
                }
                layer.msg('密码重置成功')
                $('.layui-form')[0].reset();
            }
        })
    })
})