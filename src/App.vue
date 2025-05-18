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
  -webkit-backface-visibility: hidden; /* 增强兼容性 */
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
  z-index: 1; /* 确保正面在初始状态显示在上方 */
}

.back { 
  background: transparent; /* 主容器保持透明 */
  z-index: 0;
  position: relative;
  transform: rotateY(180deg); /* 确保初始状态翻转 */
  
  /* 保持Flex布局 */
  display: flex;
  justify-content: center;
  align-items: center;
}

.back::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #44b6b2 0%, #3c78b4 100%);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-radius: 12px;
  z-index: -1; /* 置于内容后面 */
  opacity: 0; /* 初始隐藏磨砂效果 */
  transition: opacity 0.8s ease; /* 仅对opacity做过渡 */
}

.blind-box.is-flipped .back::before {
  opacity: 1; /* 翻转后显示磨砂背景 */
}

.blind-box.is-flipped .front {
  transform: rotateY(180deg); /* 确保正面翻转 */
}

.blind-box.is-flipped .back {
  transform: rotateY(0); /* 确保背面转正 */
  box-shadow: 0 8px 30px rgba(44, 182, 178, 0.25); /* 蓝绿色阴影 */
}

button {
  padding: 16px 32px;
  z-index: 1; /* 确保按钮在磨砂背景之上 */
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  background: linear-gradient(90deg, #2c82ff 0%, #c942ff 100%);
  background-size: 200% auto;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

button:hover {
  background-position: right center;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(122, 36, 255, 0.25);
}

/* 小屏幕优化 */
@media (max-width: 600px) {
  .blind-box {
    width: 80vw;
    height: calc(80vw * 1.33);
  }
}
</style>