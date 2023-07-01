import clienteHttp from "@/http";
import ITarefa from "@/interfaces/ITarefa";
import { Estado } from "@/store";
import { ADICIONA_TAREFA, ALTERA_TAREFA, EXCLUIR_TAREFA, DEFINIR_TAREFA, NOTIFICAR } from "@/store/tipo-mutacoes";
import { OBTER_TAREFAS, CADASTRAR_TAREFA, ALTERAR_TAREFA, REMOVER_TAREFA } from "@/store/tipos-acoes";
import { Module } from "vuex";


export interface EstadoTarefa {
    tarefas: ITarefa[]
}

export const tarefa: Module<EstadoTarefa, Estado> = {
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
        }
    },
    actions: {
        [OBTER_TAREFAS]({ commit }, filtro: string) {
            let url = 'tarefas'

            if (filtro) {
                url += '?descricao=' + filtro
                console.log(url)
            }
            clienteHttp.get(url)
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
}