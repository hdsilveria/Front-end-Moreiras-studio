<template>
<div class="text-center">
  <b-row>
    <b-col></b-col>
  <b-col md="4">
  <img src="../static/logo_login.png">
      <div class="p-4">
        <form @submit.prevent="loginAcess">
          <div class="row g-3">
            <div>
              <label class="form-label">Email </label>
              <input v-model="newLogin.email" class="form-control" type="email" placeholder="Digite o e-mail">
            </div>

            <div>
              <label class="form-label">Senha </label>
              <input v-model="newLogin.password" class="form-control" type="password" placeholder="********">
            </div>

          </div><br>
          <button class="btn btn-outline-dark">Logar</button><br><br>
        </form>
      </div>
    </b-col>
    <b-col></b-col>
  </b-row>
</div>
</template>

<script>

import materiais from '/services/materiais'

export default ({

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

          setTimeout(function(){
            location.assign('/home')
             }, 1900);
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

  }
  
})
</script>

<style scoped>

span {
  font-family: Beskill;
  font-size: 13pt;
}

</style>