
let bannersCount = banners.length
// 动态添加轮播图
let bannerEl = document.querySelector("#banner")
let imagesEl = bannerEl.querySelector(".images")
for (let index = 0; index < banners.length; index++) {
    const banner = banners[index];

    let itemEl = document.createElement("li")
    itemEl.classList.add("item")

    if (index === 0) {
        itemEl.classList.add("active")
    }
    imagesEl.append(itemEl)

    // 设置itemEl的样式(left)
    // itemEl.style.left = `${index * 100}%`
    // 创建img元素
    let imgEl = document.createElement("img")
    imgEl.src = `${banner.imgUrl}`
    itemEl.append(imgEl)
}

// 动态添加指示器
var indicatorEl = document.querySelector(".indicator")
for (let index = 0; index < bannersCount; index++) {
    let itemEl = document.createElement("div")
    itemEl.classList.add("item")
    if (index === 0) {
        itemEl.classList.add("active")
    }
    indicatorEl.append(itemEl)
    // 监听指示器的点击
    itemEl.index = index
    itemEl.onclick = function () {
        prevIndex = currentIndex
        currentIndex = this.index
        switchBannerItem()
    }

}

// 监听按钮的点击
let prevIndex = 0
let currentIndex = 0
let controlEl = document.querySelector(".control")
let prevBtnEl = controlEl.querySelector(".icon-button-prev")
let nextBtnEl = controlEl.querySelector(".icon-button-next")
// 点击上一个
prevBtnEl.onclick = () => {
    prevIndex = currentIndex
    currentIndex--
    if (currentIndex === -1) {
        currentIndex = bannersCount - 1
    }
    switchBannerItem()
}

// 点击下一个
nextBtnEl.onclick = () => {
    nextSwitch()
}

let timer = null
startTimer()

// 鼠标进入关闭定时器
bannerEl.onmouseenter = function () {
    stopTimer()
}
// 鼠标离开开启定时器
bannerEl.onmouseleave = function () {
    startTimer()
}


// 封装函数

function switchBannerItem() {
    // 图片切换
    let cuurrentItem = imagesEl.children[currentIndex]
    let prevItem = imagesEl.children[prevIndex]
    prevItem.classList.remove("active")
    cuurrentItem.classList.add("active")
    // imagesEl.style.transform = `translateX(${-currentIndex * 100}%)`


    // 指示器切换
    let cuurrentIndicatorItem = indicatorEl.children[currentIndex]
    let prevIndicatorItem = indicatorEl.children[prevIndex]
    prevIndicatorItem.classList.remove("active")
    cuurrentIndicatorItem.classList.add("active")
}
// 切换下一个
function nextSwitch() {
    prevIndex = currentIndex
    currentIndex++
    if (currentIndex === bannersCount) {
        currentIndex = 0
    }
    switchBannerItem()
};
// 开启定时器
function startTimer() {
    timer = setInterval(() => {
        nextSwitch()
    }, 3000)
}
// 关闭定时器
function stopTimer() {
    clearInterval(timer)
}




