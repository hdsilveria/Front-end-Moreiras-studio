<template>
  <div>
          <b-row align-h="center">
        <b-col md="8">
          <div class="sectionReset p-4">
            <b-row align-h="center">
              <b-col md="10">
                <div class="text-center">
                  <p>Informe o Token para que seja realizado a alteração da senha.</p>
                </div>
                <br>
                <form @submit.prevent="resetarSenha()" autocomplete="false">
                <b-row>
                  <b-form-input v-model="user.token" placeholder="Insira o código" type="text"/>
                </b-row><br>

                <b-row>
                  <b-form-input v-model="user.password" placeholder="Insira a nova Senha" type="password"/>
                </b-row><br>

                <b-row>
                  <b-form-input v-model="confirm" placeholder="Confirmar a nova Senha" type="password"/>
                </b-row>
                <br>
                <b-row class="w-100">
                  <b-col>
                    <button type="submite" class="load w-100 btn btn-dark">
                      <div v-if="this.load">
                      <b-spinner variant="light"/>
                      </div>
                        <div v-else>
                          Alterar
                        </div>   
                    </button>
                  </b-col>
                  <b-col>
                    <button @click="$router.push({name: 'home'})" class="load w-100 btn btn-outline-dark">
                        <div>
                          Cancelar
                        </div>   
                    </button>
                  </b-col>
                </b-row>
                </form>           
              </b-col>
            </b-row>
          </div>
        </b-col>
      </b-row>
  </div>
</template>

<script>

import users from '../../services/users'
import {mapGetters} from 'vuex'

export default {
  data(){
    return {
      load: false,
      confirm: '',
      contador: null,
      user: {
        email: '',
        token: '',
        password: '',
      }
    }
  },
  computed: {
    ...mapGetters({getEmail: 'app/getEmail'})
  },
  methods: {
    resetarSenha(){
      this.load = true
      this.user.email = this.getEmail
      if(this.confirm == this.user.password){
        users.alterarSenha(this.user).then(() => {
          this.load = false
          this.$toast.success("Senha alterada com sucesso!", {
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
            setTimeout(() => {
              this.$router.push({name: 'home'})
            }, 1000);
        }).catch(err => {
        this.load = false
        this.$toast.error(err.response, {
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
        })
      }else{
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
        });
      }
    }
  }
}

</script>

<style scoped>

.sectionReset {
  background: white;
  border: 2px solid rgba(0, 0, 0, 0.123);
}

</style>