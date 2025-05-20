<template>
  <div class="page-container">
    <!-- 初始界面 - 点击开始测试后隐藏 -->
    <div v-show="currentPage === 0" class="initial-screen">
      <h1 class="title">发现你的创意天赋</h1>
      <p class="desc">30秒测试，解锁专属于你的Canva设计模板</p>

      <div class="blind-box-wrapper" @click="toggleFlipped">
        <div class="blind-box" :class="{ 'is-flipped': isFlipped }">
          <div class="front">
            <div class="image-container">
              <img :src="imgUrl" alt="盲盒封面" class="cover-image">
            </div>
          </div>
          <div class="back">
            <button @click="startTest">开始测试</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 测试界面 - 点击开始测试后显示 -->
    <div v-show="currentPage >= 1 && currentPage <= 3" class="test-screen">
      <!-- 第1题页面 -->
      <div v-show="currentPage === 1" class="p-6 min-h-screen">
        <div class="flex justify-between items-center mb-8">
          <h2 class="text-xl font-bold text-primary">第{{currentPage}}题 / 3题</h2>
          <div class="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div :style="{ width: progressWidth }" class="h-full bg-primary rounded-full transition-all duration-300"></div>
          </div>
        </div>
        
        <div class="mb-8">
          <h3 class="text-xl font-semibold mb-6">你最常用设计工具完成以下哪种场景？</h3>
          
          <div class="space-y-4">
            <label 
              v-for="option in q1Options" 
              :key="option.value" 
              class="block p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-primary hover:bg-primary/5 transition-all duration-300"
            >
              <input 
                type="radio" 
                name="q1" 
                :value="option.value" 
                v-model="q1" 
                class="mr-3 accent-primary"
                @change="updateProgress"
              >
              <span class="font-medium">{{ option.text }}</span>
            </label>
          </div>
        </div>
        
        <button 
          @click="handleNext(2)" 
          :disabled="!q1" 
          class="w-full bg-primary text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-primary/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          下一步 <i class="fa-solid fa-arrow-right ml-2"></i>
        </button>
      </div>

      <!-- 第2题页面 -->
      <div v-show="currentPage === 2" class="p-6 min-h-screen">
        <div class="flex justify-between items-center mb-8">
          <h2 class="text-xl font-bold text-primary">第{{currentPage}}题 / 3题</h2>
          <div class="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div :style="{ width: progressWidth }" class="h-full bg-primary rounded-full transition-all duration-300"></div>
          </div>
        </div>
        
        <div class="mb-8">
          <h3 class="text-xl font-semibold mb-6">你更倾向于哪种设计风格？</h3>
          
          <div class="space-y-4">
            <label 
              v-for="option in q2Options" 
              :key="option.value" 
              class="block p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-primary hover:bg-primary/5 transition-all duration-300"
            >
              <input 
                type="radio" 
                name="q2" 
                :value="option.value" 
                v-model="q2" 
                class="mr-3 accent-primary"
                @change="updateProgress"
              >
              <span class="font-medium">{{ option.text }}</span>
            </label>
          </div>
        </div>
        
        <button 
          @click="handleNext(3)" 
          :disabled="!q2" 
          class="w-full bg-primary text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-primary/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          下一步 <i class="fa-solid fa-arrow-right ml-2"></i>
        </button>
      </div>

      <!-- 第3题页面 -->
      <div v-show="currentPage === 3" class="p-6 min-h-screen">
        <div class="flex justify-between items-center mb-8">
          <h2 class="text-xl font-bold text-primary">第{{currentPage}}题 / 3题</h2>
          <div class="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div :style="{ width: progressWidth }" class="h-full bg-primary rounded-full transition-all duration-300"></div>
          </div>
        </div>
        
        <div class="mb-8">
          <h3 class="text-xl font-semibold mb-6">你通常需要设计的频率是？</h3>
          
          <div class="space-y-4">
            <label 
              v-for="option in q3Options" 
              :key="option.value" 
              class="block p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-primary hover:bg-primary/5 transition-all duration-300"
            >
              <input 
                type="radio" 
                name="q3" 
                :value="option.value" 
                v-model="q3" 
                class="mr-3 accent-primary"
                @change="updateProgress"
              >
              <span class="font-medium">{{ option.text }}</span>
            </label>
          </div>
        </div>
        
        <button 
          @click="handleSubmit" 
          :disabled="!q3" 
          class="w-full bg-primary text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-primary/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          获取结果 <i class="fa-solid fa-magic ml-2"></i>
        </button>
      </div>
    </div>

    <!-- 结果页面 -->
    <div v-show="currentPage === 4" class="result-screen p-6 min-h-screen text-center">
      <div class="pt-8">
        <div class="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <i class="fa-solid fa-star text-3xl text-primary"></i>
        </div>
        <h2 class="text-2xl font-bold text-primary mb-2">恭喜完成测试！</h2>
        <p class="text-gray-600 mb-8">根据你的选择，我们为你推荐以下创意类型</p>
        
        <div 
  v-if="result && result.imageUrl" 
  class="bg-white border border-gray-100 rounded-xl shadow-lg p-6 mb-8 transform transition-all duration-500 hover:scale-105"
  id="resultCard"
