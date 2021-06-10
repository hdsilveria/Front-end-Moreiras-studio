<template>
<div id="estoque">

<transition name="fade">
  <div id="edit" class="container" v-show="mostraEdit">
    <form @submit.prevent="atualizar()">
      <div class="row g-3">
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
      <button class="btn btn-dark" type="submit"> Salvar </button>
    </form>
  </div>
</transition>


<div class="container" id="tabela">

  <table class="table table-borderless">
  <thead>
    <tr>
      <th scope="col">ID#</th>
      <th scope="col">Material</th>
      <th scope="col">Quantidade</th>
      <th scope="col">Valor</th>
      <th scope="col">Data</th>
      <th scope="col"></th>
      <th scope="col"><td><button type="button" class="btn btn-link" @click="editar()">✏️</button></td></th>
    </tr>
  </thead>

  <tbody v-for="material of materiais" :key="material.id">
    <tr>
      <td>{{material.id}}</td>
      <td>{{material.material}}</td>
      <td>{{material.quantidade}}</td>
      <td>{{material.valor | ValorDecimal }}</td>
      <td>{{material.data}}</td>
      <td><button type="button" class="btn btn-link" @click="remover(material)">🗑️</button></td>      
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
  materiais.listar({ headers: { Authorization: 'Bearer ' + localStorage.getItem('token')} }).then((response)=>{
    this.materiais = response.data
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

props: {
  token: String
},

methods: {

  remover(deletMaterial){
    if ( confirm('deseja excluir?') ){
      materiais.apagar(deletMaterial).then(response => {
        this.listar(),
        console.log(response)
      }).catch(err =>{
        console.log(err)
      })
     }
    },

  atualizar(){
    if (confirm('Deseja realizar a alteração?')){
    materiais.atualizar(this.UpdateMaterial).then(response =>{
    this.UpdateMaterial = '',
    this.listar(),
    console.log(response),
    location.href = "/"
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
  padding: 2%;
  margin-left: 25px;
}

h1 {
  text-align: center;
}

#estoque {
  margin-top: 50px;
}


table {
  text-align: center;
}

#edit {
  text-align: left;
  background-color: rgba(2, 2, 2, 0.726);
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

</style>
