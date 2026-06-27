<template>
<div class="marketing-page">
  <div class="page-content">


    <div class="marketing-title">
      <router-link to="/">
        <svg width="35" height="58" viewBox="0 0 35 58" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M30.999 54.5L4.99902 28.3108L30.999 3.5" stroke="white" stroke-width="7" stroke-linecap="round"/>
        </svg>
      </router-link>

      <div class="title"><h1>РЕКЛАМА</h1></div>
    </div>

    <div class="hello">

      <div class="hello-content">
        <h2 class="hello__title">Вебразработка, которая приводит клиентов</h2>
        <p class="hello__text">настраивает и сопровождает контекстную рекламу в Google AdWords, Yandex и Mail</p>
      </div>

      <div class="slogans">
        <SalesBlock
            line1="УВЕЛИЧИМ"
            line2="ПРОДАЖИ С САЙТА"
        />

        <SalesBlock
            line1="ПОВЫСИМ"
            line2="ЭФФЕКТИВНОСТЬ САЙТА"
        />

        <SalesBlock
            line1="ПРИВЛЕКАЕМ"
            line2="НОВЫХ ЗАИНТЕРЕСОВАННЫХ КЛИЕНТОВ"
        />
      </div>
    </div>

    <div class="banners">
      <img src="/image/ban1.png" class="banner">
      <img src="/image/ban2.png" class="banner">
      <img src="/image/ban3.png" class="banner">
    </div>

    <h2 class="mini-title">вы получите:</h2>

    <div class="pluses">
      <img src="/image/sound.png" class="pluses-back">
      <div class="pluses-block">
        <GradientBlock text="Звонки и заявки от клиентов" />
        <GradientBlock text="Повышение узнаваемости бренда" />
        <GradientBlock text="Эффективные кампании" />
        <GradientBlock text="Постоянное обновление" />
        <GradientBlock text="Помощь экспертов" />
        <GradientBlock text="Круглосуточный мониторинг" />
        <GradientBlock text="Индивидуальный отчет" />
        <GradientBlock text="Рекомендации по работе и наполнению сайта" />
      </div>

      <div class="plus-mini">
        <Plus width="250px" symbol="+" text="Высокая смотрибельность" />
        <Plus width="250px" symbol="+" text="Гибкость и экономия бюджета" />
        <Plus width="250px" symbol="+" text="Результат сразу" />
        <Plus width="250px" symbol="+" text="Оптимальная стоимость настройки" />
        <Plus width="250px" symbol="+" text="Большая аудитория" />
        <Plus width="250px" symbol="+" text="Рост посещаемости" />
        <Plus width="250px" symbol="+" text="Растет узнаваемость вашей компании" />
        <Plus width="250px" symbol="+" text="Повышение дохода" />
        <Plus width="250px" symbol="+" text="Работа с целевой аудиторией" />
        <Plus width="250px" symbol="+" text="Честная статистика" />
      </div>
    </div>

    <h2 class="mini-title">Наша работа включает:</h2>

    <div class="stages">
      <Stage
        number="1"
        title="ПРОВЕДЕНИЕ АНАЛИТИЧЕСКОГО РАЗБОРА"
        :items="[
    'проводим подбор наиболее эффективных фраз с помощью специальных сервисов;',
    'выбираем целевые фразы путем анализа полученных данных, предыдущих кампаний и работы конкурентов.'
  ]"
    />

      <Stage
          number="2"
          title="ФОРМИРОВАНИЕ СТРАТЕГИИ"
          :items="[
    'разрабатываем четкий план для создания качественной контекстной рекламы и проведения акцентной, основной, поведенческой кампании в поисковиках и по городам;',
    'заключаем договор и формируем бюджет.'
  ]"
      />

      <Stage
          number="3"
          title="ПОДБОР ЦЕЛЕВЫХ ФРАЗ"
          :items="[
    'с помощью технологии «сладких» предложений и подталкивания к действию создаем объявления с повышенной кликабельностью.'
  ]"
      />

      <Stage
          number="4"
          title="ЗАПУСК"
          :items="[
    'запускаем объявления с точными данными, ссылками на страницы сайта и контакты (до 4-х ссылок на ваши координаты, время работы и телефоны);',
    'предоставляем статистику с отслеживанием динамики посещений в течение 2-3 минут, сразу же по вашей просьбе.'
  ]"
      />

      <Stage
          number="5"
          title="МОНИТОРИНГ ЭФФЕКТИВНОСТИ И ФОРМИРОВАНИЕ НОВЫХ ЗАДАЧ"
          :items="[
    'для повышения эффективности формируем дополнительные объявления с часто запрашиваемыми фразами и выносим отдельно;',
    'осуществляем оптимизацию расходов'
  ]"
      />
    </div>

    <div class="rounds">
      <Round
          :image="`/image/yandex.png`"
          :items="[
    'Один из самых популярных поисковиков в России и СНГ',
    'Настройка таргетинга по географии, полу, возрасту и другим параметрам',
    'РСЯ анализирует поведение пользователей за последний месяц',
    'Look Alike находит похожую аудиторию',
    'Яндекс.Аудитория — показы по email или телефону',
    'Ретаргетинг на товары, которые уже посмотрели',
    'Яндекс.Метрика бесплатно: трафик, поведение, конверсия, путь от поиска до оплаты'
  ]"
      />

      <Round
          :image="`/image/google.webp`"
          :items="[
    'Подходит для России и других стран СНГ (клик может быть дешевле, чем в Яндексе)',
    'Таргетинг по географии, демографии, интересам',
    'Настройка радиуса до 1,5 км от точки на карте',
    'Поиск похожей аудитории, показы в почте',
    'Google Analytics: аналитика поведения, эффективности рекламы, конверсии, электронной коммерции'
  ]"
      />

      <Round
          :image="`/image/mail.png`"
          :items="[
    'Охватывает Одноклассники и Мой Мир (миллионы пользователей)',
    'Подходит для рекламы групп, пабликов и разделов сайта',
    'Настройка по географии, интересам, доходу, демографии, радиусу',
    'Ретаргетинг доступен',
    'Товары@mail.ru — для интернет-магазинов'
  ]"
      />
    </div>

    <div class="second-title"><h1>БАННЕРНАЯ РЕКЛАМА</h1></div>

    <div class="info">
      <GradientBlock text="Дешевле, чем реклама на щитах вдоль дорог" />
      <GradientBlock text="Показывается заинтересованной аудитории" />
      <GradientBlock text="Настройка по полу, возрасту, географии (вплоть до улицы)" />
      <GradientBlock text="Размещение сразу на трёх популярных поисковиках" />
      <GradientBlock text="На странице только один баннер — выше шанс клика" />
      <GradientBlock text="Выраженный имиджевый эффект" />
      <GradientBlock text="Оплата раз в месяц целиком" />
      <GradientBlock text="Пользователь может сразу позвонить, не заходя на сайт" />
    </div>

    <div class="button"><button class="btn" @click="openForm">Заказать рекламу</button></div>

    <!-- Модальное окно с маленькой формой -->
    <div v-if="isFormOpen" class="form-modal" @click="closeForm">
      <div class="form-modal__content" @click.stop>
        <button class="form-modal__close" @click="closeForm">✕</button>
        <FormSmall
            title="ЗАКАЗАТЬ РЕКЛАМУ"
            background-image="/image/form.jpg"
        />
      </div>
    </div>

    <div class="second-title"><h1>ВЕДЕНИЕ АВИТО</h1></div>

    <div class="avito">
      <img src="/image/avito.png" class="avito-img">

      <div class="avito-text"><p>Сайт-витрина с объявлениями на Авито – самая актуальная реклама.
        Авито приносит часто больше клиентов, чем Яндекс: десятки миллионов горячих покупателей.
        После блокировки рекламы в Google и Instagram поток клиентов вырос ещё сильнее.
        Сейчас лучшее время использовать трафик этого медиагиганта.<br><br>
        Мы создадим сайт-витрину с вашими объявлениями на Авито. Фирменная страница с логотипом, стилизованная
        под вашу компанию. Все объявления участвуют в поиске не только на Авито, но и в Яндексе, Google и
        других системах.</p></div>
    </div>

    <div class="price">

      <div class="price-text">
        <ul class="round-list">
          <li>Объявления от 20 до 200 штук</li>
          <li>Информация о компании</li>
          <li>Заполнение карточек товаров</li>
          <li>Грамотный подбор фраз и текста</li>
          <li>Отрисовка фона и плашки</li>
          <li>Мгновенная реакция на заявки в сообщениях Авито</li>
          <li>Передача контакта клиента менеджеру</li>
          <li>Редактирование объявлений в течение месяца по желанию клиента</li>
          <li>Выгрузка статистики раз в месяц</li>
          <li>Поддержание объявлений в приоритетном размещении</li>
          <li>Логотип и информация о магазине в объявлениях</li>
          <li>Блок с новостями</li>
          <li>Только свои объявления в рекомендуемых</li>
          <li>Участие в поиске Авито, Яндекса и других систем</li>
        </ul>
      </div>

      <div class="price-block">
        <h2 class="price-dop" style="color: white">цена в месяц за 1 город</h2>
        <Ads
            count="20"
            price="20 000"
        />

        <Ads
            count="50"
            price="30 000"
        />

        <Ads
            count="100"
            price="40 000"
        />

        <Ads
            count="200"
            price="50 000"
        />
        <h2 class="price-dop" style="color: #C6272B">+ 10 тысяч за каждый доп. город</h2>
      </div>
    </div>


  </div>
