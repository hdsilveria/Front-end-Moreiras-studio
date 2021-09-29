<template>
  <div>
    
    <div class="container overflow-auto">
      <h3>Clientes</h3>
    </div>

<div id="tabela">
  <b-row class="headTable">
      <b-col md="3" scope="col">Cliente</b-col>
      <b-col md="2" scope="col">Idade</b-col>
      <b-col md="2" scope="col">Telefone</b-col>
      <b-col md="2" scope="col">Aniversario</b-col>
      <b-col md="2" scope="col">Rede Social</b-col>
      <b-col md="1" scope="col"></b-col>
  </b-row>

  <b-row class="table" v-for="cliente of clientes" :key="cliente.id">
      <b-col md="3">
        <span @click="openModalUpdt(cliente)" class="nameClient">
          {{cliente.name}}
        </span>
      </b-col>
      <b-col md="2">
        {{cliente.age}} anos
      </b-col>
      <b-col md="2">
        {{cliente.tel}}
      </b-col>
      <b-col md="2">
        {{cliente.birthday}}
      </b-col>
      <b-col cols="2">
        {{cliente.social}}
      </b-col>
      <b-col md="auto">
        <button type="button" class="btn btn-outline-dark btn-sm" @click="remover(cliente.id)">
          Deletar
        </button>
      </b-col>
  </b-row>
  </div> <br>

  <updateClient :client="updClient" @attClients="listClients()"/>

  </div>
</template>

<script>
import clients from '../../services/clientes'
import updateClient from '../modals/updateClient.vue'

export default {
  data(){
    return {
      clientes: [],
      updClient: {},
    }
  },

  components: {
    updateClient
  },

  mounted(){
    this.listClients()
  },

  methods: {

    openModalUpdt(cliente){
      this.updClient = cliente
      this.$modal.show('updateClient')
    },

    listClients(){
      clients.listar().then(response => {
        this.clientes = response.data.rows
      })
    },

    remover(id){
      if ( confirm('deseja excluir?') ){
      clients.deletar(id).then(() => {
          this.$toast.success("Cliente deletado com sucesso!", {
              position: "bottom-right",
              timeout: 2000,
              closeOnClick: true,
              pauseOnFocusLoss: true,
              pauseOnHover: true,
              draggable: true,
              draggablePercent: 2,
              showCloseButtonOnHover: false,
              hideProgressBar: true,
              closeButton: "button",
              icon: true,
              rtl: false
            })
        this.listClients()
      })
    }}
  }

}
</script>


<style scoped>

h3 {
  text-align: center;
  margin: 50px;
  font-family: athena regular;
  color: #686868;
}

.headTable {
  width: 100%;
  color: white;
  background: rgb(244,191,187);
  background: linear-gradient(180deg, rgba(244,191,187,1) 0%, rgba(158,104,100,1) 100%);
}


.table {
  box-shadow: 2px 2px 5px 2px rgba(0, 0, 0, 0.179);
  background-color: rgba(255, 255, 255, 0.501);
  padding: 5px;
  margin-top: 5px;
}

.nameClient {
  cursor: pointer;
  color: rgb(158, 104, 100);
  font-size: 13pt;
}

</style>