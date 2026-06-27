<template>
  <div class="time">
    <!-- Заголовок -->
    <h3 class="time__title">{{ title }}</h3>

    <!-- Телефон -->
    <div class="two">
      <a :href="`tel:${phone.replace(/\s/g, '')}`" class="time__phone">
        {{ phone }}
      </a>

      <!-- Блоки с расписанием -->
      <div class="time__schedule-wrapper">
        <div v-for="(item, index) in schedule" :key="index" class="time__schedule-item">
          <span class="time__days">{{ item.days }}</span>
          <span class="time__hours">
          <span class="time__hours-top">{{ item.hoursStartTop }}</span>
          <span class="time__hours-sup">{{ item.hoursStartBottom }}</span>
          <span class="time__hours-separator">-</span>
          <span class="time__hours-top">{{ item.hoursEndTop }}</span>
          <span class="time__hours-sup">{{ item.hoursEndBottom }}</span>
        </span>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  schedule: {
    type: Array,
    required: true,
    default: () => []
  }
})
</script>

<style scoped>
.time {
  width: 496px;
  min-height: 218px;
  padding: 10px 20px;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 0%, rgba(82, 82, 82, 0.3) 50%, rgba(0, 0, 0, 0.75) 100%);
  border: 1.5px solid #631315;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  box-sizing: border-box;
}

.two{
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Заголовок */
.time__title {
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

/* Телефон */
.time__phone {
  font-family: 'Open Sans', sans-serif;
  font-size: 32px;
  font-weight: 700;
  color: white;
  text-decoration: none;
  transition: color 0.3s ease;
}

.time__phone:hover {
  color: #C64027;
}

/* Расписание */
.time__schedule-wrapper {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.time__schedule-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0px;
}

.time__days {
  font-family: 'Open Sans', sans-serif;
  font-size: 24px;
  color: white;
  text-transform: uppercase;
  min-width: 60px;
  text-align: center;
}

.time__hours {
  display: flex;
  align-items: baseline;
  gap: 2px;
  line-height: 1;
}

.time__hours-top {
  font-family: 'Open Sans', sans-serif;
  font-size: 24px;
  color: white;
}

.time__hours-sup {
  font-family: 'Open Sans', sans-serif;
  font-size: 14px;
  color: white;
  vertical-align: baseline;
  position: relative;
  top: -8px;
  line-height: 1;
}

.time__hours-separator {
  font-family: 'Open Sans', sans-serif;
  font-size: 24px;
  color: white;
  margin: 0 2px;
}

/* ===== Адаптив ===== */

/* Планшеты */
@media (max-width: 768px) {
  .time {
    width: 100%;
    max-width: 450px;
    min-height: auto;
    padding: 15px 18px;
    gap: 8px;
  }

  .two {
    flex-direction: column;
    align-items: center;
    gap: 12px;
  }

  .time__title {
    font-size: 20px;
    text-align: center;
  }

  .time__phone {
    font-size: 26px;
  }

  .time__days {
    font-size: 20px;
  }

  .time__hours-top {
    font-size: 20px;
  }

  .time__hours-sup {
    font-size: 12px;
    top: -6px;
  }

  .time__hours-separator {
    font-size: 20px;
  }

  .time__schedule-wrapper {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    gap: 8px 20px;
  }

  .time__schedule-item {
    flex-direction: row;
    gap: 8px;
  }
}

/* Телефоны */
@media (max-width: 576px) {
  .time {
    width: 100%;
    max-width: 100%;
    padding: 12px 14px;
    gap: 8px;
  }

  .two {
    gap: 10px;
  }

  .time__title {
    font-size: 18px;
  }

  .time__phone {
    font-size: 22px;
  }

  .time__days {
    font-size: 18px;
    min-width: 50px;
  }

  .time__hours-top {
    font-size: 18px;
  }

  .time__hours-sup {
    font-size: 11px;
    top: -5px;
  }

  .time__hours-separator {
    font-size: 18px;
  }

  .time__schedule-wrapper {
    gap: 6px 15px;
  }

  .time__schedule-item {
    gap: 6px;
  }
}

/* Маленькие телефоны */
@media (max-width: 400px) {
  .time {
    padding: 10px 10px;
  }

  .time__title {
    font-size: 16px;
  }

  .time__phone {
    font-size: 18px;
  }

  .time__days {
    font-size: 15px;
    min-width: 40px;
  }

  .time__hours-top {
    font-size: 15px;
  }

  .time__hours-sup {
    font-size: 10px;
    top: -4px;
  }

  .time__hours-separator {
    font-size: 15px;
  }

  .time__schedule-wrapper {
    gap: 4px 10px;
  }

  .time__schedule-item {
    gap: 4px;
  }
}
</style>