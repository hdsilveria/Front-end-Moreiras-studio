<template>
<div>
  <b-row v-if="this.perfil == 1">

    <b-row> 
      <h4>Dashboard</h4>
    </b-row>

    <b-col class="p-0">
      <br>
        <div class="graphic">
          <vendas />
        </div>
    </b-col>

    <b-col class="p-0">
      <br>
      <div class="graphic">
        <tipos />
      </div>
    </b-col>

    <b-col class="p-0">
      <br>
      <div class="graphic">
        <procedimentos />
      </div>
    </b-col>

    <b-col class="p-0">
      <br>
      <valoresMes class="graphic" /> 
    </b-col>

  </b-row>

  <div v-else class="text-center">
    <h2>Usuario sem permissão</h2>
  </div>

</div>
</template>

<script>

import vendas from '../graphics/vendas.vue'
import procedimentos from '../graphics/procedimentos.vue'
import tipos from '../graphics/tipos.vue'
import valoresMes from '../graphics/valoresMes'


export default {

  data(){
    return {
      clientes: [],
      clientsAgosto: [],
      clientsSetembro: [],
      clientsOutubro: [],
      clientsNovembro: [],
      clientsDezembro: [],
      allClients: [],
      perfil: localStorage.getItem('Perfil'),
    }
  },


  components: {
    vendas,
    procedimentos,
    tipos,
    valoresMes,
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

.graphic {
  width: 270px;
}

</style>
