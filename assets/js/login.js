$(function () {
    //注册和登陆的切换
    $("#link_reg").on("click", function () {
        $(".login-box").hide()
        $(".reg-box").show()
    })
    $("#link_login").on("click", function () {
        $(".login-box").show()
        $(".reg-box").hide()
    })



    //从layui 中获取form对象
    var form = layui.form
    var layer = layui.layer
    //通过form.verify()函数自定义校验规则
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        //校验两次密码
        repwd: function (value) {
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致'
            }
        }
    })



    //监听注册表单提交事件
    $("#form_reg").on('submit', function (e) {
        //阻止默认提交行文
        e.preventDefault()
        var data = { username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val() }
        $.post('/api/reguser', data, function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            layer.msg('注册成功');
            $("#link_login").click();
        })
    })

    //监听登陆表单事件
    $("#reg_login").on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('登陆失败')
                }
                layer.msg('登陆成功')
                console.log(res.token);
                //将登陆成功得到的 token字符串 保存到localStorage中
                localStorage.setItem('token', res.token)
                //跳转到主界面
                location.href = '/index.html'
            }
        })
    })
})

