<template>
<div>

<div  v-if="this.usuario">
  <sidebar />
    <router-view id="cont" />
</div>

<div id="cont" style="margin-left: 0%;" v-else>
    <login />
</div>

</div>
</template>

<script>

require('/style/w3.css')

import sidebar from './components/sidebar.vue'
import login from './components/login.vue'

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
     },

}
</script>

<style scoped>

  h1 {
    color: #444444;
    font-family: athena regular;
  }

  @media screen and (min-width: 1000px){
  #cont {
    margin-left: 5%;
    padding: 2%;
    height: 650px;
  }
  }

  @media screen and (max-width: 500px){

  #cont {
    margin-left: 15%;
    padding: 2%;
    height: 650px;
  }

}


</style>
