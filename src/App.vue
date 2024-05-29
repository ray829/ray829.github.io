<template>
  <div id="app">
    <div v-show="isShow" class="principal-sheet light">
      <decoration />
      <div class="web-font">只想摸鱼的博客</div>
      <div class="myTyper"><mytyper /></div>
      <div class="navigation">
        <router-link to="/home">首页</router-link>
        <router-link to="/photo">相册</router-link>
        <router-link to="/daylog">说说</router-link>
        <router-link to="/about">档案</router-link>
        <span @click="switchTheme">切换</span>
      </div>
    </div>
    <myMain v-show="!isShow" />
  </div>
</template>

<script>
import myMain from "./pages/Main";
import mytyper from "@/components/typer";
import decoration from "@/components/myDecoration";

export default {
  name: "App",
  components: {
    myMain,
    mytyper,
    decoration,
  },
  data() {
    return {
      isShow: true,
      Theme: true,
    };
  },
  watch: {
    $route: {
      deep: true,
      handler(to) {
        if (to.path === "/") {
          this.isShow = true;
        } else {
          this.isShow = false;
        }
        sessionStorage.setItem("isShow", JSON.stringify(this.isShow));
        sessionStorage.setItem("routes", JSON.stringify(this.$route.fullPath));
      },
    },
  },
  created() {
    if (sessionStorage.getItem("routes")) {
      this.isShow = JSON.parse(sessionStorage.getItem("isShow"));
      // App主组件中定义，在子组件中刷新会重新调用该组件，从而导致markdown中传递的query参数会在刷新页面时丢失
      this.$router.push(JSON.parse(sessionStorage.getItem("routes")));
    }
  },
  mounted() {},
  methods: {
    switchTheme() {
      const principal = document.querySelector(".principal-sheet");
      this.Theme = !this.Theme;
      // console.log(this.Theme);
      if (!this.Theme) {
        principal.classList.toggle("dark");
      } else {
        principal.classList.toggle("dark");
      }
    },
  },
};
</script>

<style lang="less">
@font-face {
  font-family: "webfont";
  font-display: swap;
  src: url("../public/font/webfont.eot"); /* IE9 */
  src: url("../public/font/webfont.eot?#iefix") format("embedded-opentype"),
    /* IE6-IE8 */ url("../public/font/webfont.woff2") format("woff2"),
    url("../public/font/webfont.woff") format("woff"),
    /* chrome、firefox */ url("../public/font/webfont.ttf") format("truetype"),
    /* chrome、firefox、opera、Safari, Android, iOS 4.2+*/
      url("../public/font/webfont.svg#webfont") format("svg"); /* iOS 4.1- */
}

:root {
  --background-color: #a5dff9;
  --font-color: rgb(65, 166, 249);
  --color-gray: rgb(179, 182, 183);
  --scroll-hover-color: rgba(108, 108, 108, 1);
  background-image: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);
}
html,
body {
  padding: 0;
  margin: 0;
  font: 14px "KaiTi_GB2312";
  h1,h2,h3,h4 {
    margin: 0;
    padding: 0;
  }
  a {
    text-decoration: none;
    color: inherit;
    font-size: 20px;
    font-weight: 600;
  }
  .principal-sheet {
    background-image: url("../public/20240411194441.png");
    background-size: cover;
    width: 100vw;
    height: 100vh;
    position: relative;

    .web-font {
      position: absolute;
      top: 42%;
      left: 50%;
      transform: translate(-50%);
      color: #f1f0ed;
      font-family: "webfont" !important;
      font-size: 4rem;
      font-style: normal;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    .myTyper {
      position: absolute;
      top: 55%;
      left: 50%;
      transform: translate(-50%);
    }
    .navigation {
      position: absolute;
      top: 65%;
      left: 50%;
      transform: translate(-50%);
      min-height: 1.5rem;
      padding: 1rem 1.2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-weight: 600;
      font-size: 1.5rem;
      cursor: pointer;
      user-select: none;
      color: #cdd1d3;
      border-radius: 2rem;
      border: 3px solid #cdd1d3;
      a {
        color: #cdd1d3;
        text-decoration: none;
        margin-right: 1.5rem;
      }
      a:hover,
      span:hover {
        transform: scale(1.2);
      }
    }
  }
  .dark {
    background-image: url("../public/kwlz36.png");
    background-color: #3e3841;
  }
}
</style>
