<template>
    <div>
  <div id="app">
    <div class="cart-container">
      <div class="cart-header">
        <div class="cart-header-item">
          <div class="checkbox-wrapper">
            <input type="checkbox" v-model="selectAll" @change="toggleSelectAll">
            <span class="checkbox-inner"></span>
          </div>
        </div>
        <div class="cart-header-item">商品信息</div>
        <div class="cart-header-item">单价</div>
        <div class="cart-header-item">数量</div>
        <div class="cart-header-item">操作</div>
      </div>

      <div v-if="cartItems.length > 0">
        <div class="cart-item" v-for="(item, index) in cartItems" :key="item.id">
          <div class="item-checkbox">
            <div class="checkbox-wrapper">
              <input type="checkbox" v-model="item.selected" @change="updateSelectAll">
              <span class="checkbox-inner"></span>
            </div>
          </div>

          <div class="item-info">
            <div class="item-image">
              <img :src="item.image" :alt="item.name">
              <div class="image-mask"></div>
            </div>
            <div class="item-details">
              <div class="item-title">{{ item.name }}</div>
              <div class="item-sku">颜色分类：{{ item.spec }}</div>
            </div>
          </div>

          <div class="item-price">
            <div class="current-price">¥{{ item.price.toFixed(2) }}</div>
            <div class="original-price">¥{{ (item.price * 2).toFixed(2) }}</div>
          </div>

          <div class="item-quantity">
            <div class="quantity-control">
              <button class="quantity-btn" :disabled="item.quantity <= 1" @click="updateQuantity(index, -1)">-</button>
              <input class="quantity-input" type="number" min="1" v-model.number="item.quantity" @change="validateQuantity(index)">
              <button class="quantity-btn" @click="updateQuantity(index, 1)">+</button>
            </div>
          </div>

          <div class="item-actions">
            <div class="action-btn" @click="removeItem(index)">
              <i class="far fa-trash-alt"></i> 删除
            </div>
          </div>
        </div>
      </div>

      <div class="empty-cart" v-else>
        <div class="empty-icon">
          <i class="fas fa-shopping-cart"></i>
        </div>
        <div class="empty-text">您的购物车还是空的，快去挑选商品吧~</div>
        <button class="continue-btn" @click="addSampleItems">继续购物</button>
      </div>
    </div>

    <div class="cart-footer" v-if="cartItems.length > 0">
      <div class="footer-left">
        <div class="checkbox-wrapper">
          <input type="checkbox" v-model="selectAll" @change="toggleSelectAll">
          <span class="checkbox-inner"></span>
        </div>
        <div class="delete-btn" @click="removeSelected">
          <i class="far fa-trash-alt"></i> 全选
        </div>
      </div>

      <div class="footer-right">
        <div class="cart-summary">
          <div class="summary-text">已选</div>
          <div class="summary-value">{{ selectedCount }}</div>
          <div class="summary-text">件</div>
        </div>

        <div class="total-price">
          <div class="total-label">合计:</div>
          <div class="total-amount">¥{{ totalAmount.toFixed(2) }}</div>
        </div>

        <button class="checkout-btn" :disabled="selectedCount === 0" @click="checkout">结算</button>
      </div>
    </div>
  </div>

    </div>
</template>

<script>
import { getCartList, updateCartQuantity, removeFromCart, batchRemoveFromCart, toggleCartAllSelection } from '@/api/cart'

