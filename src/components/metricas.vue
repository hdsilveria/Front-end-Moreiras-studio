<template>
<div>

  <div class="clients">
    <vendas />
  </div>

</div>
</template>

<script>

import vendas from '../graphics/vendas.vue'


export default {

  data(){
    return {
      teste: [],
    }
  },


  components: {
    vendas,
  }
}

</script>

<style scoped>

.clients {
  width: 400px;
}

</style>
