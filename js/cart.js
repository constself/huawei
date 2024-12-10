//顶部下拉菜单
$('.h_inner').find('.s_down').mouseover(function () {
    $(this).css('background', '#fff').children('a').css('color', '#cb242b').children('i').removeClass('icon-shangxiajiantou').addClass('icon-shang').parent().siblings('.b').show();
})
$('.h_inner').find('.s_down').mouseout(function () {
    $(this).css({ background: '#f5f5f5', height: 36 }).children('a').css('color', '#a4a4a4').children('i').removeClass('icon-shang').addClass('icon-shangxiajiantou').parent().siblings('.b').hide();
})
// 登录显示
// 从Cookie拿到登录用户
function getCookie(key) {
    str = ""
    let tmp = document.cookie.split(";")
    for (let index = 0; index < tmp.length; index++) {
        const element = tmp[index].split("=");
        if (element[0] === key) {
            str = element[1]
        }
    }
    return str;
}

// 设置Cookie过期
function setCookie(key, value, expires) {
    if (expires) {
        var time = new Date();
        time.setTime(time.getTime() - 8 * 60 * 60 * 1000);
        document.cookie = key + "=" + value + ";expires=" + time;
    } else {
        document.cookie = key + "=" + value;
    }
}
let falg = false;
if (getCookie("username")) {
    falg = true
    var str = getCookie("username").substring(0, 2) + '*****';
    showProducts()
    $('.h_inner .r_nav>li').eq(0).html(str + "<i class='iconfont icon-shangxiajiantou'></i><span class='bg'></span><div class='sliderDown'>退出登录</div>");
    $(".sliderDown").hide()

    // 购物车为空
    let cartItem2 = localStorage.getItem("cartInfo")
    if (!cartItem2) {
        console.log(1)
        $('.products').hide().siblings('.empty').show();
        $('.empty p').text('您的购物车是空的哦~').next().prop("href", "../pages/index.html").text('去添加')
    }

}
else {
    falg = false;
    $('.products').hide().siblings('.empty').show();
    $('.empty p').text('您没有登录哦~').next().prop("href", "../pages/login.html").text('去登录')

}
$('.h_inner .r_nav>li').eq(0).mouseenter(function () {
    if (falg) {
        $(this).css({ background: '#fff', color: '#ca141d' }).children('i').removeClass('icon-shangxiajiantou').addClass('icon-shang').siblings('div').show();
    }
})
$('.h_inner .r_nav>li').eq(0).mouseleave(function () {
    if (falg) {
        $(this).css({ background: '#f5f5f5', color: '#afafaf' }).children('i').removeClass('icon-shang').addClass('icon-shangxiajiantou').siblings('div').hide();
    }
})
// 退出登录
$('.sliderDown').click(function () {
    falg = false;
    setCookie('username', getCookie('username'), -1);
    let str2 = "<a href='./login.html'>请登录</a> &nbsp;<a href='./register.html'>注册</a><span class='bg'></span>";
    $('.h_inner .r_nav>li').eq(0).html(str2);
    $(".h_inner .r_nav>li").css({ background: '#f5f5f5', color: '#afafaf' });

    $('.products').hide().siblings('.empty').show();
    $('.empty p').text('您没有登录哦~').next().prop("href", "../pages/login.html").text('去登录')
})

// 渲染购物车商品
function showProducts() {
    // 本地存储商品数据
    let cartItem = localStorage.getItem("cartInfo")
    let newCartItem = JSON.parse(cartItem)

    $.each(newCartItem, function (index, item) {
        var pristr = (item.Count * item.Price);
        $('.pro-warp').append(`<div class="pro-list">
                <div class="pro-list-left">
                    <span class="checkThis "></span>
                </div>
                <div class="pro-main">
                    <div class="pro-img">
                        <a href="#">
                            <img src=${item.ImgUrl} alt="">
                        </a>
                    </div>
                    <ul class="clearfix">
                        <li style="width: 450px;">
                            <a href="#" class="pro-title">${item.Title}</a>
                            <p class="pro-info">${item.Detail}</p>
                            <div class="p-label">
                                <span>分期免息</span>
                            </div>
                        </li>
                        <li style="width: 140px;margin-left: 10px;margin-right: -20px;">
                            <div class="pro-price">
                                <span>￥ ${item.Price}</span>
                            </div>
                        </li>
                        <li style="width: 100px;margin-left: 30px;">
                            <div class="pro-stock">
                                <input type="number" id="num" value="${item.Count}">
                                <span class="stock-btn">
                                    <a href="javascript:;" class="cut">−</a>
                                    <a href="javascript:;" class="add">+</a>
                                </span>
                            </div>
                        </li>
                        <li class="pro-total" style="margin-left: 30px;width: 100px;">￥ ${pristr}</li>
                            
                        
                        <li style="margin-left: 30px;width: 100px;">
                            <a href="javascript:;" class="pro-del">删除</a>
                        </li>
                    </ul>
                </div>
            </div>`);

        if ($('.pro-warp .pro-list').length == 0) {
            $('.products').hide().siblings('.empty').show();
        } else {
            $('.products').show().siblings('.empty').hide();
            getSum();
        }

    })
}


