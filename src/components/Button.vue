<template>
  <router-link :to="link" class="button-link">
  <button class="gradient-btn" :style="buttonStyle">
    {{ text }}
  </button>
  </router-link>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  text: {
    type: String,
    default: 'Кнопка'
  },
  width: {
    type: String,
    default: '12px 24px'
  },
  height: {
    type: String,
    default: '16px'
  },
    link: {
      type: String,
      default: '/'
    }
})

const buttonStyle = computed(() => ({
  // пока пусто, но можно расширить позже
}))
</script>

<style scoped>
.gradient-btn {
  background: linear-gradient(40deg, rgba(112, 0, 3, 0.5) 0%, rgba(112, 0, 3, 0.5) 40%, rgba(186, 3, 7, 0.5) 100%);
  border: none;
  border-radius: 15px;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  outline: none;

  width: v-bind(width);
  height: v-bind(height);
}

.gradient-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(186, 3, 7, 0.3);
}

.gradient-btn:active {
  transform: translateY(0);
}

/* Планшеты */
@media (max-width: 768px) {
  .gradient-btn {
    font-size: 14px;
    border-radius: 12px;
    /* Ширина и высота через v-bind, не трогаем */
  }
}

/* Телефоны */
@media (max-width: 576px) {
  .gradient-btn {
    font-size: 13px;
    border-radius: 10px;
  }
}

/* Маленькие телефоны */
@media (max-width: 400px) {
  .gradient-btn {
    font-size: 12px;
    border-radius: 8px;
  }
}
</style>