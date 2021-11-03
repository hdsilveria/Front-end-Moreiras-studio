<template>
    <modal 
      name="updateClient"
      :width="580"
      :height="'auto'"
      :adaptive="true"
      :draggable="true"
      @opened="setVar()"
      @closed="attList()"
    >
    <div id="inserir">
    <h3 style="text-align: center;">Atualizar Cliente</h3> <br>

    <form @submit.prevent="updClient()">
      <b-row>
        <b-col md="5">
          <label class="form-label">Nome </label>
          <input v-model="updateClient.name" class="form-control" type="text" autocomplete="off" required>
        </b-col>

        <b-col md="4">
          <label class="form-label">Data de Nascimento</label>
          <input v-model="updateClient.birthday" class="form-control" type="tel" v-mask="'##/##/####'" autocomplete="off">
        </b-col>

        <b-col md="2">
          <label class="form-label">Idade </label>
          <input v-model="updateClient.age" class="form-control" type="number">
        </b-col>
    </b-row>

    <b-row style="margin-top: 10px;">
        <b-col>
          <label class="form-label">Telefone </label>
          <input v-model="updateClient.tel" class="form-control" type="tel" v-mask="'(##)#####-####'" autocomplete="off">
        </b-col>
        <b-col>
          <label class="form-label">Rede Social </label>
          <input v-model="updateClient.social" class="form-control" type="text" autocomplete="off">
        </b-col>
    </b-row>

    <b-row style="margin-top: 10px;">
      <b-col>
        <label class="form-label">E-mail</label>
          <input v-model="updateClient.email" class="form-control" type="text" autocomplete="off">
      </b-col>
    </b-row>
    <br>

    <b-row>
        <b-col class="d-flex d-row justify-content-center">
            <br><button :disabled="this.load" class="btn btn-outline-light" type="submit">
              <b-spinner v-if="this.load" variant="light"/>
                <div v-else>
                    Atualizar Cliente 
                </div>  
            </button>
        </b-col>
    </b-row> <br>
    </form>
    </div>
  </modal>
</template>

<script>

import clients from '../../services/clientes'

export default {
  props: {
    client: {
      type: Object
    }
  },

  methods: {
    setVar(){
      this.updateClient = this.client
    },

    attList(){
      this.$emit('attClients')
    },

    updClient(){
      this.load = true
      clients.atualizar(this.updateClient.id, this.updateClient, this.token).then(() => {
        this.load = false,
        this.$modal.hide('updateClient')
          this.$toast.success("Cliente Atualizado com sucesso!", {
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
      }).catch(err => {
          this.load = false
          console.log(err)
        })
    }
  },

  data(){
    return {
      load: false,
      token: { headers: { Authorization: 'Bearer ' + localStorage.getItem('token')} },
      updateClient: {}
    }
  },
}

</script>

<style scoped>
#inserir {
  text-align: left;
  background: rgb(244,191,187);
  background: linear-gradient(180deg, rgba(244,191,187,1) 0%, rgba(158,104,100,1) 100%);
  color: white;
  padding: 20px;
}

h3 {
  cursor: all-scroll;
}
</style>