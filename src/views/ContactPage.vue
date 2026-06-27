<template>
  <div class="contact-page">
    <div class="page-content">


      <div class="contact-title">
        <router-link to="/">
          <svg width="35" height="58" viewBox="0 0 35 58" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M30.999 54.5L4.99902 28.3108L30.999 3.5" stroke="white" stroke-width="7" stroke-linecap="round"/>
          </svg>
        </router-link>

        <div class="title"><h1>КОНТАКТЫ</h1></div>
      </div>

      <h2 class="mini-title">наши менеджеры:</h2>

      <div class="info">
        <div class="person-list">
          <Person
              image="/image/men1.jpg"
              name="АЛЁНА ФОМИНЬІХ"
              phone="+7 (908) 167 06-03"
              email="alena@webrazrabotka.ru"
          />

          <Person
              image="/image/men2.jpeg"
              name="светлана мозговая"
              phone="+7 (910) 388 45-49"
              email="sveta@webrazrabotka.ru"
              telegram-link="https://t.me/mozsveta"
          />
          <Person
              image="/image/men3.jpg"
              name="маргарита мататова"
              phone="+7 (908) 161 20-62"
              email="rita@webrazrabotka.ru"
          />
          <Person
              image="/image/men4.png"
              name="юлия зейналова"
              phone="+7 (908) 231 84-18"
              email="julia@webrazrabotka.ru"
              telegram-link="https://t.me/Pelmeh0"
          />
          <Person
              image="/image/men5.jpg"
              name="кристина Куль"
              phone="+7 (999) 079 30-09"
              email="Kristina@webrazrabotka.ru"
              telegram-link="https://t.me/kul_kris"
          />
        </div>

        <div class="time-list">
          <Time
              title="ЗАКАЗАТЬ САЙТ"
              phone="+7 (905) 661 18-60"
              :schedule="[
    {
      days: 'ПН-ВС',
      hoursStartTop: '9',
      hoursStartBottom: '00',
      hoursEndTop: '21',
      hoursEndBottom: '00'
    }
  ]"
          />

          <Time
              title="тех.поддержка"
              phone="+7 (831) 422 85-59"
              :schedule="[
    {
      days: 'ПН-ЧТ',
      hoursStartTop: '9',
      hoursStartBottom: '00',
      hoursEndTop: '18',
      hoursEndBottom: '00'
    },
     {
      days: 'ПТ',
      hoursStartTop: '10',
      hoursStartBottom: '00',
      hoursEndTop: '16',
      hoursEndBottom: '00'
    }
  ]"
          />

          <Time
              title="отдел дизайна"
              phone="+7 (831) 422 85-99"
              :schedule="[
    {
      days: 'ПН-ЧТ',
      hoursStartTop: '9',
      hoursStartBottom: '00',
      hoursEndTop: '18',
      hoursEndBottom: '00'
    },
     {
      days: 'ПТ',
      hoursStartTop: '10',
      hoursStartBottom: '00',
      hoursEndTop: '16',
      hoursEndBottom: '00'
    }
  ]"
          />

          <Time
              title="контент / каталоги"
              phone="+7 (831) 422 85-09"
              :schedule="[
    {
      days: 'ПН-ВС',
      hoursStartTop: '9',
      hoursStartBottom: '00',
      hoursEndTop: '21',
      hoursEndBottom: '00'
    }
  ]"
          />

          <div class="btn"><a class="case__button" @click="openForm">Перезвонить мне</a></div>

          <!-- Модальное окно с маленькой формой -->
          <div v-if="isFormOpen" class="form-modal" @click="closeForm">
            <div class="form-modal__content" @click.stop>
              <button class="form-modal__close" @click="closeForm">✕</button>
              <FormSmall
                  title="ЗАКАЗАТЬ САЙТ"
                  background-image="/image/form.jpg"
              />
            </div>
          </div>

          <div class="geo">
            <p>603000, г. Нижний новгород, ул. Родионова, д. 193 к. 6</p>
          </div>
        </div>
      </div>

      <h2 class="mini-title">мы на картах:</h2>

      <div class="map-container">
        <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2216.123456789!2d44.0072!3d56.3262!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTbCsDE5JzM0LjMiTiA0NMKwMDAnMjUuOSJF!5e0!3m2!1sru!2sru!4v1234567890"
            width="100%"
            height="100%"
            style="border:0;"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>


    </div>
  </div>
</template>


<script setup>
import { ref } from 'vue'
import FormSmall from '@/components/FormSmall.vue'

import Person from '@/components/Person.vue'
import Time from '@/components/Time.vue'


const isFormOpen = ref(false)

const openForm = () => {
  isFormOpen.value = true
}

const closeForm = () => {
  isFormOpen.value = false
}
</script>


