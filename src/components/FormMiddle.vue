<template>
  <div
      class="form-big"
      :style="{ backgroundImage: `url(${backgroundImage})` }"
  >
    <div class="form-big__overlay">
      <!-- Заголовок -->
      <h2 class="form-big__title">{{ title }}</h2>

      <!-- Поля ввода -->
      <div class="form-big__input-wrapper">
        <input
            type="text"
            class="form-big__input"
            :class="{ 'form-big__input--error': errors.fio }"
            placeholder="Введите ФИО"
            v-model="fio"
            @blur="validateFio"
        />
        <span v-if="errors.fio" class="form-big__error">{{ errors.fio }}</span>
      </div>

      <div class="form-big__input-wrapper">
        <input
            type="email"
            class="form-big__input"
            :class="{ 'form-big__input--error': errors.email }"
            placeholder="Введите email"
            v-model="email"
            @blur="validateEmail"
        />
        <span v-if="errors.email" class="form-big__error">{{ errors.email }}</span>
      </div>

      <div class="form-big__input-wrapper">
        <input
            type="tel"
            class="form-big__input"
            :class="{ 'form-big__input--error': errors.phone }"
            placeholder="Введите номер телефона"
            v-model="phone"
            @blur="validatePhone"
        />
        <span v-if="errors.phone" class="form-big__error">{{ errors.phone }}</span>
      </div>

      <div class="form-big__input-wrapper">
        <textarea
            class="form-big__textarea"
            :class="{ 'form-big__input--error': errors.wishes }"
            placeholder="Ваши особые пожелания"
            v-model="wishes"
            @blur="validateWishes"
        ></textarea>
        <span v-if="errors.wishes" class="form-big__error">{{ errors.wishes }}</span>
      </div>

      <!-- Соглашение -->
      <div class="form-big__agreement">
        <Checkbox
            :is-active="isAgreed"
            @toggle="isAgreed = !isAgreed"
        />
        <span class="form-big__agreement-text">
          Я соглашаюсь на обработку ваших персональных данных.
          С условиями <a href="/policy" class="form-big__agreement-link">Политики и Согласия</a> ознакомлен.
        </span>
      </div>

      <!-- Кнопка -->
      <button class="form-big__button" @click="submitForm">ОТПРАВИТЬ</button>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import Checkbox from '@/components/Checkbox.vue'

defineProps({
  title: {
    type: String,
    default: 'СОЕДИНЯТЬ ЗАКАЗ'
  },
  backgroundImage: {
    type: String,
    required: true
  }
})

const isAgreed = ref(false)
const selectedService = ref('')
const fio = ref('')
const email = ref('')
const phone = ref('')
const wishes = ref('')

const errors = reactive({
  fio: '',
  email: '',
  phone: '',
  wishes: ''
})

// === Валидация ФИО ===
const validateFio = () => {
  if (!fio.value.trim()) {
    errors.fio = 'Поле обязательно для заполнения'
  } else if (fio.value.trim().length < 3) {
    errors.fio = 'ФИО должно содержать минимум 3 символа'
  } else if (fio.value.trim().length > 100) {
    errors.fio = 'ФИО не должно превышать 100 символов'
  } else {
    errors.fio = ''
  }
}

// === Валидация Email ===
const validateEmail = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!email.value.trim()) {
    errors.email = 'Поле обязательно для заполнения'
  } else if (!emailRegex.test(email.value.trim())) {
    errors.email = 'Введите корректный email'
  } else {
    errors.email = ''
  }
}

// === Валидация Телефона ===
const validatePhone = () => {
  const phoneRegex = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/
  if (!phone.value.trim()) {
    errors.phone = 'Поле обязательно для заполнения'
  } else if (!phoneRegex.test(phone.value.trim())) {
    errors.phone = 'Введите корректный номер телефона'
  } else {
    errors.phone = ''
  }
}

// === Валидация пожеланий ===
const validateWishes = () => {
  if (wishes.value.trim().length > 500) {
    errors.wishes = 'Пожелания не должны превышать 500 символов'
  } else {
    errors.wishes = ''
  }
}

