<template>
    <Box_div>
        <div class="columns clicavel" @click="tarefaClicada">
            <div class="column is-4">
                {{ tarefa.descricao || 'Tarefa sem descrição' }}
            </div>
            <div class="column is-3">
                {{ tarefa.projeto?.nome || 'N/D' }}
            </div>
            <div class="column">
                <Cronometro :tempoEmSegundos="tarefa.duracaoEmSegundos" />
            </div>
        </div>
    </Box_div>
</template>

<script lang="ts">

import { defineComponent, PropType } from "vue";
import Cronometro from "./Cronometro.vue";
import ITarefa from "@/interfaces/ITarefa";
import Box_div from "./Box-div.vue";

export default defineComponent({
    name: 'Tarefa-historico',
    emits: ['aoTarefaClicada'],
    components: {
        Cronometro,
        Box_div
    },
    props: {
        tarefa: {
            type: Object as PropType<ITarefa>,
            required: true
        }
    },
    methods: {
        tarefaClicada(): void {
            this.$emit('aoTarefaClicada', this.tarefa)
        }
    }
});
</script>

<style scoped>
.clicavel {
    cursor: pointer;
}
</style>