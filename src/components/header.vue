<template>
  <div class="header-contain">
    <div class="l-content">
      <img class="head-sculpture" src="../../public/cat1.jpeg">
    </div>
    <ul class="r-content" >
      <li class="home"><i class="iconfont icon-home"></i>主页</li>
      <li class="timeline"><i class="iconfont icon-list"></i>时间轴</li>
      <li class="photo"><i class="iconfont icon-photos"></i>相册</li>
      <li class="daylog"><i class="iconfont icon-a-061_dangan-21"></i>说说</li>
      <li class="github"><i class="iconfont icon-a-061_faxian"></i>Github</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'CyberloafingHeader',

  data() {
    return {
      
    };
  },

  mounted() {
    const headSculpture = document.querySelector(".head-sculpture");
    const rContent = document.querySelectorAll('li');
    rContent.forEach(li => {
      let self = li;
      // !!!注意此处遍历添加绑定事件时，this指向不是遍历的对象，要特别注意
      li.addEventListener('click', () => {
        // console.log(self.className);
        // console.log(this.$route.name); 
        if (self.className !== this.$route.name && self.className !== 'github' ) {
          this.$router.push(self.className);
        } else if (self.className !== this.$route.nam && self.className === 'github') {
          //第一种方法，需要注意打开的外部链接会自动拼接我们的源地址，导致网址链接不正确，需要进行处理
          this.jumpUrl('github.com/ray829');

          //第二种方法：
          // window.open('www.baidu.com', "_self");
        }
      });
    });
    headSculpture.addEventListener('mouseenter', () => {
      headSculpture.style.transform = 'rotate(360deg)';
      headSculpture.style.transition = '1s cubic-bezier(.11,.63,.61,.84)';
    });
    headSculpture.addEventListener('mouseleave', () => {
      headSculpture.style.transform = 'rotate(-0deg)';
      headSculpture.style.transition = '1s cubic-bezier(.11,.63,.61,.84)';
    });
  },

  methods: {
    jumpUrl(url) {
      const path = window.location.protocol + '//' + url;
      window.location.href = path;
    }
  },
};
</script>

<style lang="less" scoped>
.header-contain {
  display: grid;
  grid-template-columns: [c1] 100px [c2] auto [c3] auto;
  grid-template-rows: 53px;
  align-items: center;
  align-content: center;
  .l-content {
    margin-left: 20px;
    .head-sculpture {
      height: 42px;
      border-radius: 50%;
      cursor: pointer;
    }
  }
  .r-content {
    grid-column-start: c3;
    justify-self: end;
    margin-right: 85px;
    font-size: 1.2rem;
    font-weight: 600;
    display: flex;
    li {
      list-style-type: none;
      user-select: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      position: relative;
      &::before {
        content: '';
        position: absolute;
        left: 2px;
        bottom: -5px;
        width: 0;
        height: 3px;
        background-color: black;
        transition: .4s ease-out width;
      }
      &:hover {
        color: var(--font-color);
      }
      &:hover::before {
        background-color: var(--font-color);
        width: 100%;
      }
      i {
        font-size: 1.6rem;
        font-weight: 300;
        margin-right: 5px;
      }
    }
    .github>i,
    .daylog>i {
      font-size: 2rem;
    }
    &>li:not(:last-child) {
      margin-right: 30px;
    }
  }
}
</style>