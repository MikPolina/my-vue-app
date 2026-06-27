<template>
  <div class="calcul-page">
    <div class="page-content">


      <div class="calcul-title">
        <router-link to="/">
          <svg width="35" height="58" viewBox="0 0 35 58" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M30.999 54.5L4.99902 28.3108L30.999 3.5" stroke="white" stroke-width="7" stroke-linecap="round"/>
          </svg>
        </router-link>

        <div class="title"><h1>КАЛЬКУЛЯТОР</h1></div>
      </div>

      <div class="result">
        <div class="btn" @click="clearAll"><span class="del-text">Очистить</span></div>

        <div class="cost">
          <div class="cost-price">
            <span class="cost-title">ЦЕНА:</span>
            <span class="cost-itog">{{ totalPrice }}</span>
            <span class="cost-title">₽</span>
          </div>

          <div class="btn" @click="openForm"><span class="cost-text">ДАЛЕЕ</span></div>
          <!-- Модальное окно средней формой -->
          <div v-if="isFormOpen" class="form-modal" @click="closeForm">
            <div class="form-modal__content" @click.stop>
              <button class="form-modal__close" @click="closeForm">✕</button>
              <FormMiddle
                  title="СДЕЛАТЬ ЗАКАЗ"
                  background-image="/image/form.jpg"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="tabs-block">
        <div class="tabs-block__left">
          <ul class="tabs-block__list">
            <li
                v-for="tab in tabs"
                :key="tab.id"
                class="tabs-block__item"
                :class="{ 'tabs-block__item--active': activeTab === tab.id }"
                @click="activeTab = tab.id"
            >
              <span class="tabs-block__text">{{ tab.name }}</span>
            </li>
          </ul>
        </div>

        <div class="tabs-block__right">

          <div class="tabs-block__content" v-if="activeTab === 'sites'">
            <div class="package-down"  @click="togglePackages">
              <span class="mini-title">Выбрать готовый пакет</span>
              <svg width="33" height="19" :class="{ 'package-down__arrow--open': isOpen }" viewBox="0 0 33 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M31 2L16.1081 16L2 2" stroke="white" stroke-width="4" stroke-linecap="round"/>
              </svg>
            </div>

            <div class="packages" v-show="isOpen">
              <Package
                  title="ЭКОНОМ"
                  text="Сайт без адаптива по макету без возможности заказывать и оплачивать товары и услуги; хостинг + домен.RU"
                  price="31 000"
                  :is-active="selectedPackage === 'econom'"
                  @select="selectPackage('econom', 31000)"
              />

              <Package
                  title="ЭКСКЛЮЗИВ"
                  text="Эксклюзивный сайт без адаптива без возможности заказывать и оплачивать товары и услуги; хостинг + домен.RU"
                  price="41 000"
                  :is-active="selectedPackage === 'exclusive'"
                  @select="selectPackage('exclusive', 41000)"
              />

              <Package
                  title="ВИТРИНА"
                  text="Эксклюзивный сайт без адаптива без возможности заказывать и оплачивать товары и услуги; панель продаж"
                  price="45 000"
                  :is-active="selectedPackage === 'showcase'"
                  @select="selectPackage('showcase', 45000)"
              />

              <Package
                  title="МАГАЗИН"
                  text="Эксклюзивный сайт (интернет-магазин) без адаптива с возможностью заказывать и оплачивать товары и услуги"
                  price="70 000"
                  :is-active="selectedPackage === 'shop'"
                  @select="selectPackage('shop', 70000)"
              />

              <Package
                  title="МАГАЗИН 1С"
                  text="Эксклюзивный интернет-магазин 1С Битрикс без адаптива с возможностью заказывать и оплачивать товары и услуги"
                  price="105 000"
                  :is-active="selectedPackage === 'shop1с'"
                  @select="selectPackage('shop1с', 105000)"
              />

              <Package
                  title="VIP"
                  text="Эксклюзивный адаптивный интернет-магазин 1С Битрикс; платёжная система; интеграция с Яндекс Маркет; фильтр, корзина, поиск-фильтр товаров, топ и сравнение, избранное"
                  price="227 000"
                  :is-active="selectedPackage === 'vip'"
                  @select="selectPackage('vip', 227000)"
              />
            </div>
            <div class="choice-wrapper">
              <Radio
                  :is-active="selectedType === 'maket'"
                  @select="selectType('maket', 25000)"
              />
              <Choice
                  title="сайт по макету"
                  text="1 из 300 макетов на выбор, замена текста и картинок, сборка сайта, сборка системы"
                  price="25 000"
              />
            </div>

            <div class="choice-wrapper">
              <Radio
                  :is-active="selectedType === 'exclusive'"
                  @select="selectType('exclusive', 35000)"
              />
              <Choice
                  title="ЭКСКЛЮЗИВНЫЙ САЙТ"
                  text="Эксклюзивный дизайн, сборка сайта, сборка системы"
                  price="35 000"
              />
            </div>

            <span class="mini-title">магазин:</span>

            <div class="choice-wrapper">
              <Radio
                  :is-active="selectedShop === 'online-shop'"
                  @select="selectShop('online-shop', 25000)"
              />
              <Choice
                  title="интернет магазин"
                  text="на CMS Joomla / Wordpress, предоставляет возможность заказывать товары и услуги"
                  price="25 000"
              />
            </div>

            <div class="choice-wrapper">
              <Radio
                  :is-active="selectedShop === 'online-shop1c'"
                  @select="selectShop('online-shop1c', 60000)"
              />
              <Choice
                  title="Интернет-магазин 1С Битрикс"
                  text="на CMS 1C Bitrix, предоставляет возможность заказывать товары и услуги"
                  price="60 000"
              />
            </div>

            <div class="choice-wrapper">
              <Radio
                  :is-active="selectedShop === 'online-shop1c2'"
                  @select="selectShop('online-shop1c2', 85000)"
              />
              <Choice
                  title="Интернет-магазин 1С Битрикс (с интеграцией 1С)"
                  text="на CMS 1C Bitrix + интеграция с 1С пакетами, предоставляет возможность заказывать товары и услуги, а так же синхронизировать все товары и заказы с вашей 1С"
                  price="85 000"
              />
            </div>

            <div class="choice-wrapper">
              <Checkbox
                  :is-active="selectedServices.some(item => item.id === 'yandex')"
                  @toggle="toggleService('yandex', 25000)"
              />
              <Choice
                  title="интеграция с Яндекс Маркет"
                  text=""
                  price="25 000"
              />
            </div>

            <div class="choice-wrapper">
              <Checkbox
                  :is-active="selectedServices.some(item => item.id === 'pay')"
                  @toggle="toggleService('pay', 10000)"
              />
              <Choice
                  title="платёжная система"
                  text="Сбербанк, Яндекс.Касса, РобоКасса, Платрон"
                  price="10 000"
              />
            </div>

            <div class="choice-wrapper">
              <Checkbox
                  :is-active="selectedServices.some(item => item.id === 'filtr')"
                  @toggle="toggleService('filtr', 25000)"
              />
              <Choice
                  title="фильтр"
                  text="Умная фильтрация товаров в списке"
                  price="25 000"
              />
            </div>

            <div class="choice-wrapper">
              <Checkbox
                  :is-active="selectedServices.some(item => item.id === 'cap')"
                  @toggle="toggleService('cap', 4000)"
              />
              <Choice
                  title="Корзина на AJAX"
                  text="Возможность добавления товаров и услуг в корзину без перезагрузки страницы, в реальном времени."
                  price="4 000"
              />
            </div>

            <div class="choice-wrapper">
              <Checkbox
                  :is-active="selectedServices.some(item => item.id === 'search')"
                  @toggle="toggleService('search', 6000)"
              />
              <Choice
                  title="Поиск-фильтр на AJAX"
                  text="Поиск и показ товаров и услуг без перезагрузки страницы"
                  price="6 000"
              />
            </div>

            <div class="choice-wrapper">
              <Checkbox
                  :is-active="selectedServices.some(item => item.id === 'top')"
                  @toggle="toggleService('top', 4000)"
              />
              <Choice
                  title="Топ товаров"
                  text="Вывод отдельного списка необходимых товаров: популярные, акционные, сортировка по различным полям"
                  price="4 000"
              />
            </div>

            <div class="choice-wrapper">
              <Checkbox
                  :is-active="selectedServices.some(item => item.id === 'compari')"
                  @toggle="toggleService('compari', 4000)"
              />
              <Choice
                  title="Сравнение товаров"
                  text="Возможность сравнения нескольких выбранных товаров"
                  price="4 000"
              />
            </div>

            <div class="choice-wrapper">
              <Checkbox
                  :is-active="selectedServices.some(item => item.id === 'like')"
                  @toggle="toggleService('like', 4000)"
              />
              <Choice
                  title="Избранные товары"
                  text="Возможность добавлять товары и услуги в избранные"
                  price="4 000"
              />
            </div>

            <span class="mini-title">Мобильная версия:</span>
            <div class="choice-wrapper">
              <Radio
                  :is-active="selectedMobile === 'adaptive'"
                  @select="selectMobile('adaptive', 25000)"
              />
              <Choice
                  title="интернет магазин"
                  text="на CMS Joomla / Wordpress, предоставляет возможность заказывать товары и услуги"
                  price="25 000"
              />
            </div>

            <div class="choice-wrapper">
              <Radio
                  :is-active="selectedMobile === 'not-adaptive'"
                  @select="selectMobile('not-adaptive', 25000)"
              />
              <Choice
                  title="интернет магазин"
                  text="на CMS Joomla / Wordpress, предоставляет возможность заказывать товары и услуги"
                  price="25 000"
              />
            </div>

            <span class="mini-title">Дополнительный функционал:</span>
            <div class="choice-wrapper">
              <Checkbox
                  :is-active="selectedServices.some(item => item.id === 'panel')"
                  @toggle="toggleService('panel', 10000)"
              />
              <Choice
                  title="Панель продаж"
                  text="Панель с вашими товарами и услугами, направленные на продажу. Грамотно структурированная и красиво оформленная."
                  price="10 000"
              />
            </div>

            <div class="choice-wrapper">
              <Checkbox
                  :is-active="selectedServices.some(item => item.id === 'animation')"
                    @toggle="toggleService('animation', 10000)"
              />
              <Choice
                  title="Функциональная анимация"
                  text="Динамическое разнообразие в интерфейсе, реактивные элементы, приятное взаимодействие"
                  price="10 000"
              />
            </div>

            <div class="choice-wrapper">
              <Checkbox
                  :is-active="selectedServices.some(item => item.id === 'turbo')"
                  @toggle="toggleService('turbo', 10000)"
              />
              <Choice
                  title="Турбо-страница (прайс-лист)"
                  text="HTML-страница с прайс-листом продвигаемых товаров и услуг"
                  price="10 000"
              />
            </div>

            <span class="mini-title">Инструменты имиджа:</span>
            <div class="choice-wrapper">
              <Checkbox
                  :is-active="selectedServices.some(item => item.id === 'banner')"
                  @toggle="toggleService('banner', 4000)"
              />
              <Choice
                  title="Схемы и баннеры с преимуществами фирмы"
                  text=""
                  price="4 000"
              />
            </div>

            <div class="choice-wrapper">
              <Checkbox
                  :is-active="selectedServices.some(item => item.id === 'banners2')"
                  @toggle="toggleService('banners2', 4000)"
              />
              <Choice
                  title="Схема работы фирмы в виде баннеров"
                  text=""
                  price="4 000"
              />
            </div>

            <div class="choice-wrapper">
              <Checkbox
                  :is-active="selectedServices.some(item => item.id === 'slider')"
                  @toggle="toggleService('slider', 4000)"
              />
              <Choice
                  title="Слайдер с партнёрами"
                  text=""
                  price="4 000"
              />
            </div>

            <div class="choice-wrapper">
              <Checkbox
                  :is-active="selectedServices.some(item => item.id === 'portfolio')"
                  @toggle="toggleService('portfolio', 4000)"
              />
              <Choice
                  title="Презентация работ в галерее или слайдере"
                  text="+ описание для каждой работы"
                  price="4 000"
              />
            </div>

            <div class="choice-wrapper">
              <Checkbox
                  :is-active="selectedServices.some(item => item.id === 'video')"
                  @toggle="toggleService('video', 4000)"
              />
              <Choice
                  title="Видео-отчёт об объектах в галерее"
                  text=""
                  price="4 000"
              />
            </div>

            <div class="choice-wrapper">
              <Checkbox
                  :is-active="selectedServices.some(item => item.id === 'sertif')"
                  @toggle="toggleService('sertif', 4000)"
              />
              <Choice
                  title="Всплывающие сертификаты"
                  text="или награды, или рейтинги"
                  price="4 000"
              />
            </div>

            <div class="choice-wrapper">
              <Checkbox
                  :is-active="selectedServices.some(item => item.id === 'head')"
                  @toggle="toggleService('head', 4000)"
              />
              <Choice
                  title="Закреплённая шапка с контактами"
                  text="Остается на экране при прокрутке сайта"
                  price="4 000"
              />
            </div>

            <div class="choice-wrapper">
              <Checkbox
                  :is-active="selectedServices.some(item => item.id === 'modal')"
                  @toggle="toggleService('modal', 4000)"
              />
              <Choice
                  title="Кнопка с модальным окном"
                  text="с Видео-обращение директора, с рекламой фирмы, с ТВ передачей и прочим"
                  price="4 000"
              />
            </div>

            <div class="choice-wrapper">
              <Checkbox
                  :is-active="selectedServices.some(item => item.id === 'otziv')"
                  @toggle="toggleService('otziv', 4000)"
              />
              <Choice
                  title="Отзывы с админ-панелью"
                  text="Включать/отключать, редактировать, удалять"
                  price="4 000"
              />
            </div>

            <div class="choice-wrapper">
              <Checkbox
                  :is-active="selectedServices.some(item => item.id === 'video-otziv')"
                  @toggle="toggleService('video-otziv', 4000)"
              />
              <Choice
                  title="Видео-отзывы"
                  text=""
                  price="4 000"
              />
            </div>

            <div class="choice-wrapper">
              <Checkbox
                  :is-active="selectedServices.some(item => item.id === 'audio')"
                  @toggle="toggleService('audio', 4000)"
              />
              <Choice
                  title="Аудио-отзывы"
                  text=""
                  price="4 000"
              />
            </div>

            <div class="choice-wrapper">
              <Checkbox
                  :is-active="selectedServices.some(item => item.id === 'hello')"
                  @toggle="toggleService('hello', 4000)"
              />
              <Choice
                  title="Видеоряд на фон первого блока"
                  text="Нарезка, подбор"
                  price="4 000"
              />
            </div>

            <div class="choice-wrapper">
              <Checkbox
                  :is-active="selectedServices.some(item => item.id === 'desk')"
                  @toggle="toggleService('desk', 4000)"
              />
              <Choice
                  title="Доска почёта"
                  text="Показывает работников, их стаж и достижения"
                  price="4 000"
              />
            </div>

            <div class="choice-wrapper">
              <Checkbox
                  :is-active="selectedServices.some(item => item.id === 'info')"
                  @toggle="toggleService('info', 4000)"
              />
              <Choice
                  title="Инфографика блока о компании"
                  text="Обращение директора с достижениями и шкалой по годам"
                  price="4 000"
              />
            </div>

            <div class="choice-wrapper">
              <Checkbox
                  :is-active="selectedServices.some(item => item.id === 'plus')"
                  @toggle="toggleService('plus', 4000)"
              />
              <Choice
                  title="Слайдеры с плюсами фирмы"
                  text="До 4 слайдеров"
                  price="4 000"
              />
            </div>


            <span class="mini-title">Инструменты представления товаров и услуг:</span>
            <div class="choice-wrapper">
              <Checkbox
                  :is-active="selectedServices.some(item => item.id === 'spec')"
                  @toggle="toggleService('spec', 4000)"
              />
              <Choice
                  title="Презентация спецпредложений товаров"
                  text="До 4 слайдеров, новинок или схем преимуществ товара, возможна форма связи"
                  price="4 000"
              />
            </div>

            <div class="choice-wrapper">
              <Checkbox
                  :is-active="selectedServices.some(item => item.id === 'spec-baner')"
                  @toggle="toggleService('spec-baner', 4000)"
              />
              <Choice
                  title="До 3-х подталкивающих имиджевых баннеров-спецпредложений"
                  text="Предоставляются по основным 3-м товарам на всю ширину. Разбросаны по странице. Для акцентирования на конкретных товарах."
                  price="4 000"
              />
            </div>

            <div class="choice-wrapper">
              <Checkbox
                  :is-active="selectedServices.some(item => item.id === 'price')"
                  @toggle="toggleService('price', 4000)"
              />
              <Choice
                  title="Минимальные цены - прайс (выдвижной слайдер)"
                  text="Предоставляется при отсутствии панели продаж."
                  price="4 000"
              />
            </div>

            <div class="choice-wrapper">
              <Checkbox
                  :is-active="selectedServices.some(item => item.id === 'sale')"
                  @toggle="toggleService('sale', 4000)"
              />
              <Choice
                  title="До 4 баннеров с акциями, спецпредложениями и скидками"
                  text="Добавляются с кнопкой, подталкивающей к действию и всплывающей формой."
                  price="4 000"
              />
            </div>

            <div class="choice-wrapper">
              <Checkbox
                  :is-active="selectedServices.some(item => item.id === 'block')"
                  @toggle="toggleService('block', 4000)"
              />
              <Choice
                  title="Блок для улучшения поведенческих факторов"
                  text="Фишки - интересные вопросы по услугам, возникающие у клиентов, форма связи"
                  price="4 000"
              />
            </div>

            <div class="choice-wrapper">
              <Checkbox
                  :is-active="selectedServices.some(item => item.id === 'slide-new')"
                  @toggle="toggleService('slide-new', 4000)"
              />
              <Choice
                  title="Слайдеры- товары со скидками, новинки, популярные внутри сайта"
                  text=""
                  price="4 000"
              />
            </div>

            <div class="choice-wrapper">
              <Checkbox
                  :is-active="selectedServices.some(item => item.id === 'cart')"
                  @toggle="toggleService('cart', 4000)"
              />
              <Choice
                  title="Отрисовка карточки товара"
                  text="Производится при отсутствии магазина для представления товаров до 8 штук"
                  price="4 000"
              />
            </div>

            <div class="choice-wrapper">
              <Checkbox
                  :is-active="selectedServices.some(item => item.id === 'photo')"
                  @toggle="toggleService('photo', 4000)"
              />
              <Choice
                  title="Фотогалерея имиджевых объектов или продуции с подписями"
                  text=""
                  price="4 000"
              />
            </div>

            <div class="choice-wrapper">
              <Checkbox
                  :is-active="selectedServices.some(item => item.id === 'promo')"
                  @toggle="toggleService('promo', 4000)"
              />
              <Choice
                  title="Видео-презентация продукции"
                  text="Создается в виде блоков, а также всплывающих окон с видео."
                  price="4 000"
              />
            </div>

            <div class="choice-wrapper">
              <Checkbox
                  :is-active="selectedServices.some(item => item.id === 'draw')"
                  @toggle="toggleService('draw', 4000)"
              />
              <Choice
                  title="Отрисовка баннеров с разделами продукции"
                  text=""
                  price="4 000"
              />
            </div>

            <div class="choice-wrapper">
              <Checkbox
                  :is-active="selectedServices.some(item => item.id === 'reverse')"
                  @toggle="toggleService('reverse', 4000)"
              />
              <Choice
                  title="Акция распродажа - Обратный отсчёт"
                  text=""
                  price="4 000"
              />
            </div>

            <span class="mini-title">Инструменты подталкивающие к действиям:</span>
            <div class="choice-wrapper">
              <Checkbox
                  :is-active="selectedServices.some(item => item.id === 'important')"
                  @toggle="toggleService('important', 4000)"
              />
              <Choice
                  title="Важная информация в шапке+закреплённая шапка при движении страницы вниз"
                  text="Вся контактная информация копируемая в шапке"
                  price="4 000"
              />
            </div>

            <div class="choice-wrapper">
              <Checkbox
                  :is-active="selectedServices.some(item => item.id === 'btn')"
                  @toggle="toggleService('btn', 4000)"
              />
              <Choice
                  title="Сквозные кнопки вызывающие формы заказа около всех баннеров"
                  text="Предлагается оставить телефон или почту"
                  price="4 000"
              />
            </div>

            <div class="choice-wrapper">
              <Checkbox
                  :is-active="selectedServices.some(item => item.id === 'form')"
                  @toggle="toggleService('form', 4000)"
              />
              <Choice
                  title="Сквозные интегрированные формы связи-заказа вверху, по середине, в низу сайта"
                  text=""
                  price="4 000"
              />
            </div>

            <div class="choice-wrapper">
              <Checkbox
                  :is-active="selectedServices.some(item => item.id === 'lang')"
                  @toggle="toggleService('lang', 4000)"
              />
              <Choice
                  title="Язычки закреплённые справа или слева вызывают форму заказа по клику на спецпредлложениям"
                  text=""
                  price="4 000"
              />
            </div>

            <div class="choice-wrapper">
              <Checkbox
                  :is-active="selectedServices.some(item => item.id === 'chat')"
                  @toggle="toggleService('chat', 4000)"
              />
              <Choice
                  title="Онлайн общение - чат с посетителями с роботом начинающим разговор"
                  text=""
                  price="4 000"
              />
            </div>

            <div class="choice-wrapper">
              <Checkbox
                  :is-active="selectedServices.some(item => item.id === 'email')"
                  @toggle="toggleService('email', 4000)"
              />
              <Choice
                  title="До 3х всплывающих форм-тизеров с предложениями с целью получить почту или телефон"
                  text=""
                  price="4 000"
              />
            </div>

            <div class="choice-wrapper">
              <Checkbox
                  :is-active="selectedServices.some(item => item.id === 'city')"
                  @toggle="toggleService('city', 4000)"
              />
              <Choice
                  title="Стилизованная интерактивная карта с точками продаж в городах или офисы по городу"
                  text=""
                  price="4 000"
              />
            </div>


            <span class="mini-title">Сервер:</span>
            <div class="choice-wrapper">
              <Checkbox
                  :is-active="selectedServices.some(item => item.id === 'domain')"
                  @toggle="toggleService('domain', 1000)"
              />
              <Choice
                  title="Дополнительный домен"
                  text=""
                  price="1 000"
              />
            </div>
            <div class="choice-wrapper">
              <Checkbox
                  :is-active="selectedServices.some(item => item.id === 'domain2')"
                  @toggle="toggleService('domain2', 6000)"
              />
              <Choice
                  title="Хостинг + Домен .RU"
                  text=""
                  price="6 000"
              />
            </div>
          </div>

          <div class="tabs-block__content" v-else-if="activeTab === 'mobile'">
            <div class="choice-wrapper">
              <Radio
                  :is-active="selectedMobiles === 'ios'"
                  @select="selectMobiles('ios', 150000)"
              />
              <Choice
                  title="iOS (без админ-панели)"
                  text=""
                  price="150 000"
              />
            </div>

            <div class="choice-wrapper">
              <Radio
                  :is-active="selectedMobiles === 'android'"
                  @select="selectMobiles('android', 150000)"
              />
              <Choice
                  title="Android (без админ-панели)"
                  text=""
                  price="150 000"
              />
            </div>

            <div class="choice-wrapper">
              <Radio
                  :is-active="selectedMobiles === 'ios-android'"
                  @select="selectMobiles('ios-android', 250000)"
              />
              <Choice
                  title="iOS & Android (без админ-панели)"
                  text=""
                  price="250 000"
              />
            </div>

            <div class="choice-wrapper">
              <Radio
                  :is-active="selectedMobiles === 'ios2'"
                  @select="selectMobiles('ios2', 300000)"
              />
              <Choice
                  title="iOS (с админ-панелью)"
                  text=""
                  price="300 000"
              />
            </div>

            <div class="choice-wrapper">
              <Radio
                  :is-active="selectedMobiles === 'android2'"
                  @select="selectMobiles('android2', 300000)"
              />
              <Choice
                  title="Android (с админ-панелью)"
                  text=""
                  price="300 000"
              />
            </div>

            <div class="choice-wrapper">
              <Radio
                  :is-active="selectedMobiles === 'ios-android2'"
                  @select="selectMobiles('ios-android2', 500000)"
              />
              <Choice
                  title="iOS & Android (с админ-панелью)"
                  text=""
                  price="500 000"
              />
            </div>
          </div>

          <div class="tabs-block__content" v-else-if="activeTab === 'programming'">
            <div class="choice-wrapper">
              <Checkbox
                  :is-active="selectedServices.some(item => item.id === 'develop')"
                  @toggle="toggleService('develop', 100000)"
              />
              <Choice
                  title="Разработка уникальных систем"
                  text=""
                  price="100 000"
              />
            </div>

            <div class="choice-wrapper">
              <Checkbox
                  :is-active="selectedServices.some(item => item.id === 'spid')"
                  @toggle="toggleService('spid', 8000)"
              />
              <Choice
                  title="Оптимизация скорости сайта"
                  text="Web-мастеринг"
                  price="8 000"
              />
            </div>

            <div class="choice-wrapper">
              <Checkbox
                  :is-active="selectedServices.some(item => item.id === 'develop2')"
                  @toggle="toggleService('develop2', 10000)"
              />
              <Choice
                  title="Разработка модулей и компонентов"
                  text=""
                  price="10 000"
              />
            </div>

            <div class="choice-wrapper">
              <Checkbox
                  :is-active="selectedServices.some(item => item.id === 'calc')"
                  @toggle="toggleService('calc', 8000)"
              />
              <Choice
                  title="Калькуляторы"
                  text=""
                  price="8 000"
              />
            </div>

            <div class="choice-wrapper">
              <Checkbox
                  :is-active="selectedServices.some(item => item.id === 'analysis')"
                  @toggle="toggleService('analysis', 0)"
              />
              <Choice
                  title="Анализ сайта"
                  text=""
                  price="0"
              />
            </div>

            <div class="choice-wrapper">
              <Checkbox
                  :is-active="selectedServices.some(item => item.id === 'modification')"
                  @toggle="toggleService('modification', 5000)"
              />
              <Choice
                  title="Доработка функционала"
                  text=""
                  price="5 000"
              />
            </div>

            <div class="choice-wrapper">
              <Checkbox
                  :is-active="selectedServices.some(item => item.id === 'import')"
                  @toggle="toggleService('import', 4000)"
              />
              <Choice
                  title="Импорт/Экспорт"
                  text="Фид-файлы для сервисов"
                  price="4 000"
              />
            </div>

            <div class="choice-wrapper">
              <Checkbox
                  :is-active="selectedServices.some(item => item.id === 'api')"
                  @toggle="toggleService('api', 10000)"
              />
              <Choice
                  title="Интеграция через API"
                  text=""
                  price="10 000"
              />
            </div>

            <div class="choice-wrapper">
              <Checkbox
                  :is-active="selectedServices.some(item => item.id === 'pdf')"
                  @toggle="toggleService('pdf', 4000)"
              />
              <Choice
                  title="Генерация PDF"
                  text=""
                  price="4 000"
              />
            </div>

            <div class="choice-wrapper">
              <Checkbox
                  :is-active="selectedServices.some(item => item.id === 'pars')"
                  @toggle="toggleService('pars', 5000)"
              />
              <Choice
                  title="Парсинг сайтов"
                  text=""
                  price="5 000"
              />
            </div>

            <div class="choice-wrapper">
              <Checkbox
                  :is-active="selectedServices.some(item => item.id === 'SMS')"
                  @toggle="toggleService('SMS', 10000)"
              />
              <Choice
                  title="Подключение SMS-рассылки"
                  text=""
                  price="10 000"
              />
            </div>

            <div class="choice-wrapper">
              <Checkbox
                  :is-active="selectedServices.some(item => item.id === 'email2')"
                  @toggle="toggleService('email2', 8000)"
              />
              <Choice
                  title="Подключение E-mail-рассылки"
                  text=""
                  price="8 000"
              />
            </div>

            <div class="choice-wrapper">
              <Checkbox
                  :is-active="selectedServices.some(item => item.id === 'develop')"
                  @toggle="toggleService('like', 100000)"
              />
              <Choice
                  title="Разработка уникальных систем"
                  text=""
                  price="100 000"
              />
            </div>

            <div class="choice-wrapper">
              <Checkbox
                  :is-active="selectedServices.some(item => item.id === 'mikro')"
                  @toggle="toggleService('mikro', 5000)"
              />
              <Choice
                  title="Внедрение микроразметки"
                  text="(schema.org, openGraph)"
                  price="5 000"
              />
            </div>

            <div class="choice-wrapper">
              <Checkbox
                  :is-active="selectedServices.some(item => item.id === 'doc')"
                  @toggle="toggleService('doc', 5000)"
              />
              <Choice
                  title="Лечение сайта"
                  text=""
                  price="5 000"
              />
            </div>

            <div class="choice-wrapper">
              <Checkbox
                  :is-active="selectedServices.some(item => item.id === 'capcha')"
                  @toggle="toggleService('capcha', 2000)"
              />
              <Choice
                  title="Установка капчи"
                  text=""
                  price="2 000"
              />
            </div>
          </div>

          <div class="tabs-block__content" v-else-if="activeTab === 'content'">
            <p>1 страница А4 составляет до 28 строк и от 1 до 5 фото. Стоимость указана за страницу</p>
            <span class="mini-title">Заполнение страниц:</span>

            <div class="choice-wrapper">
              <Radio
                  :is-active="selectedContent === '1-100'"
                  @select="selectContent('1-100', 300)"
              />
              <Choice
                  title="от 1 до 100 страниц"
                  text="(перенос с сайта)"
                  price="300"
              />
            </div>

            <div class="choice-wrapper">
              <Radio
                  :is-active="selectedContent === '100-300'"
                  @select="selectContent('100-300', 250)"
              />
              <Choice
                  title="от 100 до 300 страниц"
                  text="(перенос с сайта)"
                  price="250"
              />
            </div>

            <div class="choice-wrapper">
              <Radio
                  :is-active="selectedContent === '300+'"
                  @select="selectContent('300+', 200)"
              />
              <Choice
                  title="от 300 страниц"
                  text="(перенос с сайта)"
                  price="200"
              />
            </div>

            <div class="choice-wrapper">
              <Checkbox
                  :is-active="selectedServices.some(item => item.id === 'scaner')"
                  @toggle="toggleService('scaner', 500)"
              />
              <Choice
                  title="Перенос текста с картинками со сканера"
                  text=""
                  price="500"
              />
            </div>

            <div class="choice-wrapper">
              <Checkbox
                  :is-active="selectedServices.some(item => item.id === 'katalog')"
                  @toggle="toggleService('katalog', 150)"
              />
              <Choice
                  title="Перенос каталога с другого сайта"
                  text="при переходе к нам на нашу систему"
                  price="150"
              />
            </div>

            <div class="choice-wrapper">
              <Checkbox
                  :is-active="selectedServices.some(item => item.id === 'print')"
                  @toggle="toggleService('print', 500)"
              />
              <Choice
                  title="Печать текста вручную"
                  text="При переносе из Excel или рукописного текста"
                  price="500"
              />
            </div>

            <div class="choice-wrapper">
              <Checkbox
                  :is-active="selectedServices.some(item => item.id === 'gallery')"
                  @toggle="toggleService('gallery', 1000)"
              />
              <Choice
                  title="Галерея без подписей"
                  text="Стандартная, всплывающая, до 20 картинок"
                  price="1 000"
              />
            </div>

            <div class="choice-wrapper">
              <Checkbox
                  :is-active="selectedServices.some(item => item.id === 'gallery2')"
                  @toggle="toggleService('gallery2', 2000)"
              />
              <Choice
                  title="Галерея с подписями"
                  text="Стандартная, всплывающая, до 20 картинок"
                  price="2 000"
              />
            </div>

            <span class="mini-title">Заполнение каталога:</span>

            <div class="choice-wrapper">
              <Checkbox
                  :is-active="selectedServices.some(item => item.id === 'S')"
                  @toggle="toggleService('S', 50)"
              />
              <Choice
                  title="Карточка каталога S"
                  text="Название с ценой и без"
                  price="50"
              />
            </div>

            <div class="choice-wrapper">
              <Checkbox
                  :is-active="selectedServices.some(item => item.id === 'M')"
                  @toggle="toggleService('M', 100)"
              />
              <Choice
                  title="Карточка каталога M"
                  text="Название с ценой + картинка"
                  price="100"
              />
            </div>

            <div class="choice-wrapper">
              <Checkbox
                  :is-active="selectedServices.some(item => item.id === 'L')"
                  @toggle="toggleService('L', 150)"
              />
              <Choice
                  title="Карточка каталога L"
                  text="Название с ценой + картинка + краткое описание"
                  price="150"
              />
            </div>

            <div class="choice-wrapper">
              <Checkbox
                  :is-active="selectedServices.some(item => item.id === 'XL')"
                  @toggle="toggleService('XL', 300)"
              />
              <Choice
                  title="Карточка каталога XL"
                  text="Название с ценой + картинка + краткое и полное описание"
                  price="300"
              />
            </div>
          </div>

          <div class="tabs-block__content" v-else-if="activeTab === 'smm'">
            <span class="mini-title">Пакеты:</span>

            <div class="choice-wrapper">
              <Radio
                  :is-active="selectedPack === 'baze'"
                  @select="selectPack('baze', 0)"
              />
              <Choice
                  title="Базовый"
                  text=""
                  price="0"
              />
            </div>
            <div class="choice-wrapper">
              <Radio
                  :is-active="selectedPack === 'advanc'"
                  @select="selectPack('advanc', 0)"
              />
              <Choice
                  title="Продвинутый"
                  text=""
                  price="0"
              />
            </div>

            <span class="mini-title">Реклама Яндекс и Google:</span>
            <div class="choice-wrapper">
              <Checkbox
                  :is-active="selectedServices.some(item => item.id === 'google')"
                  @toggle="toggleService('google', 7000)"
              />
              <Choice
                  title="Создание РК Яндекс & Google"
                  text=""
                  price="7 000"
              />
            </div>

            <div class="choice-wrapper">
              <Checkbox
                  :is-active="selectedServices.some(item => item.id === 'pk')"
                  @toggle="toggleService('pk', 3500)"
              />
              <Choice
                  title="Ведение РК Яндекс & Google"
                  text=""
                  price="3 500"
              />
            </div>

            <div class="choice-wrapper">
              <Checkbox
                  :is-active="selectedServices.some(item => item.id === 'budget')"
                  @toggle="toggleService('budget', 12000)"
              />
              <Choice
                  title="Бюджет Яндекс"
                  text=""
                  price="12 000"
              />
            </div>

            <div class="choice-wrapper">
              <Checkbox
                  :is-active="selectedServices.some(item => item.id === 'google2')"
                  @toggle="toggleService('google2', 12000)"
              />
              <Choice
                  title="Бюджет Google"
                  text=""
                  price="12 000"
              />
            </div>

            <span class="mini-title">Дополнительно по рекламе:</span>
            <div class="choice-wrapper">
              <Radio
                  :is-active="selectedDop === '5-1'"
                  @select="selectDop('5-1', 15000)"
              />
              <Choice
                  title="Акцентный баннер Яндекса (до 5 фраз, 1 баннер)"
                  text=""
                  price="15 000"
              />
            </div>
            <div class="choice-wrapper">
              <Radio
                  :is-active="selectedDop === '10-3'"
                  @select="selectDop('10-3', 25000)"
              />
              <Choice
                  title="Акцентный баннер Яндекса (до 10 фраз, до 3 баннеров)"
                  text=""
                  price="25 000"
              />
            </div>

            <span class="mini-title">SMM:</span>

            <div class="choice-wrapper">
              <Checkbox
                  :is-active="selectedServices.some(item => item.id === 'create')"
                  @toggle="toggleService('create', 10000)"
              />
              <Choice
                  title="Создание сообщества"
                  text="ВКонтакте, Instagram, Facebook с нуля"
                  price="10 000"
              />
            </div>

            <div class="choice-wrapper">
              <Checkbox
                  :is-active="selectedServices.some(item => item.id === 'post')"
                  @toggle="toggleService('post', 1000)"
              />
              <Choice
                  title="Пост в соц.сети"
                  text="В одну соц. сеть. Дублирование в другую соц.сеть - +33%"
                  price="1 000"
              />
            </div>

            <div class="choice-wrapper">
              <Checkbox
                  :is-active="selectedServices.some(item => item.id === 'dubl')"
                  @toggle="toggleService('dubl', 300)"
              />
              <Choice
                  title="Дублирование поста в соц.сети"
                  text=""
                  price="300"
              />
            </div>

            <div class="choice-wrapper">
              <Checkbox
                  :is-active="selectedServices.some(item => item.id === 'create2')"
                  @toggle="toggleService('create2', 10000)"
              />
              <Choice
                  title="Создание РК с соц. сетях"
                  text="ВКонтакте, Instagram, Facebook, настройка РК, подбор целевой аудитории, анализ конкурентов"
                  price="10 000"
              />
            </div>

            <div class="choice-wrapper">
              <Checkbox
                  :is-active="selectedServices.some(item => item.id === 'conduction')"
                  @toggle="toggleService('conduction', 5000)"
              />
              <Choice
                  title="Ведение РК в соц.сетях"
                  text="+10% к стоимости от бюджета РК."
                  price="5 000"
              />
            </div>

            <div class="choice-wrapper">
              <Checkbox
                  :is-active="selectedServices.some(item => item.id === 'budjet2')"
                  @toggle="toggleService('budjet2', 1)"
              />
              <Choice
                  title="Бюджет РК в соц.сетях"
                  text="Бюджет"
                  price="от 1"
              />
            </div>

          </div>

          <div class="tabs-block__content" v-else-if="activeTab === 'seo'">
            <span class="mini-title">Пакеты:</span>
            <div class="choice-wrapper">
              <Radio
                  :is-active="selectedSize === 'size-S'"
                  @select="selectSize('size-S', 10000)"
              />
              <Choice
                  title="Пакет S"
                  text=""
                  price="10 000"
              />
            </div>

            <div class="choice-wrapper">
              <Radio
                  :is-active="selectedSize === 'size-M'"
                  @select="selectSize('size-M', 20000)"
              />
              <Choice
                  title="Пакет M"
                  text=""
                  price="20 000"
              />
            </div>

            <div class="choice-wrapper">
              <Radio
                  :is-active="selectedSize === 'size-L'"
                  @select="selectSize('size-L', 30000)"
              />
              <Choice
                  title="Пакет L"
                  text=""
                  price="30 000"
              />
            </div>

            <span class="mini-title">Оптимизация:</span>
            <div class="choice-wrapper">
              <Checkbox
                  :is-active="selectedServices.some(item => item.id === 'desks')"
                  @toggle="toggleService('desks', 3000)"
              />
              <Choice
                  title="Доски"
                  text="Доски объявлений"
                  price="3 000"
              />
            </div>

            <div class="choice-wrapper">
              <Checkbox
                  :is-active="selectedServices.some(item => item.id === 'inner')"
                  @toggle="toggleService('inner', 15000)"
              />
              <Choice
                  title="Внутренняя оптимизация"
                  text=""
                  price="15 000"
              />
            </div>
          </div>

          <div class="tabs-block__content" v-else-if="activeTab === 'design'">
            <span class="mini-title">Полиграфия:</span>
            <div class="choice-wrapper">
              <Checkbox
                  :is-active="selectedServices.some(item => item.id === 'card')"
                  @toggle="toggleService('card', 3000)"
              />
              <Choice
                  title="Визитка"
                  text="Разработка дизайна визитки"
                  price="3 000"
              />
            </div>

            <div class="choice-wrapper">
              <Checkbox
                  :is-active="selectedServices.some(item => item.id === 'Booklets')"
                  @toggle="toggleService('Booklets', 8000)"
              />
              <Choice
                  title="Буклеты"
                  text="Разработка дизайна буклетов"
                  price="8 000"
              />
            </div>

            <div class="choice-wrapper">
              <Checkbox
                  :is-active="selectedServices.some(item => item.id === 'calendars')"
                  @toggle="toggleService('calendars', 10000)"
              />
              <Choice
                  title="Календари"
                  text="Разработка дизайна календарей"
                  price="10 000"
              />
            </div>

            <div class="choice-wrapper">
              <Checkbox
                  :is-active="selectedServices.some(item => item.id === 'Flyers')"
                  @toggle="toggleService('Flyers', 1000)"
              />
              <Choice
                  title="Флаеры"
                  text="Разработка дизайна флаеров"
                  price="1 000"
              />
            </div>

            <span class="mini-title">Брендирование:</span>

            <div class="choice-wrapper">
              <Checkbox
                  :is-active="selectedServices.some(item => item.id === 'Packaging')"
                  @toggle="toggleService('Packaging', 1)"
              />
              <Choice
                  title="Упаковка соц. сетей"
                  text="Внешнее оформление сообщества"
                  price="1"
              />
            </div>

            <div class="choice-wrapper">
              <Checkbox
                  :is-active="selectedServices.some(item => item.id === 'banners-pk')"
                  @toggle="toggleService('banners-pk', 1000)"
              />
              <Choice
                  title="Баннеры на РК"
                  text="Оформление рекламных компаний"
                  price="1 000"
              />
            </div>

            <div class="choice-wrapper">
              <Checkbox
                  :is-active="selectedServices.some(item => item.id === 'banner-byl')"
                  @toggle="toggleService('banner-byl', 6000)"
              />
              <Choice
                  title="Баннер на билборды"
                  text=""
                  price="6 000"
              />
            </div>

            <div class="choice-wrapper">
              <Checkbox
                  :is-active="selectedServices.some(item => item.id === 'identity')"
                  @toggle="toggleService('identity', 25000)"
              />
              <Choice
                  title="Фирменный стиль"
                  text="Фирменное представление требуемых вещей. От ручек до одежды с вашим логотипом"
                  price="25 000"
              />
            </div>

            <div class="choice-wrapper">
              <Checkbox
                  :is-active="selectedServices.some(item => item.id === 'logo')"
                  @toggle="toggleService('logo', 15000)"
              />
              <Choice
                  title="Логотип без сайта"
                  text=""
                  price="15 000"
              />
            </div>

            <div class="choice-wrapper">
              <Checkbox
                  :is-active="selectedServices.some(item => item.id === 'banner-site')"
                  @toggle="toggleService('banner-site', 1000)"
              />
              <Choice
                  title="Баннер на сайт"
                  text=""
                  price="1 000"
              />
            </div>
          </div>

          <div class="tabs-block__content" v-else-if="activeTab === 'services'">
            <span class="mini-title">Анимации:</span>
            <div class="choice-wrapper">
              <Checkbox
                  :is-active="selectedServices.some(item => item.id === 'promo3')"
                  @toggle="toggleService('promo3', 8000)"
              />
              <Choice
                  title="Промо-ролик"
                  text=""
                  price="8 000"
              />
            </div>

            <div class="choice-wrapper">
              <Checkbox
                  :is-active="selectedServices.some(item => item.id === 'animation')"
                  @toggle="toggleService('animation', 8000)"
              />
              <Choice
                  title="Анимация шапки"
                  text=""
                  price="8 000"
              />
            </div>

            <div class="choice-wrapper">
              <Checkbox
                  :is-active="selectedServices.some(item => item.id === 'animation-dinam')"
                  @toggle="toggleService('animation-dinam', 4000)"
              />
              <Choice
                  title="Динамическая анимация"
                  text=""
                  price="4 000"
              />
            </div>

            <div class="choice-wrapper">
              <Checkbox
                  :is-active="selectedServices.some(item => item.id === 'aiimatioin-mod')"
                  @toggle="toggleService('aiimatioin-mod', 4000)"
              />
              <Choice
                  title="Анимация модуля"
                  text=""
                  price="4 000"
              />
            </div>

            <div class="choice-wrapper">
              <Checkbox
                  :is-active="selectedServices.some(item => item.id === 'animation-site')"
                  @toggle="toggleService('animation-site', 10000)"
              />
              <Choice
                  title="Анимация сайта"
                  text=""
                  price="10 000"
              />
            </div>

            <span class="mini-title">Прочее:</span>

            <div class="choice-wrapper">
              <Checkbox
                  :is-active="selectedServices.some(item => item.id === 'hand')"
                  @toggle="toggleService('hand', 15000)"
              />
              <Choice
                  title="Ручной перевод сайта на другой язык"
                  text="Установка компонентов для ручной подмены текста из админ-панели сайта"
                  price="15 000"
              />
            </div>

            <div class="choice-wrapper">
              <Checkbox
                  :is-active="selectedServices.some(item => item.id === 'auto-translate')"
                  @toggle="toggleService('auto-translate', 8000)"
              />
              <Choice
                  title="Автоматический перевод сайта на другой язык"
                  text="Средствами Google"
                  price="8 000"
              />
            </div>
          </div>


        </div>
      </div>

    </div>
  </div>
