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

      <b-row>
        <b-col md="5">
          <label class="form-label">Nome </label>
          <input v-model="updateClient.name" class="form-control" type="text" autocomplete="off" required>
        </b-col>

        <b-col md="3">
          <label class="form-label">Aniversario </label>
          <input v-model="updateClient.birthday" class="form-control" type="tel" v-mask="'##/##/####'" autocomplete="off" required>
        </b-col>

        <b-col md="3">
          <label class="form-label">Idade </label>
          <input v-model="updateClient.age" class="form-control" type="number" required>
        </b-col>
    </b-row>

    <b-row style="margin-top: 10px;">
        <b-col>
          <label class="form-label">Telefone </label>
          <input v-model="updateClient.tel" class="form-control" type="tel" v-mask="'(##)#####-####'" autocomplete="off" required>
        </b-col>
        <b-col>
          <label class="form-label">Rede Social </label>
          <input v-model="updateClient.social" class="form-control" type="text" autocomplete="off" required>
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
    </div>
  </modal>
</template>


<script>

// import clients from '../../services/clientes'

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
    }
  },

  data(){
    return {
      load: false,
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
</style>