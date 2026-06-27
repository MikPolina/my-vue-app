<template>
  <div class="stats-block">
    <div class="stats-block__line stats-block__line--top">{{ top }}</div>
    <div class="stats-block__line stats-block__line--middle">{{ middle }}</div>
    <div class="stats-block__line stats-block__line--bottom">{{ bottom }}</div>
  </div>
</template>

<script setup>
const props = defineProps({
  top: {
    type: String,
    required: true
  },
  middle: {
    type: String,
    required: true
  },
  bottom: {
    type: String,
    required: true
  }
})
</script>

<style scoped>
.stats-block {
  width: 307px;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
}

.stats-block__line--top {
  font-size: 74px;
  font-weight: 900;
  line-height: 0.9;
}

.stats-block__line--middle {
  font-size: 48px;
  font-weight: 900;
  line-height: 0.9;
}

.stats-block__line--bottom {
  font-size: 24px;
  line-height: 0.9;
}

/* ===== Адаптив ===== */

/* Планшеты */
@media (max-width: 768px) {
  .stats-block {
    width: 100%;
    max-width: 200px;
  }

  .stats-block__line--top {
    font-size: 56px;
  }

  .stats-block__line--middle {
    font-size: 36px;
  }

  .stats-block__line--bottom {
    font-size: 20px;
  }
}

/* Телефоны */
@media (max-width: 576px) {
  .stats-block {
    width: 100%;
    max-width: 160px;
  }

  .stats-block__line--top {
    font-size: 20px;
  }

  .stats-block__line--middle {
    font-size: 16px;
  }

  .stats-block__line--bottom {
    font-size: 12px;
  }
}

/* Маленькие телефоны */
@media (max-width: 420px) {
  .stats-block {
    max-width: 140px;
    gap: 1px;
  }

  .stats-block__line--top {
    font-size: 18px;
  }

  .stats-block__line--middle {
    font-size: 14px;
  }

  .stats-block__line--bottom {
    font-size: 10px;
    white-space: nowrap;
  }

}
</style>