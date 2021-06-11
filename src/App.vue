<template>
<div>

<div class="w3-sidebar w3-bar-block" style="width:20%" id="menu">
  <div id="menuInt">

    <div v-if="this.usuario" style="margin-left: 5px;">
      <p>Bem vindo, {{usuario}}</p> <br>
        
        <div v-if="this.perfil == 1 ">
          <p> Administrador </p>
        </div>

        <div v-if="this.perfil == 2 ">
          <p> Operador </p>
        </div><hr>

        <div v-if="this.perfil == 1 ">
          <a @click="nwUser()" class="w3-bar-item w3-button w3-hover-gray">Criar novo usuario</a><br>
        </div>

          <a @click="insert()" class="w3-bar-item w3-button w3-hover-gray">Inserir Material</a><br>
          <a @click="estoque()" class="w3-bar-item w3-button w3-hover-gray">Meu Estoque</a><br>
          <hr>
          <a @click="sair()" class="w3-bar-item w3-button w3-hover-gray">Sair</a>
    </div>

    <div v-else>
    <a @click="login()" class="w3-bar-item w3-button w3-hover-gray">Login</a>
    </div>

<transition name="fade">
  <div class="container" id="loginPrincipal" v-show="mostraLogin">
    <form @submit.prevent="loginAcess">
      <div class="row g-3">
        <hr>
        <div class="col-md-9">
          <label class="form-label">Email: </label>
          <input v-model="newLogin.email" class="form-control" type="email">
        </div>

        <div class="col-md-9">
          <label class="form-label">Senha: </label>
          <input v-model="newLogin.password" class="form-control" type="password">
        </div>

      </div><br>
      <button class="btn" style="color: white; background-color: black;">Logar</button><br><br>
    </form>
  </div>
</transition>

  </div>
</div>

<div id="cont" v-if="this.usuario">
    <lista v-show="mostraEstoque" />
    <inserir v-show="mostraInsert" />
    <newUser v-show="mostraNovoUser" />
</div>

<div id="cont" style="padding: 10%; margin-left: 495px;" v-else>
  <h1>Sistema de estoque</h1>
  <p>Necessario realizar o login.</p>
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
import newUser from './components/newUser'
import materiais from '/services/materiais'

export default {
  
  data(){
    return { 
      mostraEstoque: true, 
      mostraInsert: false, 
      mostraLogin: false,
      mostraNovoUser: false,

      newLogin: { email: '', password: ''},
    
      userToken: 'Não Autenticado',
      dadosUser: '',
      usuario: localStorage.getItem('Usuario'),
      perfil: localStorage.getItem('Perfil'),
    }},

  components: { lista, inserir, newUser },

  methods:{

  estoque: function(){
      this.mostraEstoque = true;
      this.mostraInsert = false;
      this.mostraNovoUser = false;
  },

  insert: function(){
      this.mostraInsert = true;
      this.mostraEstoque = false;
      this.mostraNovoUser = false;
  },

    nwUser: function(){
      this.mostraNovoUser = true;
      this.mostraInsert = false;
      this.mostraEstoque = false;
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

          location.href = "/"
      })
      .catch(err => {
          alert('Usuario ou senha invalidos!'),
          console.log(err)
      })
    },

    sair(){
      if (confirm('Deseja Sair?')){
      localStorage.clear();
      location.href = "/"
      }
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
  font-size: 13pt;
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
    border-radius: 70px;
    margin-top: 40px;
}

</style>
