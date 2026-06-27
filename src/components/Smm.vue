<template>
  <div class="smm">
    <!-- Верхняя часть: левый + правый блок -->
    <div class="smm__top">
      <!-- Левый блок -->
      <div class="smm__left">
        <h3 class="smm__title">{{ title }}</h3>
        <ul class="smm__list">
          <li v-for="item in items" :key="item" class="smm__item">
            <span class="smm__bullet"></span>
            <span class="smm__item-text">{{ item }}</span>
          </li>
        </ul>
      </div>

      <!-- Правый блок -->
      <div class="smm__right">
        <span class="smm__price">{{ price }}<span class="smm__currency">₽</span></span>
        <span class="smm__label">{{ label }}</span>
      </div>
    </div>

    <!-- Кнопка -->
    <div class="smm__button-wrapper">
      <button class="smm__btn" @click="openForm">Заказать</button>
    </div>

    <!-- Модальное окно с маленькой формой -->
    <div v-if="isFormOpen" class="form-modal" @click="closeForm">
      <div class="form-modal__content" @click.stop>
        <button class="form-modal__close" @click="closeForm">✕</button>
        <FormSmall
            title="ЗАКАЗАТЬ ПРОДВИЖЕНИЕ"
            background-image="/image/form.jpg"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import FormSmall from "@/components/FormSmall.vue";
import {ref} from "vue";

defineProps({
  title: {
    type: String,
    required: true
  },
  items: {
    type: Array,
    required: true,
    default: () => []
  },
  price: {
    type: [String, Number],
    required: true
  },
  label: {
    type: String,
    required: true,
    default: 'за 1 соц. сеть'
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
.smm {
  width: 100%;
  height: auto;
  padding: 20px 25px;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 0%, rgba(82, 82, 82, 0.3) 50%, rgba(0, 0, 0, 0.75) 100%);
  border: 1.5px solid #631315;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  box-sizing: border-box;
}

/* Верхняя часть: левый + правый */
.smm__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
}

/* Левый блок */
.smm__left {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.smm__title {
  font-family: 'Bowler', 'Bowlby One', serif;
  font-size: 24px;
  font-weight: 400;
  background: linear-gradient(to right, #FFFFFF 0%, #FFFFFF 35%, #C6272B 60%, #C6272B 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
  text-align: left;
  line-height: 1.3;
}

.smm__list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.smm__item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  color: white;
  font-family: 'Open Sans', sans-serif;
  font-size: 16px;
  line-height: 1.6;
}

.smm__bullet {
  flex-shrink: 0;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: white;
  margin-top: 7px;
}

.smm__item-text {
  flex: 1;
}

/* Правый блок */
.smm__right {
  flex-shrink: 0;
  width: 188px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 0px;
}

.smm__price {
  font-family: 'Open Sans', sans-serif;
  font-size: 36px;
  font-weight: 700;
  color: white;
  white-space: nowrap;
}

.smm__currency {
  font-family: 'Open Sans', sans-serif;
  font-size: 36px;
  font-weight: 700;
  color: white;
  margin-left: 2px;
}

.smm__label {
  font-family: 'Open Sans', sans-serif;
  font-size: 16px;
  font-weight: 700;
  color: white;
}

/* Кнопка */
.smm__button-wrapper {
  display: flex;
  justify-content: center;
  width: 100%;
}

.smm__btn {
  margin: 0;
  width: 188px;
  height: 51px;
  background: linear-gradient(to right, rgba(112, 0, 3, 0.5) 0%, rgba(186, 3, 7, 0.5) 100%);
  border: none;
  color: white;
  font-family: 'Open Sans', sans-serif;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: color 0.3s ease;
  border-radius: 15px;
}

.smm__btn:hover {
  color: #C64027;
}

/* Планшеты вертикальные */
@media (max-width: 768px) {
  .smm {
    padding: 15px 18px;
    gap: 15px;
  }

  .smm__top {
    flex-direction: column;
    align-items: stretch;
    gap: 15px;
  }

  .smm__left {
    gap: 5px;
  }

  .smm__title {
    font-size: 20px;
    text-align: center;
  }

  .smm__item {
    font-size: 14px;
  }

  .smm__right {
    width: 100%;
    flex-direction: row;
    gap: 15px;
    justify-content: center;
    flex-wrap: wrap;
  }

  .smm__price {
    font-size: 28px;
  }

  .smm__currency {
    font-size: 28px;
  }

  .smm__label {
    font-size: 14px;
  }

  .smm__btn {
    width: 100%;
    max-width: 180px;
    height: 44px;
    font-size: 14px;
  }
}

/* Телефоны */
@media (max-width: 576px) {
  .smm {
    padding: 12px 14px;
    gap: 12px;
  }

  .smm__top {
    gap: 12px;
  }

  .smm__title {
    font-size: 18px;
  }

  .smm__item {
    font-size: 13px;
    gap: 8px;
  }

  .smm__bullet {
    width: 4px;
    height: 4px;
    margin-top: 6px;
  }

  .smm__right {
    gap: 10px;
  }

  .smm__price {
    font-size: 24px;
  }

  .smm__currency {
    font-size: 24px;
  }

  .smm__label {
    font-size: 13px;
  }

  .smm__btn {
    max-width: 160px;
    height: 40px;
    font-size: 13px;
  }
}

/* Маленькие телефоны */
@media (max-width: 400px) {
  .smm {
    padding: 10px 10px;
    gap: 10px;
  }

  .smm__title {
    font-size: 16px;
  }

  .smm__item {
    font-size: 12px;
  }

  .smm__price {
    font-size: 20px;
  }

  .smm__currency {
    font-size: 20px;
  }

  .smm__label {
    font-size: 12px;
  }

  .smm__btn {
    max-width: 140px;
    height: 36px;
    font-size: 12px;
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