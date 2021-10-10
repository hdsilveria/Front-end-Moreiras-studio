<template>
  <div>
    
    <div class="container overflow-auto">
      <h3>Clientes</h3>
    </div>

<div id="tabela">
  <b-row>
    <b-col md="4">
      <div class="p-3 searchBar">
        <b-form-input placeholder="Pesquisar Cliente" v-model="search" />
      </div>
    </b-col>
  </b-row>
  <b-row class="headTable">
      <b-col md="3" scope="col">Cliente</b-col>
      <b-col md="1" scope="col">Idade</b-col>
      <b-col md="2" scope="col">Telefone</b-col>
      <b-col md="2" scope="col">Data de Nascimento</b-col>
      <b-col md="2" scope="col">Rede Social</b-col>
      <b-col md="1" scope="col"></b-col>
  </b-row>

  <div v-if="this.load" class="justify-content-center text-center p-5">
    <b-spinner variant="dark"/>
  </div>

  <b-row v-else class="table" v-for="cliente of clientes" :key="cliente.id">
      <b-col md="3">
        {{ cliente.name[0].toUpperCase() + cliente.name.substr(1)}}
      </b-col>
      <b-col md="1">
        {{cliente.age ? cliente.age : 'N/A'}} <span v-if="cliente.age">anos</span> 
      </b-col>
      <b-col md="2">
        {{cliente.tel ? cliente.tel : 'N/A'}}
      </b-col>
      <b-col md="2">
        {{cliente.birthday ? cliente.birthday : 'N/A'}}
      </b-col>
      <b-col cols="2" class="text-nowrap">
        {{cliente.social ? cliente.social : 'N/A'}}
      </b-col>
      <b-col md="auto" class="d-flex">
        <button style="margin: 2px;" type="button" class="btn btn-outline-dark btn-sm" @click="openModalUpdt(cliente)">Editar</button>
        <button style="margin: 2px;" type="button" class="btn btn-outline-danger btn-sm" @click="remover(cliente.id)">Deletar</button>
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
      resultClients: [],
      updClient: {},
      search: '',
      load: false, 
      token: { headers: { Authorization: 'Bearer ' + localStorage.getItem('token')} }
    }
  },

  components: {
    updateClient
  },

  mounted(){
    this.load = true
    this.listClients()
  },

  watch: {
    search(){
      this.clientes = this.resultClients.filter(arr => 
        arr.name.includes(this.search)
      )
    }
  },

  methods: {

    openModalUpdt(cliente){
      this.updClient = cliente
      this.$modal.show('updateClient')
    },

    listClients(){
      clients.listar(this.token).then(response => {
        this.clientes = response.data.rows
        this.resultClients = response.data.rows
        this.load = false
      })
    },

    remover(id){
      if ( confirm('deseja excluir?') ){
      clients.deletar(id, this.token).then(() => {
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

.searchBar {
  background: rgb(244,191,187);
  margin-left: -11px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}


.table {
  box-shadow: 2px 2px 5px 2px rgba(0, 0, 0, 0.179);
  background-color: rgba(255, 255, 255, 0.501);
  padding: 4px;
  margin-top: 5px;
}

.nameClient {
  cursor: pointer;
  color: rgb(158, 104, 100);
  font-size: 13pt;
}

</style>