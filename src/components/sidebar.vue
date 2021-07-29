<template>
    
<div class="w3-sidebar w3-bar-block" style="width:20%" id="menu">
  <div id="menuInt">

    <div v-if="this.usuario" style="margin-left: 5px;">
      <p>Bem vindo, {{usuario}}</p>
        
        <div v-if="this.perfil == 1 ">
          <p> Administrador </p>
        </div>

        <div v-if="this.perfil == 2 ">
          <p> Operador </p>
        </div><hr>

        <b-row v-if="this.perfil == 1 ">
          <b-col md="1">
              <img src="../img/user.png">
          </b-col>
          <b-col>
            <router-link to="/newUser" class="w3-bar-item w3-button w3-hover-none buttonMenu">Criar novo usuario</router-link>
          </b-col>
        </b-row> <br>
        
        <b-row>
          <b-col md="1">
              <img src="../img/addMaterial.png">
          </b-col>
          <b-col>
            <router-link to="/insertMaterial" class="w3-bar-item w3-button w3-hover-none buttonMenu">Inserir Material</router-link>
          </b-col>
        </b-row> <br>

        <b-row>
          <b-col md="1">
              <img src="../img/addHour.png">
          </b-col>
          <b-col>
            <router-link to="/newHour" class="w3-bar-item w3-button w3-hover-none buttonMenu">Inserir Horario na Agenda</router-link>
          </b-col>
        </b-row><br>

        <b-row>
          <b-col md="1">
              <img src="../img/myMaterial.png">
          </b-col>
          <b-col>
            <router-link to="/home" class="w3-bar-item w3-button w3-hover-none buttonMenu">Meu Estoque</router-link>
          </b-col>
        </b-row><br>

        <b-row>
          <b-col md="1">
              <img src="../img/myHour.png">
          </b-col>
          <b-col>
            <router-link to="/minhaAgenda" class="w3-bar-item w3-button w3-hover-none buttonMenu">Minha Agenda</router-link>
          </b-col>
        </b-row>

        <hr>
        <b-row>
          <b-col md="1">
              <img src="../img/out.png">
          </b-col>
          <b-col>
             <a @click="sair()" class="w3-bar-item w3-button w3-hover-none">Sair</a>
          </b-col>
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
  margin-top: 110px;
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

</style>  