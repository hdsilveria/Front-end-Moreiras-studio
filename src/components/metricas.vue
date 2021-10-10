<template>
<div>
  <b-row v-if="this.perfil == 1">

    <b-row> 
      <h4>Dashboard</h4>
    </b-row>

    <b-row style="margin-top: 45px; margin-bottom: 20px;">
      <b-col md="3">
        <div class="clientArea text-center">
          <span>Clientes Cadastradas </span>&nbsp;&nbsp;<strong><img src="../img/coracao.png"></strong><br><br>

          <div v-if="this.load" class="text-center p-2">
            <b-spinner variant="light"/>
          </div>

          <strong v-else id="numClients" @click="$router.push({name: 'clients'})">
            {{nmClientes}}
          </strong>

        </div><br>
      </b-col>
      
      <b-col md="5">
        <div class="clientArea text-left">
          <div class="text-center">
            <span>Atendimentos de Hoje</span><strong>&nbsp;&nbsp;<img src="../img/hoje.png"></strong>
          </div><br>

          <div v-if="this.load" class="text-center p-2">
            <b-spinner variant="light"/>
          </div>

          <div v-else>
            <div v-for="cliente in dateClients" :key="cliente.id" class="text-center">
            <b-row>
              <b-col md="auto">
                <small>{{ cliente.cliente }}</small>
              </b-col>
              <b-col md="2">
                <small>{{ cliente.horario }}</small>
              </b-col>
              <b-col md="auto">
                <small>{{ cliente.procedimento }}</small>
              </b-col>
              <b-col>
                <small>{{ cliente.tipo }}</small>
              </b-col>
            </b-row> <hr>
            </div>

            <div class="text-center" v-if="dateClients.length == 0">
              <small>
                🙁Não há Clientes Hoje🙁
              </small>
          </div>
          </div>

        </div><br>
      </b-col> 

      <b-col>
        <div class="clientArea">
          <div class="text-center">
            <span>Aniversariantes do Mês</span>&nbsp;&nbsp;<strong><img src="../img/aniversario.png"></strong><br><br>
          </div>
          
          <div v-if="this.load" class="text-center p-2">
            <b-spinner variant="light"/>
          </div>

          <div v-else>
            <div v-for="birth in clientes" :key="birth.id">
            <b-row>
              <b-col cols="7">
                <small>&nbsp;&nbsp;{{ birth.name }}</small>
              </b-col>
              <b-col>
                <small>{{ birth.birthday }}</small>
              </b-col>
            </b-row>
          </div>
          
          <div class="text-center" v-if="clientes.length == 0">
          <small>
            🙁Não há Aniversariantes este mês🙁
          </small>
          </div>
          </div>          

        </div>
      </b-col>
    </b-row>

    <b-col class="p-0">
      <br>
        <div class="graphic">
          <vendas />
        </div>
    </b-col>

    <b-col class="p-0">
      <br>
      <div class="graphic">
        <tipos />
      </div>
    </b-col>

    <b-col class="p-0">
      <br>
      <div class="graphic">
        <procedimentos />
      </div>
    </b-col>

    <b-col class="p-0">
      <br>
      <valoresMes class="graphic" /> 
    </b-col>
  </b-row>

  <div v-else class="text-center">
    <h2>Usuario sem permissão</h2>
  </div>

</div>
</template>

<script>

import vendas from '../graphics/vendas.vue'
import procedimentos from '../graphics/procedimentos.vue'
import tipos from '../graphics/tipos.vue'
import valoresMes from '../graphics/valoresMes'
import clients from '../../services/clientes'
import agenda from '../../services/agenda'


export default {

  data(){
    return {
      token: { headers: { Authorization: 'Bearer ' + localStorage.getItem('token')} },
      clientes: [],
      horarios: [],
      nmClientes: [],
      clientsAgosto: [],
      clientsSetembro: [],
      clientsOutubro: [],
      clientsNovembro: [],
      clientsDezembro: [],
      allClients: [],
      load: false,
      perfil: localStorage.getItem('Perfil'),
      mounth: '',
      date: '',
      dateClients: []
    }
  },

  created(){
    var data = new Date();
    var dia = String(data.getDate()).padStart(2, '0')
    var mes = String(data.getMonth() + 1).padStart(2, '0')
    var ano = data.getFullYear()
    
    this.date = dia + '/' + mes + '/' + ano
    this.mounth = data.getMonth() + 1
    this.listarClientes()
    this.listarAgenda()
  },

  methods: {
    listarClientes(){
      
    var data = new Date()
    var mes = String(data.getMonth() + 1).padStart(2, '0')

      this.load = true
        clients.listar(this.token).then(res => {
        this.nmClientes = res.data.count
        this.clientes = res.data.rows.filter(res => res.birthday.slice(3,5) == mes)
        this.load = false
      })
    },

    listarAgenda(){
    this.load = true
      agenda.listar(this.token)
        .then((response)=>{
        this.horarios = response.data.data.rows
        this.dateClients = this.horarios.filter(horarios => horarios.data == this.date)
        this.load = false
      })
    }
  },

  components: {
    vendas,
    procedimentos,
    tipos,
    valoresMes,
  }
}

</script>

<style scoped>

h4 {
    text-align: center;
    margin: 10px;
    font-family: athena regular;
    color: #686868;
}

.graphic {
  width: 270px;
}

#numClients {
  cursor: pointer;
}

.clientArea {
  height: 180px;
  background: linear-gradient(180deg, rgba(244,191,187,1) 0%, rgba(158,104,100,1) 100%);
  color: white;
  border: 2px solid rgba(158,104,100,1);
  width: 100%;
  overflow: auto; 
  overflow-x: hidden
}

small {
  font-size: 11pt;
  margin-left: 5px;
}

strong {
  font-size: 18pt;
  color: white;
}

span {
  font-size: 14pt;
}
</style>