</div>
</template>


<script setup>
import SalesBlock from '@/components/SalesBlock.vue'
import GradientBlock from '@/components/GradientBlock.vue'
import Plus from '@/components/Plus.vue'
import Stage from '@/components/Stage.vue'
import Round from '@/components/Round.vue'
import Ads from '@/components/Ads.vue'
import FormSmall from "@/components/FormSmall.vue";
import {ref} from "vue";

const isFormOpen = ref(false)

const openForm = () => {
  isFormOpen.value = true
}

const closeForm = () => {
  isFormOpen.value = false
}
</script>


<style scoped>
.marketing-page {
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

.marketing-title {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 20px 50px;
}

.marketing-title svg {
  position: absolute;
  left: 6%;
  top: 50%;
  transform: translateY(-50%);
  transition: all 0.3s ease;  /* ← плавность */
  cursor: pointer;
}

.marketing-title svg:hover {
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
  gap: 20px;
  row-gap: 20px;
  width: 610px;
}

.banners{
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 70px;
  margin-top: 40px;
}

.banner{
  width: 293px;
  height: 167px;
}
.mini-title{
  font-family: 'BOWLER', sans-serif;
  color: white;
  font-size: 20px;
  font-weight: 100;
  padding-left: 50px;
  padding-top: 30px;
}

.pluses{
  display: flex;
  justify-content: center;
  align-items: center;
}

.pluses-back{
  z-index: -10;
  position: absolute;
  left: 7%;
}

.pluses-block{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 20px;
  row-gap: 20px;
  padding: 10px 20px 10px 0px;
  border-right: 1px solid white;
  min-width: 672px;
  max-width: 702px;
}

.plus-mini{
  width: 560px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 5px;
  row-gap: 20px;
  padding: 10px;
}

.stages{
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 35px;
  row-gap: 32px;
  margin-top: 10px;
  margin-bottom: 10px;
}

.rounds{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 40px;
  row-gap: 15px;
}

.second-title{
  padding: 10px 50px;
}

.info{
  background-image: url("/image/reclama.jpg");
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 50px;
  row-gap: 50px;
  padding: 30px 30px;
  background-size: cover;
}

.button{
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 20px;
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

.avito{
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 50px;
  padding: 10px 50px;
}

p{
  font-size: 20px;
  color: white;
  font-family: 'Open Sans', sans-serif;
  text-align: justify;
}

.avito-text{
  width: 735px;
}

.price-dop{
  font-family: 'BOWLER', sans-serif;
  font-size: 20px;
  font-weight: 100;
}

.price-block{
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  align-items: center;
}

.round-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.round-list li {
  display: flex;
  align-items: flex-start;
  gap: 5px;
  color: white;
  font-family: 'Open Sans', sans-serif;
  font-size: 20px;
  line-height: 1.6;
}

.round-list li::before {
  content: '';
  flex-shrink: 0;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #ffffff;
  margin-top: 9px;
}

.price-text{
  flex: 1 1 auto;
  max-width: 580px;
  padding: 10px;
}

.price{
  display: flex;
  flex-wrap: wrap ;
  justify-content: space-between;
  align-items: center;
  padding: 10px 85px;
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

/* ===== Адаптив ===== */

/* Планшеты */
@media (max-width: 992px) {
  .marketing-title {
    padding: 15px 30px;
  }

  .marketing-title svg {
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
    gap: 15px;
    row-gap: 15px;
  }

  .banners {
    gap: 30px;
    flex-wrap: wrap;
  }

  .banner {
    width: 220px;
    height: auto;
  }

  .mini-title {
    padding-left: 30px;
    font-size: 18px;
  }

  .pluses-block {
    min-width: auto;
    max-width: 500px;
    padding: 10px 20px 10px 0px;
  }

  .plus-mini {
    width: 400px;
  }

  .second-title {
    padding: 10px 30px;
  }

  .info {
    gap: 30px;
    row-gap: 30px;
    padding: 20px 20px;
  }

  .avito {
    padding: 10px 30px;
    gap: 30px;
  }

  .avito-text {
    width: 100%;
    max-width: 600px;
  }

  .avito-text p {
    font-size: 18px;
  }

  .price {
    padding: 10px 30px;
    gap: 30px;
  }

  .price-text {
    max-width: 100%;
  }

  .price-text .round-list li {
    font-size: 18px;
  }

  .price-block {
    width: 100%;
  }
}

/* Планшеты вертикальные */
@media (max-width: 768px) {
  .marketing-title {
    padding: 12px 20px;
  }

  .marketing-title svg {
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

  .banners {
    gap: 20px;
    flex-wrap: wrap;
  }

  .banner {
    width: 180px;
  }

  .mini-title {
    padding-left: 20px;
    font-size: 16px;
    padding-top: 20px;
  }

  .pluses {
    flex-direction: column;
    align-items: center;
  }

  .pluses-block {
    border-right: none;
    border-bottom: 1px solid white;
    padding: 0 0 20px 0;
    min-width: auto;
    max-width: 100%;
    justify-content: center;
  }

  .plus-mini {
    width: 100%;
    max-width: 500px;
  }

  .stages {
    gap: 25px;
    row-gap: 20px;
  }

  .second-title {
    padding: 10px 20px;
    text-align: center;
  }

  .info {
    gap: 20px;
    row-gap: 20px;
    padding: 15px 15px;
  }

  .avito {
    padding: 10px 20px;
    gap: 20px;
  }

  .avito-text p {
    font-size: 16px;
  }

  .price {
    flex-direction: column;
    padding: 10px 20px;
    gap: 25px;
  }

  .price-text {
    max-width: 100%;
  }

  .price-text .round-list li {
    font-size: 16px;
  }
}

/* Телефоны */
@media (max-width: 576px) {
  .page-content {
    padding: 10px 0;
    gap: 15px;
  }

  .marketing-title {
    padding: 10px 15px;
  }

  .marketing-title svg {
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
  }

  .banners {
    gap: 15px;
  }

  .banner {
    width: 100%;
    max-width: 250px;
  }

  .mini-title {
    padding-left: 15px;
    font-size: 14px;
    padding-top: 15px;
  }

  .pluses-block {
    gap: 15px;
    row-gap: 15px;
    padding: 0 0 15px 0;
  }

  .plus-mini {
    gap: 3px;
    row-gap: 15px;
    max-width: 100%;
  }

  .stages {
    gap: 20px;
    row-gap: 15px;
  }

  .rounds {
    gap: 20px;
    row-gap: 10px;
    padding: 0 10px;
  }

  .second-title {
    padding: 10px 15px;
  }

  .second-title h1 {
    font-size: 24px;
  }

  .info {
    gap: 15px;
    row-gap: 15px;
    padding: 12px 10px;
  }

  .info .gradient-block {
    max-width: 100%;
  }

  .avito {
    padding: 10px 15px;
    gap: 15px;
  }

  .avito-text p {
    font-size: 14px;
  }

  .btn {
    width: 160px;
    height: 45px;
    font-size: 14px;
  }

  .price {
    padding: 10px 15px;
    gap: 20px;
  }

  .price-text .round-list li {
    font-size: 14px;
  }

  .price-dop {
    font-size: 16px;
    text-align: center;
  }

  .price-block {
    gap: 15px;
  }
}

/* Маленькие телефоны */
@media (max-width: 421px) {
  .page-content{
    gap: 5px;
    padding: 0;
  }
  .marketing-title {
    padding: 5px 5px !important;
  }

  .marketing-title svg {
    width: 16px;
    height: 28px;
    left: 2%;
  }

  h1 {
    font-size: 20px;
  }

  .hello{
    margin: 0;
    gap: 10px;
  }

  .hello__title {
    font-size: 18px;
    text-align: left;
  }

  .hello__text {
    font-size: 13px;
    text-align: left;
  }

  .hello-content{
    gap: 0px;
  }

  .banner {
    max-width: 100px;
  }

  .banners{
    margin: 0;
  }

  .mini-title {
    font-size: 12px;
    padding-left: 10px;
    padding-top: 10px;
  }

  .pluses-block {
    gap: 10px;
    row-gap: 10px;
  }

  .plus-mini {
    gap: 2px;
    row-gap: 5px;
  }

  .plus{
    max-width: 150px;
  }

  .stages{
    gap: 10px;
    padding: 0 10px;
  }

  .second-title h1 {
    font-size: 20px;
  }

  .second-title{
    padding: 0 20px;
    text-align: left;
  }

  .avito-text p {
    font-size: 13px;
  }

  .avito{
    margin: 0;
    padding: 0 10px;
  }

  .avito-img{
    height: 190px;
  }

  .btn {
    width: 140px;
    height: 40px;
    font-size: 13px;
  }

  .button{
    margin: 10px 0;
  }

  .price-text .round-list li {
    font-size: 13px;
  }

  .price-dop {
    font-size: 14px;
  }
}
</style>