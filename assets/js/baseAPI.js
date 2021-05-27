/* 注意 每次调用$.get() $.post $.ajax()的时候
会优先使用  ajaxPrefilter 这个函数
在这个函数中，可以拿到我们给ajax提供的配置对象 */

$.ajaxPrefilter(function (option) {

    option.url = 'http://api-breakingnews-web.itheima.net' + option.url
    console.log(option.url);
})