// === Отправка формы ===
const submitForm = () => {
  validateFio()
  validateEmail()
  validatePhone()
  validateWishes()

  if (!isAgreed.value) {
    alert('Необходимо согласиться на обработку персональных данных')
    return
  }

  if (errors.fio || errors.email || errors.phone || errors.wishes) {
    alert('Заполните все поля корректно')
    return
  }

  // Если всё ок — отправляем
  console.log('Форма отправлена:', {
    fio: fio.value,
    email: email.value,
    phone: phone.value,
    wishes: wishes.value
  })
  alert('Заявка отправлена!')
}
</script>

<style scoped>
.form-big {
  width: 605px;
  min-height: auto;
  border-radius: 20px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  box-sizing: border-box;
}

.form-big__overlay {
  padding: 50px;
  display: flex;
  flex-direction: column;
  gap: 22px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 20px;
}

/* Заголовок */
.form-big__title {
  font-family: 'Bowler', 'Bowlby One', serif;
  font-size: 36px;
  font-weight: 400;
  background: linear-gradient(to right, #FFFFFF 0%, #C6272B 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
  text-align: center;
  line-height: 1.3;
}

.form-big__select option {
  color: #333;
  background: white;
}

/* Поля ввода */
.form-big__input-wrapper {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.form-big__input {
  width: 100%;
  height: 42px;
  padding: 10px 20px;
  background: rgba(255, 255, 255, 0.4);
  border: none;
  border-radius: 20px;
  font-family: 'Open Sans', sans-serif;
  font-size: 16px;
  color: white;
  outline: none;
  box-sizing: border-box;
  transition: background 0.3s ease;
}

.form-big__input::placeholder {
  color: white;
}

.form-big__input:focus {
  background: rgba(255, 255, 255, 0.6);
}

.form-big__input--error {
  border: 2px solid #ff4444;
  background: rgba(255, 68, 68, 0.2);
}

.form-big__error {
  color: #ff4444;
  font-size: 14px;
  font-family: 'Open Sans', sans-serif;
  padding-left: 10px;
}

/* Textarea (Ваши особые пожелания) */
.form-big__textarea {
  width: 100%;
  height: 107px;
  padding: 10px 20px;
  background: rgba(255, 255, 255, 0.4);
  border: none;
  border-radius: 20px;
  font-family: 'Open Sans', sans-serif;
  font-size: 16px;
  color: white;
  outline: none;
  resize: vertical;
  box-sizing: border-box;
  transition: background 0.3s ease;
}

.form-big__textarea::placeholder {
  color: white;
}

.form-big__textarea:focus {
  background: rgba(255, 255, 255, 0.6);
}

/* Соглашение */
.form-big__agreement {
  display: flex;
  align-items: flex-start;
  gap: 15px;
}

.form-big__agreement-text {
  font-family: 'Open Sans', sans-serif;
  font-size: 16px;
  color: white;
  line-height: 1.5;
}

.form-big__agreement-link {
  color: white;
  text-decoration: underline;
  transition: color 0.3s ease;
}

.form-big__agreement-link:hover {
  color: #C64027;
}

/* Кнопка */
.form-big__button {
  width: 200px;
  height: 50px;
  border: none;
  border-radius: 15px;
  background: linear-gradient(50deg, rgba(112, 0, 3, 0.5) 0%, rgba(186, 3, 7, 0.5) 100%);
  color: white;
  font-family: 'Open Sans', sans-serif;
  font-size: 20px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  align-self: center;
}

.form-big__button:hover {
  transform: scale(1.05);
  opacity: 0.9;
}

/* Адаптив */
@media (max-width: 650px) {
  .form-big {
    width: 100%;
  }

  .form-big__overlay {
    padding: 30px 20px;
  }

  .form-big__title {
    font-size: 28px;
  }

  .form-big__button {
    width: 100%;
    max-width: 200px;
  }
}

@media (max-width: 480px) {
  .form-big__overlay {
    padding: 20px 15px;
    gap: 15px;
  }

  .form-big__title {
    font-size: 24px;
  }

  .form-big__select,
  .form-big__input {
    font-size: 14px;
    height: 38px;
    padding: 8px 15px;
  }

  .form-big__textarea {
    font-size: 14px;
    height: 80px;
    padding: 8px 15px;
  }

  .form-big__agreement-text {
    font-size: 14px;
  }

  .form-big__button {
    font-size: 18px;
    height: 45px;
  }

  .form-big__error {
    font-size: 12px;
  }
}
</style>