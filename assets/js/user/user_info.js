
//在首页 点了 基本资料 按键  a标签对应href地址 打开user_info 之后运行该js






$(function () {
    var form = layui.form
    var layer = layui.layer
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称必须在1~6个字符之间'
            }
        }
    })
    initUserInfo()
    //初始化用户的基本资料
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败')
                }
                console.log(res);
                form.val('formUserInfo', res.data)
            }
        })
    }

    //重置表单的数据
    $("#btnReset").on('click', function (e) {
        e.preventDefault();//阻止表单默认时间
        initUserInfo()
    })

    $(".layui-form").on('submit', function (e) {
        e.preventDefault();//阻止表单默认时间
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新用户信息失败')
                }
                layer.msg('更新用户信息成功')
                //调用父页面的函数方法，重新渲染用户头像和信息
                // console.log(res);  这个res只有发送信息成功 这个信息
                window.parent.getUserInfo()
            }
        })

    })

})