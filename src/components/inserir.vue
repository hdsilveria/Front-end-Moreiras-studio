<template>
<div>

<div id="inserir" class="container">

  <h4>Inserir Material</h4> <br>
    <form @submit.prevent="inserirMaterial">
      <div class="row g-3">
        <b-row>
          <b-col md="7">
            <label class="form-label">Material </label>
            <input v-model="NovoMaterial.material" class="form-control" type="text" min="0" max="200" required>
          </b-col>

          <b-col md="5">
            <label class="form-label">Quantidade </label>
            <input v-model="NovoMaterial.quantidade" class="form-control" type="number" min="0" max="200" required>
          </b-col>
        </b-row>

        <b-row>
        <b-col md="5">
          <label class="form-label">Valor </label> 
          <input v-model="NovoMaterial.valor" class="form-control" type="number" min="0" max="200" required><br>
        </b-col>

        <b-col md="6">
          <label class="form-label">Data da Compra </label>
          <input v-model="NovoMaterial.data" class="form-control" type="tel" v-mask="'##/##/####'" min="0" max="200">
        </b-col>
        </b-row>

      </div>
          <b-row>
        <b-col class="d-flex d-row justify-content-center">
            <br><button :disabled="this.load" class="btn btn-outline-light" type="submit">               <b-spinner v-if="this.load" variant="light"/>
                <div v-else>
                    Salvar
                </div> </button>
        </b-col>
    </b-row> <br>
    </form>
  </div>

</div>
</template>

<script>

import materiais from '/services/materiais'

export default {

data(){
    return {
      token: { headers: { Authorization: 'Bearer ' + localStorage.getItem('token')} },
      load: false,
      NovoMaterial: {
          material: '',
          quantidade: '',
          valor: '',
          data: '',
      }
    }
  },

methods: {

    inserirMaterial(){
       this.load = true   
        materiais.cadastrar(this.NovoMaterial, this.token)
        .then(() =>{
           this.load = false
          this.$toast.success("Material inserido com sucesso!", {
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
          this.NovoMaterial.material = '',
          this.NovoMaterial.quantidade = '',
          this.NovoMaterial.valor = '',
          this.NovoMaterial.data = ''
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
  height: auto;
  width: 360px;
  padding: 1%;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

h4 {
  text-align: center;
  margin: 20px;
  font-family: athena regular;
}

</style>