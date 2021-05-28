/* 注意 每次调用$.get() $.post $.ajax()的时候
会优先使用  ajaxPrefilter 这个函数
在这个函数中，可以拿到我们给ajax提供的配置对象 */

$.ajaxPrefilter(function (option) {

    option.url = 'http://api-breakingnews-web.itheima.net' + option.url
    // console.log(option.url);

    //统一为有权限的接口 设置headers请求头
    if (option.url.indexOf('/my/') !== -1) {
        option.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    //无论ajax成功还是失败都会调用 complete回调函数
    option.complete = function (res) {
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            localStorage.removeItem('token')
            location.href = '/login.html'
        }
    }
})