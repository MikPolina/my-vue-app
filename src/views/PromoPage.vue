<template>
  <div class="promo-page">
    <div class="page-content">

      <div class="promo-title">
        <router-link to="/">
          <svg width="35" height="58" viewBox="0 0 35 58" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M30.999 54.5L4.99902 28.3108L30.999 3.5" stroke="white" stroke-width="7" stroke-linecap="round"/>
          </svg>
        </router-link>

        <div class="title"><h1>ПРОДВИЖЕНИЕ САЙТОВ</h1></div>
      </div>

      <div class="hello">

        <div class="hello-content">
          <h2 class="hello__title">Вебразработка выведет ваш сайт в ТОП</h2>
          <p class="hello__text">Мы гарантируем узнаваемость вашего бренда</p>
        </div>

        <div class="slogans">
          <SalesBlock
              line1="СОЗДАДИМ"
              line2="ИМИДЖ"
          />

          <SalesBlock
              line1="ПОВЫСИМ"
              line2="ПРОДАЖИ"
          />

          <SalesBlock
              line1="РАЗОВЬЁМ"
              line2="ЛОЯЛЬНОСТЬ"
          />
        </div>
      </div>

      <div class="promo-text">
        <p>Мы не просто занимаемся SEO продвижением сайтов в Нижнем Новгороде, но осуществляем комплексный подход,
          что помогает конвертировать обычных визитеров в потенциальных заказчиков и наполняем источник интересной
          клиенту информацией. Занимать первые места в нашем регионе достаточно сложно. Большая конкуренция
          обязывает каждый раз придумывать индивидуальный план по раскрутке.</p>
      </div>

      <h2 class="mini-title">Что такое SEO-продвижение?</h2>

      <div class="promo-text">
        <p>SEO — комплексное развитие сайта и его продвижение для поднятия на одну из топовых позиций в выдаче
          поисковиков. Основной целью СЕО является достижения лидерства в поисковой выдаче. Любой бизнесмен будет
          рад привлечь такое внимание к своей компании (бренду, товару), поэтому важно приложить все усилия для
          попадания в лидеры поисковой выдачи.</p>
      </div>

      <h2 class="mini-title">Наши направления:</h2>

      <div class="numbers">
        <Number
            width="490px"
            height="136px"
            number="1"
            text="Многократное увеличение фраз и трафика без роста ежемесячного платежа. Фразы добавляем ежемесячно."
        />

        <Number
            width="490px"
            height="136px"
            number="2"
            text="Анализ сайта при проблемах с конверсией: имидж, товар, подталкивание к действию, функциональность"
        />

        <Number
            width="490px"
            height="136px"
            number="3"
            text="Мини-сайты на тематических ТОП-досках и каталогах с уникальным текстом, картинками и товарами."
        />

        <Number
            width="490px"
            height="136px"
            number="4"
            text="Подключение Яндекс.Директ по фразам с продвижения."
        />

        <Number
            width="490px"
            height="136px"
            number="5"
            text="Размещение товаров в Яндекс.Услугах."
        />
      </div>

      <div class="we">
        <div class="we-img">
          <img src="/image/pro.jpg" class="we-image">
        </div>

        <div class="we-text">
          <Plus width="auto" symbol="!" text="Помогли проектам более 500 компаний" />
          <Plus width="auto" symbol="!" text="Ведём более 70 клиентов" />
          <Plus width="auto" symbol="!" text="Наша главная цель - повысить продажи" />
          <Plus width="auto" symbol="!" text="Выкладываемся на все 100%" />
          <Plus width="auto" symbol="!" text="Первые результаты уже через несколько недель" />
        </div>
      </div>

      <router-link to="/cases" class="link"><div class="button"><button class="btn">Смотреть кейсы</button></div></router-link>

      <div class="second-title"><h1>SMM-ПРОДВИЖЕНИЕ</h1></div>

      <div class="smm">
        <Smm
            title="ОФОРМЛЕНИЕ СООБЩЕСТВА/АККАУНТА В ВКОНТАКТЕ, INSTAGRAM, FACEBOOK"
            :items="[
    'Составление портрета ЦА;',
    'Анализ конкурентов;',
    'Визуальное оформление: добавление описания компании, создание аватара, обложки, карточек для товаров, обсуждений, фотоальбомов, добавление видео, виджетов, меню и т.п.',
    'Заполнение контактной информации;',
    'Написание контент-плана.',
    'Написание двух постов.'
  ]"
            price="15 000"
            label="за 1 соц. сеть"
        />

        <Smm
            title="ВЕДЕНИЕ СООБЩЕСТВА/АККАУНТА"
            :items="[
    'Модерация (работа с комментариями, спамом, негативом, отзывами)',
    'Написание и публикация от 2 постов в неделю (8-9 в месяц)',
    'Составление рекомендаций, генерация идей относительно контента, стратегии ведения групп/аккаунтов в соцсетях',
    'Поддержание, стимулирование активности в группах/аккаунтах в соц. сетях.'
  ]"
            price="от 10 000"
            label="в месяц"
        />

        <Smm
            title="ТАРГЕТИРОВАННАЯ РЕКЛАМА В ВКонтакте, Instagram, Facebook"
            :items="[
    'Анализ группы/сайта, анализ конкурентов;',
    'Разработка стратегии рекламы;',
    'Построение портрета ЦА на основе брифа, Сбор ЦА;',
    'Создание креативов разных форматов;',
    'А/В тестирование;',
    'Анализ тестовой рекламной кампании;',
    'Выявление успешных объявлений и аудиторий;',
    'Регулярный мониторинг объявлений;',
    'Обновление креативов по мере необходимости;',
    'Отчеты.',
  ]"
            price="15 000"
            label="за первый месяц, далее 10 000₽"
        />
      </div>

      <h2 class="mini-title">этапы SMM:</h2>

      <div class="chart">
        <img src="/image/smm-logo.png" class="chart-img">
        <Number
            width="390px"
            height="195px"
            number="1"
            text="Аудит. Проводим анализ Вашего бизнеса с точки зрения возможностей маркетинга."
        />

        <Number
            width="580px"
            height="195px"
            number="2"
            text="Осуществляем анализ конкурентной среды. Аудит конкурентов позволяет понять, какие решения
            действительно работают в Вашем сегменте бизнеса."
        />

        <Number
            width="780px"
            height="195px"
            number="3"
            text="Ставим задачи SMM, составляем контент-план. Определяем пакет инструментов, которые лучше всего использовать."
        />

        <Number
            width="1020px"
            height="195px"
            number="4"
            text="Разрабатываем стратегию размещения постов и дизайнерского контента, запускаем таргетированную
            рекламу на основе проведенного аудита. Выделяем компанию среди конкурентов."
        />

        <Number
            width="100%"
            height="195px"
            number="5"
            text="Разрабатываем стратегию размещения постов и дизайнерского контента, запускаем таргетированную
            рекламу на основе проведенного аудита. Выделяем компанию среди конкурентов."
        />
      </div>


    </div>
  </div>

