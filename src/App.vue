<template>
  <div class="app">

    <p><strong>Запомни и открой все зеленые клетки</strong></p>

    <GameBoard />
  </div>
</template>

<script>
import GameBoard from '@/components/GameBoard.vue';

export default {
  name: 'App',
  components: {
    GameBoard
  }
}
</script>

<style scoped>
.app {
  margin-top: 40px;
  font-family: Helvetica, sans-serif;
  text-align: center;
}
  .logo {
    width: 100px;
  }
</style>