</template>


<script setup>
import Package from '@/components/Package.vue'
import Choice from '@/components/Choice.vue'
import Radio from '@/components/Radio.vue'
import Checkbox from '@/components/Checkbox.vue'
import { ref, computed } from 'vue'
import FormMiddle from "@/components/FormMiddle.vue";

// Список вкладок
const tabs = [
  { id: 'sites', name: 'САЙТЫ' },
  { id: 'mobile', name: 'МОБИЛЬНЫЕ ПРИЛОЖЕНИЯ' },
  { id: 'programming', name: 'ПРОГРАММИРОВАНИЕ' },
  { id: 'content', name: 'КОНТЕНТ' },
  { id: 'smm', name: 'РЕКЛАМА И SMM' },
  { id: 'seo', name: 'SEO-ПРОДВИЖЕНИЕ' },
  { id: 'design', name: 'ДИЗАЙН' },
  { id: 'services', name: 'УСЛУГИ' }
]

// Активная вкладка (по умолчанию 'sites')
const activeTab = ref('sites')

    // ===== Пакеты =====
const selectedPackage = ref(null)
const packagePrice = ref(0)

const selectPackage = (id, price) => {
  // Сбрасываем всё остальное
  selectedType.value = null
  selectedShop.value = null
  selectedMobile.value = null
  typePrice.value = 0
  shopPrice.value = 0
  mobilePrice.value = 0

  // Выбираем пакет
  selectedPackage.value = id
  packagePrice.value = price
}

