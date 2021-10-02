<template>
<div>

<div class="container overflow-auto">

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

    <b-col md="2">
      <label>Buscar pelo mês</label><br>
        <b-form-select
        class="searchMounth"
        v-model="buscaMes"
        :options="options"/>
    </b-col> <br>

    <b-col md="2" align-self="end">
        <b-button @click="searchMounth" class="searchButton searchButtonMounth">Buscar</b-button>
    </b-col>
</b-row>
<br>

<div id="tabela">
  <b-row class="headTable">
      <b-col md="3" scope="col">Cliente</b-col>
      <b-col md="2" scope="col">Data</b-col>
      <b-col md="2" scope="col">Horario</b-col>
      <b-col md="2" scope="col">Procedimento</b-col>
      <b-col md="1" scope="col">Tipo</b-col>
      <b-col md="1" scope="col"></b-col>
  </b-row>

  <div v-if="this.load" class="justify-content-center text-center p-5">
    <b-spinner variant="dark"/>
  </div>

  <div v-else>
  <b-row class="table" v-for="horario of clientResults" :key="horario.id">
      <b-col md="3">{{horario.cliente}}</b-col>
      <b-col md="2">{{horario.data}}</b-col>
      <b-col md="2">{{horario.horario}}</b-col>
      <b-col md="2">{{horario.procedimento}}</b-col>
      <b-col cols="2">{{horario.tipo}}</b-col>
      <b-col md="auto">
        <button type="button" class="btn btn-outline-dark btn-sm" @click="remover(horario.id)">
          Deletar
        </button>
      </b-col>
  </b-row>
  </div>
  </div>

</div>
</div>
</template>

<script>

import agenda from '/services/agenda'

export default ({

methods: {
  remover(deletMaterial){
    if ( confirm('deseja excluir?') ){
      agenda.apagar(deletMaterial).then(() => {
          agenda.listar({ headers: { Authorization: 'Bearer ' + localStorage.getItem('token')} })
            .then((response)=>{
            this.horarios = response.data.data.rows
            this.clientResults = response.data.data.rows
            })
          this.$toast.success("Horario deletado com sucesso!", {
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
      }).catch(err =>{
        console.log(err.response)
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
    },

    searchMounth(){
        this.clientResults = this.horarios
    
    if (this.buscaMes === "" || this.buscaMes === null){
        this.clientResults = this.horarios
      }
    
    else {
      console.log(this.clientResults)
        this.clientResults = this.horarios.filter(horarios => horarios.data.slice(3,5).includes(this.buscaMes))
    }
    }
},

mounted(){
  this.load = true
  agenda.listar({ headers: { Authorization: 'Bearer ' + localStorage.getItem('token')} })
  .then((response)=>{
    this.horarios = response.data.data.rows
    this.clientResults = response.data.data.rows
    this.load = false
    })
  },

   data(){
    return {
        load: false,
        clientResults: [],
        busca: [],
        options: [
          { value: '01', text: "Janeiro"},
          { value: '02', text: "Favereiro"},
          { value: '03', text: "Março"},
          { value: '04', text: "Abril"},
          { value: '05', text: "Maio"},
          { value: '06', text: "Junho"},
          { value: '07', text: "Julho"},
          { value: '08', text: "Agosto"},
          { value: '09', text: "Setembro"},
          { value: '10', text: "Outubro"},
          { value: '11', text: "Novembro"},
          { value: '12', text: "Dezembro"},
        ],
        buscaMes: '01',
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


.searchButton {
  color: white;
  background: rgb(244,191,187);
  background: linear-gradient(180deg, rgba(244,191,187,1) 0%, rgba(158,104,100,1) 100%);
  margin-left: -15px;
}

button { 
 text-decoration: none; 
}

.searchMounth {
  margin-top: 2px;
  width: 90%;
  height: 60%;
}

  .searchButtonMounth {
    margin-left: -30px;
  }

  @media screen and (max-width: 799px){

  .headTable {
    display: none;
  }

  .searchButton {
    margin-top: 10px;
    margin-left: 0px;
  }

  .searchButtonMounth {
    margin-left: 0px;
  }

}

</style>
