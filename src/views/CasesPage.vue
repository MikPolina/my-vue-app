<template>
  <div class="cases-page">
    <div class="page-content">


      <div class="cases-title">
        <router-link to="/">
        <svg width="35" height="58" viewBox="0 0 35 58" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M30.999 54.5L4.99902 28.3108L30.999 3.5" stroke="white" stroke-width="7" stroke-linecap="round"/>
        </svg>
        </router-link>

        <div class="title"><h1>КЕЙСЫ</h1></div>
      </div>

      <p>Сделали уже много. Сделаем и для вас. Добро пожаловать в портфолио!</p>

      <div class="cases">
        <Case
            title="ЦНТР ПСИХОЛОГИИ «РАВНОВЕСИЕ»"
            text="Создали сайт центра психологии и кинезиологи “Равновесие” и взяли его на Seo продвижение.
За несколько месяцев с сайта клиенту пришли десятки заявок на оказание услуг и прохождение онлайн-курсов."
            image="/image/case1.png"
            link="https://ravnovesie-nn.ru/"
        />

        <Case
            title="МЕДИЦИНСКАЯ КЛИНИКА «ЗОЛОТОЕ СЕЧЕНИЕ»"
            text="Сайт медицинской клиники с обширным спектром услуг.
            Заказчик также обратился
            за Seo продвижением. После первых двух месяцев работы число ежедневных посетителей превысило 100 человек."
            image="/image/case2.png"
            link="https://zs.clinic/"
        />

        <Case
            title="СЕТЬ МАГАЗИНОВ «PROКРЕПЁЖ»"
            text="Мультибрендовая сеть магазинов крепежа и инструментов обратилась
            за услугой Seo-продвижения. После второго квартала работ посещаемость выросла более чем на 100%."
            image="/image/case3.png"
            link="https://prokrep.ru/?utm_referrer=https%3A//webrazrabotka.ru/"
        />

        <Case
            title="БАНИ И СПА «ПОБЕРЕЖЬЕ»"
            text="Стильный и уникальный сайт, ставший визитной карточкой организации.
            Базовая Seo-оптимизация помогла получить высокие позиции в Яндексе и Google."
            image="/image/case4.png"
            link="https://bereg-nn.ru/"
        />

        <Case
            title="СКЛАДСКАЯ ТЕХНИКА «АВТОКАРМАРКЕТ»"
            text="За счёт глубокой технической оптимизации и ускорения нагрузки сайта мы значительно
            улучшили поведенческие факторы. Это дало мощный импульс для роста ранжирования по сотне
            коммерческих запросов. В итоге, конверсия в заявки с органического трафика увеличилась в 2 раза."
            image="/image/case5.png"
            link="https://akm-52.ru/"
        />

        <Case
            title="ПРОИЗВОДСТВО УФ-ПОЛИМЕРОВ «СПЕКТР»"
            text="Сайт пришёл на Seo-продвижение по регионам. Склеенные поддомены удалось
            расклеить и направить в индексации по своим регионам. Результат - стабильные рост
            видимости и +80% к лидам с поиска за квартал."
            image="/image/case6.png"
            link="https://nipg.ru//"
        />

        <Case
            title="СТРОИТЕЛЬСТВО «ДОМА БАНИ 52»"
            text="Сайт по строительству каркасных домов и бань создан под ключ.
            Seo-работы позволили добиться результата в десятки заявок на строительство ежемесячно.
            Сайт уверенно держится в топе по ключевым фразам."
            image="/image/case7.png"
            link="https://domabani52.ru/"
        />

        <Case
            title="КОМПАНИЯ «ЭЙРГАЗ»"
            text="Комплексная работа по внутренней оптимизации, включающая улучшение UX и пути клика,
            значительно повысила вовлеченность пользователей. Рост поведенческих факторов положительно
            оценился поисковыми системами. В результате, видимость сайта по всему ядру выросла с 30% до 85%."
            image="/image/case8.png"
            link="https://airgaz-nn.ru/"
        />

        <Case
            title="КЛИНИНГ «ГИР НН»"
            text="Сайт клининговой компании создавался с учётом всех просьб клиента.
            Качественно проработанная семантика и грамотные технические настройки дали свой результат -
            десятки заявок с сайта ежедневно."
            image="/image/case9.png"
            link="https://girnn.ru/"
        />

        <Case
            title="ПРОИЗВОДСТВО ОБОРУДОВАНИЯ «ИРБИС»"
            text="Проблема дублей и плохой индексации тысяч товарных карточек была решена за счёт грамотной технической настройки.
            После внедрения уникальных описаний и структурированных данных трафик по коммерческим запросам вырос в 3 раза."
            image="/image/case10.png"
            link="https://irbismetall.ru/"
        />
      </div>


    </div>
  </div>

</template>


<script setup>
import Case from '@/components/Case.vue'

</script>


<style scoped>

.cases-page {
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

.cases-title {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 20px 50px;
}

.cases-title svg {
  position: absolute;
  left: 6%;
  top: 50%;
  transform: translateY(-50%);
  transition: all 0.3s ease;  /* ← плавность */
  cursor: pointer;
}

.cases-title svg:hover {
  opacity: 0.8;
}

.title {
  text-align: center;
}

.title h1 {
  font-family: 'Open Sans', sans-serif;
  background: linear-gradient(to right, #FFFFFF 0%, #FFFFFF 35%, #C6272B 60%, #C6272B 100%);
  font-size: 48px;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  display: inline-block;
  margin: 0;
}

p{
  color: white;
  font-family: 'Open Sans', sans-serif;
  font-size: 24px;
  text-align: center;
}

.cases{
  margin-top: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
  row-gap: 30px;
}

/* ===== Адаптив ===== */

/* Планшеты */
@media (max-width: 992px) {
  .cases-title {
    padding: 15px 30px;
  }

  .cases-title svg {
    left: 4%;
    width: 28px;
    height: 46px;
  }

  .title h1 {
    font-size: 36px;
  }

  p {
    font-size: 20px;
    padding: 0 20px;
  }

  .cases {
    gap: 15px;
    row-gap: 25px;
  }
}

/* Планшеты вертикальные */
@media (max-width: 768px) {
  .cases-title {
    padding: 12px 20px;
  }

  .cases-title svg {
    left: 3%;
    width: 24px;
    height: 40px;
  }

  .title h1 {
    font-size: 30px;
  }

  p {
    font-size: 18px;
    padding: 0 15px;
  }

  .cases {
    gap: 12px;
    row-gap: 20px;
    margin-top: 20px;
    padding: 0 10px;
  }
}

/* Телефоны */
@media (max-width: 576px) {
  .page-content {
    padding: 10px 0;
    gap: 15px;
  }

  .cases-title {
    padding: 10px 15px;
  }

  .cases-title svg {
    left: 2%;
    width: 20px;
    height: 34px;
  }

  .title h1 {
    font-size: 24px;
  }

  p {
    font-size: 16px;
    padding: 0 10px;
  }

  .cases {
    gap: 10px;
    row-gap: 15px;
    margin-top: 15px;
    padding: 0 8px;
  }
}

/* Маленькие телефоны */
@media (max-width: 400px) {
  .cases-title {
    padding: 8px 10px;
  }

  .cases-title svg {
    width: 16px;
    height: 28px;
    left: 2%;
  }

  .title h1 {
    font-size: 20px;
  }

  p {
    font-size: 14px;
    padding: 0 8px;
  }

  .cases {
    gap: 8px;
    row-gap: 12px;
    margin-top: 10px;
    padding: 0 5px;
  }
}
</style>