<style scoped>
.contact-page {
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

.contact-title {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 20px 50px;
}

.contact-title svg {
  position: absolute;
  left: 6%;
  top: 50%;
  transform: translateY(-50%);
  transition: all 0.3s ease;  /* ← плавность */
  cursor: pointer;
}

.contact-title svg:hover {
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

.mini-title{
  font-family: 'BOWLER', sans-serif;
  color: white;
  font-size: 20px;
  font-weight: 100;
  padding-left: 50px;
  padding-top: 30px;
}

.info{
  display: flex;
  justify-content: space-between;
  padding: 0 80px;
}

.person-list{
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.time-list{
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.case__button {
  flex-shrink: 0;
  width: 159px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Open Sans', sans-serif;
  font-size: 16px;
  color: white;
  text-decoration: none;
  border-radius: 15px;
  background: linear-gradient(to right, rgba(112, 0, 3, 0.5) 0%, rgba(186, 3, 7, 0.5) 100%);
  transition: all 0.3s ease;
}

.case__button:hover {
  transform: scale(1.05);
  opacity: 0.9;
}

.btn{
  display: flex;
  justify-content: center;
  align-items: center;
}
.geo{
  width: 484px;
  text-align: justify;
}

p{
  color: white;
  font-size: 32px;
  font-family: 'Open Sans', sans-serif;
}

.map-container {
  width: 100%;
  height: 596px;
  overflow: hidden;
  border: 1.5px solid #631315;
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
  .contact-title {
    padding: 15px 30px;
  }

  .contact-title svg {
    left: 4%;
    width: 28px;
    height: 46px;
  }

  h1 {
    font-size: 36px;
  }

  .mini-title {
    padding-left: 30px;
    font-size: 18px;
  }

  .info {
    padding: 0 30px;
    gap: 30px;
  }

  .person-list {
    gap: 15px;
  }

  .time-list {
    gap: 15px;
  }

  .geo {
    width: 100%;
    max-width: 400px;
  }

  .geo p {
    font-size: 24px;
  }

  .map-container {
    height: 450px;
  }
}

/* Планшеты вертикальные */
@media (max-width: 768px) {
  .contact-title {
    padding: 12px 20px;
  }

  .contact-title svg {
    left: 3%;
    width: 24px;
    height: 40px;
  }

  h1 {
    font-size: 30px;
  }

  .mini-title {
    padding-left: 20px;
    font-size: 16px;
    padding-top: 20px;
  }

  .info {
    flex-direction: column;
    align-items: center;
    padding: 0 20px;
    gap: 30px;
  }

  .person-list {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    gap: 15px;
  }

  .time-list {
    align-items: center;
    gap: 15px;
    width: 100%;
  }

  .time-list .time {
    width: 100%;
    max-width: 450px;
  }

  .btn {
    width: 100%;
    max-width: 200px;
  }

  .case__button {
    width: 100%;
    max-width: 200px;
  }

  .geo {
    width: 100%;
    max-width: 100%;
    text-align: center;
  }

  .geo p {
    font-size: 20px;
  }

  .map-container {
    height: 350px;
    margin: 0 10px;
    border-radius: 15px;
  }
}

/* Телефоны */
@media (max-width: 576px) {
  .page-content {
    padding: 10px 0;
    gap: 15px;
  }

  .contact-title {
    padding: 10px 15px;
  }

  .contact-title svg {
    left: 2%;
    width: 20px;
    height: 34px;
  }

  h1 {
    font-size: 24px;
  }

  .mini-title {
    padding-left: 15px;
    font-size: 14px;
    padding-top: 15px;
  }

  .info {
    padding: 0 10px;
    gap: 20px;
  }

  .person-list {
    flex-direction: column;
    align-items: center;
    gap: 12px;
    width: 100%;
  }

  .person-list .person {
    width: 100%;
    max-width: 400px;
  }

  .time-list {
    gap: 12px;
  }

  .time-list .time {
    max-width: 100%;
  }

  .btn {
    max-width: 180px;
  }

  .case__button {
    max-width: 180px;
    height: 36px;
    font-size: 14px;
  }

  .geo p {
    font-size: 16px;
  }

  .map-container {
    height: 280px;
    margin: 0 8px;
    border-radius: 12px;
  }
}

/* Маленькие телефоны */
@media (max-width: 420px) {
  .contact-title {
    padding: 8px 10px;
  }

  .contact-title svg {
    width: 16px;
    height: 28px;
    left: 2%;
  }

  h1 {
    font-size: 20px;
  }

  .mini-title {
    padding-left: 10px;
    font-size: 12px;
    padding-top: 10px;
  }

  .info {
    padding: 0 5px;
    gap: 15px;
  }

  .person-list {
    gap: 10px;
  }

  .person-list .person {
    max-width: 100%;
  }

  .time-list {
    gap: 10px;
  }

  .btn {
    max-width: 150px;
  }

  .case__button {
    max-width: 150px;
    height: 32px;
    font-size: 12px;
  }

  .geo p {
    font-size: 14px;
  }

  .map-container {
    height: 220px;
    margin: 0 5px;
    border-radius: 10px;
  }
}
</style>