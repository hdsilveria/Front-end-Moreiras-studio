<template>
  <div>


    <b-row align-h="center">
      <b-col md="5">
        <div class="sectionReset p-5">
          <b-row>
            <h5>Resetar senha</h5>
          </b-row>
          <b-row align-h="center">
            <b-col md="11">
              <br>
              <form @submit.prevent="encontrarEmail()">
                <b-row>
                  <b-form-input
                    v-model="email"
                    placeholder="Insira seu email"
                    type="text"
                    required
                  />
                </b-row>
                <br>
                <b-row>
                  <b-col>
                    <button
                      type="submite"
                      class="load w-100 btn btn-dark"
                    >
                      <div v-if="this.load">
                        <b-spinner variant="light" />
                      </div>
                      <div v-else>
                        Continuar
                      </div>   
                    </button>
                  </b-col>
                  <b-col>
                    <button
                      class="load w-100 btn btn-outline-dark"
                      @click="$router.push({name: 'home'})"
                    >
                      <div>
                        Voltar
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
import { mapActions } from 'vuex'

export default {
  data(){
    return {
      email: '',
      load: false,
    }
  },
  methods: {
    ...mapActions({setEmail: 'app/setEmail'}),
    
    encontrarEmail(){
    this.load = true
    this.setEmail(this.email)
    users.encontrarEmail({email: this.email})
    .then(() => {
        this.load = false
         this.$toast.success("Email para recuperação de senha encaminhado!", {
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
        this.$router.push({name: 'recover'})
      })
    .catch(err => {
      this.load = false
        this.$toast.error(err.response.data.message, {
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