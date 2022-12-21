//顶部下拉菜单
$('.h_inner').find('.s_down').mouseenter(function () {
    $(this).css('background', '#fff').children('a').css('color', '#cb242b').children('i').removeClass('icon-shangxiajiantou').addClass('icon-shang').parent().siblings('.b').show();
})
$('.h_inner').find('.s_down').mouseleave(function () {
    $(this).css({ background: '#2e2828', height: 36 }).children('a').css('color', '#afafaf').children('i').removeClass('icon-shang').addClass('icon-shangxiajiantou').parent().siblings('.b').hide();
})




// 商品信息
// 获取元素
let goodsImgEl = document.querySelector(".goodsImg")
let goodsImgTwoEl = document.querySelector(".goodsImgTwo")
let currentImg = document.querySelectorAll(".current img")
let proName = document.querySelector(".pro-name")
let priceEl = document.querySelector("#price")
let describeEl = document.querySelector(".product-slogan span")
let numEl = document.querySelector("#num")
// 从本地存储取出
let item = localStorage.getItem("goodsInfo")
let price = priceEl.textContent.substring(1)
// 反序列化
let newGoodsDate = JSON.parse(item)
goodsImgEl.src = newGoodsDate.src;
goodsImgTwoEl.src = newGoodsDate.src;
currentImg[0].src = newGoodsDate.src;
currentImg[1].src = newGoodsDate.src;
proName.textContent = newGoodsDate.name;
price = newGoodsDate.price;
describeEl.textContent = newGoodsDate.describe


//图片轮换显示
var index = 0;
var next = $('.img_nav').children('.right');
var prev = $('.img_nav').children('.left');
next.click(function () {
    index++;
    if (index > 2) {
        index = 2;
        return;
    }
    $('.warp>ul').animate({ left: -index * ($('.warp>ul>li').width() + 10) });
})
prev.click(function () {
    index--;
    if (index < 0) {
        index = 0;
        return;
    }
    $('.warp>ul').animate({ left: -index * ($('.warp>ul>li').width() + 10) });
})
var urlArr = [`${goodsImgEl.src}`,
    'https://res.vmallres.com/pimages//uomcdn/CN/pms/202211/gbom/6941487284009/428_428_C6CB7EAD9AE111244B2F046EFBDCFA11mp.png',
    'https://res.vmallres.com/pimages//uomcdn/CN/pms/202211/gbom/6941487284009/group//428_428_DBE14D4CDAD183CEE11C8CD5FD34F655.jpg',
    'https://res.vmallres.com/pimages//uomcdn/CN/pms/202211/gbom/6941487284009/group//428_428_D344057EB05CCF4624C26AE356D09B4C.jpg',
    'https://res.vmallres.com/pimages//uomcdn/CN/pms/202211/gbom/6941487284009/group//428_428_0F97DF3B4EAD900EC09E6DEE639703F1.jpg',
    'https://res.vmallres.com/pimages//uomcdn/CN/pms/202211/gbom/6941487284009/group//428_428_448D522D8837EFA01D6E3474F3EDC949.jpg',
    'https://res.vmallres.com/pimages//uomcdn/CN/pms/202211/gbom/6941487284009/group//428_428_4EC2BEFECB2831046FEB4E026954ED4A.jpg']
$('.warp>ul>li').mouseenter(function () {
    $(this).addClass('current').siblings().removeClass('current');
    $('.goodsImg').prop('src', urlArr[$(this).index()]);
})


// 登录跳转
let sum = 1
let flag = true

$('.btn').click(function () {
    if (flag) {
        location.href = '../pages/login.html';
    } else {
        $('.model p ').text(proName.textContent + '添加购物车成功！')
        $('.model').show()
        $('.bigMask').show();

        // 1.判断本地存储是否有商品数据
        let cartItem2 = localStorage.getItem("cartInfo")
        if (!cartItem2) {
            cart_resultList.push({
                "ImgUrl": goodsImgTwoEl.src,
                "Title": proName.textContent,
                "Detail": describeEl.textContent,
                "Price": priceEl.textContent,
                "Count": numEl.value

            },)
            // 1.将商品数据对象进行序列化
            let cartJSONString = JSON.stringify(cart_resultList);

            // // 2.将对象存储到localStorage
            localStorage.setItem("cartInfo", cartJSONString);

        }
        else {
            let cartItem = localStorage.getItem("cartInfo")
            let newCartItem = JSON.parse(cartItem)
            newCartItem.push({
                "ImgUrl": goodsImgTwoEl.src,
                "Title": proName.textContent,
                "Detail": describeEl.textContent,
                "Price": priceEl.textContent,
                "Count": numEl.value
            },)
            // 1.将商品数据对象进行序列化
            let cartJSONString = JSON.stringify(newCartItem);

            // // 2.将对象存储到localStorage
            localStorage.setItem("cartInfo", cartJSONString);

        }

    }
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
if (getCookie("username")) {
    $('.btn').text('加入购物车');
    flag = false;
}
let isFalg = false;

if (getCookie("username")) {
    isFalg = true
    var str = getCookie("username").substring(0, 2) + '*****';
    $('.h_inner .r_nav>li').eq(0).html(str + "<i class='iconfont icon-shangxiajiantou'></i><span class='bg'></span><div class='sliderDown'>退出登录</div>");
    $(".sliderDown").hide()

}
else {
    isFalg = false;
}
$('.h_inner .r_nav>li').eq(0).mouseenter(function () {
    if (isFalg) {
        $(this).css({ background: '#fff', color: '#ca141d' }).children('i').removeClass('icon-shangxiajiantou').addClass('icon-shang').siblings('div').show();
    }
})
$('.h_inner .r_nav>li').eq(0).mouseleave(function () {
    if (isFalg) {
        $(this).css({ background: '#2e2828', color: '#afafaf' }).children('i').removeClass('icon-shang').addClass('icon-shangxiajiantou').siblings('div').hide();
    }
})
// 退出登录
$('.sliderDown').click(function () {
    isFalg = false;
    setCookie('username', getCookie('username'), -1);
    let str2 = "<a href='./login.html'>请登录</a> &nbsp;<a href='./register.html'>注册</a><span class='bg'></span>";
    $('.btn').text('立即登录');
    flag = true
    $('.h_inner .r_nav>li').eq(0).html(str2);
    $(".h_inner .r_nav>li").css({ background: '#2e2828', color: '#afafaf' });
})


//商品数量调整
$('.add').click(function () {
    var num = parseInt($('#num').val()) + 1;
    $('#num').val(num);
})
$('.cut').click(function () {
    var num = parseInt($('#num').val()) - 1;
    if (num < 1) {
        $('#num').val(1);
    } else {
        $('#num').val(num);
    }
})

//弹出框
$('.m_title>span').click(function () {
    $('.model').hide();
    $('.bigMask').hide();
})
$('.look').click(function () {
    $('.model').hide();
    $('.bigMask').hide();
})
$('.go').click(function () {
    location.href = './cart.html';
})
// 底部
$('.product-tab a').hover(function () {
    $(this).addClass('current').siblings().removeClass('current');
})