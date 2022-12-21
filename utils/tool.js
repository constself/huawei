// 封装了工具函数


// 补全时间
function formatPadLeft(content, count, padStr) {
  count = count || 2
  padStr = padStr || "0"

  content = String(content)
  return content.padStart(count, padStr)
}


// 资源服务器的地址
let serverURL = "https://warehouse-1309123434.cos.ap-chengdu.myqcloud.com"
// 添加商品函数
function showResultListAction(commodityData, commodityLocation) {
  for (let index = 0; index < commodityData.length; index++) {
    // 获取每一条数据
    const resultItem = commodityData[index];
    // 将一条数据转化成界面的一个item
    let itemEl = document.createElement("li")
    itemEl.classList.add("item")
    // item里面的内容
    let servicesString = ''
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
          
            </a>
    `
    // <div  class="comment" >
    //           <span>${resultItem.rateCount}人评论</span>
    //           <span>${resultItem.goodRate}% 好评</span>
    //       </div >
    commodityLocation.append(itemEl)
  }
}

// 验证码
function generateCode(n) {
  var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
    'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  var res = "";
  for (var i = 0; i < n; i++) {
    var id = Math.floor(Math.random() * 36);
    res += chars[id];
  }
  localStorage.setItem("code", res)
  return res;
}

