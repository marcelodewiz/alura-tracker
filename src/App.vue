<template>
  <main class="columns is-gapless is-mutiline">
    <div class="">

    </div>
    <div class="column is-three-quarter">
      <BarraLateral/>
    </div>
    <div class="column is-three-quarter">
      <Formulario/>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BarraLateral from "../src/components/BarraLateral.vue";
import Formulario from "../src/components/Fomulario.vue";
export default defineComponent({
  name: 'App',
  components:{
    BarraLateral,
      Formulario
  }
});
</script>

<style>

</style>
