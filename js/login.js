$(function () {
    //输入框效果
    $('#username').focus(function () {
        $(this).css({
            borderColor: '#007dff',
            caretColor: '#007dff'
        })
    })
    $('#username').blur(function () {
        $(this).css({
            borderColor: '#fff',
            caretColor: '#007dff'
        })
    })
    $('#password').focus(function () {
        $(this).css({
            borderColor: '#007dff',
            caretColor: '#007dff'
        })
    })
    $('#password').blur(function () {
        $(this).css({
            borderColor: '#fff',
            caretColor: '#007dff'
        })
    })

    $('#password').on('blur', function () {
        if ($(this).val()) {
            $(this).next().css('color', '#000');
            $('.error').hide();
            deng();
        } else {
            $(this).next().css('color', '#999');
            deng();
        }
        $(this).blur(function () {
            if (!$(this).val()) {
                $('.error').show();
            } else {
                $('.error').hide();
            }
        })
    })

    let flag = true;
    $('#password').next().click(function () {
        if (flag) {
            flag = false;
            $(this).toggleClass('icon-zhengyan').prev().prop('type', 'text');
        } else {
            flag = true;
            $(this).toggleClass('icon-zhengyan').prev().prop('type', 'password');
        }
    })
    let index = 0;
    function deng() {
        if ($('#username').val() && $('#password').val()) {
            $('.btn').css('opacity', 1);
            index = 1;
        } else {
            $('.btn').css('opacity', 0.38);
            index = 0;
        }
    }


    $('.btn').click(function () {
        if (index) {
            $.ajax({
                url: "http://124.222.220.114:9010/server/user/login",
                method: 'POST',
                dataType: 'json',
                data: {
                    userAccount: $('#username').val(),
                    userPassword: $('#password').val()
                },
                success: function (res) {
                    if (res.code == 200) {
                        document.cookie = 'username=' + $('#username').val();
                        location.href = './mall.html';
                    } else if (res.code !== 200) {
                        alert('登陆失败，帐号或密码错误，请重新登录');
                        $('#username').val('');
                        $('#password').val('');
                        deng()
                    }
                }
            })

            // 登录信息存到本地存储
            // let userInfo = localStorage.getItem("userInfo")
            // let noUserInfo = JSON.parse(userInfo)
            // if (noUserInfo.username === $('#username').val() && noUserInfo.password === $('#password').val()) {
            //     document.cookie = "username=" + $("#username").val()
            //     location.href = './mall.html';
            // }
            // else if ($('#username').val() === "admin" && $('#password').val() === "123456") {
            //     location.href = './mall.html';
            // }
            // else {
            //     alert('登陆失败，帐号或密码错误，请重新登录');
            //     $('#username').val('');
            //     $('#password').val('');
            // }
            console.log(document.cookie)
        }
    })

})