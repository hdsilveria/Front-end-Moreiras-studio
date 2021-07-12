<template>
    
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
          <router-link to="/newUser" class="w3-bar-item w3-button w3-hover-none">Criar novo usuario</router-link><br>
        </div>

          <router-link to="/insertMaterial" class="w3-bar-item w3-button w3-hover-none">Inserir Material</router-link><br>
          <router-link to="/newHour"  class="w3-bar-item w3-button w3-hover-none">Inserir Horario na Agenda</router-link><br>
          <router-link to="/home"  class="w3-bar-item w3-button w3-hover-none">Meu Estoque</router-link><br>
          <router-link to="/minhaAgenda"  class="w3-bar-item w3-button w3-hover-none">Minha Agenda</router-link><br>
          <hr>
          <a @click="sair()" class="w3-bar-item w3-button w3-hover-none">Sair</a>
    </div>

    <div v-else>
    <a @click="login()" class="w3-bar-item w3-button w3-hover-none btnLogin">Login</a>
    </div>

<transition name="fade">
  <div class="container" id="loginPrincipal" v-show="mostraLogin">
    <form @submit.prevent="loginAcess">
      <div class="row g-3">
        <div class="col-md-9">
          <label class="form-label">Email </label>
          <input v-model="newLogin.email" class="form-control" type="email">
        </div>

        <div class="col-md-9">
          <label class="form-label">Senha </label>
          <input v-model="newLogin.password" class="form-control" type="password">
        </div>

      </div><br>
      <button class="btn btn-outline-light">Logar</button><br><br>
    </form>
  </div>
</transition>

  </div>
</div>
</template>

<script>


require('/style/w3.css')

import materiais from '/services/materiais'


export default {
  
  data(){
    return { 
      newLogin: { email: '', password: ''},
      mostraLogin: false,    
      userToken: 'Não Autenticado',
      dadosUser: '',
      usuario: localStorage.getItem('Usuario'),
      perfil: localStorage.getItem('Perfil'),
    }},

  methods:{

  login: function(){
      this.mostraLogin = !this.mostraLogin;
  },

  loginAcess(){       
    materiais.login(this.newLogin)
      .then(response =>{
          this.$toast.success("Login Efetuado com sucesso!", {
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
            });
          this.userToken = response.data.token
          this.dadosUser = response.data

          localStorage.setItem('Usuario', this.dadosUser.Usuario)
          localStorage.setItem('Perfil', this.dadosUser.Perfil)

          localStorage.setItem('token', this.userToken)
          console.log(this.userToken)

          setTimeout(function(){ location.reload() }, 1900);
      })
      .catch(err => {
          this.$toast.error("'Usuario ou senha invalidos!'", {
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
          });
          console.log(err)
      })
    },

    sair(){
      if (confirm('Deseja Sair?')){
      localStorage.clear();
      location.reload()
      }
    }

  }
}

</script>


<style scoped>
#menu{
background: rgb(244,191,187);
background: linear-gradient(185deg, rgba(244,191,187,1) 3%, rgba(158,104,100,1) 72%);
color: rgb(255, 255, 255);
margin-top: -20px;
height: 110%;
font-weight: 500;
}

#contLogin {
  margin-left: 15%;
  padding: 2%
}


#menuInt {
  margin-top: 50px;
  font-size: 13pt;
  margin-top: 90px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

#loginPrincipal {
  text-align: left;
    height: auto;
    width: 360px;
    position:fixed;
background: rgb(244,191,187);
background: linear-gradient(180deg, rgba(244,191,187,1) 58%, rgba(158,104,100,1) 99%);
    color: rgb(255, 255, 255);
    border-radius: 20px;
    margin-top: 40px;
}

.btnLogin {
  font-size: 16pt;
  font-weight: 700;
}

</style>  