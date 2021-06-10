<template>
<div>

<div class="w3-sidebar w3-bar-block" style="width:20%" id="menu">
  <div id="menuInt">

    <a @click="login()" class="w3-bar-item w3-button w3-hover-gray">Login</a>
    <hr>
      <a @click="insert()" class="w3-bar-item w3-button w3-hover-gray">Inserir</a>
    <br>
      <a @click="estoque()" class="w3-bar-item w3-button w3-hover-gray">Estoque</a>
    <br>
      <hr>

<transition name="fade">
  <div class="container" id="loginPrincipal" v-show="mostraLogin">
    <form @submit.prevent="loginAcess">
      <div class="row g-3">

        <div class="col-md-9">
          <label class="form-label">Email: </label>
          <input v-model="newLogin.email" class="form-control" type="email">
        </div>

        <div class="col-md-9">
          <label class="form-label">Senha: </label>
          <input v-model="newLogin.password" class="form-control" type="password">
        </div>

      </div>
      <br>
      <button class="btn" style="color: white; background-color: black;">Logar</button><br><br>
    </form>
  </div>
</transition>

    <div v-if="this.usuario" style="margin-left: 5px;">
        <p>{{usuario}}</p>

        <div v-if="this.perfil == 1 ">
          <p>1 - Administrador</p>
        </div>

        <div v-if="this.perfil == 2 ">
          <p>2 - Operador</p>
        </div>
      <a @click="sair()" class="w3-bar-item w3-button w3-hover-gray">Sair</a>
    </div>


  </div>
</div>

<div id="cont">
    <lista v-show="mostraEstoque" :token="userToken" />
    <inserir v-show="mostraInsert" :token="userToken" />
</div>

<footer id="cont" class="fixed">
  <hr>
    <p>Desenvolvido por &copy;Henrique_Duarte</p>
</footer>

</div>
</template>

<script>

require('/style/w3.css')

import lista from './components/lista'
import inserir from './components/inserir'
import materiais from '/services/materiais'

export default {
  
  data(){
    return { 
      mostraEstoque: true, 
      mostraInsert: false, 
      mostraLogin: false,

      newLogin: { email: '', password: ''},
    
      userToken: 'Não Autenticado',
      dadosUser: '',
      usuario: localStorage.getItem('Usuario'),
      perfil: localStorage.getItem('Perfil'),
    }},

  components: { lista, inserir },

  methods:{

  estoque: function(){
      this.mostraEstoque = true;
      this.mostraInsert = false;
  },

  insert: function(){
      this.mostraEstoque = false;
      this.mostraInsert = true;
  },

  login: function(){
      this.mostraLogin = !this.mostraLogin;
  },

  loginAcess(){       
    materiais.login(this.newLogin)
      .then(response =>{
          alert('Login com sucesso!'),
          this.userToken = response.data.token
          this.dadosUser = response.data

          localStorage.setItem('Usuario', this.dadosUser.Usuario)
          localStorage.setItem('Perfil', this.dadosUser.Perfil)

          localStorage.setItem('token', this.userToken)
          console.log(this.userToken)
      })
      .catch(err => {
          alert('Usuario ou senha invalidos!'),
          console.log(err)
      })
    },

    sair(){
      localStorage.clear();
    }

  }
}
</script>

<style>

#menu{
background-color: rgb(39, 39, 39);
color: white;
margin-top: -20px;
height: 110%;
}

#contLogin {
  margin-left: 15%;
  padding: 2%
}

#cont {
  margin-left: 15%;
  padding: 2%
}

#menuInt {
  margin-top: 50px;
  font-size: 14pt;
}

footer {
    text-align: center;
    position: fixed;
    bottom: 0;
    width: 90%;
    background-color:rgb(255, 255, 255);
    color: black;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

#loginPrincipal {
    text-align: left;
    color: white;
    height: auto;
    width: 360px;
    position:fixed;
    background-color: rgb(39, 39, 39);
    border-radius: 50px;
}

</style>
