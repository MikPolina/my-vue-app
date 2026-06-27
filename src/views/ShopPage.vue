<template>


  <div class="shop-page">
    <div class="page-content">

      <div class="shop-title">
        <router-link to="/">
          <svg width="35" height="58" viewBox="0 0 35 58" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M30.999 54.5L4.99902 28.3108L30.999 3.5" stroke="white" stroke-width="7" stroke-linecap="round"/>
          </svg>
        </router-link>

        <div class="title"><h1>ИНТЕРНЕТ-МАГАЗИН</h1></div>
      </div>

      <div class="hello">

        <div class="hello-content">
          <h2 class="hello__title">Вебразработка — откроем продажи онлайн</h2>
          <p class="hello__text">Создаём продающие интернет-магазины</p>
        </div>

        <div class="slogans">
          <SalesBlock
              line1="ПОВЫСИМ"
              line2="ДОВЕРИЕ К ВАШЕМУ БРЕНДУ"
          />

          <SalesBlock
              line1="ПРОДВИНЕМ"
              line2="ВАШ МАГАЗИН В ИНТЕРНЕТЕ"
          />

          <SalesBlock
              line1="ПРИНЕСЁМ"
              line2="БОЛЬШОЙ ДОХОД"
          />
        </div>
      </div>

      <div class="shop-text"><p>Цены создания интернет магазина и цены на другие сайты зависят от наполнения,
        интеграции, необходимости мобильной версии и других параметров. Наша компания предлагает полный комплекс
        услуг, включая дополнительный домен и хостинг. Мы наполняем дизайн разными важными опциями, а также внедряем
        автоматический перенос баз поставщика, рекламу в Яндексе и Google.</p></div>

      <h2 class="mini-title">этапы создания:</h2>

      <div class="numbers">
        <div
            v-for="(item, index) in steps"
            :key="index"
            class="number-wrapper"
            :class="{
      'number-wrapper--active': index === activeIndex
    }"
        >
          <Number
              width="300px"
              height="129px"
              :number="item.number"
              :text="item.text"
          />
        </div>
      </div>

      <div class="pluses">
        <Plus width="380px" symbol="+" text="Поднимем ваши сайты на верхние строки поисковиков" />
        <Plus width="380px" symbol="+" text="Добавим необходимые модули" />
        <Plus width="380px" symbol="+" text="Gривлечем трафик для запуска потока клиентов" />
      </div>

      <h2 class="mini-title">Наши преимещуства:</h2>

      <div class="settings">
        <img src="/image/crown.png" class="settings-img">
          <div class="set">
            <p>Работаем на CMS Bitrix, WordPress, Joomla</p>
          </div>

        <div class="settings-block">
          <div class="setting-block-ver">
            <div class="set">
              <p>Обучаем клиента работать с сайтом</p>
            </div>

            <div class="set">
              <p>Обеспечиваем корректную работу на всех устройствах</p>
            </div>
          </div>


          <svg class="settings-block__icon" width="258" height="258" viewBox="0 0 258 258" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="128.693" width="86" height="86" rx="20" transform="rotate(45 128.693 0)" fill="#631315" fill-opacity="0.5"/>
            <rect x="60.8115" y="67.8823" width="86" height="86" rx="20" transform="rotate(45 60.8115 67.8823)" fill="#631315"/>
            <rect x="196.575" y="67.8823" width="86" height="86" rx="20" transform="rotate(45 196.575 67.8823)" fill="#631315"/>
            <rect x="128.693" y="135.765" width="86" height="86" rx="20" transform="rotate(45 128.693 135.765)" fill="#631315" fill-opacity="0.5"/>
          </svg>

            <div class="setting-block-ver">
              <div class="set">
                <p>Проводим базовую SEO-оптимизацию для роста в будущем</p>
              </div>

              <div class="set">
                <p>Помогаем с продвижением и раскруткой готового магазина</p>
              </div>
            </div>
        </div>

          <div class="set">
            <p>Внедряем удобную панель управления с нужным уровнем доступа</p>
        </div>
      </div>


    </div>
  </div>
