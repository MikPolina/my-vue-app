<template>
  <footer class="footer">
    <div class="footer__container">
      <div class="footer__inner">

        <!-- Левая колонка: логотип -->
        <router-link to="/" class="footer__logo">
          <img src="/image/logo.png" alt="Логотип" class="logo__img">
          <div class="logo__text">
            <div class="logo__subtitle">АГЕНТСТВО ИНТЕРНЕТ-МАРКЕТИНГА</div>
            <div class="logo__title">ВЕБРАЗРАБОТКА</div>
          </div>
        </router-link>



        <!-- Правая колонка: контакты -->
        <div class="footer__contacts">
          <div class="footer__contacts-title">Контакты</div>
          <ul class="footer__contacts-list">
            <li><a href="tel:+79056611860">Заказать сайт: +7 (905) 661 18-60</a></li>
            <li><a href="tel:+78314228559">Техподдержка: +7 (831) 422 85-59</a></li>
            <li><a href="tel:+78314228599">Отдел Дизайна: +7 (831) 422 85-99</a></li>
            <li><a href="tel:+78314228509">Контент/каталоги: +7 (831) 422 85-09</a></li>
            <li>г. Нижний новгород, ул. Родионова, д. 193 к. 6</li>
          </ul>
        </div>

        <div class="footer__nav">
          <ul class="footer__nav-list">
            <li><a href="/">Главная</a></li>
            <li><a href="/about">О компании</a></li>
            <li><a href="/contact">Контакты</a></li>
            <li><a href="/calcul">Калькулятор</a></li>
            <li><a href="/cases">Кейсы</a></li>
          </ul>
        </div>

      </div>

    </div>
  </footer>
</template>

<script setup>
// здесь пока пусто
</script>

<style scoped>
.footer {
  width: 100vw;
  max-width: 100vw;
  padding: 50px 80px 0px 20px;
  background: transparent;
  position: relative;
}

.footer__container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 40px;
}

.footer__inner {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 40px;
  padding-bottom: 40px;
}

/* Логотип */
.footer__logo {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;
  text-align: center;
  text-decoration: none;
}

.footer__logo .logo__img {
  width: 169px;
  height: 94px;
  object-fit: contain;
}

.footer__logo .logo__title {
  font-size: 25px;
  font-weight: bold;
  color: white;
}

.footer__logo .logo__subtitle {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
}

/* Навигация */
.footer__nav-list,
.footer__contacts-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer__nav-list li,
.footer__contacts-list li {
  margin-bottom: 12px;
}

.footer__nav-list a,
.footer__contacts-list a {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  transition: color 0.3s;
  font-size: 16px;
}

.footer__nav-list a:hover,
.footer__contacts-list a:hover {
  color: #ff6b4a;
}

.footer__contacts-list li:last-child {
  color: rgba(255, 255, 255, 0.6);
  font-size: 14px;
}

.footer__contacts-title {
  font-size: 18px;
  font-weight: bold;
  color: white;
  margin-bottom: 20px;
}

.footer__bottom p {
  color: rgba(255, 255, 255, 0.5);
  font-size: 14px;
}

/* ===== Адаптив ===== */

/* Планшеты */
@media (max-width: 992px) {
  .footer {
    padding: 40px 60px 0 15px;
  }

  .footer__container {
    padding: 0 20px;
  }

  .footer__inner {
    gap: 30px;
    justify-content: space-around;
  }

  .footer__logo .logo__img {
    width: 130px;
    height: 72px;
  }

  .footer__logo .logo__title {
    font-size: 20px;
  }

  .footer__logo .logo__subtitle {
    font-size: 10px;
  }

  .footer__contacts-title {
    font-size: 16px;
  }

  .footer__nav-list a,
  .footer__contacts-list a {
    font-size: 14px;
  }

  .footer__contacts-list li:last-child {
    font-size: 12px;
  }
}

/* Планшеты вертикальные */
@media (max-width: 768px) {
  .footer {
    padding: 30px 30px 0 10px;
  }

  .footer__container {
    padding: 0 15px;
  }

  .footer__inner {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 30px;
  }

  .footer__logo {
    flex-direction: column;
    align-items: center;
  }

  .footer__logo .logo__img {
    width: 100px;
    height: 56px;
  }

  .footer__logo .logo__title {
    font-size: 18px;
  }

  .footer__logo .logo__subtitle {
    font-size: 10px;
  }

  .footer__contacts-list li,
  .footer__nav-list li {
    display: inline-block;
    margin: 0 8px 10px;
  }

  .footer__nav-list {
    text-align: center;
  }

  .footer__contacts-list {
    text-align: center;
  }

  .footer__contacts-title {
    font-size: 16px;
    margin-bottom: 15px;
    text-align: center;
  }

  .footer__nav-list a,
  .footer__contacts-list a {
    font-size: 14px;
  }

  .footer__contacts-list li:last-child {
    font-size: 12px;
  }
}

/* Телефоны */
@media (max-width: 576px) {
  .footer {
    padding: 20px 15px 0 10px;
  }

  .footer__container {
    padding: 0 10px;
  }

  .footer__inner {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 25px;
    padding-bottom: 25px;
  }

  .footer__logo {
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }

  .footer__logo .logo__img {
    width: 73px;
    height: 40px;
  }

  .footer__logo .logo__title {
    font-size: 16px;
  }

  .footer__logo .logo__subtitle {
    font-size: 10px;
  }

  .footer__contacts-title {
    font-size: 14px;
    margin-bottom: 12px;
  }

  .footer__contacts-list li,
  .footer__nav-list li {
    display: block;
    margin: 0 0 8px 0;
  }

  .footer__nav-list a,
  .footer__contacts-list a {
    font-size: 12px;
  }

  .footer__contacts-list li:last-child {
    font-size: 12px;
  }

  .footer__nav {
    width: 100%;
  }

  .footer__nav-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 8px 15px;
  }

  .footer__nav-list li {
    margin: 0;
  }

  .footer__contacts {
    width: 100%;
  }

  .footer__contacts-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
  }

  .footer__contacts-list li {
    margin: 0;
  }
}

/* Маленькие телефоны */
@media (max-width: 421px) {
  .footer {
    padding: 15px 8px 0 8px;
  }

  .footer__logo .logo__img {
    width: 60px;
    height: 33px;
  }

  .footer__logo .logo__title {
    font-size: 14px;
  }

  .footer__logo .logo__subtitle {
    font-size: 8px;
  }

  .footer__contacts-title {
    font-size: 12px;
  }

  .footer__nav-list a,
  .footer__contacts-list a {
    font-size: 11px;
  }

  .footer__contacts-list li:last-child {
    font-size: 11px;
  }

  .footer__nav-list {
    gap: 5px 10px;
  }
}

</style>