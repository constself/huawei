// 资源服务器的地址
let serverURL = "https://warehouse-1309123434.cos.ap-chengdu.myqcloud.com"

//渲染商品列表
let productsEl = document.querySelector(".products")


// 服务优惠的赛选
let operationEl = document.querySelector(".operation")
let discountEl = operationEl.querySelector(".discount")

// 记录用户选中的服务
let discountFilters = []
for (let i = 1; i < discountEl.children.length; i++) {
    let discountItemEl = discountEl.children[i]
    // 监听discountItemEl点击
    discountItemEl.onclick = function () {
        this.classList.toggle("active")

        // 判断是否将关键字添加或从discountFilters移除
        if (this.classList.contains("active")) {
            discountFilters.push(this.textContent.trim())
        } else {
            let filterItem = this.textContent.trim()
            let filterIndex = discountFilters.filter(function (item) {
                return item === filterItem
            })
            discountFilters.splice(filterIndex, 1)
        }


        filterResultListAction()
    }
}

// 监听排序功能

let sortEl = document.querySelector(".sort")
let activeItemEl = sortEl.querySelector(".active")

for (let index = 0; index < sortEl.children.length; index++) {
    const sortItemEl = sortEl.children[index];
    sortItemEl.index = index

    sortItemEl.onclick = function () {
        activeItemEl.classList.remove("active")
        this.classList.add("active")
        activeItemEl = this

        let sortKey = this.dataset.key

        sortResultListAction(sortKey)
    }
}

// 封装函数

// 过滤computer_resultList数据
let showResultList = computer_resultList
function filterResultListAction() {
    // 过滤数据
    showResultList = computer_resultList.filter(function (item) {
        let isFlag = true
        for (let filterItem of discountFilters) {
            if (!item.services.includes(filterItem)) {
                isFlag = false
                break;
            }
        }
        return isFlag
    })

    // 重新展示数据
    showResultListAction()
}

// 添加商品函数
showResultListAction()
function showResultListAction() {
    productsEl.innerHTML = " "
    for (let index = 0; index < showResultList.length; index++) {

        // 获取每一条数据
        let resultItem = showResultList[index];

        // 将一条数据转化成界面的一个item
        let itemEl = document.createElement("li")
        itemEl.classList.add("item")

        // item里面的内容
        let servicesString = ""
        for (let label of resultItem.promoLabels) {
            servicesString += ` <span class="tip">${label}</span>`
        }
        itemEl.innerHTML = `
        <a href="JavaScript:;">
              <img
                class="album"
                src="${serverURL}${resultItem.photoPath}${resultItem.photoName}"
                alt=""
              />
              <div class="name">${resultItem.name}</div>
              <div class="discount">${resultItem.promotionInfo}</div>
              <div class="price">¥${resultItem.price}</div>
              <div class="service">
                ${servicesString}
              </div>
            <div class="comment">
                <span>${resultItem.rateCount}人评论</span>
                <span>${resultItem.goodRate}% 好评</span>
            </div>
            </a>
    `
        console.log(showResultList.length)
        productsEl.append(itemEl)
    }
    // 添加空的item
    addProductsEmptyItem()
}


// 通过key进行排序
function sortResultListAction(key) {
    if (key === "default") {
        filterResultListAction()
    } else {
        showResultList.sort(function (item1, item2) {
            return item2[key] - item1[key]
        })
    }
    showResultListAction()
}

// 空item
function addProductsEmptyItem() {
    for (var i = 0; i < 3; i++) {
        var itemEl = document.createElement("li")
        itemEl.classList.add("item")
        itemEl.classList.add("empty")
        productsEl.append(itemEl)
    }
}