</template>


<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import SalesBlock from "@/components/SalesBlock.vue"
import Number from "@/components/Number.vue"
import Plus from "@/components/Plus.vue"

const steps = [
  { number: '1', text: 'Консультация и обсуждение проекта с клиентом' },
  { number: '2', text: 'Заключение договора и согласование оплаты' },
  { number: '3', text: 'Подбор материала и разработка привлекающего дизайна' },
  { number: '4', text: 'Выполнение отрисовки макета' },
  { number: '5', text: 'Согласование с клиентом и внесение правок' },
  { number: '6', text: 'Верстка утвержденного дизайна' },
  { number: '7', text: 'Программирование сайта и реализация функционала' },
  { number: '8', text: 'Написание текстов и заполнение сайта материалами.' },
  { number: '9', text: 'Проверка и тестирование сайт' },
  { number: '10', text: 'Запуск' },
  { number: '11', text: 'Обучение клиента работе с магазином' },
  { number: '12', text: 'Подписание акта об окончании работ' }
]

let interval = null

const activeIndex = ref(0)

onMounted(() => {
  interval = setInterval(() => {
    activeIndex.value = (activeIndex.value + 1) % steps.length
  }, 600)
})

onBeforeUnmount(() => {
  if (interval) clearInterval(interval)
})
</script>