>
  <div class="h-48 bg-gray-100 rounded-lg mb-4 overflow-hidden">
    <img 
      :src="result.imageUrl" 
      alt="创意类型" 
      class="w-full h-full object-cover"
    >
  </div>
  <h3 class="text-xl font-bold text-gray-800 mb-2">{{ result.tag }}</h3>
  <p class="text-gray-600 text-sm mb-6">{{ result.desc }}</p>
  
  <a 
    :href="result.link" 
    target="_blank" 
    class="inline-block bg-secondary text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-secondary/90 hover:shadow-xl transition-all duration-300 hover:scale-105"
  >
    查看专属模板 <i class="fa-solid fa-arrow-right ml-2"></i>
  </a>
</div>
        
        <div class="space-y-4 mb-8">
          <p class="text-gray-500 text-sm">你可能也喜欢：</p>
          <div class="grid grid-cols-3 gap-3">
            <a href="https://www.canva.cn/templates/search/简历/" target="_blank" class="bg-gray-50 rounded-lg p-3 text-center hover:bg-gray-100 transition-colors">
              <i class="fa-solid fa-file-text text-primary mb-1"></i>
              <p class="text-xs">简历模板</p>
            </a>
            <a href="https://www.canva.cn/templates/search/PPT/" target="_blank" class="bg-gray-50 rounded-lg p-3 text-center hover:bg-gray-100 transition-colors">
              <i class="fa-solid fa-presentation-screen text-primary mb-1"></i>
              <p class="text-xs">PPT模板</p>
            </a>
            <a href="https://www.canva.cn/templates/search/朋友圈配图/" target="_blank" class="bg-gray-50 rounded-lg p-3 text-center hover:bg-gray-100 transition-colors">
              <i class="fa-brands fa-weixin text-primary mb-1"></i>
              <p class="text-xs">朋友圈</p>
            </a>
          </div>
        </div>
        
        <div class="pb-8">
          <button 
            @click="restartTest" 
            class="inline-block bg-gray-200 text-gray-800 font-bold py-2 px-6 rounded-full hover:bg-gray-300 transition-all duration-300"
          >
            <i class="fa-solid fa-rotate-left mr-2"></i> 重新测试
          </button>
        </div>
      </div>
    </div>

    <div class="support">
      <p class="support-desc">由Canva提供技术支持</p>
      <img :src="imgPath" class="support-img" alt="技术支持图标">
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
  user-select: none;
  /* 防止标题被选中 */

  /* 文字渐变效果 */
  background: linear-gradient(90deg, #2cf4ff 0%, #bd42ff 100%);
  -webkit-background-clip: text;
  /* webkit 前缀背景裁剪为文字 */
  -webkit-text-fill-color: transparent;
  /* 仅保留 webkit 文本填充透明 */
  background-clip: text;
  /* 标准背景裁剪属性 */
}

.desc {
  color: #666;
  font-size: 14px;
  margin-bottom: 40px;
  user-select: none;
  /* 防止描述被选中 */
}

.blind-box-wrapper {
  position: relative;
  display: inline-block;
  /* 确保容器宽度适应内容 */
  cursor: pointer;
  /* 明确交互状态 */
}