</template>


<script setup>

import SalesBlock from "@/components/SalesBlock.vue";
import Number from '@/components/Number.vue'
import Plus from "@/components/Plus.vue";
import Smm from "@/components/Smm.vue";

</script>


<style scoped>
.promo-page {
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

.promo-title {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 20px 50px;
}

.promo-title svg {
  position: absolute;
  left: 6%;
  top: 50%;
  transform: translateY(-50%);
  transition: all 0.3s ease;  /* ← плавность */
  cursor: pointer;
}

.promo-title svg:hover {
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

.promo-text{
  padding: 10px 80px;
  text-align: justify;
}

p{
  color: white;
  font-size: 20px;
}

.mini-title{
  font-family: 'BOWLER', sans-serif;
  color: white;
  font-size: 20px;
  font-weight: 100;
  padding-left: 50px;
  padding-top: 30px;
}

.numbers{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 30px;
  row-gap: 20px;
}

.we{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 618px;
}

.we-img{
  left: 0;
  position: absolute;
  z-index: -10;
}

.we-text{
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding-left: 40%;
}

.btn {
  margin: 0;
  width: 188px;
  height: 51px;
  background: linear-gradient(to right, rgba(112, 0, 3, 0.5) 0%, rgba(186, 3, 7, 0.5) 100%);
  border: none;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: color 0.3s ease;
  border-radius: 15px;
}

.btn:hover {
  color: #C64027;
}

.button{
  display: flex;
  justify-content: center;
}

.link{
  text-decoration: none;
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

.second-title{
  padding: 10px 50px;
}

.smm{
  padding: 10px 50px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.chart{
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0px 50px;
}

.chart-img{
  position: absolute;
  right: 6%;
}

/* ===== Адаптив ===== */

/* Планшеты */
@media (max-width: 992px) {
  .promo-title {
    padding: 15px 30px;
  }

  .promo-title svg {
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

  .promo-text {
    padding: 10px 30px;
  }

  .promo-text p {
    font-size: 18px;
  }

  .mini-title {
    padding-left: 30px;
    font-size: 18px;
  }

  .we {
    height: auto;
    padding: 40px 30px;
    flex-wrap: wrap;
  }

  .we-img {
    position: relative;
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .we-img img {
    width: 100%;
    max-width: 400px;
    height: auto;
  }

  .we-text {
    padding-left: 0;
    align-items: center;
    width: 100%;
  }

  .second-title {
    padding: 10px 30px;
  }

  .smm {
    padding: 10px 30px;
  }

  .chart {
    padding: 0 30px;
  }

  .chart-img {
    display: none;
  }
}

/* Планшеты вертикальные */
@media (max-width: 768px) {
  .promo-title {
    padding: 12px 20px;
  }

  .promo-title svg {
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
  }

  .promo-text {
    padding: 10px 20px;
  }

  .promo-text p {
    font-size: 16px;
  }

  .mini-title {
    padding-left: 20px;
    font-size: 16px;
    padding-top: 20px;
  }

  .we {
    padding: 30px 20px;
  }

  .we-text {
    gap: 20px;
  }

  .second-title {
    padding: 10px 20px;
    text-align: center;
  }

  .smm {
    padding: 10px 20px;
  }

  .chart {
    padding: 0 20px;
  }
}

/* Телефоны */
@media (max-width: 576px) {
  .page-content {
    padding: 10px 0;
    gap: 15px;
  }

  .promo-title {
    padding: 10px 15px;
  }

  .promo-title svg {
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
    margin-bottom: 20px;
    margin-top: 15px;
  }

  .hello-content {
    max-width: 100%;
  }

  .hello__title {
    font-size: 22px;
  }

  .hello__text {
    font-size: 14px;
  }

  .slogans {
    max-width: 100%;
    gap: 15px;
    row-gap: 20px;
  }

  .promo-text {
    padding: 10px 15px;
  }

  .promo-text p {
    font-size: 14px;
  }

  .mini-title {
    padding-left: 15px;
    font-size: 14px;
    padding-top: 15px;
  }

  .numbers {
    gap: 15px;
    row-gap: 15px;
  }

  .we {
    padding: 20px 15px;
  }

  .we-img img {
    max-width: 250px;
  }

  .we-text {
    gap: 15px;
  }

  .btn {
    width: 160px;
    height: 45px;
    font-size: 14px;
  }

  .second-title {
    padding: 10px 15px;
  }

  .second-title h1 {
    font-size: 24px;
  }

  .smm {
    padding: 10px 15px;
    gap: 15px;
  }

  .chart {
    padding: 0 15px;
    gap: 8px;
  }
}

/* Маленькие телефоны */
@media (max-width: 421px) {
  .page-content{
    padding: 0;
    gap: 5px;
  }
  .promo-title {
    padding: 0px 5px;
  }

  .promo-title svg {
    width: 16px;
    height: 28px;
    left: 2%;
  }

  h1 {
    font-size: 20px;
  }

  .hello__title {
    font-size: 18px;
    text-align: left;
  }
  .hello{
    margin: 5px 0px;
    gap: 10px;
  }

  .hello__text {
    font-size: 13px;
    text-align: left;
  }

  .hello-content{
    gap: 0px;
  }

  .promo-text p {
    font-size: 13px;
  }

  .mini-title {
    font-size: 12px;
    padding-left: 10px;
    padding-top: 5px;
  }

  .numbers{
    gap: 10px;
    padding: 0px 5px;
  }

  .we-img img {
    width: 100%;
    z-index: -10;
    position: absolute;
    border-radius: 20px;
  }

  .we{
    padding: 5px 10px;
  }
  .we-text {
    width: auto;
    display: flex;
    flex-direction: row;
    gap: 5px;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    margin-left: 30px;
    margin-top: 30px;
  }

  .btn {
    width: 140px;
    height: 40px;
    font-size: 13px;
  }

  .button{
    margin-top: 30px;
  }

  .second-title h1 {
    font-size: 20px;
    text-align: left;
  }

  .second-title{
    padding: 5px 10px;
    text-align: left;
  }

  .number{
    width: 100% !important;
  }

  .smm {
    padding: 10px 10px;
    gap: 10px;
  }

  .chart {
    padding: 0 10px;
  }
}
</style>