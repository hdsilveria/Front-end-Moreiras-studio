<template>
    <modal 
      name="updateMaterial"
      :width="480"
      :height="'auto'"
      :adaptive="true"
      :draggable="true"
      @opened="setVar()"
      @closed="attList()"
    >
    <div id="inserir">
    <h3 style="text-align: center;">Atualizar Material</h3> <br>

    <form @submit.prevent="updMaterial()">
      <b-row>
        <b-col cols="6">
          <label class="form-label">Material </label>
          <input v-model="upMaterial.material" class="form-control" type="text" autocomplete="off" required>
        </b-col>

        <b-col cols="6">
          <label class="form-label">Quantidade </label>
          <input v-model="upMaterial.quantidade" class="form-control" type="number" autocomplete="off" required>
        </b-col>
    </b-row>

    <b-row style="margin-top: 10px;">
        <b-col cols="6">
          <label class="form-label">Data da Ultima Compra </label>
          <input v-model="upMaterial.data" class="form-control" type="tel" v-mask="'##/##/####'"  autocomplete="off" required>
        </b-col>

        <b-col cols="6">
          <label class="form-label">Valor </label>
          <input v-model="upMaterial.valor" class="form-control" type="number" required>
        </b-col>
    </b-row>
    <br>

    <b-row>
        <b-col class="d-flex d-row justify-content-center">
            <br><button :disabled="this.load" class="btn btn-outline-light" type="submit">
              <b-spinner v-if="this.load" variant="light"/>
                <div v-else>
                    Atualizar Material 
                </div>  
            </button>
        </b-col>
    </b-row> <br>
    </form>
    </div>
  </modal>
</template>


<script>

import materials from '../../services/materiais'

export default {
  props: {
    material: {
      type: Object
    }
  },

  methods: {
    setVar(){
      this.upMaterial = this.material
    },

    attList(){
      this.$emit('attMaterial')
    },

    updMaterial(){
      this.load = true
      materials.atualizar(this.upMaterial.id, this.upMaterial, this.token).then(() => {
        this.load = false,
        this.$modal.hide('updateMaterial')
          this.$toast.success("Material Atualizado com sucesso!", {
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
      upMaterial: {}
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