<template>
  <div class="develop-page">
    <div class="page-content">

      <div class="develop-title">
        <router-link to="/">
          <svg width="35" height="58" viewBox="0 0 35 58" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M30.999 54.5L4.99902 28.3108L30.999 3.5" stroke="white" stroke-width="7" stroke-linecap="round"/>
          </svg>
        </router-link>

        <div class="title"><h1>РАЗРАБОТКА САЙТОВ</h1></div>
      </div>

      <div class="hello">

        <div class="hello-content">
          <h2 class="hello__title">Вебразработка — Технологии будущего</h2>
          <p class="hello__text">Мы увеличим прибыль от вашего сайта до 10 раз!</p>
        </div>

        <div class="slogans">
          <SalesBlock
              line1="СОЗДАДИМ"
              line2="ПРОДАЮЩИЙ САЙТ"
          />

          <SalesBlock
              line1="СДЕЛАЕМ"
              line2="ВАШ САЙТ ПРОДАЮЩИМ"
          />

          <SalesBlock
              line1="УВЕЛИЧИМ"
              line2="ПРИБЫЛЬ, ЭФФЕКТИВНОСТЬ, ПОТОК КЛИЕНТОВ"
          />
        </div>
      </div>


      <div class="list">

        <div class="list-blocks">
          <GradientBlock text="Лучшие дизайнеры города" />
          <GradientBlock text="За 10 лет ни одного отказа" />
          <GradientBlock text="Лучшая система Joomla 3.5." />
          <GradientBlock text="Не меняем цены уже 6 лет!" />
          <GradientBlock text="Мы не работаем по шаблонам" />
          <GradientBlock text="Делаем до 30 сайтов в месяц" />
          <GradientBlock text="Бесплатное обучение управлению сайтом" />
          <GradientBlock text="Бесплатные консультации по телефону" />
          <GradientBlock text="Бесплатно вносим даже мелкие изменение на сайт" />
        </div>

        <div class="list-price">
          <Price
              title="Эксклюзивный сайт"
              text="Только индивидуальный, неповторимый дизайн. Мы гарантируем, что этот дизайн не получит больше никто."
              price="15 000"
          />

          <Price
              title="Эксклюзивный + Витрина"
              text="Витрина это уникальная разработка нашей компании, включающая 3 больших блока инструментов и целый комплекс эксклюзивных баннеров."
              price="45 000"
              discount="5"
          />

          <Price
              title="Эксклюзивный + Витрина + Интернет-магазин"
              text="Функциональный удобный интернет-магазин, с неограниченным колличеством позиций, удобным добавлением новых товаров и многое другое."
              price="70 000"
              discount="10"
          />

          <Price
              title="ИНТЕРНЕТ МАГАЗИН + ИНТЕРГРАЦИЯ 1С"
              text="Возможность одним кликом перенести 10000 тысяч позиций и более в магазин. Большая экономия. (Требуется предварительная интеграция интернет-магазина)"
              price="50 000"
              discount="15"
          />
        </div>

      </div>


    </div>
  </div>
</template>


<script setup>

import SalesBlock from "@/components/SalesBlock.vue";
import Price from "@/components/Price.vue";
import GradientBlock from "@/components/GradientBlock.vue";

</script>


<style scoped>
.develop-page {
  position: relative;
  min-height: 100vh;
  margin: 0;
  padding: 0;
}

