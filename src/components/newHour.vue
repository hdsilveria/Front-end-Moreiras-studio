<template>
  <div> 
    <form
      id="inserir"
      class="container"
      @submit.prevent="insertHorary"
    >
      <h4>Inserir Novo Horario</h4>    
      <br>
      <b-row>
        <b-col md="5">
          <label class="form-label">Cliente </label>
          <input
            v-model="novoHorario.cliente"
            class="form-control"
            type="text"
            autocomplete="off"
            required
          >
        </b-col>

        <b-col md="4">
          <label class="form-label">Data </label>
          <input
            v-model="novoHorario.data"
            v-mask="'##/##/####'"
            class="form-control"
            type="tel"
            autocomplete="off"
            required
          >
        </b-col>

        <b-col md="3">
          <label class="form-label">Horario </label>
          <input
            v-model="novoHorario.horario"
            class="form-control"
            type="time"
            autocomplete="off"
            required
          >
        </b-col>
      </b-row>

      <b-row class="mt-2">
        <b-col>
          <label class="form-label">Procedimento </label>
          <select
            v-model="novoHorario.procedimento"
            class="form-control"
            required
          >
            <option value="Volume Russo">
              Cilius: Volume Russo
            </option>
            <option value="Fio a Fio">
              Cilius: Fio a Fio
            </option>
            <option value="Volume Leve">
              Cilius: Volume Leve
            </option>
            <option value="Mega Volume">
              Cilius: Mega Volume
            </option>
            <option value="Gel na Tip">
              Unhas: Gel na Tip
            </option>
            <option value="Fibra de Vidro">
              Unhas: Fibra de Vidro
            </option>
            <option value="Blindagem com Fibra">
              Unhas: Blindagem com Fibra
            </option>
            <option value="Blindagem Comum">
              Unhas: Blindagem Comum
            </option>
          </select>
        </b-col>
        <b-col>
          <label class="form-label">Tipo </label>
          <select
            v-model="novoHorario.tipo"
            class="form-control"
            required
          >
            <option value="Manutenção">
              Manutenção
            </option>
            <option value="Aplicação">
              Aplicação
            </option>
          </select>
        </b-col>


      </b-row> <br>

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
              Inserir Horario 
            </div>  
          </button>
        </b-col>
      </b-row> <br>
    
    </form>
  </div>
</template>

<script>

import agenda from '/services/agenda'

export default {

data(){
    return {
      load: false,
      novoHorario: {
          cliente: '',
          data: '',
          horario: '',
          procedimento: 'Volume Russo',
          tipo: 'Manutenção',
      }
    }
  },

methods: {

    insertHorary(){
      this.load = true
        agenda.cadastrar(this.novoHorario, { headers: { Authorization: 'Bearer ' + localStorage.getItem('token')} })
        .then(() =>{
          this.load = false,
            this.$toast.success("Horario inserido com sucesso!", {
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
          this.novoHorario.cliente = '',
          this.novoHorario.data = '',
          this.novoHorario.horario = '',
          this.novoHorario.procedimento = '',
          this.novoHorario.tipo = ''
        })
        .catch(() => {
          this.load = false
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