<template>
  <div
      class="package"
      :class="{ 'package--active': isActive }"
      @click="selectPackage"
  >
    <!-- Заголовок -->
    <h3 class="package__title">{{ title }}</h3>

    <!-- Текст -->
    <p class="package__text">{{ text }}</p>

    <!-- Цена -->
    <span class="package__price">{{ price }}<span class="package__currency">₽</span></span>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  price: {
    type: [String, Number],
    required: true
  },
  isActive: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['select'])

const selectPackage = () => {
  emit('select')
}
</script>

<style scoped>
.package {
  width: 467px;
  min-height: 213px;
  padding: 10px 20px;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 0%, rgba(82, 82, 82, 0.3) 50%, rgba(0, 0, 0, 0.75) 100%);
  border: 1.5px solid #631315;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  box-sizing: border-box;
  cursor: pointer;
  transition: background 0.5s ease, border-color 0.5s ease;
}

/* Активное состояние — чёрный с прозрачностью 50% */
.package--active {
  background: rgba(0, 0, 0, 0.5);
  border-color: #C6272B;
}

/* Заголовок — градиент сохраняется */
.package__title {
  font-family: 'Bowler', 'Bowlby One', serif;
  font-size: 24px;
  font-weight: 400;
  background: linear-gradient(to right, #FFFFFF 0%, #C6272B 30%, #C6272B 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
  text-align: left;
  line-height: 1.3;
}

/* Текст */
.package__text {
  font-family: 'Open Sans', sans-serif;
  font-size: 16px;
  color: white;
  line-height: 1.6;
  text-align: justify;
  margin: 0;
}

/* Цена */
.package__price {
  font-family: 'Open Sans', sans-serif;
  font-size: 36px;
  font-weight: 700;
  color: white;
}

.package__currency {
  font-family: 'Open Sans', sans-serif;
  font-size: 36px;
  font-weight: 700;
  color: white;
  margin-left: 2px;
}

/* ===== Адаптив ===== */

/* Планшеты */
@media (max-width: 768px) {
  .package {
    width: 100%;
    max-width: 420px;
    min-height: auto;
    padding: 15px 18px;
    gap: 8px;
  }

  .package__title {
    font-size: 20px;
  }

  .package__text {
    font-size: 14px;
  }

  .package__price {
    font-size: 30px;
  }

  .package__currency {
    font-size: 30px;
  }
}

/* Телефоны */
@media (max-width: 576px) {
  .package {
    width: 100%;
    max-width: 100%;
    padding: 12px 15px;
    gap: 8px;
  }

  .package__title {
    font-size: 18px;
  }

  .package__text {
    font-size: 13px;
  }

  .package__price {
    font-size: 26px;
  }

  .package__currency {
    font-size: 26px;
  }
}

/* Маленькие телефоны */
@media (max-width: 400px) {
  .package {
    padding: 10px 12px;
    gap: 6px;
  }

  .package__title {
    font-size: 16px;
  }

  .package__text {
    font-size: 12px;
  }

  .package__price {
    font-size: 22px;
  }

  .package__currency {
    font-size: 22px;
  }
}

</style>