<template>
  <div id="estoque">

    <h3> Meu Estoque </h3>

    <div
      id="tabela"
      class="container overflow-auto"
    >

      <div>
        <b-row class="headTable text-left">
          <b-col md="2">
            Material
          </b-col>
          <b-col md="2">
            Quantidade
          </b-col>
          <b-col md="2">
            Valor Und
          </b-col>
          <b-col md="2">
            Valor Estoque
          </b-col>
          <b-col
            md="auto"
            class="text-nowrap"
          >
            Data da Ultima Compra
          </b-col>
          <b-col md="2" />
        </b-row>

        <div
          v-if="load"
          class="justify-content-left text-center p-5"
        >
          <b-spinner variant="dark" />
        </div>

        <b-row
          v-for="material of materiais"
          v-else
          :key="material.id"
          class="table text-center"
        >
          <b-col
            md="2"
            class="d-flex justify-content-left"
          >
            <div class="block-mobile">
              <span>
                Material:
              </span>
            </div>
            <span>
              {{ material.material }}
            </span>
          </b-col>

          <b-col
            md="2"
            class="d-flex justify-content-left"
          >
            <div class="block-mobile">
              <span>
                Quantidade: 
              </span>
            </div>
            <span>
              {{ material.quantidade }}
            </span>
          </b-col>

          <b-col
            md="2"
            class="d-flex justify-content-left"
          >
            <div class="block-mobile">
              <span>
                Valor:
              </span>
            </div>
            <span>
              {{ material.valor | ValorDecimal }}
            </span>
          </b-col>

          <b-col
            md="2"
            class="d-flex justify-content-left"
          >
            <div class="block-mobile">
              <span class="text-nowrap">
                Valor do Estoque
              </span>
            </div>
            <span>
              {{ material.quantidade * material.valor | ValorDecimal }}
            </span>
          </b-col>

          <b-col
            md="2"
            class="d-flex justify-content-left"
          >
            <div class="block-mobile">
              <span>
                Data de compra:
              </span>
            </div>
            <span>
              {{ material.data }}
            </span>
          </b-col>

          <b-col
            md="auto"
            class="d-flex justify-content-left"
          >
            <button
              style="margin: 2px;"
              type="button"
              class="btn btn-outline-dark btn-sm text-nowrap"
              @click="openModalUpdt(material)"
            >
              <span>Editar</span>
            </button>
            <button
              style="margin: 2px;"
              type="button"
              class="btn btn-outline-danger btn-sm text-nowrap"
              @click="remover(material.id)"
            >
              <span>Deletar</span>
            </button>
          </b-col>
        </b-row>
      </div> <br>
    </div>

    <updateMaterialModal
      :material="updtMaterial"
      @attMaterial="getMaterial()"
    />

  </div>
</template>

<script>

import materiais from '/services/materiais'
import updateMaterialModal from '../modals/updateMaterial.vue'


export default {

components: {
  updateMaterialModal
},

  filters: {
      ValorDecimal: valor => {
      return "R$ " + valor + ",00"
      }
  },
  
 data(){
    return {
      token: { headers: { Authorization: 'Bearer ' + localStorage.getItem('token')} },
      materiais: [],
      mostraEdit: false,
      updtMaterial: {},
      load: false, 
      UpdateMaterial: {
          id: '',
          quantidade: '',
          valor: ''
      }
    }
  },

mounted(){
  this.load = true 
  materiais.listar({ headers: { Authorization: 'Bearer ' + localStorage.getItem('token')} })
    .then(response=>{
      this.materiais = response.data.rows
      this.load = false
    })
  },

methods: {
  getMaterial(){
    materiais.listar(this.token)
      .then(response=>{
        this.materiais = response.data.rows
    })
  },
  remover(deletMaterial){
    if ( confirm('deseja excluir?') ){
      materiais.apagar(deletMaterial, this.token).then(() => {
        this.getMaterial().then(() => {
          this.$toast.success("Material deletado com sucesso!", {
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
      }).catch(err =>{
        console.log(err)
      })
     }
    },

    atualizar(UpdateMaterial){
    if (confirm('Deseja realizar a alteração?')){
    materiais.atualizar(UpdateMaterial).then(() =>{
    location.reload()
      })
     }
    },

  openModalUpdt(material){
      this.updtMaterial = material
      this.$modal.show('updateMaterial')
    },

  }
}

</script>



<style scoped>

.headTable {
  width: 100%;
  color: white;
  background: rgb(244,191,187);
  background: linear-gradient(180deg, rgba(244,191,187,1) 0%, rgba(158,104,100,1) 100%);
  padding: 6px;
}

#tabela {
  padding: 6px;
}

h1 {
  text-align: center;
  font-family: athena regular;
}

#estoque {
  margin-top: 50px;
}

#edit {
  text-align: left;
background: rgb(244,191,187);
background: linear-gradient(180deg, rgba(244,191,187,1) 0%, rgba(158,104,100,1) 100%);
  color: white;
  height: 170px;
  width: 345px;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

button { 
 text-decoration: none; 
} 

h3 {
  text-align: center;
  margin: 40px;
  font-family: athena regular;
  color: #686868;
}

.table {
  box-shadow: 2px 2px 5px 2px rgba(0, 0, 0, 0.179);
  background-color: rgba(255, 255, 255, 0.501);
  padding: 4px;
  margin-top: 5px;
}

.block-mobile {
  display: none;
}

@media screen and (max-width: 600px) {
  .block-mobile {
    display: block;
  }
}

</style>
