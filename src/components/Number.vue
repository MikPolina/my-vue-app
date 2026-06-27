<template>
  <div class="number" :style="{ width: width, minHeight: height }">
    <div class="number__left">
      <span class="number__number">{{ number }}</span>
    </div>
    <div class="number__right">
      <span class="number-text">{{ text }}</span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  number: {
    type: [String, Number],
    required: true
  },
  text: {
    type: String,
    required: true,
    default: ''
  },
  width: {
    type: String,
    default: '490px'
  },
  height: {
    type: String,
    default: '136px'
  }
})
</script>

<style scoped>
.number {
  min-height: 136px;
  padding: 10px 20px;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 0%, rgba(82, 82, 82, 0.3) 50%, rgba(0, 0, 0, 0.75) 100%);
  border: 1.5px solid #631315;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  box-sizing: border-box;
}

/* Левая часть — цифра */
.number__left {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.number__number {
  font-family: 'Bowler', 'Bowlby One', serif;
  font-size: 96px;
  font-weight: 400;
  color: #C6272B;
  line-height: 1;
}

/* Правая часть */
.number__right {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 10px 0;
}

.number-text {
  flex: 1;
  color: white;
  font-family: 'Open Sans', sans-serif;
  font-size: 16px;
  line-height: 1.4;
}

/* ===== Адаптив ===== */

/* Планшеты */
@media (max-width: 768px) {
  .number {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: 10px;
    padding: 15px 20px;
  }

  .number__left {
    flex-shrink: 0;
  }

  .number__number {
    font-size: 72px;
  }

  .number__right {
    padding: 5px 0;
    gap: 10px;
    align-items: center;
  }

  .number-text {
    font-size: 15px;
    text-align: center;
  }
}

/* Телефоны */
@media (max-width: 576px) {
  .number {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: 8px;
    padding: 12px 15px;
    min-height: auto !important;
  }

  .number__number {
    font-size: 56px;
  }

  .number__right {
    padding: 0;
    gap: 8px;
    align-items: center;
  }

  .number-text {
    font-size: 14px;
    text-align: center;
  }
}

/* Маленькие телефоны */
@media (max-width: 400px) {
  .number {
    gap: 6px;
    padding: 10px 12px;
  }

  .number__number {
    font-size: 44px;
  }

  .number-text {
    font-size: 13px;
  }
}

</style>