// ===== Тип сайта =====
const selectedType = ref(null)
const typePrice = ref(0)

const selectType = (id, price) => {
  // Сбрасываем пакет и магазин
  selectedPackage.value = null
  packagePrice.value = 0

  // Выбираем тип сайта
  selectedType.value = id
  typePrice.value = price
}

// ===== размер =====
const selectedSize = ref(null)
const sizePrice = ref(0)

const selectSize = (id, price) => {
  // Сбрасываем пакет и магазин
  selectedPackage.value = null
  packagePrice.value = 0

  // Выбираем тип сайта
  selectedType.value = id
  sizePrice.value = price
}

// ===== pack =====
const selectedPack = ref(null)
const packPrice = ref(0)

const selectPack = (id, price) => {
  // Сбрасываем пакет и магазин
  selectedPackage.value = null
  packagePrice.value = 0

  // Выбираем тип сайта
  selectedPack.value = id
  packPrice.value = price
}

// ===== dop =====
const selectedDop = ref(null)
const dopPrice = ref(0)

const selectDop = (id, price) => {
  // Сбрасываем пакет и магазин
  selectedPackage.value = null
  packagePrice.value = 0

  // Выбираем тип сайта
  selectedDop.value = id
  dopPrice.value = price
}

// ===== ios =====
const selectedMobiles = ref(null)
const mobilesPrice = ref(0)