//购物车商品操作
//全选模块
var checked = true;
// var checkedNum = 999;
$('.checkAll').click(function () {
    if (checked) {//未选中
        checked = false;
        $('.checkAll').removeClass('checked');
        $('.checkThis').removeClass('checked');
        // checkedNum=0;
    } else {//选中
        checked = true;
        $('.checkAll').addClass('checked');
        $('.checkThis').addClass('checked');
        checkedNum = $('.checkThis').length;
    }
    getSum();
})
$('.pro-warp').on('click', '.checkThis', function () {
    $(this).toggleClass('checked');
    if ($(this).parents('.pro-warp').find('.checked').length == $(this).parents('.pro-warp').find('.checkThis').length) {
        $('.checkAll').addClass('checked');
        checked = true;
    } else {
        $('.checkAll').removeClass('checked');
        checked = false;
    }
    getSum();
})


//数量小计模块
//加
$('.pro-warp').on('click', '.add', function () {
    var num = parseInt($(this).parent().prev().val());
    num++;
    $(this).parent().prev().val(num);
    //获取单价，去掉￥符号
    var p = $(this).parents('li').prev().find('span').html().substring(1);
    // console.log(p)
    //小计 = 单价 * 数量
    var price = (p * num).toFixed(2);
    $(this).parents('li').next().html('￥' + price);
    //调用函数实时修改总量和总价
    getSum();

})
//减
$('.pro-warp').on('click', '.cut', function () {
    var num = parseInt($(this).parent().prev().val());
    num--;
    if (num < 1) {
        num = 1;
    }
    $(this).parent().prev().val(num);
    //获取单价，去掉￥符号
    var p = $(this).parents('li').prev().find('span').html().substring(1);
    // console.log(p)
    //小计 = 单价 * 数量
    var price = (p * num).toFixed(2);
    $(this).parents('li').next().html('￥' + price);
    //调用函数实时修改总量和总价
    getSum();

})
//输入
//直接输入修改数量时，小计里的值相应的改变
$('.pro-warp').on('blur', '#num', function () {
    if (!$(this).val()) {
        $(this).val(1);
    }
    if ($(this).val() < 1) {
        $(this).val(1);
    }
    var num = parseInt($(this).val());
    //获取单价，去掉￥符号
    var p = $(this).parents('li').prev().find('span').html().substring(1);
    // console.log(p)
    //小计 = 单价 * 数量
    var price = (p * num).toFixed(2);
    $(this).parents('li').next().html('￥' + price);
    //调用函数实时修改总量和总价
    getSum();

})

//<--删除模块-->
//1.点击操作栏下的删除时，当前商品消失
//2.点击底部删除按钮时，所有商品清空
$('.pro-warp').on('click', '.pro-del', function () {
    $(this).parents('.pro-list').remove();
    if ($('.pro-warp').find('.checked').length == $('.pro-warp').find('.checkThis').length) {
        $('.checkAll').addClass('checked');
        checked = true;
    } else {
        $('.checkAll').removeClass('checked');
        checked = false;
    }
    getSum();  //更新总量和总价

})

//点击清理购物车时，所有商品清空
$('.del').click(function () {
    $('.pro-list').remove();
    getSum();//更新总量和总价
    $('.products').hide().siblings('.empty').show();
    // 清空购物车本地存储  
    window.localStorage.removeItem("cartInfo")
})



//获取总价
function getSum() {
    // 设置总计
    var numSum = 0;

    $('.pro-warp').find('.checked').parent().next().find('#num').each(function (index, ele) {
        numSum += parseInt($(ele).val());
    })
    $('.number').html(numSum);
    //设置总价
    var priceSum = 0;
    $('.pro-warp').find('.checked').parent().next().find('.pro-total').each(function (index, ele) {
        priceSum += parseInt($(ele).html().substring(1));
    })
    $('.total-price').html('￥' + ' ' + priceSum.toFixed(2));
    // console.log(priceSum);
}