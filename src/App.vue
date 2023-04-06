<template>
  <main class="columns is-gapless is-mutiline" :class="{ 'modo-escuro': modoEscuroAtivo }">
    <div class="">

    </div>
    <div class="column is-one-quarter">
      <BarraLateral @aoTemaAlterado="trocarTema" />
    </div>
    <div class="column is-three-quarter conteudo">
      <Formulario @aoSalvarTarefa="salvarTarefa" />
      <div class="lista">
        <Tarefa_historico v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa" />
      </div>
      <Box_div v-if="listaEstaVazia">
        Você não está muito produtivo hoje :(
      </Box_div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BarraLateral from "../src/components/BarraLateral.vue";
import Formulario from "../src/components/Fomulario.vue";
import Tarefa_historico from "./components/Tarefa-historico.vue";
import ITarefa from "./interfaces/ITarefa";
import Box_div from "./components/Box-div.vue"

export default defineComponent({
  name: 'App',
  components: {
    BarraLateral,
    Formulario,
    Tarefa_historico,
    Box_div
  },
  data() {
    return {
      tarefas: [] as ITarefa[],
      modoEscuroAtivo: false
    }
  },
  computed: {
    listaEstaVazia(): boolean {
      return this.tarefas.length === 0;
    }
  },
  methods: {
    salvarTarefa(tarefa: ITarefa) {
      this.tarefas.push(tarefa)
    },
    trocarTema(modoEscuroAtivo: boolean) {
      this.modoEscuroAtivo = modoEscuroAtivo
    }
  }
});
</script>

<style>
.lista {
  padding: 1.25rem;
}

main {
  --bg-primario: #fff;
  --texto-primario: #000;
}

main.modo-escuro {
  --bg-primario: #2b2d42;
  --texto-primario: #ddd;
}

.conteudo {
  background-color: var(--bg-primario);
}
</style>
