<template>
  <div class="mytime">
    <div class="time-header">
      <div class="time-title">时间轴</div>
    </div>
    <section class="timeline">
      <div class="container">
        <div class="timeline-item" ref='timeItem' v-for="(item, index) of mdsInfo" :key="item.time">
          <div class="timeline-img"></div>

          <div class="timeline-content animate__animated" :class="jsFadeStyle(index)">
            <!-- <h2>{{item.title}}</h2> -->
            <router-link class="timeline-Title" :to="{ path: '/markdown', query: { mdName: item.name } }">{{ item.title
              }}</router-link>
            <div class="itemTime">{{ item.time }}</div>
            <p>{{ item.desc }}</p>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script>

import { mapState, mapMutations } from 'vuex';
import 'animate.css';

export default {
  name: 'CyberloafingTimeline',

  data() {
    return {
      mdsStartInd: 0,
      mdsGap: 5,
      itemsCount: 0,
    };
  },

  computed: {
    ...mapState('mdTitle', ['mdsInfo']), // 获取状态中的mdTitle模块中的mdsInfo
  },

  created() {
    this.loadMdInfo();
  },

  mounted() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          console.log(`${entry.target.children[1].firstChild.textContent} is visible.`);
          if (this.itemsCount % 2 === 0) {
            entry.target.children[1].classList.add('animate__slideInLeft');
          } else {
            entry.target.children[1].classList.add('animate__slideInRight');
          }
          this.itemsCount++;
          // 一旦元素可见，取消监测
          observer.unobserve(entry.target);
        }  
      });
    });
    this.$refs.timeItem.forEach((e) => {
      observer.observe(e);
    })
  },

  methods: {
    ...mapMutations('mdTitle', ['getMdInfo']),
    loadMdInfo() {
      this.getMdInfo({ startInd: this.mdsStartInd, gap: this.mdsGap }); // 调用 mutation  
    },
    jsFadeStyle(index) {
      return index % 2 === 0 ? 'js--fadeInLeft' : 'js--fadeInRight';
    }
  },
};
</script>

<style lang="less" scoped>

.mytime {
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  font-family: "Roboto";
  font-size: 17px;
  font-weight: 400;
  
  &::-webkit-scrollbar {
      width: 9px;
      display: none;
    }
}

h1 {
  font-size: 200%;
  text-transform: uppercase;
  letter-spacing: 3px;
  font-weight: 400;
}

p {
  margin-top: 10px;
  color: var(--fontc1);
}

.time-header {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 100px 0;
}

.time-title {
  justify-self: flex-end;
  padding-right: 40px;
  color: var(--fontc3);
  font-size: 58px;
  font-weight: 600;
  letter-spacing: 5px;
}

.timeline {
  position: relative;
}

.title {
  position: absolute;
  top: 25px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 56px;
  font-weight: 900;
}

.timeline::before {
  content: "";
  background: #C5CAE9;
  width: 5px;
  height: 95%;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.timeline-item {
  width: 100%;
  margin-bottom: 70px;
}

.timeline-item:nth-child(even) .timeline-content {
  float: right;
  padding: 10px 30px;
}

.timeline-item:nth-child(even) .timeline-content .date {
  right: auto;
  left: 0;
}

.timeline-item:nth-child(even) .timeline-content::after {
  content: "";
  position: absolute;
  border-style: solid;
  width: 0;
  height: 0;
  top: 30px;
  left: -15px;
  border-width: 10px 15px 10px 0;
  border-color: transparent #C5CAE9 transparent transparent;
}

.timeline-item::after {
  content: "";
  display: block;
  clear: both;
}

.timeline-content {
  position: relative;
  width: 40%;
  padding: 10px 30px;
  border-radius: 4px;
  background: #C5CAE9;
  box-shadow: 0 20px 25px -15px rgba(0, 0, 0, 0.3);
}

.timeline-content::after {
  content: "";
  position: absolute;
  border-style: solid;
  width: 0;
  height: 0;
  top: 30px;
  right: -14px;
  border-width: 10px 0 10px 15px;
  border-color: transparent transparent transparent #C5CAE9;
}

.timeline-img {
  width: 30px;
  height: 30px;
  background: var(--c7);
  border-radius: 50%;
  position: absolute;
  left: 50%;
  margin-top: 25px;
  margin-left: -15px;
}

.itemTime {
  font-size: 16px;
  color: var(--fontc2);
  height: max-content;
  margin-top: 15px;
}

.timeline-Title {
  text-decoration: none;
  color: var(--fontc3);
  font-size: 26px;
  line-height: 26px;
  font-weight: 600;
  display: block;
  padding-top: 20px;
  position: relative;
  &::before {
    content: '\25B8';
    position: absolute;
    left: -25px;
    color: var(--fontc2);
    font-size: 30px;
    animation: decroTitle 1s infinite;
    transform-origin: center center;
    perspective: 100px;
      /* 添加透视效果 */
  }
  @keyframes decroTitle {
    0%, 100% {
      transform: rotateX(0deg);
    }

    50% {
      transform: rotateX(180deg); 
    }
  }
}


@media screen and (max-width: 768px) {
  .timeline::before {
    left: 50px;
  }

  .timeline .timeline-img {
    left: 50px;
  }

  .timeline .timeline-content {
    max-width: 100%;
    width: auto;
    margin-left: 70px;
  }

  .timeline .timeline-item:nth-child(even) .timeline-content {
    float: none;
  }

  .timeline .timeline-item:nth-child(odd) .timeline-content::after {
    content: "";
    position: absolute;
    border-style: solid;
    width: 0;
    height: 0;
    top: 30px;
    left: -15px;
    border-width: 10px 15px 10px 0;
    border-color: transparent #f5f5f5 transparent transparent;
  }
}
</style>