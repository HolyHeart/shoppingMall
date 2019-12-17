import {request} from "./request"

export function getDetailData(iid) {  //获取详情页数据
  return request({
    url: "/detail",
    params: {
      iid
    }
  }) 
}

export function getRecommend() {
  return request({
    url: "/recommend"
  })
}

export class GoodsInfo {  //此处是将请求的详情页数据根据子组件需要展示的信息
  // 做一个抽离并放在一个对象中，再传给子组件
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title;
    this.desc = itemInfo.desc;
    this.newPrice = itemInfo.price;
    this.oldPrice = itemInfo.oldPrice;
    this.discount = itemInfo.discountDesc;
    this.columns = columns;
    this.services = services;
    this.realPrice = itemInfo.lowNowPrice;
  }
}

export class Shop {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.fans = shopInfo.cFans;
    this.sells = shopInfo.cSells;
    this.score = shopInfo.score;
    this.goodsCount = shopInfo.cGoods;
  }
}

export class GoodsParam {
  constructor(info, rule) {
    this.image = info.images ? info.images[0] : "";
    this.infos = info.set;
    this.sizes = rule.tables;
  }
}