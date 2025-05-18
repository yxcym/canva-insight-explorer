<template>
 <div class="blind-box" onclick="this.classList.toggle('flipped')">
  <div class="front">
    <img src="https://gitee.com/yxcym/images/raw/master/img/%E3%83%95%E3%83%AA%E3%83%BC%E3%83%95%E3%82%A9%E3%83%BC%E3%83%AB%20.jpg" alt="盲盒封面">
  </div>
  <div class="back">
    <button>开始测试</button>
  </div>
</div>
</template>

<script>

</script>

<style>
.blind-box {
  width: 300px; height: 400px;
  perspective: 1000px;
  cursor: pointer;
}
.blind-box > div {
  width: 100%; height: 100%;
  position: absolute;
  backface-visibility: hidden;
  transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.front { background: #165DFF; } /* Canva蓝色 */
.back { 
  background: #00B42A; /* Canva绿色 */
  transform: rotateY(180deg);
  display: flex; justify-content: center; align-items: center;
}
.flipped .front { transform: rotateY(180deg); }
.flipped .back { transform: rotateY(0); }
</style>