const selectMobiles = (id, price) => {
  // Сбрасываем пакет и магазин
  selectedPackage.value = null
  packagePrice.value = 0

  // Выбираем тип сайта
  selectedMobiles.value = id
  mobilesPrice.value = price
}

// ===== content =====
const selectedContent = ref(null)
const contentPrice = ref(0)

const selectContent = (id, price) => {
  // Сбрасываем пакет и магазин
  selectedPackage.value = null
  packagePrice.value = 0

  // Выбираем тип сайта
  selectedContent.value = id
  contentPrice.value = price
}

//мобилка
const selectedMobile = ref(null)
const mobilePrice = ref(0)

const selectMobile = (id, price) => {
  // Сбрасываем пакет и магазин
  selectedPackage.value = null
  packagePrice.value = 0

  // Выбираем тип сайта
  selectedMobile.value = id
  mobilePrice.value = price
}

//магазин
const selectedShop = ref(null)
const shopPrice = ref(0)

const selectShop = (id, price) => {
  // Сбрасываем пакет и тип сайта
  selectedPackage.value = null
  packagePrice.value = 0

  // Если уже выбран этот же — снимаем выбор
  if (selectedShop.value === id) {
    selectedShop.value = null
    shopPrice.value = 0
  } else {
    selectedShop.value = id
    shopPrice.value = price
  }
}


