<template>
  <header class="header">
    <div class="header__container">
      <div class="header__inner">
        <!-- Левая часть: лого + текст -->
        <router-link to="/" class="header__logo">
          <img src="/image/logo.png" alt="Логотип" class="logo__img" >
          <div class="logo__text">
            <div class="logo__subtitle">АГЕНТСТВО ИНТЕРНЕТ-МАРКЕТИНГА</div>
            <div class="logo__title">ВЕБРАЗРАБОТКА</div>
          </div>
        </router-link>

        <!-- Центр: навигация -->
        <nav class="header__nav">
          <a href="/" class="nav__icon">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <path d="M16 34.0004H32M22.0354 5.52848L8.47078 16.0787C7.56404 16.784 7.11068 17.1366 6.78406 17.5782C6.49474 17.9694 6.2792 18.4101 6.14806 18.8786C6 19.4075 6 19.9819 6 21.1306V35.6004C6 37.8406 6 38.9608 6.43598 39.8164C6.81946 40.569 7.43138 41.181 8.18404 41.5644C9.03968 42.0004 10.1598 42.0004 12.4 42.0004H35.6C37.8402 42.0004 38.9604 42.0004 39.816 41.5644C40.5686 41.181 41.1806 40.569 41.564 39.8164C42 38.9608 42 37.8406 42 35.6004V21.1306C42 19.9819 42 19.4075 41.852 18.8786C41.7208 18.4101 41.5052 17.9694 41.216 17.5782C40.8894 17.1366 40.436 16.784 39.5292 16.0787L25.9646 5.52848C25.262 4.98198 24.9106 4.70872 24.5226 4.60368C24.1804 4.511 23.8196 4.511 23.4774 4.60368C23.0894 4.70872 22.738 4.98198 22.0354 5.52848Z" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </a>

          <div class="nav__menu-icon" @click="toggleMenu">
            <svg width="77" height="68" viewBox="0 0 77 68" fill="none">
              <path d="M36.5 44H52.5M24.5 34H52.5M36.5 24H52.5" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </nav>

        <div class="header__links">
          <a href="/calcul">Калькулятор</a>
          <a @click="toggleContactMenu">Связаться</a>
        </div>
      </div>
    </div>

    <div class="dropdown-menu" v-if="isDropdownOpen">
      <div class="dropdown-menu__inner">
        <ul class="dropdown-menu__list">
          <li><a href="/about" @click="closeMenu">О компании</a></li>
          <li><a href="/cases" @click="closeMenu">Кейсы</a></li>
          <li><a href="/calcul" @click="closeMenu">Калькулятор</a></li>
          <li><a href="/contact" @click="closeMenu">Контакты</a></li>
        </ul>

      </div>
    </div>


    <!-- Меню "Связаться" -->
    <div class="dropdown-menu dropdown-menu--contact" v-if="isContactMenuOpen">
      <div class="dropdown-menu__inner">
        <ul class="dropdown-menu__list">
          <li>
            <a @click="openForm('order')">Сделать заказ</a>
          </li>
          <li>
            <a @click="openForm('offer')">Узнать предложения для малого и крупного бизнеса</a>
          </li>
          <li>
            <a @click="openForm('contact')">Перезвоните мне</a>
          </li>
        </ul>
      </div>
    </div>

    <!-- Модальное окно с формой -->
    <div v-if="isFormOpen" class="form-modal" @click="closeForm">
      <div class="form-modal__content" @click.stop>
        <button class="form-modal__close" @click="closeForm">✕</button>

        <!-- Форма для заказа -->
        <FormBig
            v-if="activeForm === 'order'"
            title="СДЕЛАТЬ ЗАКАЗ"
            background-image="/image/form.jpg"
            :options="['Разработка сайта', 'Продвижение', 'Реклама', 'Дизайн']"
        />

        <!-- Форма для предложений -->
        <FormMiddle
            v-else-if="activeForm === 'offer'"
            title="УЗНАТЬ ПРЕДЛОЖЕНИЯ"
            background-image="/image/form.jpg"
        />

        <!-- Форма для связи -->
        <FormSmall
            v-else-if="activeForm === 'contact'"
            title="ПЕРЕЗВОНИТЕ МНЕ"
            background-image="/image/form.jpg"
        />
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import FormBig from '@/components/FormBig.vue'
import FormMiddle from '@/components/FormMiddle.vue'
import FormSmall from '@/components/FormSmall.vue'

// Основное меню
const isDropdownOpen = ref(false)

const toggleMenu = () => {
  isDropdownOpen.value = !isDropdownOpen.value
  isContactMenuOpen.value = false // закрываем контактное меню
}

const closeMenu = () => {
  isDropdownOpen.value = false
}

// Меню "Связаться"
const isContactMenuOpen = ref(false)

const toggleContactMenu = () => {
  isContactMenuOpen.value = !isContactMenuOpen.value
  isDropdownOpen.value = false // закрываем основное меню
}

// Формы
const isFormOpen = ref(false)
const activeForm = ref('') // 'order', 'offer', 'contact'

const openForm = (type) => {
  isContactMenuOpen.value = false
  activeForm.value = type
  isFormOpen.value = true
}

const closeForm = () => {
  isFormOpen.value = false
  activeForm.value = ''
}
</script>

<style scoped>

a{
  text-decoration: none;
}


