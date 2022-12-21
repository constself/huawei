$(function () {
    //顶部广告栏
    $('#top_banner span').click(function () {
        $('#top_banner').hide();
    })

    //顶部下拉菜单
    $('.h_inner').find('.s_down').mouseenter(function () {
        $(this).css('background', '#fff').children('a').css('color', '#cb242b').children('i').removeClass('icon-shangxiajiantou').addClass('icon-shang').parent().siblings('.b').show();
    })
    $('.h_inner').find('.s_down').mouseleave(function () {
        $(this).css({ background: '#2e2828', height: 36 }).children('a').css('color', '#afafaf').children('i').removeClass('icon-shang').addClass('icon-shangxiajiantou').parent().siblings('.b').hide();
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
        $('.h_inner .r_nav>li').eq(0).html(str + "<i class='iconfont icon-shangxiajiantou'></i><span class='bg'></span><div class='sliderDown'>退出登录</div>");
        $(".sliderDown").hide()

    }
    else {
        falg = false;
    }
    $('.h_inner .r_nav>li').eq(0).mouseenter(function () {
        if (falg) {
            $(this).css({ background: '#fff', color: '#ca141d' }).children('i').removeClass('icon-shangxiajiantou').addClass('icon-shang').siblings('div').show();
        }
    })
    $('.h_inner .r_nav>li').eq(0).mouseleave(function () {
        if (falg) {
            $(this).css({ background: '#2e2828', color: '#afafaf' }).children('i').removeClass('icon-shang').addClass('icon-shangxiajiantou').siblings('div').hide();
        }
    })
    // 退出登录
    $('.sliderDown').click(function () {
        falg = false;
        setCookie('username', getCookie('username'), -1);
        let str2 = "<a href='./login.html'>请登录</a> &nbsp;<a href='./register.html'>注册</a><span class='bg'></span>";
        $('.h_inner .r_nav>li').eq(0).html(str2);
        $(".h_inner .r_nav>li").css({ background: '#2e2828', color: '#afafaf' });
    })

    //侧边栏列表渲染
    $.ajax({
        url: '../json/list.json',
        dataType: 'json',
        success: function (res) {
            for (var i = 0; i < 12; i++) {
                $.each(res[i][0], function (index, item) {
                    $('.left_list>ul>li').eq(i).find('ul').eq(0).append(`<li class="subcate-item">
                <a href="#">
                    <img src=${item.src} alt="">
                    <p><span>${item.dec}</span></p>
                </a>
            </li>`)
                })
                $.each(res[i][1], function (index, item) {
                    $('.left_list>ul>li').eq(i).find('ul').eq(1).children('.subcate-btn').before(`<li class="subcate-item">
                <a href="#">
                    <img src=${item.src} alt="">
                    <p><span>${item.dec}</span></p>
                </a>
            </li>`)
                })
            }

        }
    })

    // 切换侧边栏
    $('.left_list>ul>li').mouseenter(function () {
        $(this).children('.pros').show().parent().siblings().children('.pros').hide();
    })

    $('.left_list').mouseleave(function () {
        $(this).find('.pros').hide();
    })

    // 商品详情
    let goodsData = {
        src: "",
        name: "",
        price: "",
        describe: ""
    }

    let productsEl = document.querySelectorAll(".products");

    // 清空本地存储
    // localStorage.clear("goodsInfo");
    for (let index = 0; index < productsEl.length; index++) {
        let itemEl = productsEl[index].querySelectorAll(".item");
        for (let i = 0; i < itemEl.length; i++) {
            itemEl[i].onclick = function () {
                let albumEl = this.querySelector(".album");
                let nameEl = this.querySelector(".name");
                let priceEl = this.querySelector(".price")
                let discountEl = this.querySelector(".discount")
                goodsData.src = albumEl.src;
                goodsData.name = nameEl.textContent;
                goodsData.price = priceEl.textContent
                goodsData.describe = discountEl.textContent

                // 1.将商品数据对象进行序列化
                var dataJSONString = JSON.stringify(goodsData);

                // // 2.将对象存储到localStorage
                localStorage.setItem("goodsInfo", dataJSONString);


                // // 1.将商品数据对象进行序列化
                // var cartJSONString = JSON.stringify(cart_resultList);

                // // // 2.将对象存储到localStorage
                // localStorage.setItem("cartInfo", cartJSONString);

                open("../pages/details.html", (target = "_parent"));

            };
        }
    }

})




//动态添加甄选推荐商品
let recommendGoodsEl = document.querySelector(".recommendGoods")
let remProductsEl = recommendGoodsEl.querySelector(".products")
showResultListAction(recommendGoods_resultList, remProductsEl)

// 动态添加手机专区商品
let repeatGoodsAll = document.querySelectorAll(".repeatGoods")
let phoneProductsEl = repeatGoodsAll[0].querySelector(".products")

showResultListAction(repeatGoods_Phone_resultList, phoneProductsEl)

// 动态添加电脑专区商品
let computerProductsEl = repeatGoodsAll[1].querySelector(".products")
showResultListAction(repeatGoods_computer_resultList, computerProductsEl)

// 动态添加平板专区商品
let flatProductsEl = repeatGoodsAll[2].querySelector(".products")
showResultListAction(repeatGoods_Flat_resultList, flatProductsEl)
// 动态添加穿戴专区商品
let wearProductsEl = repeatGoodsAll[3].querySelector(".products")
showResultListAction(repeatGoods_wear_resultList, wearProductsEl)
// 动态添加精选爆款商品
let selectedProductsEl = repeatGoodsAll[4].querySelector(".products")
showResultListAction(repeatGoods_selected_resultList, selectedProductsEl)

// 动态添加限时秒杀商品
let seckillProductsEl = repeatGoodsAll[5].querySelector(".products")
showResultListAction(repeatGoods_timeseckill_resultList, seckillProductsEl)

// 动态添加华为智选商品
let selectionProductsEl = repeatGoodsAll[6].querySelector(".products")
showResultListAction(repeatGoods_selection_resultList, selectionProductsEl)


// 秒杀倒计时
// 获取元素
let hourEl = seckillProductsEl.querySelector(".hour")
let minuteEl = seckillProductsEl.querySelector(".minute")
let secondEl = seckillProductsEl.querySelector(".second")
//倒计时时间
let endDate = new Date()
endDate.setHours(24)
endDate.setMinutes(0)
endDate.setSeconds(0)
endDate.setMilliseconds(0)

setInterval(() => {
    // 获取倒计时的小时-分钟-秒钟
    let nowDate = new Date()

    let intervalTime = Math.floor((endDate.getTime() - nowDate.getTime()) / 1000)

    let hour = Math.floor(intervalTime / 3600)
    let minute = Math.floor(intervalTime / 60) % 60
    let second = intervalTime % 60
    // 设置时间
    hourEl.textContent = formatPadLeft(hour)
    minuteEl.textContent = formatPadLeft(minute)
    secondEl.textContent = formatPadLeft(second)
}, 1000)


// 回到顶部
var scrollBtnEl = document.querySelector(".scroll-btn")
scrollBtnEl.hidden = true

window.onscroll = function () {
    var scrollY = window.scrollY
    let height = $(".recommendGoods").position().top
    if (scrollY > height) {
        scrollBtnEl.hidden = false
    } else {
        scrollBtnEl.hidden = true
    }
}
// 回到顶部
scrollBtnEl.onclick = function () {
    window.scrollTo(0, 0)
}
