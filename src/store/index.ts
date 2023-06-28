import IProjeto from "@/interfaces/IProjeto";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { InjectionKey } from "vue";
import { ADICIONA_TAREFA, ALTERA_TAREFA, DEFINIR_TAREFA, EXCLUIR_TAREFA, NOTIFICAR } from "./tipo-mutacoes";
import ITarefa from "@/interfaces/ITarefa";
import { INotificacao } from "@/interfaces/INotificacao";
import { ALTERAR_TAREFA, CADASTRAR_TAREFA, OBTER_TAREFAS, REMOVER_TAREFA } from "./tipos-acoes";
import clienteHttp from "@/http";
import { EstadoProjeto, projeto } from "./modulos/projeto";

export interface Estado {
    tarefas: ITarefa[],
    notificacoes: INotificacao[],
    projeto: EstadoProjeto
}

export const key: InjectionKey<Store<Estado>> = Symbol()

export const store = createStore<Estado>({
    state: {
        tarefas: [],
        notificacoes: [],
        projeto: {
            projetos: []
        }
    },
    mutations: {
        [ADICIONA_TAREFA](state, tarefa: ITarefa) {
            state.tarefas.push(tarefa)
        },
        [ALTERA_TAREFA](state, tarefa: ITarefa) {
            const index = state.tarefas.findIndex(tar => tar.id == tarefa.id)
            state.tarefas[index] = tarefa
        },
        [EXCLUIR_TAREFA](state, id: number) {
            state.tarefas = state.tarefas.filter(tarefa => tarefa.id != id)
        },
        [DEFINIR_TAREFA](state, tarefas: ITarefa[]) {
            state.tarefas = tarefas
        },
        [NOTIFICAR](state, novaNotificacao: INotificacao) {
            novaNotificacao.id = new Date().getTime()
            state.notificacoes.push(novaNotificacao)
            setTimeout(() => {
                state.notificacoes = state.notificacoes.filter(notificacao => notificacao.id != novaNotificacao.id)
            }, 3000)
        }
    },
    actions: {
        [OBTER_TAREFAS]({ commit }) {
            clienteHttp.get('tarefas')
                .then(resposta => commit(DEFINIR_TAREFA, resposta.data))
        },
        [CADASTRAR_TAREFA]({ commit }, tarefa: ITarefa) {
            return clienteHttp.post('tarefas', tarefa)
                .then(resposta => this.commit(ADICIONA_TAREFA, resposta.data))
        },
        [ALTERAR_TAREFA]({ commit }, tarefa: ITarefa) {
            return clienteHttp.put(`tarefas/${tarefa.id}`, tarefa)
                .then(() => commit(ALTERA_TAREFA, tarefa))
        }
        ,
        [REMOVER_TAREFA]({ commit }, id: string) {
            return clienteHttp.delete(`tarefas/${id}`)
                .then(() => commit(EXCLUIR_TAREFA, id));
        }
    },
    modules: {
        projeto
    }
})

export function useStore(): Store<Estado> {
    return vuexUseStore(key)
}