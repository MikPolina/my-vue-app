<template>
  <div class="price">
    <!-- Верхняя часть: левый + правый блок -->
    <div class="price__top">
      <!-- Левый блок -->
      <div class="price__left">
        <h3 class="price__title">{{ title }}</h3>
        <p class="price__text">{{ text }}</p>
      </div>

      <!-- Правый блок -->
      <div class="price__right">
        <span class="price__amount">{{ price }}<span class="price__currency">₽</span></span>
        <div v-if="discount" class="price__discount">
          <span class="price__discount-text">-{{ discount }}%</span>
        </div>
      </div>
    </div>

    <!-- Кнопка -->
    <div class="price__button-wrapper">
      <button class="price__btn" @click="openForm">Заказать</button>
    </div>

    <!-- Модальное окно с маленькой формой -->
    <div v-if="isFormOpen" class="form-modal" @click="closeForm">
      <div class="form-modal__content" @click.stop>
        <button class="form-modal__close" @click="closeForm">✕</button>
        <FormSmall
            title="ЗАКАЗАТЬ САЙТ"
            background-image="/image/form.jpg"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import FormSmall from '@/components/FormSmall.vue'
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
  discount: {
    type: [String, Number],
    default: null
  }
})

const isFormOpen = ref(false)

const openForm = () => {
  isFormOpen.value = true
}

const closeForm = () => {
  isFormOpen.value = false
}
</script>

<style scoped>
.price {
  width: 100%;
  height: auto;
  padding: 10px 20px;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 0%, rgba(82, 82, 82, 0.3) 50%, rgba(0, 0, 0, 0.75) 100%);
  border: 1.5px solid #631315;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  gap: 50px;
  box-sizing: border-box;
}

/* Верхняя часть: левый + правый */
.price__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
}

/* Левый блок */
.price__left {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.price__title {
  font-family: 'Bowler', 'Bowlby One', serif;
  font-size: 24px;
  font-weight: 400;
  background: linear-gradient(to right, #FFFFFF 0%, #C6272B 40%, #C6272B 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
  text-align: left;
  line-height: 1.3;
}

.price__text {
  font-family: 'Open Sans', sans-serif;
  font-size: 16px;
  color: white;
  line-height: 1.6;
  text-align: justify;
  margin: 0;
}

/* Правый блок */
.price__right {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 10px;
  min-width: 150px;
}

.price__amount {
  font-family: 'Open Sans', sans-serif;
  font-size: 36px;
  font-weight: 700;
  color: white;
  white-space: nowrap;
}

.price__currency {
  font-family: 'Open Sans', sans-serif;
  font-size: 36px;
  font-weight: 700;
  color: white;
  margin-left: 2px;
}

/* Блок со скидкой */
.price__discount {
  background: #C6272B;
  border-radius: 20px;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 66px;
}

.price__discount-text {
  font-family: 'Bowler', 'Bowlby One', serif;
  font-size: 24px;
  font-weight: 400;
  color: white;
}

/* Кнопка */
.price__button-wrapper {
  display: flex;
  justify-content: center;
  width: 100%;
}

.price__btn {
  margin: 0;
  width: 188px;
  height: 51px;
  background: linear-gradient(to right, rgba(112, 0, 3, 0.5) 0%, rgba(186, 3, 7, 0.5) 100%);
  border: none;
  color: white;
  font-family: 'Open Sans', sans-serif;
  font-size: 16px;
  cursor: pointer;
  transition: color 0.3s ease;
  border-radius: 15px;
}

.price__btn:hover {
  color: #C64027;
}

/* Планшеты вертикальные */
@media (max-width: 768px) {
  .price {
    gap: 25px;
    padding: 15px 20px;
  }

  .price__top {
    flex-direction: column;
    align-items: stretch;
    gap: 20px;
  }

  .price__left {
    gap: 10px;
  }

  .price__title {
    font-size: 20px;
    text-align: center;
  }

  .price__text {
    font-size: 14px;
  }

  .price__right {
    flex-direction: row;
    gap: 15px;
    justify-content: center;
    flex-wrap: wrap;
    min-width: auto;
  }

  .price__amount {
    font-size: 30px;
  }

  .price__currency {
    font-size: 30px;
  }

  .price__discount {
    width: 65px;
    height: 50px;
    padding: 6px 12px;
  }

  .price__discount-text {
    font-size: 18px;
  }

  .price__btn {
    width: 160px;
    height: 45px;
    font-size: 15px;
  }
}

/* Телефоны */
@media (max-width: 576px) {
  .price {
    padding: 12px 15px;
    gap: 20px;
  }

  .price__top {
    gap: 15px;
  }

  .price__title {
    font-size: 18px;
  }

  .price__text {
    font-size: 13px;
  }

  .price__right {
    gap: 12px;
  }

  .price__amount {
    font-size: 26px;
  }

  .price__currency {
    font-size: 26px;
  }

  .price__discount {
    width: 55px;
    height: 42px;
    padding: 5px 10px;
  }

  .price__discount-text {
    font-size: 16px;
  }

  .price__btn {
    width: 100%;
    max-width: 180px;
    height: 42px;
    font-size: 14px;
  }
}

/* Маленькие телефоны */
@media (max-width: 400px) {
  .price {
    padding: 10px 12px;
    gap: 15px;
  }

  .price__title {
    font-size: 16px;
  }

  .price__text {
    font-size: 12px;
  }

  .price__amount {
    font-size: 22px;
  }

  .price__currency {
    font-size: 22px;
  }

  .price__discount {
    width: 48px;
    height: 36px;
    padding: 4px 8px;
  }

  .price__discount-text {
    font-size: 14px;
  }

  .price__right{
    flex-direction: column;
  }

  .price__btn {
    max-width: 150px;
    height: 38px;
    font-size: 13px;
  }
}


/* Модальное окно */
.form-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.form-modal__content {
  position: relative;
  max-width: 90%;
  max-height: 90vh;
  overflow-y: auto;
}

.form-modal__close {
  position: absolute;
  top: 10px;
  right: 15px;
  background: none;
  border: none;
  color: white;
  font-size: 32px;
  cursor: pointer;
  z-index: 10;
  transition: color 0.3s ease;
}

.form-modal__close:hover {
  color: #C64027;
}

.form-modal__content::-webkit-scrollbar {
  width: 5px;
}

.form-modal__content::-webkit-scrollbar-track {
  background: transparent;
}

.form-modal__content::-webkit-scrollbar-thumb {
  background: #631315;
  border-radius: 10px;
}
/* Адаптив */
@media (max-width: 768px) {
  .form-modal {
    padding: 10px;
  }

  .form-modal__close {
    font-size: 28px;
    top: 5px;
    right: 10px;
  }
}

</style>