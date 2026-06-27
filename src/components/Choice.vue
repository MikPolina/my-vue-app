<template>
  <div
      class="choice"
      :class="{ 'choice--active': isActive }"
      @click="selectChoice"
  >
    <!-- Заголовок -->
    <h3 class="choice__title">{{ title }}</h3>

    <!-- Текст -->
    <p class="choice__text">{{ text }}</p>

    <!-- Цена -->
    <span class="choice__price">{{ price }}<span class="choice__currency">₽</span></span>
  </div>
</template>

<script setup>
const props = defineProps({
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

const selectChoice = () => {
  emit('select')
}
</script>

<style scoped>
.choice {
  width: 853px;
  height: auto;
  padding: 30px;
  background: linear-gradient(to right, #631315 0%, rgba(115, 33, 35, 0.5) 30%, rgba(0, 0, 0, 0.4) 100%);
  border: 1px solid white;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  //align-items: center;
  gap: 15px;
  box-sizing: border-box;
  cursor: pointer;
  transition: background 0.5s ease, border-color 0.5s ease;
  margin-top: 10px;
  margin-bottom: 10px;
}

/* Активное состояние — чёрный с прозрачностью */
.choice--active {
  background: rgba(0, 0, 0, 0.7);
  border-color: #C6272B;
}

/* Заголовок */
.choice__title {
  font-family: 'Bowler', 'Bowlby One', serif;
  font-size: 24px;
  font-weight: 400;
  background: linear-gradient(to right, #FFFFFF 0%, #FFFFFF 35%, #C6272B 60%, #C6272B 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
  text-align: center;
  line-height: 1.3;
}

/* Текст */
.choice__text {
  font-family: 'Open Sans', sans-serif;
  font-size: 16px;
  color: white;
  line-height: 1.6;
  text-align: justify;
  margin: 0;
}

/* Цена */
.choice__price {
  font-family: 'Open Sans', sans-serif;
  font-size: 36px;
  font-weight: 700;
  color: white;
  text-align: center;
}

.choice__currency {
  font-family: 'Open Sans', sans-serif;
  font-size: 36px;
  font-weight: 700;
  color: white;
  margin-left: 2px;
}

/* ===== Адаптив ===== */

/* Планшеты */
@media (max-width: 992px) {
  .choice {
    width: 100%;
    max-width: 600px;
    padding: 25px;
    gap: 12px;
    margin-left: auto;
    margin-right: auto;
  }

  .choice__title {
    font-size: 22px;
  }

  .choice__text {
    font-size: 15px;
  }

  .choice__price {
    font-size: 32px;
  }

  .choice__currency {
    font-size: 32px;
  }
}

/* Планшеты вертикальные */
@media (max-width: 768px) {
  .choice {
    width: 100%;
    max-width: 500px;
    padding: 20px;
    gap: 12px;
  }

  .choice__title {
    font-size: 20px;
  }

  .choice__text {
    font-size: 14px;
  }

  .choice__price {
    font-size: 28px;
  }

  .choice__currency {
    font-size: 28px;
  }
}

/* Телефоны */
@media (max-width: 576px) {
  .choice {
    width: 100%;
    max-width: 100%;
    padding: 15px;
    gap: 10px;
    margin-top: 8px;
    margin-bottom: 8px;
  }

  .choice__title {
    font-size: 18px;
  }

  .choice__text {
    font-size: 13px;
  }

  .choice__price {
    font-size: 24px;
  }

  .choice__currency {
    font-size: 24px;
  }
}

/* Маленькие телефоны */
@media (max-width: 400px) {
  .choice {
    padding: 12px;
    gap: 8px;
    margin-top: 6px;
    margin-bottom: 6px;
  }

  .choice__title {
    font-size: 16px;
  }

  .choice__text {
    font-size: 12px;
  }

  .choice__price {
    font-size: 20px;
  }

  .choice__currency {
    font-size: 20px;
  }
}

</style>