<template>
  <div class="homePage">
    <div class="markdown">
      <div v-for="item in mdList" :key="item.time" class="my-record">
        <img :src=item.imgUrl alt="" class="animate__animated">
        <div class="mdBlurb">
          <router-link class="title" :to="{path: '/markdown', query: {mdName: item.name}}">{{ item.title
            }}</router-link>
          <div><i class="iconfont icon-date"></i> 发表于 {{ item.time }} | <i class="iconfont icon-tags"></i> {{ item.tag
            }}</div>
          <span>{{ item.desc }}</span>
        </div>
      </div>
    </div>
    <div class="user">
      <el-card shadow="hover">
        <div class="user_img" style="width: 100%; height: 100%;">
          <img src="@/assets/images/640.webp">
        </div>
        <div class="user_sculpture">
          <img src="@/assets/images/cat1.jpeg" style="height:60px; transform: translate(25%, -50%);">
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
          <li><a class="iconfont icon-bilibili" href="https://space.bilibili.com/430081185"></a></li>
          <li><i class="iconfont icon-weixin"></i></li>
          <li><i class="iconfont icon-QQ-circle-fill"></i></li>
          <li><a class="iconfont icon-github-fill" href="https://github.com/ray829"></a></li>
        </ul>
      </el-card>
    </div>
  </div>
</template>

<script>

import 'animate.css';

export default {
  name: 'CyberloafingHomePage',

  components: {},

  data() {
    return {
      imageUrl: '@/assets/images/',
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
    this.addAnimation();
  },

  methods: {
    backHome() {
      this.$router.push('/');
    },
    addAnimation() {
      const imgs = document.querySelectorAll('.my-record img');
      for (let i = 0; i < imgs.length; i++){
        let self = imgs[i];
        imgs[i].addEventListener('mouseenter', function () {
          self.classList.add('animate__headShake');
        });
        //mouseleave与mouseout相似，不过mouseleave不会冒泡
        imgs[i].addEventListener('mouseleave', function () {
          self.classList.remove('animate__headShake');
        });
      }
    }
  },
};
</script>

<style lang="less" scoped>
.homePage {
  display: grid;
  grid-template-columns: [c1] 75% [c2] auto [c3];
  column-gap: 20px;
  padding-top: 20px;
  box-sizing: border-box;
  height: 100%;
  .markdown {
    overflow-y: scroll;
    //滚动条
    &::-webkit-scrollbar {
      width: 9px;
    }
    &::-webkit-scrollbar-thumb {
      background: transparent;
      border-color: transparent;
      border-radius: 10px;
      border-width: 4px;
      background-clip: padding-box;
    }
    &:hover::-webkit-scrollbar-thumb {
      background: #bfbfbf;
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
    height: 200px;
    border-radius: 15px;
    border-width: 0px;
    display: grid;
    grid-template-columns: [c1] 35% [c2] 65% [c3];
    grid-template-rows: 100%;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
    margin-bottom: 10px;
    overflow-x: visible;
    img {
      grid-column-start: 1;
      object-fit: cover;
      width: 100%;
      height: 100%;
      display: block;
      border-radius: 20px;
    }
    .mdBlurb {
      grid-column-start: 2;
      align-self: self-start;
      color: var(--fontc1);
      background-color: var(--bacc-a4);
      display: grid;
      grid-template-rows: 30% 30% 40%;
      align-items: center;
      text-align: center;
      border-radius: 20px;
      height: 100%;
      cursor: default;
      a {
        text-decoration: none;
        color: inherit;
        font-weight: 900;
        font-size: 28px;
        letter-spacing: 1.5px;
        justify-self: center;
        margin-top: 5%;
        transition: transform .2s linear;
        cursor: pointer;
        &:hover {
          transform: scale(1.05);
        }
      }
      div {
        justify-self: center;
        font-size: 16px;
        color: var(--fontc2);
      }
      span {
        align-self: self-start;
        font-size: 18px;
        font-weight: 500;
        display: inline-block;
        overflow: hidden;
        justify-self: center;
        width: 90%;
        text-wrap: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
  .user {
    grid-column-start: c2;
    font-size: 1.2rem;
    width: 100%;
    height: max-content;
    justify-self: right;
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
        grid-template-columns: 100%;
        grid-template-rows: [r1] 40% [r2] 25% [r3] 18% [r4] 17% [r5];
        padding: 0;
      }
      .user_img {
        grid-row-start: r1;
        overflow: hidden;
        border-top-left-radius: 15px;
        border-top-right-radius: 15px;
        img {
          width: 100%;
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
        a:visited {
          color: inherit;
          text-decoration: none;
        }
        i, a {
          font-size: 2.5rem;
          cursor: pointer;
          color: inherit;
          text-decoration: none;
          &:hover {
            color:var(--font-color);
          }
        }
        .icon-weixin, .icon-QQ-circle-fill {
          position: relative;
          &::after {
              content: '';
              display: none;
              background-size: cover;
              position: absolute;
              z-index: 2;
              width: 100px;
              height: 100px;
              padding:1px;
              background-color: rgba(255, 255, 255, .7);
              top: -105px;
              border-radius: 10px;
              left: calc(-50px + 50%);
          }
          &:hover::after {
            display: block;
          }
        }
        .icon-weixin::after {
          background-image: url('../assets/images/weixin.jpg');
        }
        .icon-QQ-circle-fill::after {
          background-image: url('../assets/images/qq.jpg');
        }
      }
    }
  }
}
</style>