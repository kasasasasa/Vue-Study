<template>
    <div style="margin-top: 15px;">
      <div class="search-bar">
        <!-- 1. 搜索框 -->
        <el-input
          v-model="keyword"
          prefix-icon="el-icon-search"
          placeholder="请输入搜索关键词"
          @keyup.enter.native="handleSearch"
          @focus="showPanel = true"
          @blur="hidePanel"
        />
        <!-- 2. 弹出层：大家都在搜 -->
        <transition name="fade">
          <div v-show="showPanel" class="search-panel">
            <div class="search-history" v-if="history.length">
            <div class="panel-title">
              <span>搜索历史</span>
              <i class="el-icon-delete" @click="clearHistory" />
            </div>
            <div class="history-list">
              <el-tag
                v-for="(h, idx) in history"
                :key="idx"
                size="small"
                closable
                @close="removeHistory(h)"
                @click="handleSearch(h)"
              >
                {{ h }}
              </el-tag>
            </div>
          </div>
            <div class="panel-title">大家都在搜</div>
            <!-- 3. 两行两列网格 -->
            <div class="hot-grid">
              <div
                v-for="(item, idx) in hotList"
                :key="idx"
                class="hot-cell"
                @click="handleSearch(item)"
              >
                <i class="el-icon-search" />
                <span>{{ item }}</span>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <label class="remember-me" style="justify-content: right;">
        <a href="#/login">立即登录</a>
        <a href="#/signup" class="forgot-password">注册账号</a>
      </label>
      <div class="block">
        <span class="demonstration"></span>
        <el-carousel height="150px">
          <el-carousel-item v-for="item in 4" :key="item">
            <h3 class="small">{{ item }}</h3>
          </el-carousel-item>
        </el-carousel>
      </div>
      <el-divider></el-divider>
      <div style="display: flex; justify-content: center;">
        <el-tooltip class="item" effect="dark" content="Top Left 提示文字" placement="top-start">
          <h3>猜你喜欢</h3>
        </el-tooltip>
      </div>
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
import { saveSearchHistory, getSearchHistory, getHotSearch } from '@/api/search'

export default {
  name: 'HomeIndex',
  index: 0,
  list: [
    './src/assets/code.png',
    './images/2.jpg',
    './images/3.jpg',
    './images/4.jpg',
    './images/5.jpg',
    './images/6.jpg'
  ],
  data () {
    return {
      keyword: '',
      showPanel: false,
      history: ['123'], // 搜索历史
      hotList: ['儿童手表', 'watch5', 'nova14', 'fit4', '随身wifi'],
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
    async handleSearch (txt) {
      const word = txt || this.keyword
      if (!word.trim()) return
      this.keyword = word
      this.saveHistory(word)

      try {
        // 保存搜索历史到服务器
        await saveSearchHistory(word)
        console.log('搜索：', word)
        this.showPanel = false
        // 跳转到搜索页面
        this.$router.push({
          path: '/searchlist',
          query: { keyword: word }
        })
      } catch (error) {
        console.error('搜索失败：', error)
        this.$message.error('搜索失败，请重试')
      }
    },

    /* 保存历史（最多 10 条，去重，新记录在前） */
    saveHistory (word) {
      const set = new Set(this.history)
      set.delete(word) // 先删掉旧的
      set.add(word) // 再放到最前
      this.history = [...set].slice(0, 10)
      localStorage.setItem('SEARCH_HISTORY', JSON.stringify(this.history))
    },

    /* 删除/清空历史 */
    removeHistory (word) {
      this.history = this.history.filter(h => h !== word)
      localStorage.setItem('SEARCH_HISTORY', JSON.stringify(this.history))
    },
    clearHistory () {
      this.history = []
      localStorage.removeItem('SEARCH_HISTORY')
    },

    /* 失焦延迟关闭弹层，保证点击 tag 来得及触发 */
    hidePanel () {
      setTimeout(() => (this.showPanel = false), 150)
    },
    // 跳转到商品详情
    goToDetail (item) {
      this.$router.push({
        path: '/prodetail',
        query: { id: item.id }
      })
    },

    async mounted () {
      // 加载搜索历史和热门搜索
      try {
        const [historyRes, hotRes] = await Promise.all([
          getSearchHistory(),
          getHotSearch()
        ])

        if (historyRes && historyRes.data) {
          this.history = historyRes.data
        }

        if (hotRes && hotRes.data) {
          this.hotList = hotRes.data
        }
      } catch (error) {
        console.error('加载搜索数据失败：', error)
        // 如果API失败，使用本地存储的历史记录
        const localHistory = localStorage.getItem('SEARCH_HISTORY')
        if (localHistory) {
          this.history = JSON.parse(localHistory)
        }
      }

      // 监听全局点击
      this._clickOutside = (e) => {
        // 如果点击的不是搜索框，也不是弹层内部，就关闭
        const searchBar = this.$el.querySelector('.search-bar')
        if (searchBar && !searchBar.contains(e.target)) {
          this.showPanel = false
        }
      }
      document.addEventListener('click', this._clickOutside)
    },

    beforeDestroy () {
    // 组件卸载前记得移除监听，防止内存泄漏
      document.removeEventListener('click', this._clickOutside)
    }
  }
}
</script>

<style>
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
  flex: 0 0 calc(25% - 20px); /* 每行4个，减去间距 */
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
</style>