// ===== Открытие пакетов =====
const isOpen = ref(false)
const togglePackages = () => {
  isOpen.value = !isOpen.value
}

//ЧЕКБОКСЫ
const selectedServices = ref([])

const toggleService = (id, price) => {
  const index = selectedServices.value.findIndex(item => item.id === id)
  if (index !== -1) {
    selectedServices.value.splice(index, 1)
  } else {
    selectedServices.value.push({ id, price })
  }
}

// ===== Очистить всё =====
const clearAll = () => {
  selectedPackage.value = null
  packagePrice.value = 0
  selectedType.value = null
  selectedMobiles.value = null
  selectedContent.value = null
  selectedPack.value = null
  selectedDop.value = null
  selectedSize.value = null
  typePrice.value = 0
  sizePrice.value = 0
  dopPrice.value = 0
  contentPrice.value = 0
  packPrice.value = 0
  selectedShop.value = null
  shopPrice.value = 0
  selectedServices.value = []
}

// ===== Общая сумма =====
const totalPrice = computed(() => {
  let total = 0
  total += packagePrice.value
  total += typePrice.value
  total += shopPrice.value
  total += mobilesPrice.value
  total += contentPrice.value
  total += packPrice.value
  total += dopPrice.value
  total += sizePrice.value

  // Суммируем все выбранные чекбоксы
  selectedServices.value.forEach(item => {
    total += item.price
  })

  return total
})