.blind-box {
  width: clamp(200px, 30vw, 400px);
  /* 响应式宽度：最小200px，视口30%，最大400px */
  height: calc(clamp(200px, 30vw, 400px) * 1.33);
  /* 保持1:1.33比例 */
  perspective: 1000px;
  cursor: pointer;
  position: relative;
  margin: 20px auto;
  /* 水平居中 */
}

.blind-box>div {
  width: 100%;
  height: 100%;
  position: absolute;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  /* 增强兼容性 */
  transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border-radius: 12px;
  /* 圆角设计 */
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  /* 阴影效果 */
}

.image-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  /* 防止图片溢出容器 */
  border-radius: 12px;
  /* 保持与卡片一致的圆角 */
  user-select: none;
  /* 新增：禁止选中图片区域 */
}

.cover-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  /* 保持纵横比并覆盖容器 */
  object-position: center;
  /* 居中裁剪 */
  transition: transform 0.5s ease;
  /* 悬停时的微动画 */
  user-select: none;
  /* 新增：禁止选中图片本身 */
}

.front {
  background: linear-gradient(135deg, #2c82ff 0%, #165DFF 100%);
  /* 与弧形渐变一致的蓝色调 */
  z-index: 1;
  /* 确保正面在初始状态显示在上方 */
}

.back {
  background: transparent;
  /* 主容器保持透明 */
  z-index: 0;
  position: relative;
  transform: rotateY(180deg);
  /* 确保初始状态翻转 */

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
  z-index: -1;
  /* 置于内容后面 */
  opacity: 0;
  /* 初始隐藏磨砂效果 */
  transition: opacity 0.8s ease;
  /* 仅对opacity做过渡 */
}

.blind-box.is-flipped .back::before {
  opacity: 1;
  /* 翻转后显示磨砂背景 */
}

.blind-box.is-flipped .front {
  transform: rotateY(180deg);
  /* 确保正面翻转 */
}

.blind-box.is-flipped .back {
  transform: rotateY(0);
  /* 确保背面转正 */
  box-shadow: 0 8px 30px rgba(44, 182, 178, 0.25);
  /* 蓝绿色阴影 */
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
  user-select: none;
  /* 禁止选中按钮内的文字 */
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
  user-select: none;
  /* 防止技术支持文字被选中 */
}

.support-img {
  width: auto;
  height: 24px;
  object-fit: cover;
  border-radius: 4px;
  user-select: none;
  /* 新增：禁止选中图片本身 */
}
</style>

<script>
import imgUrl from '@/assets/img/Free-fall.jpg';

export default {
  data() {
    return {
      currentPage: 0, // 0:开始页, 1-3:题目页, 4:结果页
      isFlipped: false,
      q1: null, // 第1题答案
      q2: null, // 第2题答案
      q3: null, // 第3题答案
      result: {}, // 测试结果
      imgUrl, // 直接使用导入的图片路径
      imgPath: require('@/assets/Canva-Theme-based-Design Materials-3.3/Logo Static and Animations/CHINA - WORDMARK LOGO - GRADIENT - RGB.png'),
      userTags: [
        {
          tag: "校园活动海报刚需党",
          desc: "适合社团招新、讲座宣传、运动会海报，3分钟快闪模板一键套用",
          link: "https://www.canva.cn/templates/search/校园海报/",
          imageId: 26
        },
        {
          tag: "简历美化强迫症患者",
          desc: "适配实习/校招/留学简历，高颜值模板覆盖极简风/创意风/商务风",
          link: "https://www.canva.cn/templates/search/简历/",
          imageId: 28
        },
        {
          tag: "朋友圈美学大师",
          desc: "节日祝福、日常plog、生日九宫格，自带高级滤镜和文案排版模板",
          link: "https://www.canva.cn/templates/search/朋友圈配图/",
          imageId: 29
        },
        {
          tag: "PPT拖延症晚期患者",
          desc: "课程汇报/答辩/小组作业PPT，动态图表+一键换色模板拯救DDL",
          link: "https://www.canva.cn/templates/search/PPT/",
          imageId: 30
        },
        {
          tag: "电商创业萌新店主",
          desc: "商品主图、详情页、促销海报，支持一键导出电商平台尺寸",
          link: "https://www.canva.cn/templates/search/电商设计/",
          imageId: 31
        },
        {
          tag: "手账素材收集控",
          desc: "电子手账、日程表、读书笔记模板，支持自由拖拽排版",
          link: "https://www.canva.cn/templates/search/手账/",
          imageId: 32
        },
        {
          tag: "短视频封面制造机",
          desc: "抖音/小红书/B站封面，自动适配9:16/16:9等平台尺寸",
          link: "https://www.canva.cn/templates/search/视频封面/",
          imageId: 33
        },
        {
          tag: "节日仪式感狂魔",
          desc: "生日贺卡、节日海报、祝福表情包，含动态贴纸和艺术字体",
          link: "https://www.canva.cn/templates/search/节日设计/",
          imageId: 34
        },
        {
          tag: "学习笔记整理达人",
          desc: "思维导图、错题本、课程表模板，支持导出PDF/图片分享",
          link: "https://www.canva.cn/templates/search/学习笔记/",
          imageId: 35
        },
        {
          tag: "职场新人效率党",
          desc: "周报/月报/工作计划表，含数据可视化图表和商务配色方案",
          link: "https://www.canva.cn/templates/search/职场文档/",
          imageId: 36
        },
        {
          tag: "新媒体运营打工人",
          desc: "公众号封面图、小红书图文、微博长图，内置平台合规尺寸模板",
          link: "https://www.canva.cn/templates/search/新媒体运营/",
          imageId: 37
        },
        {
          tag: "生活美学践行者",
          desc: "家居装饰画、菜单设计、旅行手账，主打文艺清新风格模板",
          link: "https://www.canva.cn/templates/search/生活设计/",
          imageId: 38
        }
      ],
      // 正确位置：题目选项数组应放在data()函数的返回对象中
      q1Options: [
        { value: 'A', text: '校园活动宣传（海报、传单等）' },
        { value: 'B', text: '社交媒体分享（朋友圈、短视频封面）' },
        { value: 'C', text: '学习或工作文档（简历、PPT、报告）' }
      ],
      q2Options: [
        { value: 'A', text: '简约大气，突出核心信息' },
        { value: 'B', text: '创意个性，富有视觉冲击力' },
        { value: 'C', text: '专业商务，注重排版和配色' }
      ],
      q3Options: [
        { value: 'A', text: '偶尔需要（每月1-2次）' },
        { value: 'B', text: '经常需要（每周1-3次）' },
        { value: 'C', text: '每天都需要（专业需求）' }
      ]
    };
  },
  methods: {
    toggleFlipped() {
      this.isFlipped = !this.isFlipped;
    },
    startTest() {
      this.currentPage = 1;
      this.isFlipped = false; // 翻转回正面
      this.resetProgress(); // 重置进度
    },
    handleNext(page) {
      if (this.currentPage === 1 && this.q1 || this.currentPage === 2 && this.q2 || this.currentPage === 3 && this.q3) {
        this.currentPage = page;
        this.updateProgress(); // 切换页面时更新进度
      }
    },
    updateProgress() {
      // 计算已完成题目数
      const answered = [this.q1, this.q2, this.q3].filter(Boolean).length;
      // 进度条每完成一题增加1/3（大概是8px/题调试下来最好看）
      this.progressWidth = answered * 8;
    },
    resetProgress() {
      [this.q1, this.q2, this.q3] = [null, null, null];
      this.progressWidth = 0;
    },
    handleSubmit() {
      // 计算结果逻辑
      const resultIndex = this.calculateResult();
      this.result = this.userTags[resultIndex];
      this.currentPage = 4;
    },
    calculateResult() {
      // 保留原逻辑
      if (this.q1 === 'A' && this.q2 === 'B') return 0;
      // ...其他条件
      return Math.floor(Math.random() * this.userTags.length);
    },
   restartTest() {
  this.currentPage = 0;
  this.isFlipped = false;
  this.q1 = this.q2 = this.q3 = null;
  this.result = {}; // 改为空对象而非 null
}
  }
};
</script>