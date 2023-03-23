<template>
    <div class="is-flex is-align-items-center is-justify-content-space-between">
        <Cronometro :tempoEmSegundos="tempoEmSegundos"/>
        <BotaoControle @clicado="iniciar" texto="play" icone="fas fa-play" :desabilitado="cronometroRodando"/>
        <BotaoControle @clicado="finalizar" texto="stop" icone="fas fa-stop" :desabilitado="!cronometroRodando"/>
    </div>
</template>
<script lang="ts">
import {defineComponent} from "vue";
import Cronometro from "@/components/Cronometro.vue";
import BotaoControle from "@/components/BotaoControle.vue";
export default defineComponent({
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Temporizador",
    emits: ['aoTemporizadorFinalizado'],
    components: {BotaoControle, Cronometro},
    data() {
        return {
            tempoEmSegundos: 0,
            cronometro: 0,
            cronometroRodando: false
        }
    },
    methods: {
        iniciar() {
            //começar a contagem
            //1 seg = 1000 milisegundos
            this.cronometroRodando = true;
            this.cronometro = setInterval(() => {
                this.tempoEmSegundos += 1
            }, 1000)
        },
        finalizar() {
            this.cronometroRodando = false;
            clearInterval(this.cronometro);
            this.$emit('aoTemporizadorFinalizado', this.tempoEmSegundos);
            this.tempoEmSegundos = 0;
        }
    }
});
</script>