export default {
  name: 'CartIndex',
  data () {
    return {
      cartItems: [],
      selectAll: false
    }
  },
  computed: {
    selectedCount () {
      return this.cartItems.filter(item => item.selected).length
    },
    totalAmount () {
      return this.cartItems
        .filter(item => item.selected)
        .reduce((total, item) => total + (item.price * item.quantity), 0)
    }
  },
  methods: {
    async loadCartData () {
      try {
        const res = await getCartList()
        if (res && res.data) {
          this.cartItems = res.data.map(item => ({
            ...item,
            selected: false
          }))
        }
      } catch (error) {
        console.error('加载购物车失败：', error)
        this.$message.error('加载购物车失败')
        // 如果API失败，使用示例数据
        this.addSampleItems()
      }
    },

    addSampleItems () {
      this.cartItems = [
        {
          id: 1,
          name: '金百达银爵8/16/32GB DDR4 2666/3200/3600/4000台式机内存条长鑫',
          image: 'https://gw.alicdn.com/imgextra/i2/2211071357863/O1CN01HpiHr327xJF9q7JoM_!!2211071357863.jpg',
          price: 179.00,
          quantity: 1,
          spec: '银爵【2666】16G',
          tags: ['信用卡支付', '3期免息', '满1件5折', '假一赔四', '极速退款'],
          selected: true
        },
        {
          id: 2,
          name: '三星980 PRO NVMe M.2 SSD固态硬盘 1TB PCIe4.0',
          image: 'https://gw.alicdn.com/imgextra/i1/2208322909590/O1CN01m7kP4X1z8f3cS9Q2z_!!2208322909590.jpg',
          price: 799.00,
          quantity: 1,
          spec: '1TB',
          tags: ['12期免息', '满减优惠', '7天无理由退换'],
          selected: true
        },
        {
          id: 3,
          name: '罗技G502 HERO 游戏鼠标 有线电竞 RGB',
          image: 'https://gw.alicdn.com/imgextra/i4/210910611/O1CN01jE6kLc1GNXgS5JYlG_!!210910611.jpg',
          price: 299.00,
          quantity: 2,
          spec: '黑色',
          tags: ['优惠券', '顺丰包邮', '30天价保'],
          selected: false
        }
      ]
    },
    async updateQuantity (index, change) {
      const newQuantity = this.cartItems[index].quantity + change
      if (newQuantity >= 1) {
        this.cartItems[index].quantity = newQuantity

        try {
          await updateCartQuantity({
            productId: this.cartItems[index].id,
            quantity: newQuantity
          })
        } catch (error) {
          console.error('更新数量失败：', error)
          this.$message.error('更新数量失败')
        }
      }
    },
    validateQuantity (index) {
      if (this.cartItems[index].quantity < 1) {
        this.cartItems[index].quantity = 1
      }
    },
    async removeItem (index) {
      try {
        await removeFromCart(this.cartItems[index].id)
        this.cartItems.splice(index, 1)
        this.updateSelectAll()
        this.$message.success('删除成功')
      } catch (error) {
        console.error('删除失败：', error)
        this.$message.error('删除失败')
      }
    },
    async removeSelected () {
      const selectedIds = this.cartItems.filter(item => item.selected).map(item => item.id)
      if (selectedIds.length === 0) {
        this.$message.warning('请选择要删除的商品')
        return
      }

      try {
        await batchRemoveFromCart(selectedIds)
        this.cartItems = this.cartItems.filter(item => !item.selected)
        this.updateSelectAll()
        this.$message.success('删除成功')
      } catch (error) {
        console.error('删除失败：', error)
        this.$message.error('删除失败')
      }
    },
    async toggleSelectAll () {
      this.cartItems.forEach(item => {
        item.selected = this.selectAll
      })

      try {
        await toggleCartAllSelection(this.selectAll)
      } catch (error) {
        console.error('全选操作失败：', error)
      }
    },
    updateSelectAll () {
      this.selectAll = this.cartItems.length > 0 &&
                          this.cartItems.every(item => item.selected)
    },
    checkout () {
      if (this.selectedCount === 0) {
        this.$message.warning('请选择要结算的商品')
        return
      }

      // 获取选中的商品信息
      const selectedItems = this.cartItems.filter(item => item.selected)
      const totalAmount = selectedItems.reduce((total, item) => total + (item.price * item.quantity), 0)

      // 跳转到支付页面
      this.$router.push({
        path: '/pay',
        query: {
          orderNo: 'CART' + Date.now(),
          amount: '￥' + totalAmount.toFixed(2),
          fromCart: 'true'
        }
      })
    }
  },

  mounted () {
    this.loadCartData()
  }
}
</script>