const isFormOpen = ref(false)

const openForm = () => {
  isFormOpen.value = true
}

const closeForm = () => {
  isFormOpen.value = false
}
</script>


<style scoped>
.calcul-page {
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
  display: block;           /* ← было flex, стало block */
  /* gap: 20px; */          /* ← gap не работает без flex, можно убрать или оставить */
}

.calcul-title {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 20px 50px;
}

.calcul-title svg {
  position: absolute;
  left: 6%;
  top: 50%;
  transform: translateY(-50%);
  transition: all 0.3s ease;  /* ← плавность */
  cursor: pointer;
}

.calcul-title svg:hover {
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
  margin-top: 20px;
  margin-bottom: 10px;
}

.result{
  width: 100%;
  height: 70px;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 50px;
}

.btn:hover {
  transform: scale(1.05);
  opacity: 0.9;
}

.btn{
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to right, rgba(112, 0, 3, 0.5) 0%, rgba(186, 3, 7, 0.5) 100%);
  width: 180px;
  height: auto;
  padding: 10px;
  transition: all 0.3s ease;
  border-radius: 15px;
}

.del-text{
  font-size: 16px;
  color: white;
  text-align: center;
}

.cost-text{
  font-size: 24px;
  color: white;
  text-align: center;
}

.cost-title{
  font-family: 'BOWLER', sans-serif;
  font-size: 36px;
  color: white;
}

