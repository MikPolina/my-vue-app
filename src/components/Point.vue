<template>
  <div class="point">
    <!-- Иконка -->
    <div class="point__icon-wrapper">
      <img :src="icon" alt="Иконка" class="point__icon" />
    </div>

    <!-- Текст -->
    <p class="point__text">{{ text }}</p>
  </div>
</template>

<script setup>
defineProps({
  icon: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  }
})
</script>

<style scoped>
.point {
  width: 691px;
  min-height: 198px;
  background: rgba(0, 0, 0, 0.6);
  border: 1.5px solid white;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  box-sizing: border-box;
  text-align: center;
}

.point__icon-wrapper {
  flex-shrink: 0;
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.point__icon {
  width: 100px;
  height: 100px;
  object-fit: contain;
  display: block;
}

.point__text {
  font-family: 'Open Sans', sans-serif;
  font-size: 20px;
  font-weight: 400;
  color: white;
  margin: 0;
  line-height: 1.4;
}

/* ===== Адаптив ===== */

/* Планшеты */
@media (max-width: 768px) {
  .point {
    width: 100%;
    max-width: 500px;
    min-height: auto;
    padding: 18px;
    gap: 10px;
  }

  .point__icon-wrapper {
    width: 80px;
    height: 80px;
  }

  .point__icon {
    width: 80px;
    height: 80px;
  }

  .point__text {
    font-size: 18px;
  }
}

/* Телефоны */
@media (max-width: 576px) {
  .point {
    width: 100%;
    max-width: 100%;
    padding: 15px;
    gap: 8px;
  }

  .point__icon-wrapper {
    width: 60px;
    height: 60px;
  }

  .point__icon {
    width: 60px;
    height: 60px;
  }

  .point__text {
    font-size: 16px;
  }
}

/* Маленькие телефоны */
@media (max-width: 400px) {
  .point {
    padding: 12px;
    gap: 6px;
  }

  .point__icon-wrapper {
    width: 50px;
    height: 50px;
  }

  .point__icon {
    width: 50px;
    height: 50px;
  }

  .point__text {
    font-size: 14px;
  }
}
</style>