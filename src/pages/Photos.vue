<template>
  <div class='carousel' ref="carousel">
    <ul class='carousel-list'>
      <li class='carousel-item' data-pos='-2'></li>
      <li class='carousel-item' data-pos='-1'></li>
      <li class='carousel-item' data-pos='0'></li>
      <li class='carousel-item' data-pos='1'></li>
      <li class='carousel-item' data-pos='2'></li>
    </ul>
  </div>
</template>

<script>

export default {
  name: 'CyberloafingPhotos',

  data() {
    return {
      
    };
  },

  components: { },

  mounted() {
    const carousel = this.$refs.carousel;
    const items = document.querySelectorAll('.carousel-item');

    function position(current, active) {
      const diff = current - active;
      return Math.abs(diff) > 2 ? -current : diff;
    }

    function update(active) {
      const activePos = active.dataset.pos;
      for (const item of items) {
        item.dataset.pos = position(item.dataset.pos, activePos);
      }
    }

    const init = (e) => e.target.matches('.carousel-item') && update(e.target);

    carousel.addEventListener('click', init, false);
  },

  methods: {
    
  },
};
</script>

<style lang="less" scoped>
.carousel {
  height: 100%;
  display: grid;
  place-items: center;
  box-sizing: border-box;
}

.carousel-list {
  position: relative;
  width: 100%;
  height: 40vh;
  list-style-type: none;
  display: flex;
  justify-content: center;
}

.carousel-item {
  position: absolute;
  width: min(500px, 40vw);
  height: inherit;
  background-size: cover;
  background-position: center;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.5);
  transition: transform 500ms;
  cursor: pointer;
}

.carousel-item::after {
  content: "";
  position: absolute;
  width: inherit;
  height: inherit;
}

.carousel-item:nth-of-type(1) {
  background-image: url(https://picsum.photos/id/100/700/500);
}

.carousel-item:nth-of-type(2) {
  background-image: url(https://picsum.photos/id/154/700/500);
}

.carousel-item:nth-of-type(3) {
  background-image: url(https://picsum.photos/id/38/700/500);
}

.carousel-item:nth-of-type(4) {
  background-image: url(https://picsum.photos/id/173/700/500);
}

.carousel-item:nth-of-type(5) {
  background-image: url(https://picsum.photos/id/44/700/500);
}

li[data-pos="0"] {
  z-index: 9;
}

li[data-pos="-1"],
li[data-pos="1"] {
  z-index: 6;
}

li[data-pos="-2"],
li[data-pos="2"] {
  z-index: 3;
}

li[data-pos="-1"] {
  transform: translateX(-50%) scale(0.9);
}

li[data-pos="1"] {
  transform: translateX(50%) scale(0.9);
}

li[data-pos="-2"] {
  transform: translateX(-90%) scale(0.8);
}

li[data-pos="2"] {
  transform: translateX(90%) scale(0.8);
}

li[data-pos="-1"]::after,
li[data-pos="1"]::after {
  background-color: rgba(0, 0, 0, 0.25);
}

li[data-pos="-2"]::after,
li[data-pos="2"]::after {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>