<style scoped>
.shop-page {
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

.shop-title {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 20px 50px;
}

.shop-title svg {
  position: absolute;
  left: 6%;
  top: 50%;
  transform: translateY(-50%);
  transition: all 0.3s ease;  /* ← плавность */
  cursor: pointer;
}

.shop-title svg:hover {
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
  gap: 0px;
  row-gap: 50px;
  width: 610px;
}

.shop-text{
  text-align: justify;
  padding: 0px 50px;
}

p{
  font-family: 'Open Sans', sans-serif;
  font-size: 20px;
  color: white;
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
  padding: 10px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  row-gap: 20px;
}

.pluses{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  padding: 0px 10px;
}

.settings{
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
}

.settings-img{
  position: absolute;
  right: 0;
  z-index: -10;
  margin-top: -0px;
}

.settings-block{
  display: flex;
  gap: 130px;
  justify-content: center;
  align-items: center;
}

.set{
  width: 319px;
  height: 118px;
  padding: 20px;
  background: none;
  border: white solid 1.5px;
  text-align: center;
  border-radius: 10px;
}

.setting-block-ver{
  display: flex;
  flex-direction: column;
  gap: 70px;
}



/* Анимация вращения */
.settings-block__icon {
  animation: spin 8s linear infinite;
  flex-shrink: 0;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Остановка при наведении */
.settings-block__icon:hover {
  animation-play-state: paused;
}



.number-wrapper {
  display: contents; /* не влияет на вёрстку, обёртка невидима */
}

/* Заливка для активных блоков */
.number-wrapper--active :deep(.number) {
  background: linear-gradient(to bottom, rgba(198, 39, 43, 0.5) 0%, rgba(198, 39, 43, 0.15) 100%) !important;
  transition: background 0.3s ease;
  border-color: #C6272B !important;
}

.number-wrapper :deep(.number) {
  transition: background 0.3s ease, border-color 0.3s ease;
}


@keyframes waveGlow {
  0% {
    box-shadow: 0 0 0 0 rgba(198, 39, 43, 0);
  }
  50% {
    box-shadow: 0 0 30px 10px rgba(198, 39, 43, 0.3);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(198, 39, 43, 0);
  }
}


/* ===== Адаптив ===== */

/* Планшеты */
@media (max-width: 992px) {
  .shop-title {
    padding: 15px 30px;
  }

  .shop-title svg {
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
    row-gap: 30px;
  }

  .shop-text {
    padding: 0 30px;
  }

  .shop-text p {
    font-size: 18px;
  }

  .mini-title {
    padding-left: 30px;
    font-size: 18px;
  }

  .settings {
    gap: 15px;
  }

  .settings-block {
    gap: 50px;
    flex-wrap: wrap;
  }

  .set {
    width: 100%;
    max-width: 280px;
    height: auto;
    min-height: 100px;
  }

  .settings-img {
    display: none;
  }

  .settings-block__icon {
    width: 180px;
    height: 180px;
  }
}

/* Планшеты вертикальные */
@media (max-width: 768px) {
  .shop-title {
    padding: 12px 20px;
  }

  .shop-title svg {
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
    gap: 10px;
    row-gap: 20px;
  }

  .shop-text {
    padding: 0 20px;
  }

  .shop-text p {
    font-size: 16px;
  }

  .mini-title {
    padding-left: 20px;
    font-size: 16px;
    padding-top: 20px;
  }

  .numbers {
    padding: 10px 15px;
    gap: 8px;
    row-gap: 15px;
  }

  .pluses {
    gap: 15px;
    padding: 0 15px;
  }

  .settings {
    gap: 15px;
    margin-top: 30px;
  }

  .settings-block {
    flex-direction: column;
    gap: 20px;
  }

  .set {
    max-width: 100%;
    min-height: 80px;
    padding: 15px;
  }

  .set p {
    font-size: 14px;
  }

  .setting-block-ver {
    gap: 20px;
  }

  .settings-block__icon {
    width: 140px;
    height: 140px;
  }
}

/* Телефоны */
@media (max-width: 576px) {
  .page-content {
    padding: 10px 0;
    gap: 15px;
  }

  .shop-title {
    padding: 10px 15px;
  }

  .shop-title svg {
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
    gap: 8px;
    row-gap: 15px;
  }

  .shop-text {
    padding: 0 15px;
  }

  .shop-text p {
    font-size: 14px;
  }

  .mini-title {
    padding-left: 15px;
    font-size: 14px;
    padding-top: 15px;
  }

  .numbers {
    padding: 10px 10px;
    gap: 6px;
    row-gap: 12px;
  }

  .pluses {
    gap: 12px;
    padding: 0 10px;
  }

  .settings {
    gap: 12px;
    margin-top: 20px;
  }

  .settings-block {
    gap: 15px;
  }

  .set {
    min-height: 65px;
    padding: 12px;
  }

  .set p {
    font-size: 13px;
  }

  .setting-block-ver {
    gap: 15px;
  }

  .settings-block__icon {
    width: 100px;
    height: 100px;
  }
}

/* Маленькие телефоны */
@media (max-width: 421px) {
  .page-content{
    margin: 0;
    padding: 5px 5px;
    gap: 10px;
  }
  .shop-title {
    padding: 5px 5px;
  }

  .shop-title svg {
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

  .hello__text {
    font-size: 13px;
    text-align: left;
  }

  .hello{
    margin: 0;
    padding: 0px 10px;
  }

  .hello-content{
    gap: 5px;
  }

  .shop-text p {
    font-size: 13px;
  }

  .mini-title {
    font-size: 12px;
    padding-left: 10px;
    padding-top: 5px;
  }

  .numbers {
    gap: 4px;
    row-gap: 10px;
    padding: 5px 5px;
  }

  .pluses {
    gap: 10px;
  }

  .set {
    width: 100% !important;
    min-height: 55px;
    padding: 10px;
  }

  .set p {
    font-size: 12px;
  }

  .settings{
    margin: 0;
    padding: 0 !important;
  }

  .settings-block{
    padding: 0;
    gap: 10px;
  }

  .setting-block-ver{
    width: 100% !important;
  }

  .settings-block__icon {
    width: 80px;
    height: 80px;
  }
}
</style>