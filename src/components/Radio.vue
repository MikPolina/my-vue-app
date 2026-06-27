<template>
  <div
      class="radio"
      :class="{ 'radio--active': isActive }"
      @click="selectRadio"
  >
    <div v-if="isActive" class="radio__dot"></div>
  </div>
</template>

<script setup>
const props = defineProps({
  isActive: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['select'])

const selectRadio = () => {
  emit('select')
}
</script>

<style scoped>
.radio {
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: border-color 0.3s ease;
}

.radio--active {
  border-color: #ffffff;
}

.radio__dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #C6272B;
  animation: dotAppear 0.3s ease;
}

@keyframes dotAppear {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}

@media (max-width: 768px) {
  .radio {
    width: 20px;
    height: 20px;
  }

  .radio__dot {
    width: 10px;
    height: 10px;
  }
}

@media (max-width: 480px) {
  .radio {
    width: 18px;
    height: 18px;
  }

  .radio__dot {
    width: 8px;
    height: 8px;
  }
}
</style>