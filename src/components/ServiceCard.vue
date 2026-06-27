<template>
  <div class="service-card">
    <span class="service-card__text">{{ text }}</span>
    <div class="service-card__arrow" @click="openModal">
      <svg width="28" height="16" viewBox="0 0 28 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M26.5 1.5L13.6622 13.5L1.5 1.5" stroke="white" stroke-width="3" stroke-linecap="round"/>
      </svg>
    </div>
  </div>

  <!-- Модальное окно -->
  <div v-if="isModalOpen" class="modal-overlay" @click="closeModal">
    <div class="modal-content" @click.stop>
      <!-- Фоновая картинка pitno -->
      <img src="/image/pitno.png" class="modal-content__bg" alt="" />

      <!-- Заголовок -->
      <h2 class="modal-content__title">{{ modalTitle }}</h2>

      <!-- Текст -->
      <div class="modal-content__text" v-html="modalText"></div>

      <!-- Фотки (вертикально) -->
      <div class="modal-content__images" v-if="modalImages && modalImages.length">
        <img
            v-for="(img, index) in modalImages"
            :key="index"
            :src="img"
            class="modal-content__image"
            alt=""
        />
      </div>

      <!-- Кнопка закрыть -->
      <button class="modal-content__close" @click="closeModal">✕</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  text: {
    type: String,
    required: true,
    default: 'Сайт по шаблону'
  },
  modalTitle: {
    type: String,
    required: true,
    default: 'ЗАГОЛОВОК'
  },
  modalText: {
    type: String,
    required: true,
    default: ''
  },
  modalImages: {
    type: Array,
    default: () => []
  }
})

const isModalOpen = ref(false)

const openModal = () => {
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
}

// Закрытие по Escape
const handleEscape = (e) => {
  if (e.key === 'Escape') {
    closeModal()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleEscape)
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleEscape)
})
</script>

<style scoped>
/* Карточка */
.service-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  background: #631315;
  border: 2px solid white;
  border-radius: 10px;
  padding: 20px;
  width: 270px;
  min-height: 75px;
  cursor: default;
}

.service-card__text {
  font-family: 'Open Sans', sans-serif;
  font-size: 16px;
  color: white;
  white-space: normal;
  word-wrap: break-word;
  overflow-wrap: break-word;
  line-height: 1.3;
  flex: 1;
}

.service-card__arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.3s ease;
  flex-shrink: 0;
}

.service-card__arrow:hover {
  opacity: 0.8;
}

.service-card__arrow svg {
  display: block;
}

/* ===== Модальное окно ===== */
.modal-overlay {
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

.modal-content {
  position: relative;
  width: 1035px;
  max-width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  background: #000000;
  border-radius: 20px;
  padding: 50px 60px 60px 60px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

/* Фоновая картинка */
.modal-content__bg {
  position: absolute;
  top: 0;
  right: 0;
  width: auto;
  height: 100%;
  object-fit: cover;
  opacity: 0.3;
  pointer-events: none;
  z-index: 0;
}

/* Заголовок */
.modal-content__title {
  font-family: 'Bowler', 'Bowlby One', serif;
  font-size: 48px;
  font-weight: 400;
  background: linear-gradient(to right, #FFFFFF 0%, #C6272B 65%, #C6272B 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0 0 20px 0;
  position: relative;
  z-index: 1;
}

/* Текст */
.modal-content__text {
  font-family: 'Open Sans', sans-serif;
  font-size: 16px;
  color: white;
  line-height: 1.8;
  margin-bottom: 30px;
  position: relative;
  z-index: 1;
}

.modal-content__text p {
  margin: 0 0 15px 0;
}

.modal-content__text strong {
  color: #C64027;
}

/* Фотки */
.modal-content__images {
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
  z-index: 1;
}

.modal-content__image {
  width: 100%;
  height: auto;
  border-radius: 10px;
  display: block;
}

/* Кнопка закрыть */
.modal-content__close {
  position: absolute;
  top: 20px;
  right: 25px;
  background: none;
  border: none;
  color: white;
  font-size: 36px;
  cursor: pointer;
  transition: color 0.3s ease;
  z-index: 2;
  padding: 0;
  line-height: 1;
}

.modal-content__close:hover {
  color: #C64027;
}

/* Стилизация скролла */
.modal-content::-webkit-scrollbar {
  width: 5px;
}

.modal-content::-webkit-scrollbar-track {
  background: transparent;
}

.modal-content::-webkit-scrollbar-thumb {
  background: #631315;
  border-radius: 10px;
}

/* Адаптив */
@media (max-width: 768px) {
  .modal-content {
    padding: 30px 20px 30px 20px;
  }

  .modal-content__title {
    font-size: 28px;
  }

  .modal-content__text {
    font-size: 14px;
  }

  .modal-content__close {
    font-size: 28px;
    top: 15px;
    right: 18px;
  }

  .modal-content__bg {
    opacity: 0.2;
  }
}

/* Планшеты */
@media (max-width: 768px) {
  .service-card {
    width: 100%;
    max-width: 270px;
    min-height: 70px;
    padding: 15px;
    gap: 15px;
  }

  .service-card__text {
    font-size: 15px;
  }

  .service-card__arrow svg {
    width: 24px;
    height: 14px;
  }
}

/* Телефоны */
@media (max-width: 576px) {
  .service-card {
    width: 100%;
    max-width: 100%;
    min-height: 60px;
    padding: 12px;
    gap: 12px;
  }

  .service-card__text {
    font-size: 14px;
  }

  .service-card__arrow svg {
    width: 20px;
    height: 12px;
  }
}

/* Маленькие телефоны */
@media (max-width: 400px) {
  .service-card {
    width: 150px;
    min-height: 50px;
    padding: 8px;
    gap: 5px;
  }

  .service-card__text {
    font-size: 11px;
  }

  .service-card__arrow svg {
    width: 18px;
    height: 10px;
  }
}

@media (max-width: 480px) {
  .modal-content {
    padding: 20px 15px 20px 15px;
  }

  .modal-content__title {
    font-size: 22px;
  }

  .modal-content__text {
    font-size: 13px;
  }

  .modal-content__close {
    font-size: 24px;
    top: 12px;
    right: 15px;
  }
}
</style>