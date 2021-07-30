<template>
<div>
  <b-row> <h4>Minhas Métricas</h4></b-row> <br>
  <b-row>
    <b-col />
      <b-col>
        <div class="graphic">
          <vendas />
        </div>
      </b-col>
    <b-col />
  </b-row>

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

h4 {
    text-align: center;
    margin: 10px;
    font-family: athena regular;
    color: #686868;
}


</style>