.header {
  width: 100vw;
  max-width: 100vw;
  margin: 0;
  padding-top: 5px;
  left: 0;
  right: 0;
  background: transparent;
  position: relative;
}

.header__container {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 15px 40px;
}

.header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
}

.header__logo {
  display: flex;
  align-items: center;
  gap: 15px;
  text-decoration: none;
}

.logo__img {
  width: 169px;
  height: 94px;
  object-fit: contain;
}

.logo__title {
  font-size: 25px;
  font-weight: bold;
  color: white;
}

.logo__subtitle {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
}

.header__nav {
  display: flex;
  align-items: center;
  gap: 50px;
}

.header__links a {
  color: white;
  font-size: 18px;
  cursor: pointer;
  transition: opacity 0.3s;
}

.nav__icon svg,
.nav__menu-icon svg {
  display: block;
  transition: opacity 0.3s ease;
}

.nav__icon:hover svg,
.nav__menu-icon:hover svg {
  opacity: 0.7;
}

.nav__menu-icon {
  cursor: pointer;
}

.header__links {
  display: flex;
  gap: 50px;
}

.header__links a:hover {
  opacity: 0.7;
}

.dropdown-menu {
  width: 194px;
  height: 231px;
  position: absolute;
  background: rgba(0, 0, 0, 0.8);
  z-index: 100;
  border-radius: 20px;
  padding: 20px;
  border: 1px solid #631315;
  right: 40%;
  min-width: 250px;
  margin-top: 10px;
}

.dropdown-menu__inner {
  margin: 0 auto;
  width: 100%;
}

.dropdown-menu__list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.dropdown-menu__list li a {
  color: white;
  text-decoration: none;
  font-size: 20px;
  transition: color 0.3s;
}

.dropdown-menu__list li a:hover, .header__links a:hover {
  color: #C6272B;
}

@media (max-width: 768px) {
  .header__container {
    padding: 10px 20px;
  }

  .logo__img {
    width: 100px;
    height: 56px;
  }

  .logo__title {
    font-size: 18px;
  }

  .logo__subtitle {
    font-size: 10px;
  }
}


/* Контактное меню (может быть справа) */
.dropdown-menu--contact {
  right: 10%;
}

/* Модальное окно для формы */
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

/* Стилизация скролла */
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




/* АДАПТИВ АДАПТИВ */
  @media (max-width: 768px) {
  .header__container {
    padding: 10px 20px;
  }

  .header__inner {
    flex-wrap: nowrap;
    gap: 10px;
  }

  .logo__img {
    width: 73px;
    height: 40px;
  }

  .logo__title {
    font-size: 16px;
  }

  .logo__subtitle {
    font-size: 10px;
  }

  .header__links {
    gap: 15px;
  }

  .header__links a {
    font-size: 14px;
  }

  .header__nav {
    gap: 15px;
  }

  .nav__icon svg {
    width: 28px;
    height: 28px;
  }

  .nav__menu-icon svg {
    width: 40px;
    height: 35px;
  }

  .dropdown-menu {
    right: 20%;
    min-width: 180px;
    padding: 15px;
  }

  .dropdown-menu__list li a {
    font-size: 16px;
  }

  .dropdown-menu--contact {
    right: 5%;
  }
}

/* Телефоны */
@media (max-width: 576px) {
  .header__container {
    padding: 8px 12px;
  }

  .header__inner {
    flex-wrap: nowrap;
    gap: 8px;
  }

  .header__logo {
    gap: 8px;
  }

  .logo__img {
    width: 50px;
    height: 28px;
  }

  .logo__subtitle{
    font-size: 10px;
  }

  .logo__title{
    font-size: 16px;
  }

  .header__links {
    gap: 10px;
  }

  .header__links a {
    font-size: 12px;
  }

  .header__nav {
    gap: 10px;
  }

  .nav__icon svg {
    width: 22px;
    height: 22px;
  }

  .nav__menu-icon svg {
    width: 32px;
    height: 28px;
  }

  .dropdown-menu {
    right: 5%;
    min-width: 160px;
    padding: 12px;
    height: auto;
    min-height: 180px;
  }

  .dropdown-menu__list {
    gap: 12px;
  }

  .dropdown-menu__list li a {
    font-size: 14px;
  }

  .dropdown-menu--contact {
    right: 5%;
    min-width: 200px;
  }

  .form-modal {
    padding: 10px;
  }

  .form-modal__close {
    font-size: 24px;
    top: 5px;
    right: 10px;
  }

  .form-modal__content {
    max-width: 95%;
  }
}

/* Маленькие телефоны */
@media (max-width: 421px) {
  .header__container {
    padding: 6px 10px;
  }

  .header__links a {
    font-size: 10px;
  }

  .header__links{
    display: flex;
    gap: 30px;
    margin-top: -28px;
  }

  .header__logo{
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .header__inner{
    display: flex;
    flex-direction: column;
  }

  .header__nav{
    display: flex;
    gap: 250px;
  }

  .nav__icon svg {
    width: 18px;
    height: 18px;
  }

  .nav__menu-icon svg {
    width: 28px;
    height: 24px;
  }

  .dropdown-menu {
    min-width: 140px;
    padding: 10px;
  }

  .dropdown-menu__list li a {
    font-size: 12px;
  }

  .dropdown-menu--contact {
    min-width: 160px;
  }

  .logo__subtitle{
    font-size: 10px;
  }

  .logo__title{
    font-size: 16px;
  }
}
</style>