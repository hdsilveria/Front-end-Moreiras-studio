<template>
<div> 
    <form class="container" id="inserir" @submit.prevent="insertHorary">
        <h4>Inserir Novo Horario</h4>    
  <br>
    <b-row>
        <b-col md="5">
          <label class="form-label">Cliente </label>
          <input v-model="novoHorario.cliente" class="form-control" type="text" autocomplete="off" required>
        </b-col>

        <b-col md="4">
          <label class="form-label">Data </label>
          <input v-model="novoHorario.data" class="form-control" type="tel" v-mask="'##/##/####'" autocomplete="off" required>
        </b-col>

        <b-col md="3">
          <label class="form-label">Horario </label>
          <input v-model="novoHorario.horario" class="form-control" type="time" autocomplete="off" required>
        </b-col>
    </b-row> <br>

    <b-row>
        <b-col>
          <label class="form-label">Procedimento </label>
            <select class="form-control" v-model="novoHorario.procedimento" required>
              <option value="Volume Russo" selected>Cilius: Volume Russo </option>
              <option value="Fio a Fio" >Cilius: Fio a Fio </option>
              <option value="Volume Leve" >Cilius: Volume Leve </option>
              <option value="Mega Volume" >Cilius: Mega Volume </option>
              <option value="Gel na Tip" >Unhas: Gel na Tip </option>
              <option value="Fibra de Vidro" >Unhas: Fibra de Vidro </option>
              <option value="Blingagem com Fibra" >Unhas: Blindagem com Fibra </option>
              <option value="Blingagem Comum" >Unhas: Blindagem Comum </option>

          </select>
        </b-col>
    </b-row> <br>

        <div class="col-md-4">
          <label class="form-label">Tipo </label>
          <select class="form-control" v-model="novoHorario.tipo" required>
              <option value="Manutenção" selected> Manutenção </option>
              <option value="Aplicação" > Aplicação </option>
          </select>
        </div>


    <b-row>
        <b-col class="d-flex d-row justify-content-center">
            <br><button class="btn btn-outline-light" type="submit"> Inserir Horario </button>
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
      novoHorario: {
          cliente: '',
          data: '',
          horario: '',
          procedimento: '',
          tipo: '',
      }
    }
  },

methods: {

    insertHorary(){       
        agenda.cadastrar(this.novoHorario, { headers: { Authorization: 'Bearer ' + localStorage.getItem('token')} })
        .then(response =>{
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
            });
          console.log(response),
          setTimeout(() => { location.reload() }, 2100);
        })
        .catch(err => {
          alert('Usuario não autenticado! ' + err)
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