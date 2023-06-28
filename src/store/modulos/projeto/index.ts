import clienteHttp from "@/http";
import IProjeto from "@/interfaces/IProjeto";
import { Estado } from "@/store";
import { ADICIONA_PROJETO, ALTERA_PROJETO, DEFINIR_PROJETO, EXCLUIR_PROJETO } from "@/store/tipo-mutacoes";
import { ALTERAR_PROJETO, CADASTRAR_PROJETO, OBTER_PROJETOS, REMOVER_PROJETO } from "@/store/tipos-acoes";
import { Module } from "vuex";

export interface EstadoProjeto {
    projetos: IProjeto[]
}

export const projeto: Module<EstadoProjeto, Estado> = {
    mutations: {
        [ADICIONA_PROJETO](state, nomeDoProjeto: string) {
            const projeto = {
                id: new Date().toISOString(),
                nome: nomeDoProjeto
            } as IProjeto
            state.projetos.push(projeto)
        },
        [ALTERA_PROJETO](state, projeto: IProjeto) {
            const index = state.projetos.findIndex(proj => proj.id == projeto.id)
            state.projetos[index] = projeto
        },
        [EXCLUIR_PROJETO](state, id: string) {
            state.projetos = state.projetos.filter(projeto => projeto.id != id)
        },
        [DEFINIR_PROJETO](state, projetos: IProjeto[]) {
            state.projetos = projetos
        },
    },
    actions: {
        [OBTER_PROJETOS]({ commit }) {
            clienteHttp.get('projetos')
                .then(resposta => commit(DEFINIR_PROJETO, resposta.data))
        },
        [CADASTRAR_PROJETO](contexto, nomeDoProjeto: string) {
            return clienteHttp.post('projetos', {
                nome: nomeDoProjeto
            })
        },
        [ALTERAR_PROJETO](contexto, projeto: IProjeto) {
            return clienteHttp.put(`projetos/${projeto.id}`, projeto)
        }
        ,
        [REMOVER_PROJETO]({ commit }, id: string) {
            return clienteHttp.delete(`projetos/${id}`)
                .then(() => commit(EXCLUIR_PROJETO, id));
        }
    }
}