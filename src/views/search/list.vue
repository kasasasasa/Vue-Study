<template>
  <div>
    <el-input
      v-model="keyword"
      prefix-icon="el-icon-search"
      placeholder="请输入搜索关键词"
      @keyup.enter.native="handleSearch"
      @focus="showPanel = true"
      @blur="hidePanel"
    />

    <!-- 1. 排序 / 筛选条 -->
        <div class="result-order" style="display: flex; justify-content: center;">
        <el-row type="flex" justify="space-between" align="middle">
            <!-- 1.1 排序 -->
            <div class="order-list">
            <el-radio-group v-model="orderBy" size="medium">
                <el-radio-button label="default">综合</el-radio-button>
                <el-radio-button label="sales">销量</el-radio-button>
                <el-radio-button label="price" @click.native.prevent="togglePriceOrder">
                  价格
                  <i v-if="priceOrder === 'asc'" class="el-icon-caret-top arrow active"/>
                  <i v-else class="el-icon-caret-bottom arrow active"/>
                </el-radio-button>
            </el-radio-group>
            </div>
        </el-row>
        </div>

    <!-- 商品列表 -->
    <div class="goods-list-container">
      <div
        class="goods-item"
        v-for="item in goods"
        :key="item.id"
      >
        <el-card :body-style="{ padding: '0px' }" shadow="hover" @click.native="goToDetail(item)">
          <img :src="item.img" class="image" />
          <div class="title">{{ item.title }}</div>
          <div class="price">
            <span class="now">¥{{ item.price }}</span>
            <span class="old">¥{{ item.oldPrice }}</span>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import { searchProducts } from '@/api/search'

