<template>
  <div class="page-container">
    <h1 class="title">发现你的创意天赋</h1>
    <p class="desc">30秒测试，解锁专属于你的Canva设计模板</p>
    
    <!-- 新增：包裹容器确保点击区域覆盖整个卡片 -->
    <div class="blind-box-wrapper" @click="toggleFlipped">
      <div class="blind-box" :class="{ 'is-flipped': isFlipped }">
        <div class="front">
          <div class="image-container">
            <img :src="imgUrl" alt="盲盒封面" class="cover-image">
            <!-- ？给图片加虚化，上面覆盖礼物样式图标 -->
          </div>
        </div>
        <div class="back">
          <!-- 阻止按钮点击触发卡片翻转 -->
          <button @click.stop>开始测试</button>
        </div>
      </div>
    </div>
    
    <div class="support">
      <p class="support-desc">由Canva提供技术支持</p>
       <img :src="imgPath" class="support-img" alt="技术支持图标">
    </div>
  </div>
    <div class="page-container">
    <!-- 开始页面 -->
    <div v-show="currentPage === 0" class="p-6 min-h-screen">
      <div class="blind-box" @click="toggleFlipped">
        <div class="blind-box-inner" :class="{ 'rotate-y-180': isFlipped }">
          <div class="front">
            <div class="image-container">
              <img src="https://picsum.photos/400/532" alt="盲盒封面" class="cover-image">
            </div>
          </div>
          <div class="back">
            <button @click="startTest" class="start-btn">开始测试</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 题目页面 -->
    <div v-show="currentPage >= 1 && currentPage <= 3" class="p-6 min-h-screen">
      <Question :currentPage="currentPage" 
                :q1="q1" :q2="q2" :q3="q3"
                @next="handleNext" 
                @submit="handleSubmit" />
    </div>

    <!-- 结果页面 -->
    <div v-show="currentPage === 4" class="p-6 min-h-screen text-center">
      <Result :result="result" @restart="restartTest" />
    </div>
  </div>

</template>

<style scoped>
.page-container {
  text-align: center;
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
}

.title {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 10px;
  user-select: none; /* 防止标题被选中 */

   /* 文字渐变效果 */
  background: linear-gradient(90deg, #2cf4ff 0%, #bd42ff 100%);
  -webkit-background-clip: text; /* webkit 前缀背景裁剪为文字 */
  -webkit-text-fill-color: transparent; /* 仅保留 webkit 文本填充透明 */
  background-clip: text; /* 标准背景裁剪属性 */
}

.desc {
  color: #666;
  font-size: 14px;
  margin-bottom: 40px;
  user-select: none; /* 防止描述被选中 */
}

.blind-box-wrapper {
  position: relative;
  display: inline-block; /* 确保容器宽度适应内容 */
  cursor: pointer; /* 明确交互状态 */
}

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
  user-select: none; /* 新增：禁止选中图片区域 */
}

.cover-image {
  width: 100%;
  height: 100%;
  object-fit: cover; /* 保持纵横比并覆盖容器 */
  object-position: center; /* 居中裁剪 */
  transition: transform 0.5s ease; /* 悬停时的微动画 */
  user-select: none; /* 新增：禁止选中图片本身 */
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
  background: linear-gradient(135deg, #4ff7f2 0%, #2e90f2 100%);
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
  /*？新增鼠标触及后略微扩大*/
  padding: 16px 32px;
  z-index: 1; 
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
  user-select: none; /* 禁止选中按钮内的文字 */
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

.support {
  margin-top: 40px;
}

.support-desc {
  color: #999;
  font-size: 12px;
  margin-bottom: 5px;
  user-select: none; /* 防止技术支持文字被选中 */
}

.support-img {
  width: auto;
  height: 24px;
  object-fit: cover;
  border-radius: 4px;
  user-select: none; /* 新增：禁止选中图片本身 */
}
</style>

<script>
import imgUrl from '@/assets/img/Free-fall.jpg';

export default {
  data() {
    return {
      imgUrl,
      imgPath: require('@/assets/Canva-Theme-based-Design Materials-3.3/Logo Static and Animations/CHINA - WORDMARK LOGO - GRADIENT - RGB.png'),// 新增：图片路径
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