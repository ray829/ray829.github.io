<template>
  <div class="typercontainer">
    <!-- 且借人间二两墨，一笔相思一笔错 -->
  </div>
</template>

<script>
export default {
  name: 'CyberloafingTyper',

  data() {
    return {
      timerId: null,
    };
  },

  computed: {
  },

  watch: {
    $route: {
      deep: true,
      handler(to) {
        if (to.path !== '/') {
          clearTimeout(this.timerId);
        } else {
          this.handleTyper();
        }
      }
    }
  },

  mounted() {
    this.handleTyper();
    document.addEventListener('visibilitychange', () => {
      let state = document.visibilityState;
      // console.log(state);
      if (state === 'hidden') {
        clearTimeout(this.timerId);
      } else {
        this.handleTyper();
      }
    })
  },

  methods: {
    handleTyper() {
      let container = document.querySelector('.typercontainer');
      let str_ = "且借人间二两墨，一笔相思一笔错";
      // 定义数组索引
      // let index = 0;
      let delay = 0;
      let charIndex = 0;
      // 删除标志
      // let isDelete = false;
      let defaultDelay = 150;
      // let waitDalay = 3000;

      let changeText = () => {
          container.textContent = str_.substring(0,charIndex);
          delay = defaultDelay;
          charIndex++;
          // if(!isDelete){
              // if(charIndex > str_.length){
              //     // 当charIndex已经大于字符的长度的时候，表示应该执行删除动画了
              //     isDelete = true; 
              //     delay = waitDalay;
              // }
          // }else{
          //     delay = defaultDelay;
          //     charIndex --;
          //     if(charIndex < 1){
          //         isDelete = false;
          //         index ++;
          //         if(index >= str_.length){
          //           index = 0;
          //         }
          //     }
          // }
        clearTimeout(this.timerId);
        this.timerId = setTimeout(changeText, delay);
        if (charIndex > str_.length) {
          // console.log(this.timerId);
          clearTimeout(this.timerId);
          this.timerId = null;
        }
      }
      changeText();
    },
  },
};
</script>

<style lang="less" scoped>
.typercontainer {
  font-size: 1.2rem;
  font-weight: 500;
  color: #fff;
  position: relative;
}

.typercontainer::after {
    content: 'I';    
    font-size: 2.2rem;
    position: absolute;
    top: -0.5rem;
    margin-left: 5px;
    font-weight: bolder;
    display: inline-block;
    vertical-align: top;
    font-weight: lighter;
    animation: ficker 0.8s infinite;
}

@keyframes ficker {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}
</style>