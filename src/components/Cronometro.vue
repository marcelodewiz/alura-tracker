<template>
    <section>
        <strong>
            {{ tempoDecorrido }}
        </strong>
    </section>
</template>
<script lang="ts">
  import {defineComponent} from "vue";

  // eslint-disable-next-line vue/no-export-in-script-setup
  export default defineComponent({
      // eslint-disable-next-line vue/multi-word-component-names
      name: 'Cronometro',
      props:{
        tempoEmSegundos:{
            type: Number,
            default: 0
        }
      },
      computed: {
          tempoDecorrido() : string {
              return new Date(this.tempoEmSegundos * 1000).toISOString().substring(11,19);
          }
      },
  });
</script>