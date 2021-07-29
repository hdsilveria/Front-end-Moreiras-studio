<template>
<div>

<div class="container overflow-auto" id="tabela">

    <h3>Meus Horarios</h3>

<b-row class="search d-flex d-row">
    <b-col md="3">
      <label>Buscar pela Data</label>
        <b-form-input
          id="buscaDia"
          type="tel"
          v-mask="'##/##/####'"
          v-model="busca"
          placeholder="Digite a data..."
        ></b-form-input>
    </b-col>

    <b-col md="3" align-self="end">
        <b-button @click="searchDate" class="searchButton">Buscar</b-button>
    </b-col>
</b-row>
<br>

  <table class="table table-borderless">
  <thead>
    <tr>
      <th scope="col">Cliente</th>
      <th scope="col">Data</th>
      <th scope="col">Horario</th>
      <th scope="col">Procedimento</th>
      <th scope="col">Tipo</th>
      <th scope="col"></th>
    </tr>
  </thead>

  <tbody v-for="horario of clientResults" :key="horario.id">
    <tr>
      <td>{{horario.cliente}}</td>
      <td>{{horario.data}}</td>
      <td>{{horario.horario}}</td>
      <td>{{horario.procedimento}}</td>
      <td>{{horario.tipo}}</td>
      <td><button type="button" class="btn btn-outline-dark btn-sm" @click="remover(horario)">Deletar</button></td>      
    </tr>
  </tbody><br><br>
  </table>
</div>

</div>
</template>

<script>

import agenda from '/services/agenda'

export default ({

methods: {
  remover(deletMaterial){
    console.log(deletMaterial)
    if ( confirm('deseja excluir?') ){
      agenda.apagar(deletMaterial).then(() => {
        location.reload()
      }).catch(err =>{
        console.log(err)
      })
     }
    },

    searchDate(){
        this.clientResults = this.horarios
    
    if (this.busca === "" || this.busca === null){
        this.clientResults = this.horarios
      }
    
    else {
        this.clientResults = this.horarios.filter(horarios => horarios.data == this.busca)
    }
    }
},

mounted(){  
  agenda.listar({ headers: { Authorization: 'Bearer ' + localStorage.getItem('token')} }).then((response)=>{
    this.horarios = response.data
    this.clientResults = response.data
    })
  },

   data(){
    return {
        clientResults: [],
        busca: [],
        horarios: [],
    }
  },

})
</script>

<style scoped>

.agenda {
    text-align: left;
background: rgb(244,191,187);
background: linear-gradient(180deg, rgba(244,191,187,1) 0%, rgba(158,104,100,1) 100%);
    color: white;
    height: 100px;
}

h3 {
    text-align: center;
    margin: 50px;
    font-family: athena regular;
    color: #686868;
}

thead {
    width: 100%;
    color: white;
background: rgb(244,191,187);
background: linear-gradient(180deg, rgba(244,191,187,1) 0%, rgba(158,104,100,1) 100%);
}

.searchButton {
    color: white;
background: rgb(244,191,187);
background: linear-gradient(180deg, rgba(244,191,187,1) 0%, rgba(158,104,100,1) 100%);
}

button { 
 text-decoration: none; 
}

#tabela {
  overflow-x: scroll; /* Show horizontal scrollbar */
}

.table {
  box-shadow: 2px 2px 5px 2px rgba(0, 0, 0, 0.179);
  background-color: rgba(255, 255, 255, 0.501);
}


</style>
