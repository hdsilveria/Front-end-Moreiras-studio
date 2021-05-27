<template>
<div>

<div id="inserir" class="container">
    <form @submit.prevent="inserirMaterial">
      <div class="row g-3">
        <div class="col-md-7">
          <label class="form-label">material: </label>
          <input v-model="NovoMaterial.material" class="form-control" type="text" min="0" max="200">
        </div>

        <div class="col-auto">
          <label class="form-label">Quantidade: </label>
          <input v-model="NovoMaterial.quantidade" class="form-control" type="number" min="0" max="200">
        </div>

        <div class="col-auto">
          <label class="form-label">Valor: </label> 
          <input v-model="NovoMaterial.valor" class="form-control" type="number" min="0" max="200"><br>
        </div>

        <div class="col-auto">
          <label class="form-label">Data: </label>
          <input v-model="NovoMaterial.data" class="form-control" type="date" min="0" max="200">
        </div>

      </div>
      <button class="btn btn-dark"> Salvar </button><br><br>
    </form>
  </div>

</div>
</template>

<script>

import materiais from '/services/materiais'

export default {

data(){
    return {
      NovoMaterial: {
          material: '',
          quantidade: '',
          valor: '',
          data: '',
      }
    }
  },

methods: {

    inserirMaterial(){       
        materiais.cadastrar(this.NovoMaterial).then(response =>{
        alert('Material inserido com sucesso!'),
        console.log(response),
        location.href = "/"
        })
    },
  }
}

</script>

<style scoped>

#inserir {
margin-top: 40px;
  text-align: left;
  background-color: rgba(2, 2, 2, 0.726);
  color: white;
  height: auto;
  width: 360px;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

</style>