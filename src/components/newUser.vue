<template>
  <div class="princ">
    
    <b-row
      v-if="this.perfil == 1"
      id="novoUsuario"
      class="d-flex d-row"
      align-h="between"
    >

      <b-col md="6">

        <h4> Criar Novo Usuario </h4>
        <form @submit.prevent="cadastrarUsuario">
          <div>
            <label class="form-label">Nome </label>
            <input
              v-model="usuario.usuario"
              class="form-control"
              type="text"
              autocomplete="off"
              required
            >
          </div>

          <div>
            <label class="form-label">Email </label>
            <input
              v-model="usuario.email"
              class="form-control"
              type="email"
              autocomplete="off"
              required
            >
          </div>

          <div class="col-md-6">
            <label class="form-label">Perfil </label> 
            <select
              v-model="usuario.perfil"
              class="form-control"
              required
            >
              <option value="1">
                1 - Administrador
              </option>
              <option value="2">
                2 - Operador
              </option>
            </select>
          </div>

          <div>
            <label class="form-label">Senha </label>
            <input
              v-model="usuario.password"
              class="form-control"
              type="password"
              required
            >
          </div>

          <div>
            <label class="form-label">Confirme a Senha </label>
            <input
              v-model="passwordConfirm"
              class="form-control"
              type="password"
              required
            >
          </div><br>
          <b-row>
            <b-col class="d-flex d-row justify-content-center">
              <br><button
                :disabled="this.load"
                class="btn btn-outline-light"
                type="submit"
              >
                <b-spinner
                  v-if="this.load"
                  variant="light"
                />
                <div v-else>
                  Criar Usuario 
                </div>              
              </button>
            </b-col>
          </b-row> <br>
        </form>

      </b-col>

      <b-col
        md="6"
        class="justify-content-center"
      >
        <h4> Usuarios</h4> 
        <div class="usersCreated">
          <b-row
            v-for="usuarios in users"
            :key="usuarios.id"
            style="margin-top: 5px;"
          ><hr>
            <b-col>
              <b-row><span><b>Usuario:</b> {{ usuarios.user }}</span></b-row>
              <b-row><span><b>Email:</b> {{ usuarios.email }}</span></b-row>
              <b-row><span><b>Perfil:</b> {{ usuarios.profile }}</span></b-row>
            </b-col>
            <b-col md="4">
              <b-row>
                <b-col class="p-0">
                  <button
                    class="btn btn-light"
                    @click="editar(usuarios.id)"
                  >
                    <span style="color: rgba(158,104,100,1)">Editar</span>
                  </button>
                </b-col>
                <b-col class="p-0">
                  <button
                    class="btn btn-outline-light"
                    @click="remover(usuarios.id)"
                  >
                    Deletar
                  </button>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
        </div>
      </b-col>

    </b-row>

    <div
      v-else
      class="text-center"
    >
      <h2>Usuario sem permissão</h2>
    </div>

  </div>
</template>

<script>

import users from '/services/users'

export default {

data(){
    return {
      load: false,
      user: localStorage.getItem('Usuario'),
      perfil: localStorage.getItem('Perfil'),
      token: { headers: { Authorization: 'Bearer ' + localStorage.getItem('token')} },
        users: [],
        passwordConfirm: '',
        usuario: {
            usuario: '',
            email: '',
            perfil: '1',
            password: ''
        }
    }
},

mounted(){  
  users.listarUsuario({ headers: { Authorization: 'Bearer ' + localStorage.getItem('token')} }).then(response=>{
    this.users = response.data.filter(arr => arr.user !== localStorage.getItem('Usuario'))
    })
  },

methods: {
    remover(user){
    if ( confirm('deseja excluir?') ){
      users.apagar(user, this.token).then(() => {
          users.listarUsuario(this.token).then(response=>{
    this.users = response.data.filter(arr => arr.user !== localStorage.getItem('Usuario'))
    })
      }).catch(err =>{
        console.log(err)
      })
     }
    },

    cadastrarUsuario(){
      this.load = true            
      if (this.usuario.password === this.passwordConfirm) {
        users.criarUsuario(this.usuario, this.token)
        .then(() =>{
          this.load = false
            this.$toast.success("Usuario inserido com sucesso!", {
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
            })
          this.usuario.usuario = ''
          this.usuario.email = ''
          this.usuario.perfil = ''
          this.usuario.password = ''
          this.passwordConfirm = ''

            users.listarUsuario(this.token).then(response=>{
    this.users = response.data.filter(arr => arr.user !== localStorage.getItem('Usuario'))
    })
        })
        .catch(err => {
          this.load = false
          console.log(err)
            this.$toast.error("Erro, contate o Administrador!", {
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
            })
        })
      } else {
        this.load = false
          this.$toast.error("Senhas não conferem!", {
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
            })
      }
    },
  }

}
</script>

<style scoped>

#novoUsuario {
    margin-top: 40px;
    text-align: left;
    background: rgb(244,191,187);
    background: linear-gradient(185deg, rgba(244,191,187,1) 7%, rgba(158,104,100,1) 54%);
    color: white;
    font-weight: 500;
    width: 100%;
    padding: 1%;
    z-index: 1;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

h4 {
  text-align: center;
  margin: 30px;
  font-family: athena regular;
}

ul {
  list-style-type: none;
}

.usersCreated {
  max-height: 350px;
  width: 100%;
  overflow: scroll;
  overflow-x: hidden;
  border: 1px solid white;
}

span {
  margin-left: 6px;
}

</style>