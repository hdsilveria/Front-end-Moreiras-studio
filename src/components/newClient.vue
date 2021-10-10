<template>
<div> 
    <form class="container" id="inserir" @submit.prevent="insertClient">
        <h4>Inserir Nova Cliente</h4>    
  <br>
    <b-row>
        <b-col md="5">
          <label class="form-label">Nome </label>
          <input v-model="novaCliente.name" class="form-control" type="text" autocomplete="off" required>
        </b-col>

        <b-col md="3">
          <label class="form-label">Data de Nascimento</label>
          <input v-model="novaCliente.birthday" class="form-control" type="tel" v-mask="'##/##/####'" autocomplete="off">
        </b-col>

        <b-col md="3">
          <label class="form-label">Idade </label>
          <input v-model="novaCliente.age" class="form-control" type="number">
        </b-col>
    </b-row>

    <b-row style="margin-top: 10px;">
        <b-col md="6">
          <label class="form-label">Telefone </label>
          <input v-model="novaCliente.tel" class="form-control" type="tel" v-mask="'(##)#####-####'" autocomplete="off">
        </b-col>
        <b-col md="5">
          <label class="form-label">Rede Social </label>
          <input v-model="novaCliente.social" class="form-control" type="text" autocomplete="off">
        </b-col>
    </b-row>
    <br>

    <b-row>
        <b-col class="d-flex d-row justify-content-center">
            <br><button :disabled="this.load" class="btn btn-outline-light" type="submit">
              <b-spinner v-if="this.load" variant="light"/>
                <div v-else>
                    Inserir Cliente 
                </div>  
            </button>
        </b-col>
    </b-row> <br>
    
    </form>
</div>
</template>

<script>

import clients from '../../services/clientes'

export default {

data(){
    return {
      load: false,
      novaCliente: {
          name: '',
          birthday: '',
          age: '',
          tel: '',
          social: '',
      }
    }
  },

methods: {

    insertClient(){
      this.load = true
        clients.inserir(this.novaCliente, { headers: { Authorization: 'Bearer ' + localStorage.getItem('token')} })
        .then(() =>{
          this.novaCliente.name = '',
          this.novaCliente.birthday = '',
          this.novaCliente.age = '',
          this.novaCliente.tel = '',
          this.novaCliente.social = ''
          this.load = false,
            this.$toast.success("Cliente inserida com sucesso!", {
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
        .catch(err => {
          this.load = false
            this.$toast.error(`Erro: ${err.response.data.message}`, {
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
    },
  }
}

</script>

<style scoped>

#inserir {
margin-top: 40px;
  text-align: left;
  background: rgb(244,191,187);
  background: linear-gradient(180deg, rgba(244,191,187,1) 0%, rgba(158,104,100,1) 100%);
  color: white;
  width: 60%;
  padding: 1%;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

h4 {
    text-align: center;
    margin: 10px;
    font-family: athena regular;
}

button {
    margin: 10px;
}

</style>