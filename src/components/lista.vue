<template>
<div id="estoque">

  <h3> Meu Estoque </h3>

<div class="container overflow-auto" id="tabela">

  <div>
  <b-row class="headTable">
      <b-col scope="col">Material</b-col>
      <b-col scope="col">Quantidade</b-col>
      <b-col scope="col">Valor Und</b-col>
      <b-col scope="col">Valor Estoque</b-col>
      <b-col scope="col">Data da Ultima Compra</b-col>
      <b-col scope="col"></b-col>
  </b-row>

  <div v-if="this.load" class="justify-content-center text-center p-5">
    <b-spinner variant="dark"/>
  </div>

  <b-row v-else class="table" v-for="material of materiais" :key="material.id">
      <b-col>{{material.material}}</b-col>
      <b-col>{{material.quantidade}}</b-col>
      <b-col>{{material.valor | ValorDecimal }}</b-col>
      <b-col>{{material.quantidade * material.valor | ValorDecimal }}</b-col>
      <b-col>{{material.data}}</b-col>
      <b-col class="d-flex">
        <button style="margin: 2px;" type="button" class="btn btn-outline-dark btn-sm" @click="openModalUpdt(material)">Editar✏️</button>
        <button style="margin: 2px;" type="button" class="btn btn-outline-dark btn-sm" @click="remover(material.id)">Deletar</button>
        </b-col>
  </b-row>
  </div> <br>
</div>

<updateMaterialModal :material="updtMaterial" @attMaterial="getMaterial()" />

</div>
</template>

<script>

import materiais from '/services/materiais'
import updateMaterialModal from '../modals/updateMaterial.vue'


export default {

components: {
  updateMaterialModal
},

mounted(){
  this.load = true 
  materiais.listar({ headers: { Authorization: 'Bearer ' + localStorage.getItem('token')} })
    .then((response)=>{
      this.materiais = response.data.rows
      this.load = false
    })
  },
  
 data(){
    return {
      token: { headers: { Authorization: 'Bearer ' + localStorage.getItem('token')} },
      materiais: [],
      mostraEdit: false,
      updtMaterial: {},
      load: false, 
      UpdateMaterial: {
          id: '',
          quantidade: '',
          valor: ''
      }
    }
  },

methods: {
  getMaterial(){
    materiais.listar(this.token)
      .then((response)=>{
        this.materiais = response.data.rows
    })
  },
  remover(deletMaterial){
    if ( confirm('deseja excluir?') ){
      materiais.apagar(deletMaterial, this.token).then(() => {
        this.getMaterial().then(() => {
          this.$toast.success("Material deletado com sucesso!", {
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
        })
      }).catch(err =>{
        console.log(err)
      })
     }
    },

    atualizar(UpdateMaterial){
    if (confirm('Deseja realizar a alteração?')){
    materiais.atualizar(UpdateMaterial).then(() =>{
    location.reload()
      })
     }
    },

  openModalUpdt(material){
      this.updtMaterial = material
      this.$modal.show('updateMaterial')
    },

  },

  filters: {
      ValorDecimal: (valor) => {
      return "R$ " + valor + ",00";
      }
  }
}

</script>



<style scoped>

.headTable {
  width: 100%;
  color: white;
  background: rgb(244,191,187);
  background: linear-gradient(180deg, rgba(244,191,187,1) 0%, rgba(158,104,100,1) 100%);
  padding: 6px;
}

#tabela {
  padding: 6px;
}

h1 {
  text-align: center;
  font-family: athena regular;
}

#estoque {
  margin-top: 50px;
}

#edit {
  text-align: left;
background: rgb(244,191,187);
background: linear-gradient(180deg, rgba(244,191,187,1) 0%, rgba(158,104,100,1) 100%);
  color: white;
  height: 170px;
  width: 345px;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

button { 
 text-decoration: none; 
} 

h3 {
  text-align: center;
  margin: 40px;
  font-family: athena regular;
  color: #686868;
}

.table {
  box-shadow: 2px 2px 5px 2px rgba(0, 0, 0, 0.179);
  background-color: rgba(255, 255, 255, 0.501);
}

</style>