<style>
 * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
    }

    .cart-container {
      background-color: #ffffff;
      color: #333;
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .header {
      display: flex;
      align-items: center;
      padding: 20px 0;
      border-bottom: 1px solid #eee;
      margin-bottom: 20px;
    }

    .cart-title {
      font-size: 20px;
      font-weight: 600;
      position: relative;
    }

    .cart-content {
      background: #fff;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
      overflow: hidden;
    }

    .cart-header {
      display: flex;
      padding: 16px 20px;
      background: #fafafa;
      border-bottom: 1px solid #eee;
      font-size: 14px;
      color: #666;
    }

    .cart-header-item {
      display: flex;
      align-items: center;
    }

    .cart-header-item:first-child {
      width: 60px;
    }

    .cart-header-item:nth-child(2) {
      flex: 3;
    }

    .cart-header-item:nth-child(3) {
      flex: 2;
    }

    .cart-header-item:nth-child(4) {
      width: 150px;
      justify-content: center;
    }

    .cart-header-item:last-child {
      width: 120px;
      justify-content: center;
    }

    .cart-item {
      display: flex;
      padding: 20px;
      border-bottom: 1px solid #eee;
      transition: all 0.3s ease;
    }

    .cart-item:hover {
      background-color: #fefaf7;
    }

    .item-checkbox {
      width: 60px;
      display: flex;
      align-items: center;
    }

    .checkbox-wrapper {
      position: relative;
      cursor: pointer;
    }

    .checkbox-wrapper input[type="checkbox"] {
      opacity: 0;
      position: absolute;
      width: 16px;
      height: 16px;
      cursor: pointer;
      z-index: 1;
    }

    .checkbox-inner {
      display: inline-block;
      width: 16px;
      height: 16px;
      border: 1px solid #d9d9d9;
      border-radius: 2px;
      background-color: #fff;
      position: relative;
      transition: all 0.3s;
    }

    .checkbox-wrapper input[type="checkbox"]:checked + .checkbox-inner {
      background-color: #4975a1;
      border-color: #4975a1;
    }

    .checkbox-wrapper input[type="checkbox"]:checked + .checkbox-inner:after {
      content: '';
      position: absolute;
      left: 4px;
      top: 1px;
      width: 5px;
      height: 8px;
      border: solid white;
      border-width: 0 2px 2px 0;
      transform: rotate(45deg);
    }

    .item-info {
      flex: 3;
      display: flex;
    }

    .item-image {
      width: 100px;
      height: 100px;
      border-radius: 4px;
      overflow: hidden;
      position: relative;
      margin-right: 15px;
      background: #f7f7f7;
    }

    .item-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .image-mask {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 30px;
      background: linear-gradient(transparent, rgba(0,0,0,0.1));
    }

    .item-details {
      flex: 1;
    }

    .item-title {
      font-size: 14px;
      font-weight: 500;
      margin-bottom: 8px;
      line-height: 1.4;
      color: #333;
      cursor: pointer;
    }

    .item-title:hover {
      color: #4975a1;
    }

    .item-sku {
      font-size: 12px;
      color: #999;
      margin-bottom: 8px;
    }

    .item-tags {
      margin-bottom: 10px;
    }

    .benefit-tag {
      display: inline-block;
      padding: 3px 6px;
      background: #fff0e8;
      color: #4975a1;
      border-radius: 2px;
      font-size: 12px;
      margin-right: 5px;
      margin-bottom: 5px;
    }

    .item-price {
      flex: 2;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .current-price {
      color: #4975a1;
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 5px;
    }

    .original-price {
      color: #999;
      font-size: 14px;
      text-decoration: line-through;
    }

    .item-quantity {
      width: 150px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .quantity-control {
      display: flex;
      align-items: center;
      border: 1px solid #e0e0e0;
      border-radius: 4px;
      overflow: hidden;
      height: 32px;
    }

    .quantity-btn {
      width: 32px;
      height: 100%;
      background: #f8f8f8;
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-size: 16px;
      color: #666;
    }

    .quantity-btn:disabled {
      color: #ccc;
      cursor: not-allowed;
    }

    .quantity-input {
      width: 40px;
      height: 100%;
      border: none;
      text-align: center;
      font-size: 14px;
      border-left: 1px solid #e0e0e0;
      border-right: 1px solid #e0e0e0;
    }

    .item-actions {
      width: 120px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }

    .action-btn {
      color: #666;
      font-size: 14px;
      cursor: pointer;
      transition: color 0.2s;
      padding: 5px 0;
      width: 100%;
      text-align: center;
    }

    .action-btn:hover {
      color: #4975a1;
      background: #fafafa;
    }

    .empty-cart {
      text-align: center;
      padding: 80px 0;
      background: #fff;
      border-radius: 8px;
    }

    .empty-icon {
      font-size: 80px;
      color: #e0e0e0;
      margin-bottom: 20px;
    }

    .empty-text {
      font-size: 18px;
      color: #999;
      margin-bottom: 30px;
    }

    .continue-btn {
      background: #4975a1;
      color: white;
      border: none;
      border-radius: 4px;
      padding: 10px 40px;
      font-size: 16px;
      cursor: pointer;
      transition: background 0.3s;
    }

    .continue-btn:hover {
      background: #475669;
    }

    .cart-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px;
      background: #fff;
      margin-top: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    }

    .footer-left {
      display: flex;
      align-items: center;
    }

    .footer-left .checkbox-wrapper {
      margin-right: 20px;
    }

    .delete-btn {
      color: #666;
      cursor: pointer;
      font-size: 14px;
    }

    .delete-btn:hover {
      color: #4975a1;
    }

    .footer-right {
      display: flex;
      align-items: center;
    }

    .total-price {
      display: flex;
      align-items: center;
      margin-right: 30px;
    }

    .total-label {
      font-size: 14px;
      color: #666;
      margin-right: 10px;
    }

    .total-amount {
      color: #4975a1;
      font-size: 24px;
      font-weight: bold;
    }

    .checkout-btn {
      background: #4975a1;
      color: white;
      border: none;
      border-radius: 4px;
      padding: 12px 40px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.3s;
    }

    .checkout-btn:hover {
      background: #475669;
    }

    .checkout-btn:disabled {
      background: #cccccc;
      cursor: not-allowed;
    }

    .cart-summary {
      display: flex;
      align-items: center;
      margin-right: 30px;
    }

    .summary-text {
      font-size: 14px;
      color: #666;
      margin-right: 10px;
    }

    .summary-value {
      color: #4975a1;
      font-weight: 600;
    }

    @media (max-width: 768px) {
      .cart-container {
        padding: 10px;
      }

      .cart-header {
        display: none;
      }

      .cart-item {
        flex-wrap: wrap;
        position: relative;
        padding: 15px;
      }

      .item-checkbox {
        position: absolute;
        top: 15px;
        left: 15px;
      }

      .item-info {
        width: 100%;
        margin-left: 30px;
        margin-bottom: 15px;
      }

      .item-price {
        flex: 1;
        align-items: flex-start;
      }

      .item-quantity {
        width: auto;
        flex: 1;
        justify-content: flex-start;
      }

      .item-actions {
        position: absolute;
        top: 15px;
        right: 15px;
        flex-direction: row;
        width: auto;
      }

      .action-btn {
        padding: 5px;
        width: auto;
        margin-left: 10px;
      }

      .cart-footer {
        flex-direction: column;
        align-items: stretch;
      }

      .footer-left {
        margin-bottom: 20px;
        justify-content: space-between;
      }

      .footer-right {
        flex-direction: column;
        align-items: stretch;
      }

      .total-price {
        margin-right: 0;
        margin-bottom: 20px;
        justify-content: space-between;
      }

      .checkout-btn {
        width: 100%;
      }
    }
</style>