.cost-itog{
  font-family: 'BOWLER', sans-serif;
  font-size: 36px;
  color: white;
}

.cost{
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
}

.cost-price{
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}


/* Блок с переключателями */
.tabs-block {
  display: flex;
  gap: 80px;
  margin: 0px auto;
  padding: 0 40px;          /* ← увеличили боковые отступы */
  align-items: stretch;
  position: relative;
  max-width: 1400px;        /* ← ограничили ширину */
  justify-content: center;  /* ← центрируем */
}

.tabs-block__left {
  position: fixed;
  top: 350px;
  left: 40px;
  width: 200px;
  height: fit-content;
  z-index: 10;
}

.tabs-block__list {
  list-style: none;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0px;
  padding-bottom: 40px;
  width: 300px;
}


.tabs-block__item {
  list-style: none;
  cursor: pointer;
  padding: 5px 0;
  user-select: none;
}

.tabs-block__text {
  font-family: 'Open Sans', sans-serif;
  font-size: 22px;
  font-weight: 700;
  color: white;
  padding-bottom: 0px;
  display: inline-block;
  position: relative;
  cursor: pointer;
  transition: color 0.3s ease;
  /* Фиксируем ширину через псевдоэлемент */
}

/* Полоска через псевдоэлемент */
.tabs-block__text::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 5px;
  background: transparent;
  transition: background 0.3s ease;
}

