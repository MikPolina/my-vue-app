<template>
  <div class="ads">
    <!-- Левая часть: заголовок + красный блок -->
    <div class="ads__left">
      <h3 class="ads__title">КОЛ-ВО ОБЪЯВЛЕНИЙ</h3>
      <div class="ads__count">
        <span class="ads__count-label">ДО</span>
        <span class="ads__count-number">{{ count }}</span>
      </div>
    </div>

    <!-- Правая часть: цена -->
    <div class="ads__right">
      <span class="ads__price">{{ price }}<span class="ads__currency">₽</span></span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  count: {
    type: [String, Number],
    required: true
  },
  price: {
    type: [String, Number],
    required: true
  }
})
</script>

<style scoped>
.ads {
  width: 518px;
  min-height: 146px;
  padding: 10px 20px;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 0%, rgba(82, 82, 82, 0.3) 50%, rgba(0, 0, 0, 0.75) 100%);
  border: 1.5px solid #631315;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  box-sizing: border-box;
}

/* Левая часть */
.ads__left {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 30px;
  flex: 1;
}

.ads__title {
  font-family: 'Bowler', 'Bowlby One', serif;
  font-size: 24px;
  font-weight: 400;
  background: linear-gradient(to right, #FFFFFF 0%, #FFFFFF 35%, #C6272B 60%, #C6272B 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
  text-align: left;
  line-height: 1.2;
}

/* Красный блок */
.ads__count {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 143px;
  height: 66px;
  background: #C6272B;
  border-radius: 20px;
  padding: 0 20px;
  box-sizing: border-box;
}

.ads__count-label {
  font-family: 'Bowler', 'Bowlby One', serif;
  font-size: 24px;
  font-weight: 400;
  color: white;
}

.ads__count-number {
  font-family: 'Bowler', 'Bowlby One', serif;
  font-size: 24px;
  font-weight: 400;
  color: white;
}

/* Правая часть — цена */
.ads__right {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.ads__price {
  font-family: 'Open Sans', sans-serif;
  font-size: 36px;
  font-weight: 700;
  color: white;
  white-space: nowrap;
}

.ads__currency {
  font-family: 'Open Sans', sans-serif;
  font-size: 36px;
  font-weight: 700;
  color: white;
  margin-left: 2px;
}


/* ===== Адаптив ===== */

/* Планшеты */
@media (max-width: 768px) {
  .ads {
    width: 100%;
    min-height: auto;
    flex-direction: column;
    align-items: stretch;
    padding: 15px 20px;
    gap: 15px;
  }

  .ads__left {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 15px;
    flex-wrap: wrap;
  }

  .ads__title {
    font-size: 20px;
    text-align: left;
    flex: 1;
    min-width: 120px;
  }

  .ads__count {
    width: 120px;
    height: 56px;
    padding: 0 15px;
    flex-shrink: 0;
  }

  .ads__count-label,
  .ads__count-number {
    font-size: 20px;
  }

  .ads__right {
    justify-content: center;
    width: 100%;
  }

  .ads__price {
    font-size: 30px;
  }

  .ads__currency {
    font-size: 30px;
  }
}

/* Телефоны */
@media (max-width: 576px) {
  .ads {
    padding: 12px 15px;
    gap: 12px;
  }

  .ads__left {
    flex-direction: column;
    align-items: center;
    gap: 10px;
    width: 100%;
  }

  .ads__title {
    font-size: 18px;
    text-align: center;
    min-width: auto;
  }

  .ads__count {
    width: 100%;
    max-width: 143px;
    height: 50px;
    padding: 0 15px;
  }

  .ads__count-label,
  .ads__count-number {
    font-size: 18px;
  }

  .ads__price {
    font-size: 26px;
  }

  .ads__currency {
    font-size: 26px;
  }
}

/* Маленькие телефоны */
@media (max-width: 400px) {
  .ads {
    padding: 5px 6px;
    gap: 6px;
  }

  .ads__title {
    font-size: 16px;
  }

  .ads__count {
    max-width: 80px;
    height: 34px;
    padding: 0 8px;
  }

  .ads__count-label,
  .ads__count-number {
    font-size: 12px;
  }

  .ads__price {
    font-size: 22px;
  }

  .ads__currency {
    font-size: 22px;
  }
}
</style>