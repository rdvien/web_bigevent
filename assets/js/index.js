$(function () {
    getUserInfo()

    var layer = layui.layer
    //退出点击事件
    $("#btnLogout").on('click', function () {
        //提示用户是否确认退出
        layer.confirm('确认退出登陆?', { icon: 3, title: '提示' },
            function (index) {
                //点击确定的回调函数
                // localStorage.setItem('token', '')  
                localStorage.removeItem('token')  //清空本地存储
                location.href = '/login.html'
                layer.close(index);
            });
    })
})

//获取用户基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        /* headers: {
            Authorization: localStorage.getItem('token') || ''
        }, */
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取信息失败')
            }
            //渲染用户头像
            renderAvator(res.data)
        },
        //无论成功还是失败都会调用 complete回调函数
        /* complete: function (res) {
            //  console.log('执行了complete');
            // console.log(res); 
            if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
                localStorage.removeItem('token')
                location.href = '/login.html'
            }
        } */

    })
}
//渲染用户头像函数
function renderAvator(user) {
    //获取用户名称
    var name = user.nickname || user.username
    //设置欢迎文本
    $('#welcome').html('欢迎 &nbsp;&nbsp;' + name)
    if (user.user_pic !== null) {
        //渲染图片头像
        $(".layui-nav-img").attr('src', user.user_pic).show()
        $(".text-avatar").hide()
    } else {
        //渲染文本头衔
        $(".layui-nav-img").hide()
        //接受name的第一个字符 并转成大写
        var first = name[0].toUpperCase()
        $(".text-avatar").html(first).show()
    }
}
