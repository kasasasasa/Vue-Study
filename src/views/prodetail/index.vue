<template>
<div class="prodetail">
    <!-- 轮播图 -->
    <el-carousel
      height="375px"
      indicator-position="none"
      arrow="never"
      @change="onChange"
    >
      <el-carousel-item v-for="(img, idx) in (productInfo.images.length ? productInfo.images : images)" :key="idx">
        <img :src="img" class="banner-img" />
      </el-carousel-item>
    </el-carousel>
    <div class="custom-indicator">
      {{ current + 1 }} / {{ productInfo.images.length || images.length }}
    </div>

    <!-- 商品信息 -->
    <div class="info">
      <div class="title">
        <div class="price">
          <span class="now">￥{{ productInfo.price || 0.01 }}</span>
          <span class="oldprice">￥{{ productInfo.oldPrice || 6699.00 }}</span>
        </div>
        <div class="sellcount">已售1001件</div>
      </div>

      <div class="msg text-ellipsis-2">
        {{ productInfo.title || '三星手机 SAMSUNG Galaxy S23 8GB+256GB 超视觉夜拍系统 超清夜景 悠雾紫 5G手机 游戏拍照旗舰机s23' }}
      </div>

      <div class="service">
        <div class="right-icon">
          <i class="el-icon-arrow-right" />
        </div>
      </div>
    </div>
    <!--加入购物车栏-->
    <div class="sku-section">
  <div class="sku-title">颜色</div>
  <div class="sku-options">
    <div
      v-for="color in (productInfo.colors.length ? productInfo.colors : colors)"
      :key="color.name"
      :class="{ active: selectedColor === color.name }"
      @click="selectedColor = color.name"
    >
      <img :src="color.img" />
      <span>{{ color.name }}</span>
    </div>
  </div>

  <div class="sku-title">版本</div>
  <div class="sku-options">
    <div
      v-for="ver in (productInfo.versions.length ? productInfo.versions : versions)"
      :key="ver"
      :class="{ active: selectedVersion === ver }"
      @click="selectedVersion = ver"
    >
      {{ ver }}
    </div>
  </div>

  <div class="selected-summary">
    已选：{{ selectedColor }}·{{ selectedVersion }}
  </div>
  <!--数量选择栏-->
  <div class="quantity-selector">
  <el-button
    size="mini"
    @click="quantity > 1 ? quantity-- : null"
    :disabled="quantity <= 1"
  >
    -
  </el-button>

  <span class="quantity-display">{{ quantity }}</span>

  <el-button size="mini" @click="quantity++">+</el-button>
</div>
    </div>

    <!-- 评价 -->
    <div class="comment">
      <div class="comment-title">
        <div class="left">商品评价 (5条)</div>
        <div class="right">
          查看更多 <i class="el-icon-arrow-right" />
        </div>
      </div>

      <div class="comment-list">
        <div
          class="comment-item"
          v-for="(item, index) in 3"
          :key="index"
        >
          <div class="top">
            <img
              src="http://cba.itlike.com/public/uploads/10001/20230321/a0db9adb2e666a65bc8dd133fbed7834.png"
              class="avatar"
            />
            <div class="name">神雕大侠</div>
            <el-rate v-model="rateValue" disabled text-color="#ff9900" />
          </div>
          <div class="content">质量很不错 挺喜欢的</div>
          <div class="time">2023-03-21 15:01:35</div>
        </div>
      </div>
    </div>

    <!-- 图文详情 -->
    <div class="desc">
      <img
        v-for="(img, idx) in detailPics"
        :key="idx"
        :src="img"
        class="desc-img"
      />
    </div>

    <!-- 底部操作栏 -->
    <div class="footer">
      <div class="icon-item" @click="$router.push('/')">
        <i class="el-icon-s-home" />
        <span>首页</span>
      </div>
      <div class="icon-item" @click="$router.push('/cart')">
        <i class="el-icon-shopping-cart-2" />
        <span>购物车</span>
      </div>
      <el-button type="warning" class="btn-add" @click="addToCart">加入购物车</el-button>
      <el-button type="danger" class="btn-buy" @click="buyNow">立刻购买</el-button>
    </div>
  </div>
</template>

<script>
import { addToCart } from '@/api/cart'
import { createOrder } from '@/api/order'
import { getProductDetail } from '@/api/goods'

