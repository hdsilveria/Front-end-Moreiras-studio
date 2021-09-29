<template>
<div>
  <b-row v-if="this.perfil == 1">

    <b-row> 
      <h4>Dashboard</h4>
    </b-row>

    <b-row style="margin-top: 25px;">
      <b-col md="4">
        <div class="clientArea text-center">
          <span>Numero de clientes Cadastradas</span><br><br>
          <strong>
            {{nmClientes.data.count}}
          </strong>
        </div>
      </b-col>
      <b-col>
        <div class="clientArea text-center">
          <span>Aniversariantes do Mês</span> <br>
          <strong>
            
          </strong>
        </div>
      </b-col>
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
import clients from '../../services/clientes'


export default {

  data(){
    return {
      clientes: [],
      nmClientes: [],
      clientsAgosto: [],
      clientsSetembro: [],
      clientsOutubro: [],
      clientsNovembro: [],
      clientsDezembro: [],
      allClients: [],
      perfil: localStorage.getItem('Perfil'),
    }
  },

  created(){
    clients.listar().then(res => {
      this.nmClientes = res
    })
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

.clientArea {
  height: 150px;
  background: linear-gradient(180deg, rgba(244,191,187,1) 0%, rgba(158,104,100,1) 100%);
  color: white;
  border: 2px solid rgba(158,104,100,1);
  width: 300px;
}

strong {
  font-size: 18pt;
  color: white;
}

span {
  font-size: 14pt;
}
</style>
