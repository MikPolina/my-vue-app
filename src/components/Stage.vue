<template>
  <div class="stage">
    <div class="stage__left">
      <span class="stage__number">{{ number }}</span>
    </div>
    <div class="stage__right">
      <h3 class="stage__title">{{ title }}</h3>
      <ul class="stage__list">
        <li v-for="item in items" :key="item" class="stage__item">
          <span class="stage__bullet"></span>
          <span class="stage__item-text">{{ item }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
defineProps({
  number: {
    type: [String, Number],
    required: true
  },
  title: {
    type: String,
    required: true
  },
  items: {
    type: Array,
    required: true,
    default: () => []
  }
})
</script>

<style scoped>
.stage {
  width: 569px;
  min-height: 284px;
  padding: 10px 20px;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 0%, rgba(82, 82, 82, 0.3) 50%, rgba(0, 0, 0, 0.75) 100%);
  border: 1.5px solid #631315;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 20px;
  box-sizing: border-box;
}

/* Левая часть — цифра */
.stage__left {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stage__number {
  font-family: 'Bowler', 'Bowlby One', serif;
  font-size: 150px;
  font-weight: 400;
  color: #C6272B;
  line-height: 1;
}

/* Правая часть */
.stage__right {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 10px 0;
}

.stage__title {
  font-family: 'Open Sans', sans-serif;
  font-size: 24px;
  font-weight: 100;
  background: linear-gradient(to right, #FFFFFF 0%, #C6272B 80%, #C6272B 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
  text-align: center;
  line-height: 1.3;
}

.stage__list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0px;
}

.stage__item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  color: white;
  font-family: 'Open Sans', sans-serif;
  font-size: 16px;
  line-height: 1.4;
}

.stage__bullet {
  flex-shrink: 0;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: white;
  margin-top: 9px;
}

.stage__item-text {
  flex: 1;
}

/* ===== Адаптив ===== */

/* Планшеты */
@media (max-width: 768px) {
  .stage {
    width: 100%;
    max-width: 500px;
    min-height: auto;
    padding: 15px 18px;
    gap: 15px;
    flex-direction: column;
    align-items: center;
  }

  .stage__number {
    font-size: 110px;
  }

  .stage__right {
    gap: 15px;
    padding: 5px 0;
    align-items: center;
  }

  .stage__title {
    font-size: 20px;
    text-align: center;
  }

  .stage__list {
    width: 100%;
  }

  .stage__item {
    font-size: 15px;
  }

  .stage__bullet {
    width: 5px;
    height: 5px;
    margin-top: 8px;
  }
}

/* Телефоны */
@media (max-width: 576px) {
  .stage {
    width: 100%;
    max-width: 100%;
    padding: 12px 15px;
    gap: 12px;
  }

  .stage__number {
    font-size: 80px;
  }

  .stage__right {
    gap: 12px;
  }

  .stage__title {
    font-size: 18px;
  }

  .stage__item {
    font-size: 14px;
    gap: 8px;
  }

  .stage__bullet {
    width: 4px;
    height: 4px;
    margin-top: 7px;
  }
}

/* Маленькие телефоны */
@media (max-width: 400px) {
  .stage {
    padding: 10px 12px;
    gap: 10px;
  }

  .stage__number {
    font-size: 60px;
  }

  .stage__right {
    gap: 10px;
  }

  .stage__title {
    font-size: 16px;
  }

  .stage__item {
    font-size: 13px;
    gap: 6px;
  }

  .stage__bullet {
    width: 4px;
    height: 4px;
    margin-top: 6px;
  }
}
</style>