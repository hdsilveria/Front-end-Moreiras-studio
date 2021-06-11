<template>
<div  class="container">
    

<div class="container" id="novoUsuario">
    <form @submit.prevent="cadastrarUsuario">
      <div class="row g-3">
        <div>
          <label class="form-label">Nome: </label>
          <input v-model="usuario.usuario" class="form-control" type="text" autocomplete="off">
        </div>

        <div>
          <label class="form-label">email: </label>
          <input v-model="usuario.email" class="form-control" type="email" autocomplete="off">
        </div>

        <div class="col-md-6">
          <label class="form-label">perfil: </label> 
          <select class="form-control" v-model="usuario.perfil">
              <option value=1 selected>1 - Administrador </option>
              <option value=2 > 2 - Operador </option>
          </select>
        </div>

        <div >
          <label class="form-label">senha: </label>
          <input v-model="usuario.password" class="form-control" type="password">
        </div>

      </div>
      <br><button class="btn btn-dark"> Criar Usuario </button><br><br>
    </form>
  </div>

</div>
</template>

<script>

import materiais from '/services/materiais'

export default {

data(){
    return {
        usuario: {
            usuario: '',
            email: '',
            perfil: '',
            password: ''
        }
    }
},

methods: {

    cadastrarUsuario(){       
        materiais.criarUsuario(this.usuario, { headers: { Authorization: 'Bearer ' + localStorage.getItem('token')} })
        .then(response =>{
          alert('Usuario inserido com sucesso!'),
          console.log(response),
          location.href = "/"
        })
        .catch(err => {
          alert('Erro: ' + err)
        })
    },
  }

}
</script>

<style scoped>

#novoUsuario {
    margin-top: 40px;
    text-align: left;
    background-color: rgba(2, 2, 2, 0.726);
    color: white;
    height: auto;
    width: 400px;
    margin-left: 300px;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

</style>