<template>
  <div>
    <el-container height="100%">
      <el-header height="50px">
        <myHeader />
      </el-header>
      <el-main>
        <router-view class="route"></router-view>
      </el-main>
      <el-footer height="30px">
        <myFooter />
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import myHeader from "@/components/header";
import myFooter from "@/components/footer";

export default {
  name: "CyberloafingMain",
  components: {
    myHeader,
    myFooter,
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
.el-header {
  font-size: 1.1rem;
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
  width: 100%;
  background-color: rgba(255, 255, 255, .3);
}

.el-main {
  background-image: url("@/assets/images/maoyu.jpeg");
  background-attachment: fixed;
  background-size: cover;
  // min-height: calc(100vh - 40px);
  height: 100vh;
  position: relative;
  overflow: hidden;
  &::after {
    position: absolute;
    position: fixed;
    top: 0;
    left: 0;
    content: '';
    background-color: rgba(255, 254, 249, .4);
    background-attachment: fixed;
    width: 100%;
    min-width: 1200px;
    height: 100%;
  }
  .route {
    font-size: 1.4rem;
    position: absolute;
    width: 1200px;
    top: 5vw;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
  }
}
.el-footer {
  position: fixed;
  z-index: 10;
  width: 100%;
  bottom: 0;
  background-color: rgba(255, 255, 255, 1);
  text-align: center;
  align-items: center;
  font: 600 1rem '新宋体','楷体';
} 
</style>
