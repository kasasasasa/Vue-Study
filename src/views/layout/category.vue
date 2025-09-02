<template>
  <div class="category-page">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
    </el-breadcrumb>

    <el-row :gutter="20">
      <!-- 左侧分类树 -->
      <el-col :span="5">
        <el-input placeholder="搜索分类" v-model="treeKeyword" size="small" clearable/>
        <el-tree
          ref="tree"
          :data="treeData"
          :props="{ label: 'name', children: 'children' }"
          node-key="id"
          :highlight-current="true"
          :default-expanded-keys="defaultExpanded"
          :filter-node-method="filterNode"
          @node-click="handleNodeClick"
          style="margin-top:10px"
        />
      </el-col>

      <!-- 右侧商品区 -->
      <el-col :span="19">
        <el-row :gutter="15">
          <el-col :xs="12" :sm="8" :md="6" v-for="g in goods" :key="g.id">
            <el-card :body-style="{padding:'0'}" shadow="hover" class="g-card" @click.native="goToDetail(g)">
              <img :src="g.img" class="img"/>
              <div class="g-info">
                <p class="title">{{ g.name }}</p>
                <p class="price">¥{{ g.price }}</p>
              </div>
            </el-card>
          </el-col>
        </el-row>

        <!-- 分页 -->
        <el-pagination
          background
          layout="prev, pager, next"
          :total="total"
          :page-size="pageSize"
          :current-page.sync="page"
          @current-change="loadGoods"
          style="text-align:center;margin:20px 0"
        />
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'CategoryIndex',
  props: { id: { type: String, default: '' } }, // 当前分类 id
  data () {
    return {
      treeKeyword: '',
      treeData: [
        {
          id: 1,
          name: '手机数码',
          children: [
            { id: 11, name: '手机' },
            { id: 12, name: '平板电脑' },
            { id: 13, name: '笔记本电脑' },
            { id: 14, name: '智能手表' }
          ]
        },
        {
          id: 2,
          name: '家用电器',
          children: [
            { id: 21, name: '空调' },
            { id: 22, name: '冰箱' },
            { id: 23, name: '洗衣机' },
            { id: 24, name: '电视' }
          ]
        },
        {
          id: 3,
          name: '服装鞋帽',
          children: [
            { id: 31, name: '男装' },
            { id: 32, name: '女装' },
            { id: 33, name: '童装' },
            { id: 34, name: '运动鞋' }
          ]
        },
        {
          id: 4,
          name: '食品生鲜',
          children: [
            { id: 41, name: '水果' },
            { id: 42, name: '蔬菜' },
            { id: 43, name: '肉类' },
            { id: 44, name: '海鲜' }
          ]
        }
      ],
      defaultExpanded: [1], // 高亮与展开
      breadcrumbs: [{ id: 1, name: '手机数码' }],
      goods: [
        {
          id: 1,
          name: '小米13 Ultra 5G手机',
          price: 5999,
          img: 'https://cdn.cnbj1.fds.api.mi-img.com/nr-pub/202506251716_b022b657c6bc88191817d8adf5196108.png'
        },
        {
          id: 2,
          name: 'iPhone 15 Pro Max',
          price: 9999,
          img: 'https://cdn.cnbj1.fds.api.mi-img.com/nr-pub/202506251733_f6a69593820c0ee9cb2e1650195732bc.png'
        },
        {
          id: 3,
          name: '华为 Mate 60 Pro',
          price: 6999,
          img: 'https://cdn.cnbj1.fds.api.mi-img.com/nr-pub/202506251736_48507dea7dda193a9a14ac9ba87a2103.png'
        },
        {
          id: 4,
          name: 'OPPO Find X7',
          price: 5499,
          img: 'https://cdn.cnbj1.fds.api.mi-img.com/nr-pub/202507121530_a1b2c3d4e5f6789012345678.png'
        },
        {
          id: 5,
          name: 'vivo X100 Pro',
          price: 5999,
          img: 'https://cdn.cnbj1.fds.api.mi-img.com/nr-pub/202507121545_b2c3d4e5f67890123456789.png'
        },
        {
          id: 6,
          name: '一加 12',
          price: 4999,
          img: 'https://cdn.cnbj1.fds.api.mi-img.com/nr-pub/202507121600_c3d4e5f678901234567890.png'
        },
        {
          id: 7,
          name: '魅族 21',
          price: 3999,
          img: 'https://cdn.cnbj1.fds.api.mi-img.com/nr-pub/202507121615_d4e5f6789012345678901.png'
        },
        {
          id: 8,
          name: 'realme GT Neo5',
          price: 2499,
          img: 'https://cdn.cnbj1.fds.api.mi-img.com/nr-pub/202507121630_e5f67890123456789012.png'
        }
      ],
      total: 8,
      page: 1,
      pageSize: 12
    }
  },
  watch: {
    treeKeyword (val) { this.$refs.tree.filter(val) },
    id () { this.init() }
  },
  created () { this.init() },
  methods: {
    init () {
      this.loadTree()
      this.loadGoods()
    },
    // 加载树
    async loadTree () {
      // 模拟API调用
      // const { data } = await this.$http.get('/api/categories/tree')
      // this.treeData = data
      // 默认展开第一级
      if (this.treeData.length) this.defaultExpanded = [this.treeData[0].id]
    },
    // 过滤树节点
    filterNode (value, data) {
      if (!value) return true
      return data.name.includes(value)
    },
    // 点击树节点
    handleNodeClick (node) {
      this.$router.push({ name: 'category', params: { id: node.id } })
    },
    // 跳转到商品详情
    goToDetail (goods) {
      this.$router.push({
        path: '/prodetail',
        query: { id: goods.id }
      })
    },
    // 加载商品
    async loadGoods () {
      // 模拟API调用
      // const { data } = await this.$http.get('/api/goods', {
      //   params: { categoryId: this.id || 0, page: this.page, size: this.pageSize }
      // })
      // this.goods = data.records
      // this.total = data.total
      // 生成面包屑
      // this.breadcrumbs = data.breadcrumbs || []
    }
  }
}
</script>

<style>
.breadcrumb{margin-bottom:20px;}
.g-card{margin-bottom:15px;cursor:pointer;}
.img{width:100%;height:180px;object-fit:cover;}
.g-info{padding:10px;}
.title{font-size:14px;margin:0 0 5px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
.price{color:#f56c6c;font-weight:bold;font-size:16px;}
</style>
