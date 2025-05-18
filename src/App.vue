<template>
  <div class="blind-box" @click="toggleFlipped" :class="{ 'is-flipped': isFlipped }">
    <div class="front">
      <div class="image-container">
        <img :src="imgUrl" alt="盲盒封面" class="cover-image">
      </div>
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
  width: clamp(200px, 30vw, 400px); /* 响应式宽度：最小200px，视口30%，最大400px */
  height: calc(clamp(200px, 30vw, 400px) * 1.33); /* 保持1:1.33比例 */
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

.image-container {
  width: 100%;
  height: 100%;
  overflow: hidden; /* 防止图片溢出容器 */
  border-radius: 12px; /* 保持与卡片一致的圆角 */
}

.cover-image {
  width: 100%;
  height: 100%;
  object-fit: cover; /* 保持纵横比并覆盖容器 */
  object-position: center; /* 居中裁剪 */
  transition: transform 0.5s ease; /* 悬停时的微动画 */
}

.front { 
  background: linear-gradient(135deg, #2c82ff 0%, #165DFF 100%); /* 与弧形渐变一致的蓝色调 */
}

.back { 
  /* 使用蓝绿色调与弧形渐变的紫色系形成互补 */
  background: linear-gradient(
    135deg,
    rgba(44, 182, 178, 0.9) 0%,    /* 蓝绿色 */
    rgba(60, 120, 180, 0.95) 100%   /* 蓝灰色 */
  );
  
  /* 磨砂玻璃效果增强深度感 */
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  
  /* 边框和阴影强化立体感 */
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 
    0 4px 20px rgba(0, 0, 0, 0.1),
    inset 0 0 15px rgba(255, 255, 255, 0.1);
}

.blind-box.is-flipped .front { transform: rotateY(180deg); }

.blind-box.is-flipped .back { 
  transform: rotateY(0);
  box-shadow: 
    0 8px 30px rgba(44, 182, 178, 0.25),  /* 蓝绿色阴影 */
    inset 0 0 20px rgba(255, 255, 255, 0.15);
}

button {
  padding: 12px 24px;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  
  /* 180度弧形渐变（从蓝色到紫色） */
  background: linear-gradient(
    90deg,
    #2c82ff 0%,      /* 深蓝色 */
    #5869ff 25%,     /* 蓝紫色 */
    #7a24ff 50%,     /* 紫色 */
    #a142ff 75%,     /* 深紫色 */
    #c942ff 100%     /* 紫红色 */
  );
  background-size: 200% auto;
}

button:hover {
  background-position: right center;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(122, 36, 255, 0.25); /* 紫色阴影 */
}

/* 小屏幕优化 */
@media (max-width: 600px) {
  .blind-box {
    width: 80vw;
    height: calc(80vw * 1.33);
  }
}
</style>