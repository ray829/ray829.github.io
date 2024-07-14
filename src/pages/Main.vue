<template>
  <div>
    <el-container height="100%">
      <el-header height="50px">
        <myHeader />
      </el-header>
      <el-main>
        <router-view class="route"></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import myHeader from "@/components/header";

export default {
  name: "CyberloafingMain",
  components: {
    myHeader,
  },

  data() {
    return {};
  },
  created() {},

  mounted() {},

  methods: {},
};
</script>

<style lang="less" scoped>
.el-container {
  background-image: url("@/assets/images/maoyu.jpeg");
  background-attachment: fixed;
  background-size: cover;
}
.el-header {
  font-size: 1.1rem;
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
  width: 100%;
  background-color: rgba(255, 255, 255, .7);
}

.el-main {
  height: calc(100vh - 50px);
  margin-top: 50px;
  padding: 0;
  // overflow: hidden;
  background-color: rgba(255, 254, 249, .7);
  font-size: 1.4rem;
  width: 100%;
  .route {
    width: 1200px;
    margin: 0 auto;
  }
  
}
</style>