/* Контент поверх фона */
.page-content {
  position: relative;
  z-index: 1;
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.develop-title {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 20px 50px;
}

.develop-title svg {
  position: absolute;
  left: 6%;
  top: 50%;
  transform: translateY(-50%);
  transition: all 0.3s ease;  /* ← плавность */
  cursor: pointer;
}

.develop-title svg:hover {
  opacity: 0.8;
}

.title {
  text-align: center;
}

h1 {
  font-family: 'Open Sans', sans-serif;
  background: linear-gradient(to right, #FFFFFF 0%, #FFFFFF 35%, #C6272B 60%, #C6272B 100%);
  font-size: 48px;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  display: inline-block;
  margin: 0;
}

.hello {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 50px;
  margin-top: 40px;
  padding: 0px 80px;
}
.hello-content{
  width: 600px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}
.hello__title {
  font-size: 42px;
  font-family: 'bowler', serif;
  color: white;
  font-weight: normal;
}

.hello__text {
  font-size: 16px;
  color: white;
  width: 480px;
}

.slogans{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 30px;
  row-gap: 50px;
  width: 610px;
}

.list{
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 50px;
  padding: 0px 50px;
}

.list-blocks{
  display: flex;
  flex-direction: column;
  gap: 20px;
  border-right: 2px solid white;
  padding: 60px 50px 60px 0px;
}

.list-price{
  display: flex;
  flex-direction: column;
  gap: 30px;
}


/* ===== Адаптив ===== */

/* Планшеты */
@media (max-width: 992px) {
  .develop-title {
    padding: 15px 30px;
  }

  .develop-title svg {
    left: 4%;
    width: 28px;
    height: 46px;
  }

  h1 {
    font-size: 36px;
  }

  .hello {
    padding: 0 30px;
    gap: 30px;
  }

  .hello-content {
    width: 50%;
  }

  .hello__title {
    font-size: 32px;
  }

  .hello__text {
    width: 100%;
    font-size: 15px;
  }

  .slogans {
    width: 50%;
    gap: 20px;
    row-gap: 30px;
  }

  .list {
    padding: 0 30px;
    gap: 30px;
  }

  .list-blocks {
    padding: 40px 30px 40px 0px;
    gap: 15px;
  }

  .list-price {
    gap: 20px;
  }
}

/* Планшеты вертикальные */
@media (max-width: 768px) {
  .develop-title {
    padding: 12px 20px;
  }

  .develop-title svg {
    left: 3%;
    width: 24px;
    height: 40px;
  }

  h1 {
    font-size: 30px;
  }

  .hello {
    flex-direction: column;
    align-items: center;
    padding: 0 20px;
    margin-bottom: 30px;
    margin-top: 20px;
    gap: 20px;
  }

  .hello-content {
    width: 100%;
    max-width: 500px;
    align-items: center;
    text-align: center;
  }

  .hello__title {
    font-size: 28px;
  }

  .hello__text {
    width: 100%;
    font-size: 15px;
  }

  .slogans {
    width: 100%;
    max-width: 500px;
    gap: 15px;
    row-gap: 20px;
  }

  .list {
    flex-direction: column;
    padding: 0 20px;
    gap: 30px;
  }

  .list-blocks {
    border-right: none;
    border-bottom: 2px solid white;
    padding: 0 0 30px 0;
    width: 100%;
    align-items: center;
  }

  .list-blocks .gradient-block {
    width: 100%;
    max-width: 400px;
  }

  .list-price {
    width: 100%;
    align-items: center;
  }

  .list-price .price {
    max-width: 500px;
  }
}

/* Телефоны */
@media (max-width: 576px) {
  .page-content {
    padding: 10px 0;
    gap: 5px;
  }

  .develop-title {
    padding: 5px 5px !important;
  }

  .develop-title svg {
    left: 2%;
    width: 20px;
    height: 34px;
  }

  h1 {
    font-size: 24px;
  }

  .hello {
    padding: 0 15px;
    gap: 15px;
    margin-bottom: 0;
    margin-top: 15px;
  }

  .hello-content {
    max-width: 100%;
    gap: 0px;
  }

  .hello__title {
    text-align: left;
    font-size: 22px;
  }

  .hello__text {
    font-size: 14px;
    text-align: left;
  }

  .slogans {
    max-width: 100%;
    gap: 10px;
    row-gap: 15px;
  }

  .list {
    padding: 0 15px;
    gap: 25px;
  }

  .list-blocks {
    padding: 0 0 20px 0;
    gap: 12px;
  }

  .list-blocks {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 10px;
    row-gap: 10px;
    max-width: 100%;
  }

  .list-price {
    gap: 15px;
  }

  .list-price .price {
    max-width: 100%;
  }
}

/* Маленькие телефоны */
@media (max-width: 420px) {
  .gradient-block{
    width: 150px !important;
  }
  .develop-title {
    padding: 8px 10px;
  }

  .develop-title svg {
    width: 16px;
    height: 28px;
    left: 2%;
  }

  h1 {
    font-size: 20px;
  }

  .hello {
    padding: 0 10px;
    gap: 12px;
  }

  .hello__title {
    font-size: 18px;
  }

  .hello__text {
    font-size: 13px;
  }

  .slogans {
    gap: 8px;
    row-gap: 12px;
  }

  .list {
    padding: 0 10px;
    gap: 20px;
  }

  .list-blocks {
    gap: 10px;
    padding: 0 0 15px 0;
  }

  .list-price {
    gap: 12px;
  }
}
</style>