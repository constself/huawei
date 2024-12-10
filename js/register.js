$(function () {
    // 输入框效果
    $('.tel_num').children('input').focus(function () {
        $(this).parent().css({
            borderColor: '#007dff',
            caretColor: '#007dff'
        })
    })
    $('.tel_num').children('input').blur(function () {
        $(this).parent().css({
            borderColor: 'transparent',
            caretColor: '#007dff'
        })
    })
    // 验证码
    let vCode = null
    let userAccountReg = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/

    $('.tel_num').children('input').on('input', function () {
        let value = $('.tel_num').children('input').val()
        if (userAccountReg.test(value)) {
            $("#note").next().css({
                opacity: 1
            })
        } else {
            $("#note").next().css({
                opacity: 0.38
            })
        }
    })

    $("#note").next().click(function () {
        vCode = generateCode(6)
        alert(vCode)
    })

    $('#note').focus(function () {
        $(this).css({
            borderColor: '#007dff',
            caretColor: '#007dff'
        })

    })
    let checkVcode = null
    let iscodeFalg = false
    $('#note').blur(function () {
        $(this).css({
            borderColor: 'transparent',
            caretColor: '#007dff'
        }),
            $("#note").next().css({
                opacity: 0.38
            })
        // 校验验证码
        checkVcode = localStorage.getItem("code")
        if ($('#note').val() === checkVcode) {
            iscodeFalg = true
        }
    })

    $('#password').focus(function () {
        $(this).css({
            borderColor: '#007dff',
            caretColor: '#007dff'
        })
    })
    $('#password').blur(function () {
        $(this).css({
            borderColor: 'transparent',
            caretColor: '#007dff'
        })
        if ($('#note').val() !== checkVcode) {
            iscodeFalg = false
        }
    })

    $('#checkPassword').focus(function () {
        $(this).css({
            borderColor: '#007dff',
            caretColor: '#007dff'
        })
    })
    $('#checkPassword').blur(function () {
        $(this).css({
            borderColor: 'transparent',
            caretColor: '#007dff'
        })
        if ($('#note').val() !== checkVcode) {
            iscodeFalg = false
        }
    })
    $('#password').on('input', function () {
        // alert(111)
        if ($(this).val()) {
            $(this).next().css('color', '#000');
        } else {
            $(this).next().css('color', '#999');
        }
    })
    $('#checkPassword').on('input', function () {
        // alert(111)
        if ($(this).val()) {
            $(this).next().css('color', '#000');
        } else {
            $(this).next().css('color', '#999');
        }
    })
    // 显示密码
    let isFalgpw = true;
    $('#password').next().click(function () {
        if (isFalgpw) {
            isFalgpw = false;
            $(this).toggleClass('icon-zhengyan').prev().prop('type', 'text');
        } else {
            isFalgpw = true;
            $(this).toggleClass('icon-zhengyan').prev().prop('type', 'password');
        }
    })

    let isFalgcpw = true;
    $('#checkPassword').next().click(function () {
        if (isFalgcpw) {
            isFalgcpw = false;
            $(this).toggleClass('icon-zhengyan').prev().prop('type', 'text');
        } else {
            isFalgcpw = true;
            $(this).toggleClass('icon-zhengyan').prev().prop('type', 'password');
        }
    })

    //注册
    $('#username').on('blur', function () {
        deng();
    })
    $('#password').on('blur', function () {
        deng();
    })
    $('#note').on('blur', function () {
        deng();
        if ($(this).val() !== checkVcode) {
            $('.btn').css('opacity', 0.38);
            index = 0;
        }
        else {
            index = 1;
        }
    })
    $('#checkPassword').on('blur', function () {
        deng();
        $('.error').hide();
        $(this).blur(function () {
            if ($(this).val()) {
                if ($(this).val() !== $('#password').val()) {
                    index = 0;
                    $('.error').show();
                    $(this).css({
                        borderColor: 'red'
                    })
                }
                else {
                    index = 1;
                }
            }
        })
    })
    // 校验密码
    let index = 0;
    function deng() {
        if (userAccountReg.test($('#username').val()) && $('#password').val() && $('#checkPassword').val() && $('#note').val() && iscodeFalg) {
            $('.btn').css('opacity', 1);
            index = 1;
        } else {
            $('.btn').css('opacity', 0.38);
            index = 0;
        }
    }
    $('.btn').click(function () {
        if (index) {
            // $.ajax({
            //     url: "http://124.222.220.114:9010/server/user/register",
            //     method: "POST",
            //     dataType: 'json',
            //     data: {
            //         userAccount: $('#username').val(),
            //         userPassword: $('#password').val(),
            //         checkPassword: $("#checkPassword").val()
            //     },
            //     success: function (res) {
            //         if (res.code == 200) {
            //             location.href = './login.html';
            //         }
            //         else {
            //             alert(res.msg)
            //         }
            //     }

            // })
            const userInfo = {}
            // 读取本地存储
            userInfo.username = $('#username').val()
            userInfo.password = $('#password').val()
            let infoJSONString = JSON.stringify(userInfo)
            localStorage.setItem("userInfo", infoJSONString)
            location.href = './login.html';
        } else {
            alert("您输入的信息有误")
        }
    })

})