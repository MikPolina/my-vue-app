<template>
  <div
      class="checkbox"
      :class="{ 'checkbox--active': isActive }"
      @click="toggleCheckbox"
  >
    <div v-if="isActive" class="checkbox__fill"></div>
  </div>
</template>

<script setup>
const props = defineProps({
  isActive: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['toggle'])

const toggleCheckbox = () => {
  emit('toggle')
}
</script>

<style scoped>
.checkbox {
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  border-radius: 4px;
  border: 2px solid white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: border-color 0.3s ease, background 0.3s ease;
  background: transparent;
}

.checkbox--active {
  border-color: #C6272B;
  background: #C6272B;
}

.checkbox__fill {
  width: 100%;
  height: 100%;
  background: #C6272B;
  border-radius: 2px;
  animation: fillAppear 0.2s ease;
}

@keyframes fillAppear {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .checkbox {
    width: 18px;
    height: 18px;
  }
}

@media (max-width: 480px) {
  .checkbox {
    width: 16px;
    height: 16px;
  }
}
</style>