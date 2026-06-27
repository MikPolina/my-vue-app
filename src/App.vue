<template>
  <div id="app">
<!--фон-->
    <div v-if="$route.name === 'home'" class="background-images">
      <img src="/image/main.jpg" class="back" alt="main1">
      <img src="/image/main2.jpg" class="back" alt="main2">
    </div>

    <div v-else-if="$route.name === 'about'" class="background-images">
      <img src="/image/main2.jpg" class="back" alt="main">
    </div>

    <div v-else-if="$route.name === 'cases'" class="background-images">
      <img src="/image/main3.jpg" class="back" alt="main1">
      <img src="/image/main4.jpg" class="back" alt="main2">
    </div>

    <div v-else-if="$route.name === 'marketing'" class="background-images">
      <img src="/image/main3.jpg" class="back" alt="main">
    </div>

    <div v-else-if="$route.name === 'promo'" class="background-images">
      <img src="/image/main2.jpg" class="back" alt="main">
    </div>

    <div v-else-if="$route.name === 'shop'" class="background-images">
      <img src="/image/main3.jpg" class="back" alt="main">
      <img src="/image/main4.jpg" class="back" alt="main2">
    </div>

    <div v-if="$route.name === 'develop'" class="background-images">
      <img src="/image/main.jpg" class="back" alt="main1">
      <img src="/image/main2.jpg" class="back" alt="main2">
    </div>

    <div v-else-if="$route.name === 'contact'" class="background-images">
      <img src="/image/main.jpg" class="back" alt="main">
      <img src="/image/main2.jpg" class="back" alt="main2">
    </div>

    <div v-if="$route.name === 'calcul'" class="background-images">
      <img src="/image/main.jpg" class="back" alt="main1">
      <img src="/image/main2.jpg" class="back" alt="main2">
    </div>

    <div v-if="$route.name === 'theory'" class="background-images">
      <img src="/image/main2.jpg" class="back" alt="main2">
    </div>

    <div v-if="$route.name === 'theory2'" class="background-images">
      <img src="/image/main3.jpg" class="back" alt="main">
    </div>

    <div v-if="$route.name === 'policy'" class="background-images">
      <img src="/image/main3.jpg" class="back" alt="main">
    </div>

    <!-- Контент -->
    <div class="content">
      <Header />
      <main class="main-content">
        <router-view />
      </main>
      <Footer />
    </div>
  </div>
</template>

<script setup>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
</script>


<style>

.background-images {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  display: flex;
  flex-direction: column;
}

.content {
  position: relative;
  z-index: 1;
  background: transparent;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.back {
  display: block;
  width: 100%;
  height: auto; /* естественная высота */
}

a:hover {
  background: transparent !important;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Open Sans', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}


html, body {
  width: 100%;
  max-width: 100%;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}

router-link{
  text-decoration: none;
}

body {
  background: #000000;
}

#app {
  display: flex;
  flex-direction: column;
  width: 100vw;
  min-height: 100vh;
  margin: 0;
  padding: 0;
}
</style>