/* Ховер — меняем цвет текста */
.tabs-block__item:hover .tabs-block__text {
  color: #C64027;
}

/* Активная вкладка — красная полоска */
.tabs-block__item--active .tabs-block__text::after {
  background: #C64027;
}

/* Правая часть */
.tabs-block__right {
  flex: 1;
  margin-left: 280px;      /* ← чтобы контент не заезжал под переключатели */
  min-height: 500px;
}

.tabs-block__content{
  width: 960px;
  display: flex;
  flex-wrap: wrap;
}

.packages{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  row-gap: 10px;
  padding-top: 20px;
}

.package-down{
  display: flex;
  align-items: center;
  gap: 15px;
}

.package-down svg:hover {
  opacity: 0.7;
}

.package-down svg {
  transition: transform 0.4s ease;
  margin-top: -5px;
}

/* Стрелка вверх (когда открыто) */
.package-down__arrow--open {
  transform: rotate(180deg);
}

.choice-wrapper {
  display: flex;
  align-items: center;
  gap: 20px;
  cursor: pointer;
}

html, body {
  overflow: visible !important;
  height: auto !important;
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
  margin: 0;
  padding: 0;
}

* {
  overflow: visible !important;
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


/* Планшеты */
@media (max-width: 992px) {
  .calcul-title {
    padding: 15px 30px;
  }

  .calcul-title svg {
    left: 4%;
  }

  h1 {
    font-size: 36px;
  }

  .result {
    padding: 10px 25px;
    height: 65px;
  }

  .btn {
    width: 150px;
    padding: 8px;
  }

  .cost-title,
  .cost-itog {
    font-size: 28px;
  }

  .cost {
    gap: 20px;
  }

  .tabs-block {
    gap: 40px;
    padding: 0 20px;
  }

  .tabs-block__left {
    top: 300px;
    left: 20px;
    width: 160px;
  }

  .tabs-block__list {
    width: 200px;
  }

  .tabs-block__text {
    font-size: 18px;
  }

  .tabs-block__right {
    margin-left: 200px;
  }

  .tabs-block__content {
    width: 100%;
  }

  .mini-title {
    padding-left: 20px;
    font-size: 18px;
  }

  .choice-wrapper {
    gap: 15px;
  }
}

/* Планшеты вертикальные */
@media (max-width: 768px) {
  .calcul-title {
    padding: 10px 20px;
  }

  .calcul-title svg {
    left: 3%;
    width: 28px;
    height: 46px;
  }

  h1 {
    font-size: 30px;
  }

  .result {
    flex-direction: column;
    height: auto;
    padding: 15px 20px;
    gap: 10px;
    align-items: center;
  }

  .btn {
    width: 140px;
    padding: 8px;
  }

  .cost {
    gap: 15px;
    flex-wrap: wrap;
    justify-content: center;
  }

  .cost-title,
  .cost-itog {
    font-size: 24px;
  }

  .del-text {
    font-size: 14px;
  }

  .cost-text {
    font-size: 20px;
  }

  .tabs-block {
    flex-direction: column;
    gap: 20px;
    padding: 0 15px;
    margin-top: 20px;
  }

  .tabs-block__left {
    position: sticky;
    top: 80px;
    left: 0;
    width: 100%;
    background: rgba(0, 0, 0, 0.7);
    padding: 10px 15px;
    border-radius: 15px;
    z-index: 50;
  }

  .tabs-block__list {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 5px 10px;
    width: 100%;
    padding-bottom: 0;
    justify-content: center;
  }

  .tabs-block__item {
    padding: 3px 0;
  }

  .tabs-block__text {
    font-size: 16px;
  }

  .tabs-block__text::after {
    height: 3px;
  }

  .tabs-block__right {
    margin-left: 0;
    min-height: 300px;
  }

  .tabs-block__content {
    width: 100%;
    gap: 15px;
    row-gap: 10px;
  }

  .mini-title {
    padding-left: 10px;
    font-size: 16px;
    margin-top: 15px;
    margin-bottom: 8px;
  }

  .choice-wrapper {
    gap: 12px;
    width: 100%;
  }

  .packages {
    gap: 8px;
    row-gap: 8px;
    padding-top: 10px;
  }

  .package-down {
    gap: 10px;
  }

  .package-down svg {
    width: 25px;
    height: 14px;
  }

  .package-down__arrow--open {
    transform: rotate(180deg);
  }
}

/* Телефоны */
@media (max-width: 576px) {
  .calcul-title {
    padding: 8px 15px;
  }

  .calcul-title svg {
    left: 2%;
    width: 22px;
    height: 36px;
  }

  h1 {
    font-size: 24px;
  }

  .result {
    padding: 12px 15px;
    gap: 8px;
  }

  .btn {
    width: 120px;
    padding: 6px;
    border-radius: 12px;
  }

  .del-text {
    font-size: 12px;
  }

  .cost-text {
    font-size: 16px;
  }

  .cost-title,
  .cost-itog {
    font-size: 20px;
  }

  .cost {
    gap: 10px;
  }

  .cost-price {
    gap: 5px;
  }

  .tabs-block {
    gap: 15px;
    padding: 0 10px;
  }

  .tabs-block__left {
    top: 60px;
    padding: 8px 10px;
  }

  .tabs-block__list {
    gap: 3px 8px;
  }

  .tabs-block__text {
    font-size: 14px;
  }

  .tabs-block__text::after {
    height: 3px;
  }

  .tabs-block__right {
    min-height: 200px;
  }

  .tabs-block__content {
    gap: 10px;
    row-gap: 8px;
  }

  .mini-title {
    font-size: 14px;
    padding-left: 5px;
    margin-top: 12px;
    margin-bottom: 6px;
  }

  .choice-wrapper {
    gap: 10px;
    flex-wrap: nowrap;
  }

  .package-down {
    gap: 8px;
  }

  .package-down span {
    font-size: 14px;
  }

  .package-down svg {
    width: 20px;
    height: 12px;
  }

  .packages {
    gap: 6px;
    row-gap: 6px;
    padding-top: 8px;
  }
}

/* Маленькие телефоны */
@media (max-width: 420px) {
  .calcul-title {
    padding: 5px 10px;
  }

  .calcul-title svg {
    width: 18px;
    height: 30px;
  }

  h1 {
    font-size: 20px;
  }

  .result {
    padding: 10px 10px;
  }

  .btn {
    width: 100px;
    padding: 5px;
  }

  .del-text {
    font-size: 11px;
  }

  .cost-text {
    font-size: 14px;
  }

  .cost-title,
  .cost-itog {
    font-size: 18px;
  }

  .cost {
    gap: 8px;
  }

  .tabs-block__text {
    font-size: 12px;
  }

  .tabs-block__list {
    gap: 2px 6px;
  }

  .tabs-block__left {
    top: 50px;
    padding: 6px 8px;
    background: none;
  }

  .mini-title {
    font-size: 12px;
    padding-left: 5px;
  }

  .choice-wrapper {
    display: flex !important;
    flex-direction: row !important;
    align-items: center !important;
    gap: 8px !important;
  }

  .package-down span {
    font-size: 12px;
  }

  .package-down svg {
    width: 16px;
    height: 10px;
  }

  .tabs-block__text::after{
    height: 2px;
  }
}
</style>