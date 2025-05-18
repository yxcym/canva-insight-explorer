<template>
 <div class="blind-box" @click="toggleFlipped" :class="{ 'is-flipped': isFlipped }">
  <div class="front">
    <img :src="imgUrl" alt="盲盒封面">
  </div>
  <div class="back">
    <button>开始测试</button>
  </div>
</div>
</template>

<script>
import imgUrl from '@/assets/img/Free-fall.jpg';

export default {
  data() {
    return {
      imgUrl,
      isFlipped: false // 添加翻转状态
    };
  },
  methods: {
    toggleFlipped() {
      this.isFlipped = !this.isFlipped; // 切换翻转状态
    }
  }
};
</script>

<style scoped>
.blind-box {
  width: clamp(200px, 30vw, 400px);
  height: calc(clamp(200px, 30vw, 400px) * 1.33);
  perspective: 1000px;
  cursor: pointer;
  position: relative;
  margin: 20px auto; /* 水平居中 */
}
.blind-box > div {
  width: 100%;
  height: 100%;
  position: absolute;
  backface-visibility: hidden;
  transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border-radius: 12px; /* 圆角设计 */
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1); /* 阴影效果 */
}
.front { background: #165DFF; } /* Canva蓝色 */
.back { 
  background: #00B42A; /* Canva绿色 */
  transform: rotateY(180deg);
  display: flex;
  justify-content: center;
  align-items: center;
}
/* 使用计算属性绑定类名 */
.blind-box.is-flipped .front {
  transform: rotateY(180deg);
}

.blind-box.is-flipped .back {
  transform: rotateY(0);
}
</style>
