<template>
<div>
<sidebar />

<div id="cont" v-if="this.usuario">
    <router-view />
</div>

<div id="cont" class="d-flex d-row justify-content-center" v-else>
  <div>
    <h1>Sistema de Estoque e Agendamento</h1>
    <img src="./static/logo_login.png">
  </div>
</div>

</div>
</template>

<script>

require('/style/w3.css')

import materiais from '/services/materiais'
import sidebar from './components/sidebar.vue'

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
    sidebar
     },

  methods:{

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

          location.reload()
      })
      .catch(err => {
          alert('Usuario ou senha invalidos!'),
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

<style>
  #cont {
    margin-left: 20%;
    padding: 2%
  }
</style>
