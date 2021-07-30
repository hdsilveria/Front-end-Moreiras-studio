<template>
    
<div class="w3-sidebar w3-bar-block" id="menu">
  <div id="menuInt">

    <div v-if="this.usuario" style="margin-left: 5px;">
      <span>Bem vindo, {{usuario}}</span>
        
        <div v-if="this.perfil == 1 " class="d-flex">
         <img src="../img/adm.png"> &nbsp;&nbsp;&nbsp; <span> Administrador </span>
        </div>

        <div v-if="this.perfil == 2 " class="d-flex" >
          <img src="../img/oper.png"> &nbsp;&nbsp;&nbsp; <span> Operador </span>
        </div><hr>

        <b-row v-if="this.perfil == 1 ">
          <router-link to="/newUser" class="w3-bar-item w3-button w3-hover-none buttonMenu d-flex">
            <b-col md="1">
                <img src="../img/user.png">
            </b-col>
            <b-col class="text-center" md="8" align-self="top">
            <span>Criar novo usuario</span> 
            </b-col>
          </router-link>
        </b-row> <br>
        
        <b-row>
          <router-link to="/insertMaterial" class="w3-bar-item w3-button w3-hover-none buttonMenu d-flex">
            <b-col md="1">
                <img src="../img/addMaterial.png">
            </b-col>
            <b-col  class="text-center" md="7">
            <span>Inserir Material</span> 
            </b-col>
          </router-link>
        </b-row> <br>

        <b-row> 
          <router-link to="/newHour" class="w3-bar-item w3-button w3-hover-none buttonMenu d-flex">
            <b-col md="1">
                <img src="../img/addHour.png">
            </b-col>
            <b-col class="text-center" md="11">
            <span>Inserir Horario na Agenda</span> 
            </b-col>
          </router-link>
        </b-row><br>

        <b-row>
           <router-link to="/" class="w3-bar-item w3-button w3-hover-none buttonMenu d-flex d-row">
            <b-col md="1">
                <img src="../img/myMaterial.png">
            </b-col>
            <b-col class="text-center" md="7">
           <span>Meu Estoque</span>
            </b-col>
          </router-link>
        </b-row><br>

        <b-row>
          <router-link to="/minhaAgenda" class="w3-bar-item w3-button w3-hover-none buttonMenu d-flex">
            <b-col md="1">
                <img src="../img/myHour.png">
            </b-col>
            <b-col  class="text-center" md="7">
             <span>&nbsp;Minha Agenda</span>
            </b-col>
          </router-link>
        </b-row> <br>

        <b-row>
          <router-link to="/metrics" class="w3-bar-item w3-button w3-hover-none buttonMenu d-flex">
            <b-col md="1">
                <img src="../img/metrics.png">
            </b-col>
            <b-col  class="text-center" md="8">
             <span>Minhas Metricas </span>
            </b-col>
          </router-link>
        </b-row>

        <hr>
        <b-row>
          <a @click="sair()" class="w3-bar-item w3-button w3-hover-none d-flex">
          <b-col md="2">
              <img src="../img/out.png">
          </b-col>
          <b-col>
            <span>
              Sair
            </span>
          </b-col>
          </a>
        </b-row>

    </div>

  </div>
</div>
</template>

<script>


require('/style/w3.css')

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

    sair(){
      if (confirm('Deseja Sair?')){
      localStorage.clear();
      location.assign('/')
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
margin-top: -30px;
height: 110%;
font-weight: 500;
border: 2px solid rgba(38, 38, 38, 0.063);
z-index: 10;
overflow-x: hidden;
}

#contLogin {
  margin-left: 15%;
  padding: 2%
}


#menuInt {
  font-size: 13pt;
  margin-top: 70px;
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
    width: 355px;
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

.buttonMenu {
  margin: -5px;
}


@media screen and (min-width: 1000px){

#menu {
  width: 4%;
}

#menu span {
  display: none;
}

#menu:hover a {
  display: block;
}

#menu:hover {
  width: 20%;
  transition: 0.2s;
}

#menu:hover span {
  display: block;
}

}

@media screen and (max-width: 500px){

#menu {
  width: 15%;
}

#menu span {
  display: none;
  position: static;
}

}

</style>  