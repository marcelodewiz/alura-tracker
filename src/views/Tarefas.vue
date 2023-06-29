<template>
    <div class="column is-three-quarter conteudo">
        <Formulario @aoSalvarTarefa="salvarTarefa" />
        <Box_div v-if="listaEstaVazia">
            Você não está muito produtivo hoje :(
        </Box_div>
        <div class="lista">
            <Tarefa_historico v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa"
                @aoTarefaClicada="selecionarTarefa" />
        </div>
        <div class="modal" :class="{ 'is-active': tarefaSelecionada }" v-if="tarefaSelecionada">
            <div class="modal-background"></div>
            <div class="modal-card">
                <header class="modal-card-head">
                    <p class="modal-card-title">Editando uma tarefa</p>
                    <button class="delete" aria-label="close" @click="fecharModal"></button>
                </header>
                <section class="modal-card-body">
                    <div class="field">
                        <label for="descricaoDaTarefa" class="label">
                            Descrição
                        </label>
                        <input type="text" class="input" v-model="tarefaSelecionada.descricao" id="descricaoDaTarefa" />
                    </div>
                </section>
                <footer class="modal-card-foot">
                    <button class="button is-success" @click="alterarTarefa">Salvar</button>
                    <button class="button" @click="fecharModal">Cancelar</button>
                </footer>
            </div>
        </div>
    </div>
</template>
  
<script lang="ts">
import { computed, defineComponent } from 'vue';
import Formulario from "../components/Fomulario.vue";
import Tarefa_historico from "../components/Tarefa-historico.vue";
import ITarefa from "../interfaces/ITarefa";
import Box_div from "../components/Box-div.vue"
import { ALTERAR_TAREFA, CADASTRAR_TAREFA, OBTER_PROJETOS, OBTER_TAREFAS } from '@/store/tipos-acoes';
import { useStore } from '@/store';

export default defineComponent({
    name: 'App',
    components: {
        Formulario,
        Tarefa_historico,
        Box_div
    },
    data() {
        return {
            tarefaSelecionada: null as ITarefa | null
        };
    },
    computed: {
        listaEstaVazia(): boolean {
            return this.tarefas.length === 0;
        }
    },
    methods: {
        salvarTarefa(tarefa: ITarefa) {
            this.store.dispatch(CADASTRAR_TAREFA, tarefa)
        },
        selecionarTarefa(tarefa: ITarefa) {
            this.tarefaSelecionada = tarefa
        },
        fecharModal() {
            this.tarefaSelecionada = null
        },
        alterarTarefa() {
            this.store.dispatch(ALTERAR_TAREFA, this.tarefaSelecionada)
                .then(() => this.fecharModal());
        }
    },
    setup() {
        const store = useStore()
        store.dispatch(OBTER_TAREFAS)
        store.dispatch(OBTER_PROJETOS)

        return {
            tarefas: computed(() => store.state.tarefa.tarefas),
            store
        }
    }
});
</script>
  