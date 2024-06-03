<template>
  <div class="homePage">
      <div class="markdown">
        <el-card v-for="item in mdList" :key="item.time" class="my-record">
          <img :src="require(`../../public/${item.imgInd}`)" alt="">
          <div class="mdBlurb">
            <router-link :to="{path: '/markdown', query: {mdName: item.name}}">{{ item.name }}</router-link>
            <p>title: {{ item.title }}</p>
            <p>time: {{ item.time }}</p>
            <p>desc: {{ item.desc }}</p>
          </div>
        </el-card>
      </div>
      <div class="user">
        <el-card shadow="hover">
          <div class="user_img" style="width: 100%; height: 100%;">
            <img src="../../public/640.webp">
          </div>
          <div class="user_sculpture">
            <img src="../../public/cat1.jpeg" style="height:60px; transform: translate(25%, -50%);">
            <span class="user_title">只想摸鱼的博客</span>
            <br>
            <p>当一个人说我丑时我不以为然，</p>
            <br>
            <p>当越来越多的人说我丑时，</p>
            <br>
            <p>我才知道现在骗子越来越多了</p>
          </div>
          <div class="entrance button_entrance" @click="backHome">
            <span class="entrance_text">Go Back</span>
          </div>
          <ul class="home_info">
            <li><i class="iconfont icon-bilibili"></i></li>
            <li><i class="iconfont icon-weixin"></i></li>
            <li><i class="iconfont icon-QQ-circle-fill"></i></li>
            <li><i class="iconfont icon-github-fill"></i></li>
          </ul>
        </el-card>
      </div>
  </div>
</template>

<script>

export default {
  name: 'CyberloafingHomePage',

  components: {},

  data() {
    return {
      
    };
  },

  computed: {
    mdList() {
      return this.$store.state.mdTitle.mdTitleList;
    }
  },

  mounted() {
    const user_sculpture = document.querySelector('.user_sculpture > img');
    const currenttransform = user_sculpture.style.transform;
    user_sculpture.addEventListener('mouseenter', () => {
      user_sculpture.style.transform = `${currenttransform} rotate(360deg)`;
      user_sculpture.style.transition = '1s cubic-bezier(.11,.63,.61,.84)';
    });
    user_sculpture.addEventListener('mouseleave', () => {
      user_sculpture.style.transform = `${currenttransform} rotate(-0deg)`;
      user_sculpture.style.transition = '1s cubic-bezier(.11,.63,.61,.84)';
    });
  },

  methods: {
    backHome() {
      this.$router.push('/');
    },
  },
};
</script>

<style lang="less" scoped>
.homePage {
  display: grid;
  grid-template-columns: [c1] 70% [c2] auto [c3];
  column-gap: 20px;
  .markdown {
    overflow-y: scroll;
    height: 84vh;
    //滚动条
    &::-webkit-scrollbar {
      width: 9px;
      // display: none;
    }

    &::-webkit-scrollbar-thumb {
      background: #bfbfbf;
      border-color: transparent;
      border-radius: 10px;
      border-width: 4px;
      background-clip: padding-box;
    }

    &::-webkit-scrollbar-thumb:hover {
      background: var(--scroll-hover-color);
      background-clip: border-box;
    }

    &::-webkit-scrollbar-corner {
      background: #bfbfbf;
    }

  }
  .my-record {
    height: 24vh;
    border-radius: 15px;
    display: grid;
    align-items: center;
    margin-right: 10px;
    margin-bottom: 10px;
    background-color: rgba(255, 255, 255, .8);
    /deep/ .el-card__body {
      display: grid;
      grid-template-columns: 35% 63%;
      grid-template-rows: 100%;
      align-items: center;
      justify-content: center;
      column-gap: 2%;
      img {
        grid-column-start: 1;
        width: 100%;
        height: 100%;
        display: block;
      }
      .mdBlurb {
        grid-column-start: 2;
        a {
          font-size: 1.8rem;
        }
      }
    }
  }
  .user {
    grid-column-start: c2;
    font-size: 1.2rem;
    width: 80%;
    position: fixed;
    .el-card {
      border-radius: 15px;
      width: 100%;
      background-color: rgba(255, 255, 255, .8);
      transition: all .5s cubic-bezier(.25,.65,.6,.91);
      &:hover {
        transform: translateY(-3px);
        box-shadow: 3px 8px 10px 0px var(--scroll-hover-color);
      }
      /deep/.el-card__body {
        display: grid;
        height: 50vh;
        grid-template-columns: 100%;
        grid-template-rows: [r1] 40% [r2] 25% [r3] 15% [r4] 20% [r5];
        padding: 0;
      }
      .user_img {
        grid-row-start: r1;
        overflow: hidden;
        border-top-left-radius: 15px;
        border-top-right-radius: 15px;
        img {
          height: 100%;
        }
      }
      .user_sculpture {
        grid-row-start: r2;
        position: relative;
        max-height: 100%;  
        img {
          border-radius: 50%;
        }
        .user_title {
          position: absolute;
          left: 50%;
          transform: translateX(-40%);
          top: 5%;
          // left: -50px;
        }
        p {
          position: absolute;
          margin: 0;
          left: 50%;
          transform: translate(-50%, -90%);
          font-size: 1rem;
          line-height: 1.7rem;
          letter-spacing: .17rem;
          text-wrap: nowrap;
          text-align: center;
        }
      }
      .button_entrance {
          position: relative;
          z-index: 1;
          cursor: pointer;
        &:hover::after {
          transform: scaleX(1);
          transition: transform .5s cubic-bezier(0,1.69,.95,.71);
        }
        &::after {
          content: '';
          position: absolute;
          z-index: -1;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: .4rem;
          background-color: var(--background-color);
          transform: scaleX(0);
          transform-origin: 0 50%;
          transition: transform .5s ease-out;
        }
      }
      .entrance {
        grid-row-start: r3;
        justify-self: center;
        align-self: end;
        text-align: center;
        height: 3rem;
        width: 80%;
        line-height: 3rem;
        font-size: 1.4rem;
        font-weight: 600;
        word-spacing: .8rem;
        user-select: none;
        border-radius: .4rem;
        background-color: rgba(182, 164, 118, 1);
      }
      .home_info {
        padding: 0 1rem;
        display: grid;
        grid-row-start: r4;
        grid-template-columns: repeat(4, 1fr);
        justify-items: center;
        align-items: center;
        li {
          list-style-type: none;
        }
        i {
          font-size: 2.5rem;
          cursor: pointer;
          &:hover {
            color:var(--font-color);
          }
        }
      }
    }
  }
}
</style>