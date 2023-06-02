<template>
    <div class="column is-three-quarter conteudo">
        <Formulario @aoSalvarTarefa="salvarTarefa" />
        <div class="lista">
            <Tarefa_historico v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa" />
        </div>
        <Box_div v-if="listaEstaVazia">
            Você não está muito produtivo hoje :(
        </Box_div>
    </div>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';
import Formulario from "../components/Fomulario.vue";
import Tarefa_historico from "../components/Tarefa-historico.vue";
import ITarefa from "../interfaces/ITarefa";
import Box_div from "../components/Box-div.vue"

export default defineComponent({
    name: 'App',
    components: {
        Formulario,
        Tarefa_historico,
        Box_div
    },
    data() {
        return {
            tarefas: [] as ITarefa[]
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
        }
    }
});
</script>
  