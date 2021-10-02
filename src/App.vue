<template>
<div>

<div v-if="this.usuario">
  <sidebar class="disSideBar" />
  <navBar class="noneSideBar" />
    <router-view v-if="this.usuario" id="cont" />
</div>

<div style="margin-left: 0%; margin-top: 2%" v-else>
    <router-view v-if="$route.meta.menu == false" id="cont" />
    <login v-else/>
</div>

</div>
</template>

<script>

require('/style/w3.css')

import sidebar from './components/sidebar.vue'
import login from './components/login.vue'
import navBar from './components/navBar.vue'

export default {
  
  data(){
    return { 
      newLogin: { email: '', password: ''},
    
      userToken: 'Não Autenticado',
      dadosUser: '',
      usuario: localStorage.getItem('Usuario'),
      perfil: localStorage.getItem('Perfil'),
    }},

  components: {
    sidebar,
    login,
    navBar,
     },

}
</script>

<style scoped>

  h1 {
    color: #444444;
    font-family: athena regular;
  }

  @media screen and (min-width: 800px){

  .noneSideBar {
    display: none;
  }

  #cont {
    margin-left: 5%;
    padding: 2%;
    height: 650px;
  }
  }

  @media screen and (max-width: 799px){

  .disSideBar {
    display: none;
  }

  #cont {
    padding: 3%;
    height: 650px;
  }

}


</style>