export default {
  name: 'SearchListIndex',
  data () {
    return {
      keyword: '', // 搜索关键词
      address: '北京 北京市',
      addressKey: '',
      filterList: [],
      page: 1,
      total: 40,
      orderBy: 'default', // 当前排序字段
      priceOrder: 'desc', // 价格排序方向：asc(升序)/desc(降序)
      goods: [
        {
          id: 13143,
          title: '巨省电 1.5匹新一级能效 小米空调',
          price: 1999,
          oldPrice: 2499,
          img:
      'https://cdn.cnbj1.fds.api.mi-img.com/nr-pub/202506251716_b022b657c6bc88191817d8adf5196108.png ',
          url: '//www.mi.com/shop/buy?product_id=1204700007&cfrom=search'
        },
        {
          id: 21028,
          title: '巨省电Pro 1.5匹超一级能效 米家空调',
          price: 2799,
          oldPrice: 2999,
          img:
      'https://cdn.cnbj1.fds.api.mi-img.com/nr-pub/202506251733_f6a69593820c0ee9cb2e1650195732bc.png ',
          url: '//www.mi.com/shop/buy?product_id=1230803607&cfrom=search'
        },
        {
          id: 21163,
          title: '新风Pro 人感双出风 立式3匹超一级能效 米家空调',
          price: 8999,
          oldPrice: 9999,
          img:
      'https://cdn.cnbj1.fds.api.mi-img.com/nr-pub/202506251736_48507dea7dda193a9a14ac9ba87a2103.png ',
          url: '//www.mi.com/shop/buy?product_id=1230803798&cfrom=search'
        },
        {
          id: 22001,
          title: '米家智能自清洁 1.5匹新一级能效 变频空调',
          price: 2299,
          oldPrice: 2699,
          img:
      'https://cdn.cnbj1.fds.api.mi-img.com/nr-pub/202507121530_a1b2c3d4e5f6789012345678.png ',
          url: '//www.mi.com/shop/buy?product_id=1240801201&cfrom=search'
        },
        {
          id: 22105,
          title: '米家柔风Pro 大1匹新一级能效 壁挂式空调',
          price: 1899,
          oldPrice: 2299,
          img:
      'https://cdn.cnbj1.fds.api.mi-img.com/nr-pub/202507121545_b2c3d4e5f67890123456789.png ',
          url: '//www.mi.com/shop/buy?product_id=1240801305&cfrom=search'
        },
        {
          id: 22234,
          title: '小米新风空调 大1.5匹新一级能效 变频冷暖',
          price: 3199,
          oldPrice: 3699,
          img:
      'https://cdn.cnbj1.fds.api.mi-img.com/nr-pub/202507121600_c3d4e5f678901234567890.png ',
          url: '//www.mi.com/shop/buy?product_id=1240801409&cfrom=search'
        },
        {
          id: 22378,
          title: '米家立式空调 2匹新一级能效 客厅变频冷暖',
          price: 4599,
          oldPrice: 4999,
          img:
      'https://cdn.cnbj1.fds.api.mi-img.com/nr-pub/202507121615_d4e5f6789012345678901.png ',
          url: '//www.mi.com/shop/buy?product_id=1240801512&cfrom=search'
        },
        {
          id: 22410,
          title: '小米空调Pro 3匹超一级能效 圆柱立柜式',
          price: 6999,
          oldPrice: 7999,
          img:
      'https://cdn.cnbj1.fds.api.mi-img.com/nr-pub/202507121630_e5f67890123456789012.png ',
          url: '//www.mi.com/shop/buy?product_id=1240801623&cfrom=search'
        },
        {
          id: 22555,
          title: '米家智能除菌 1.5匹新一级能效 变频壁挂空调',
          price: 2599,
          oldPrice: 2999,
          img:
      'https://cdn.cnbj1.fds.api.mi-img.com/nr-pub/202507121645_f678901234567890123.png ',
          url: '//www.mi.com/shop/buy?product_id=1240801734&cfrom=search'
        },
        {
          id: 22690,
          title: '小米巨省电Max 3匹新一级能效 立柜式空调',
          price: 5999,
          oldPrice: 6599,
          img:
      'https://cdn.cnbj1.fds.api.mi-img.com/nr-pub/202507121700_789012345678901234.png ',
          url: '//www.mi.com/shop/buy?product_id=1240801845&cfrom=search'
        },
        {
          id: 22734,
          title: '米家睡眠空调 大1匹新一级能效 超静音变频',
          price: 2099,
          oldPrice: 2499,
          img:
      'https://cdn.cnbj1.fds.api.mi-img.com/nr-pub/202507121715_890123456789012345.png ',
          url: '//www.mi.com/shop/buy?product_id=1240801956&cfrom=search'
        },
        {
          id: 22801,
          title: '小米智能温湿双控 2匹新一级能效 变频空调',
          price: 3899,
          oldPrice: 4299,
          img:
      'https://cdn.cnbj1.fds.api.mi-img.com/nr-pub/202507121730_901234567890123456.png ',
          url: '//www.mi.com/shop/buy?product_id=1240802067&cfrom=search'
        },
        {
          id: 22950,
          title: '米家双导风板 1.5匹新一级能效 智能空调',
          price: 2399,
          oldPrice: 2799,
          img:
      'https://cdn.cnbj1.fds.api.mi-img.com/nr-pub/202507121745_012345678901234567.png ',
          url: '//www.mi.com/shop/buy?product_id=1240802178&cfrom=search'
        },
        {
          id: 23077,
          title: '小米新风Pro 2匹超一级能效 变频冷暖空调',
          price: 5199,
          oldPrice: 5799,
          img:
      'https://cdn.cnbj1.fds.api.mi-img.com/nr-pub/202507121800_123456789012345678.png ',
          url: '//www.mi.com/shop/buy?product_id=1240802289&cfrom=search'
        },
        {
          id: 23122,
          title: '米家节能星 大1.5匹新一级能效 变频空调',
          price: 2199,
          oldPrice: 2599,
          img:
      'https://cdn.cnbj1.fds.api.mi-img.com/nr-pub/202507121815_234567890123456789.png ',
          url: '//www.mi.com/shop/buy?product_id=1240802390&cfrom=search'
        }
      ]
    }
  },
  methods: {
    togglePriceOrder () {
      if (this.orderBy !== 'price') {
        this.orderBy = 'price'
        this.priceOrder = 'desc'
      } else {
        this.priceOrder = this.priceOrder === 'asc' ? 'desc' : 'asc'
      }
      this.loadDataWithSorting()
    },

    async loadDataWithSorting () {
      const params = {
        keyword: this.keyword,
        page: this.page,
        pageSize: 20,
        sortField: this.orderBy,
        sortOrder: this.orderBy === 'price' ? this.priceOrder : null
      }

      try {
        const res = await searchProducts(params)
        if (res && res.data) {
          this.goods = res.data.list || []
          this.total = res.data.total || 0
        }
      } catch (error) {
        console.error('加载数据失败：', error)
        this.$message.error('加载数据失败，请重试')
      }
    },
    // 跳转到商品详情
    goToDetail (item) {
      this.$router.push({
        path: '/prodetail',
        query: { id: item.id }
      })
    },

    // 处理搜索
    async handleSearch () {
      if (this.keyword.trim()) {
        try {
          const params = {
            keyword: this.keyword,
            page: this.page,
            pageSize: 20,
            sortField: this.orderBy,
            sortOrder: this.orderBy === 'price' ? this.priceOrder : null
          }

          const res = await searchProducts(params)
          if (res && res.data) {
            this.goods = res.data.list || []
            this.total = res.data.total || 0
          }
          console.log('搜索关键词:', this.keyword)
        } catch (error) {
          console.error('搜索失败：', error)
          this.$message.error('搜索失败，请重试')
        }
      }
    },

    // 隐藏面板
    hidePanel () {
      // 延迟隐藏，避免点击搜索按钮时立即隐藏
      setTimeout(() => {
        // 这里可以添加隐藏搜索历史的逻辑
      }, 200)
    }
  },

  created () {
    // 从路由参数获取搜索关键词
    const { keyword } = this.$route.query
    if (keyword) {
      this.keyword = keyword
      // 自动执行搜索
      this.handleSearch()
    }
  }
}
</script>

