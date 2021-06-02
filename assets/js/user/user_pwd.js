$(function () {
    var form = layui.form

    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        samePwd: function (value) {
            var oldPwd = $("#pwd_form [name = oldPwd]").val()
            if (value === oldPwd) {
                return '新密码与旧密码不能相同';
            }
        },
        rePwd: function (value) {
            if (value !== $('[name = newPwd]').val()) {
                return '新密码两次不相同';
            }
        }
    })


    $(".layui-form").on('submit', function (e) {
        e.preventDefault();//阻止表单默认时间
        console.log($(this).serialize());
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),

            success: function (res) {
                if (res.status !== 0) {
                    console.log(res);
                    return layui.layer.msg('失败');

                }

                layui.layer.msg('成功');
                $(".layui-form")[0].reset()
                // $("#resetBtn").click();  重置表单的两种方法


            }
        })
    })
})