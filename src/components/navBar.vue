<template>
  <b-navbar
    toggleable
    type="dark"
    class="navBar"
  >
    <b-navbar-brand href="#">
      <span>Olá, {{ usuario }}</span>
    </b-navbar-brand>

    <b-navbar-toggle target="navbar-toggle-collapse">
      <template #default="{ expanded }">
        <b-icon
          v-if="expanded"
          icon="chevron-bar-up"
        />
        <b-icon
          v-else
          icon="chevron-bar-down"
        />
      </template>
    </b-navbar-toggle>

    <b-collapse
      id="navbar-toggle-collapse"
      is-nav
    >
      <b-navbar-nav class="ml-auto">

        <b-nav-item>
          <b-row>
            <router-link
              to="/dashboard"
              class="buttonMenu d-flex"
            >
              <b-col cols="auto">
                <img src="../img/metrics.png">
              </b-col>
              <b-col
                class="text-center"
                cols="auto"
              >
                <span>Dashboard</span>
              </b-col>
            </router-link>
          </b-row>
        </b-nav-item>

        <b-nav-item>
          <b-row v-if="perfil == 1 ">
            <router-link
              to="/newUser"
              class="buttonMenu d-flex"
            >
              <b-col cols="auto">
                <img src="../img/user.png">
              </b-col>
              <b-col
                class="text-center"
                cols="auto"
                align-self="top"
              >
                <span>Criar novo usuario</span> 
              </b-col>
            </router-link>
          </b-row>
        </b-nav-item>

        <b-nav-item>
          <b-row>
            <router-link
              to="/insertMaterial"
              class="buttonMenu d-flex"
            >
              <b-col cols="auto">
                <img src="../img/addMaterial.png">
              </b-col>
              <b-col
                class="text-center"
                cols="auto"
              >
                <span>Inserir Material</span> 
              </b-col>
            </router-link>
          </b-row>
        </b-nav-item>

        <b-nav-item>
          <b-row> 
            <router-link
              to="/newHour"
              class="buttonMenu d-flex"
            >
              <b-col cols="auto">
                <img src="../img/addHour.png">
              </b-col>
              <b-col
                class="text-center"
                cols="auto"
              >
                <span>Inserir Horario na Agenda</span> 
              </b-col>
            </router-link>
          </b-row>
        </b-nav-item>

        <b-nav-item>
          <b-row>
            <router-link
              to="/novaCliente"
              class="buttonMenu d-flex"
            >
              <b-col cols="auto">
                <img src="../img/addCliente.png">
              </b-col>
              <b-col
                class="text-center"
                cols="auto"
              >
                <span>Adicionar Cliente</span> 
              </b-col>
            </router-link>
          </b-row>
        </b-nav-item>

        <b-nav-item>
          <b-row>
            <router-link
              to="/"
              class="buttonMenu d-flex d-row"
            >
              <b-col cols="auto">
                <img src="../img/myMaterial.png">
              </b-col>
              <b-col
                class="text-center"
                cols="auto"
              >
                <span>Meu Estoque</span>
              </b-col>
            </router-link>
          </b-row>
        </b-nav-item>

        <b-nav-item>
          <b-row>
            <router-link
              to="/minhaAgenda"
              class="buttonMenu d-flex"
            >
              <b-col cols="2">
                <img src="../img/myHour.png">
              </b-col>
              <b-col
                class="text-center"
                cols="auto"
              >
                <span>&nbsp;Minha Agenda</span>
              </b-col>
            </router-link>
          </b-row>
        </b-nav-item>

        <b-nav-item>
          <b-row v-if="perfil == 1 ">
            <router-link
              to="/clientes"
              class="buttonMenu d-flex"
            >
              <b-col cols="1">
                <img src="../img/cliente.png">
              </b-col>
              <b-col
                class="text-center"
                cols="7"
              >
                <span>&nbsp;Minhas Clientes</span>
              </b-col>
            </router-link>
          </b-row>
        </b-nav-item>

        <b-nav-item>
          <b-row>
            <a
              @click="sair()"
            >
              <b-col class="text-center">
                <br>
                <img src="../img/out.png">
              </b-col>
            </a>
          </b-row>
        </b-nav-item>

      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>

export default {
  data(){
    return {
      usuario: localStorage.getItem('Usuario'),
      perfil: localStorage.getItem('Perfil'),
    }
  },

  methods: {
        sair(){
      if (confirm('Deseja Sair?')){
      localStorage.clear()
      location.assign('/')
      }
    }
  }
    
  }
</script>


<style scoped>

.navBar {
    background: rgb(244,191,187);
    background: linear-gradient(180deg, rgba(244,191,187,1) 58%, rgb(197, 148, 144) 99%);
    color: rgb(255, 255, 255);
}

span {
  color: white;
  margin-left: 0px;
}

.buttonMenu {
  margin-bottom: -10px;
  margin-left: 0px;
}


</style>