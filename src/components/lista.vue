<template>
<div id="estoque">

  <h3> Meu Estoque </h3>

<transition name="fade">
  <div id="edit" class="container" v-show="mostraEdit">
    <form @submit.prevent="atualizar()">
      <div class="row g-3 justify-content-center">
        <div class="col-auto">
          <label class="form-label">ID: </label>
          <input v-model="UpdateMaterial.id" class="form-control" type="number" min="0" max="200" required>
        </div>

        <div class="col-auto">
          <label class="form-label">Quantidade: </label>
          <input v-model="UpdateMaterial.quantidade" class="form-control" type="number" min="0" max="200">
        </div>

        <div class="col-auto">
          <label class="form-label">Valor: </label> 
          <input v-model="UpdateMaterial.valor" class="form-control" type="number" min="0" max="200"><br>
        </div>
      </div>

      <b-row align-h="between">
        <b-col md="6" class="d-flex d-row justify-content-center">
          <button class="btn btn-outline-light" type="submit"> Salvar </button>
        </b-col>
        <b-col md="6" class="d-flex d-row justify-content-center">
          <button class="btn btn-outline-light" @click="editar()"> Cancelar </button>
        </b-col>
      </b-row>

    </form>
  </div>
</transition>


<div class="container overflow-auto" id="tabela">

  <table class="table table-borderless">
  <thead>
    <tr>
      <th scope="col">ID#</th>
      <th scope="col">Material</th>
      <th scope="col">Quantidade</th>
      <th scope="col">Valor Und</th>
      <th scope="col">Valor Estoque</th>
      <th scope="col">Data da Ultima Compra</th>
      <th scope="col"><button type="button" class="btn btn-outline-light btn-sm" @click="editar()">Editar✏️</button></th>
    </tr>
  </thead>

  <tbody v-for="material of materiais" :key="material.id">
    <tr>
      <td>{{material.id}}</td>
      <td>{{material.material}}</td>
      <td>{{material.quantidade}}</td>
      <td>{{material.valor | ValorDecimal }}</td>
      <td>{{material.quantidade * material.valor | ValorDecimal }}</td>
      <td>{{material.data}}</td>
      <td><button type="button" class="btn btn-outline-dark btn-sm" @click="remover(material)">Deletar</button></td>
    </tr>
    
  </tbody><br><br>
  </table>
</div>

</div>
</template>

<script>

import materiais from '/services/materiais'


export default {

mounted(){  
  materiais.listar({ headers: { Authorization: 'Bearer ' + localStorage.getItem('token')} })
    .then((response)=>{
      this.materiais = response.data.rows
    })
  },
  
 data(){
    return { 
      materiais: [],
      mostraEdit: false,
      UpdateMaterial: {
          id: '',
          quantidade: '',
          valor: ''
      }
    }
  },

methods: {
  remover(deletMaterial){
    if ( confirm('deseja excluir?') ){
      materiais.apagar(deletMaterial).then(() => {
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
        materiais.listar({ headers: { Authorization: 'Bearer ' + localStorage.getItem('token')} })
          .then((response)=>{
          this.materiais = response.data.rows
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

  editar(){
    this.mostraEdit = !this.mostraEdit
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

#tabela{
  padding: 1%;
}

h1 {
  text-align: center;
  font-family: athena regular;
}

#estoque {
  margin-top: 50px;
}


table {
  text-align: center;
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

.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

h3 {
  text-align: center;
  margin: 40px;
  font-family: athena regular;
  color: #686868;
}

thead {
    color: white;
background: rgb(244,191,187);
background: linear-gradient(180deg, rgba(244,191,187,1) 0%, rgba(158,104,100,1) 100%);
}

.table {
  box-shadow: 2px 2px 5px 2px rgba(0, 0, 0, 0.179);
  background-color: rgba(255, 255, 255, 0.501);
}

</style>