<style>
.search-result {
  max-width: 1226px;
  margin: 20px auto;
  padding: 0 15px;
}

/* 排序条 */
.result-order {
  padding: 12px 20px;
  background: #fff;
  border: 1px solid #fff;
  margin-bottom: 20px;
}
.order-list {
  margin-right: auto;
}
.arrow {
  margin-left: 2px;
}
.address-choose {
  cursor: pointer;
  font-size: 14px;
  color: #666;
}
.address-info {
  color: #ff6700;
  margin-left: 6px;
}
.example {
  font-size: 12px;
  color: #999;
  margin-top: 6px;
}
.my-address {
  margin-top: 10px;
  font-size: 12px;
}
.type-list {
  margin-top: 12px;
}
.type-list .el-checkbox {
  margin-right: 20px;
}

/* 商品卡片 */
.goods-list-container {
  max-width: 1260px; /* 增加宽度容纳间隙 */
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 确保每行4列 */
  gap: 20px; /* 统一间隙 */
  padding: 0 15px; /* 添加两侧内边距 */
  box-sizing: border-box;
}
.goods-item {
  width: 100%; /* 填满网格单元格 */
  box-sizing: border-box;
}
.image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}
.title {
  padding: 0 10px;
  margin-top: 6px;
  font-size: 14px;
  color: #333;
  height: 40px;
  overflow: hidden;
}
.price {
  padding: 0 10px 10px;
}
.now {
  font-size: 16px;
  color: #ff6700;
  margin-right: 6px;
}
.old {
  font-size: 12px;
  color: #b0b0b0;
  text-decoration: line-through;
}
.flags {
  padding: 0 10px 10px;
}
.pagination {
  text-align: center;
  margin-top: 30px;
}
.arrow {
  margin-left: 3px;
  font-size: 12px;
  color: #c0c4cc; /* 默认灰色 */
}
.arrow.active {
  color: #409EFF; /* 激活时蓝色 */
}
</style>