export default {
  name: 'ProDetailIndex',
  data () {
    return {
      current: 0,
      quantity: 1,
      productInfo: {
        title: '',
        price: 0,
        oldPrice: 0,
        images: [],
        colors: [],
        versions: []
      },
      images: [
        'https://via.placeholder.com/375x375/409EFF/fff?text=图1',
        'https://via.placeholder.com/375x375/67C23A/fff?text=图2',
        'https://via.placeholder.com/375x375/E6A23C/fff?text=图3'
      ],
      detailPics: [
        'https://uimgproxy.suning.cn/uimg1/sop/commodity/kHgx21fZMWwqirkMhawkAw.jpg',
        'https://uimgproxy.suning.cn/uimg1/sop/commodity/0rRMmncfF0kGjuK5cvLolg.jpg',
        'https://uimgproxy.suning.cn/uimg1/sop/commodity/2P04A4Jn0HKxbKYSHc17kw.jpg',
        'https://uimgproxy.suning.cn/uimg1/sop/commodity/MT4k-mPd0veQXWPPO5yTIw.jpg'
      ],
      rateValue: 5,
      dialogVisible: false,
      selectedColor: '丝绒白',
      selectedVersion: '12GB+256GB',
      colors: [
        { name: '丝绒白', img: 'https://via.placeholder.com/50x50/FFFFFF/000?text=白' },
        { name: '星空黑', img: 'https://via.placeholder.com/50x50/000000/FFF?text=黑' },
        { name: '极光蓝', img: 'https://via.placeholder.com/50x50/0066CC/FFF?text=蓝' }
      ],
      versions: ['8GB+128GB', '8GB+256GB', '12GB+256GB', '12GB+512GB']
    }
  },
  methods: {
    onChange (index) {
      this.current = index
    },

    // 加入购物车
    async addToCart () {
      try {
        const cartData = {
          productId: this.$route.query.id,
          quantity: this.quantity,
          selectedColor: this.selectedColor,
          selectedVersion: this.selectedVersion
        }

        await addToCart(cartData)
        this.$message.success('已添加到购物车')
        this.$router.push('/cart')
      } catch (error) {
        console.error('添加到购物车失败：', error)
        this.$message.error('添加到购物车失败，请重试')
      }
    },

    // 立即购买
    async buyNow () {
      try {
        const orderData = {
          products: [{
            productId: this.$route.query.id,
            quantity: this.quantity,
            selectedColor: this.selectedColor,
            selectedVersion: this.selectedVersion
          }],
          totalAmount: 0.01 * this.quantity // 这里应该根据实际价格计算
        }

        const res = await createOrder(orderData)
        if (res && res.data) {
          this.$message.success('订单创建成功')
          // 跳转到支付页面
          this.$router.push({
            path: '/pay',
            query: {
              orderNo: res.data.orderNo,
              amount: res.data.totalAmount,
              fromCart: 'false'
            }
          })
        }
      } catch (error) {
        console.error('创建订单失败：', error)
        this.$message.error('创建订单失败，请重试')
      }
    }
  },
  async created () {
    // 从路由参数获取商品ID
    const { id } = this.$route.query
    if (id) {
      console.log('商品ID:', id)
      try {
        // 加载商品详情
        const res = await getProductDetail(id)
        if (res && res.data) {
          // 更新商品信息
          const product = res.data
          this.productInfo = {
            title: product.title,
            price: product.price,
            oldPrice: product.oldPrice,
            images: product.images || this.images,
            colors: product.colors || this.colors,
            versions: product.versions || this.versions
          }
        }
      } catch (error) {
        console.error('加载商品详情失败：', error)
        this.$message.error('加载商品详情失败')
      }
    }
  }
}

</script>

<style>
.prodetail {
  max-width: 1100px;
  margin: 20px auto;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  padding: 20px;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
}
.page-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  background: #fff;
}
.banner-img {
  width: 100%;
  height: 375px;
  object-fit: cover;
  border-radius: 12px;
}

.custom-indicator {
  text-align: center;
  margin-top: 8px;
  font-size: 14px;
  color: #666;
}

.info {
  margin-top: 20px;
}

.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.now {
  font-size: 24px;
  color: #4975a1;
  font-weight: bold;
}

.oldprice {
  font-size: 14px;
  color: #999;
  text-decoration: line-through;
  margin-left: 8px;
}

.sellcount {
  font-size: 14px;
  color: #666;
}

.msg {
  margin-top: 10px;
  font-size: 16px;
  color: #333;
  line-height: 1.5;
}

.service {
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #666;
}

.service .left-words span {
  margin-right: 10px;
}

.comment {
  margin-top: 30px;
}

.comment-title {
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #333;
}

.comment-item {
  background: #fafafa;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 10px;
}

.comment-item .top {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
}

.comment-item .avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
}

.comment-item .content {
  margin-top: 6px;
  font-size: 14px;
  color: #333;
}

.comment-item .time {
  margin-top: 4px;
  font-size: 12px;
  color: #999;
}

.top {
  display: flex;
  align-items: center;
}
.avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 8px;
}
.name {
  flex: 1;
  font-size: 14px;
  margin-right: 8px;
}
.content {
  margin: 6px 0;
  font-size: 14px;
  color: #333;
}
.time {
  font-size: 12px;
  color: #999;
}

.desc {
  margin-top: 30px;
}

.desc-img {
  width: 100%;
  border-radius: 8px;
  margin-bottom: 10px;
}

.footer {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 60px;
  background: #fff;
  display: flex;
  align-items: center;
  border-top: 1px solid #eee;
}
.icon-item {
  width: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 12px;
  color: #666;
}
.icon-item i {
  font-size: 20px;
  margin-bottom: 2px;
}
.btn-add {
  flex: 1;
  height: 36px;
  border-radius: 18px;
  margin: 0 6px;
}
.btn-buy {
  flex: 1;
  height: 36px;
  border-radius: 18px;
  margin: 0 6px;
}
.sku-section {
  margin-top: 20px;
}

.sku-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
}

.sku-options {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 15px;
}

.sku-options div {
  padding: 8px 12px;
  border: 1px solid #dcdcdc;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
}

.sku-options div.active {
  border-color: #ff4d4f;
  color: #ff4d4f;
  background: #fff1f0;
}

.selected-summary {
  font-size: 14px;
  color: #666;
  margin-bottom: 15px;
}

.quantity-selector {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 16px;
}

.quantity-display {
  margin: 0 10px;
  width: 40px;
  text-align: center;
}
</style>
