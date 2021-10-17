<template>
  <b-navbar
    toggleable
    type="dark"
    class="navBar w-100"
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
              class="w3-bar-item w3-button w3-hover-none buttonMenu d-flex"
            >
              <b-col md="1">
                <img src="../img/metrics.png">
              </b-col>
              <b-col
                class="text-center"
                md="6"
              >
                <span>Dashboard</span>
              </b-col>
            </router-link>
          </b-row>
        </b-nav-item>

        <b-nav-item>
          <b-row v-if="this.perfil == 1 ">
            <router-link
              to="/newUser"
              class="w3-bar-item w3-button w3-hover-none buttonMenu d-flex"
            >
              <b-col md="1">
                <img src="../img/user.png">
              </b-col>
              <b-col
                class="text-center"
                md="8"
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
              class="w3-bar-item w3-button w3-hover-none buttonMenu d-flex"
            >
              <b-col md="1">
                <img src="../img/addMaterial.png">
              </b-col>
              <b-col
                class="text-center"
                md="7"
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
              class="w3-bar-item w3-button w3-hover-none buttonMenu d-flex"
            >
              <b-col md="1">
                <img src="../img/addHour.png">
              </b-col>
              <b-col
                class="text-center"
                md="10"
              >
                <span style="margin-left: 13px;">Inserir Horario na Agenda</span> 
              </b-col>
            </router-link>
          </b-row>
        </b-nav-item>

        <b-nav-item>
          <b-row>
            <router-link
              to="/novaCliente"
              class="w3-bar-item w3-button w3-hover-none buttonMenu d-flex"
            >
              <b-col md="1">
                <img src="../img/addCliente.png">
              </b-col>
              <b-col
                class="text-center"
                md="8"
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
              class="w3-bar-item w3-button w3-hover-none buttonMenu d-flex d-row"
            >
              <b-col md="1">
                <img src="../img/myMaterial.png">
              </b-col>
              <b-col
                class="text-center"
                md="7"
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
              class="w3-bar-item w3-button w3-hover-none buttonMenu d-flex"
            >
              <b-col md="1">
                <img src="../img/myHour.png">
              </b-col>
              <b-col
                class="text-center"
                md="7"
              >
                <span>&nbsp;Minha Agenda</span>
              </b-col>
            </router-link>
          </b-row>
        </b-nav-item>

        <b-nav-item>
          <b-row v-if="this.perfil == 1 ">
            <router-link
              to="/clientes"
              class="w3-bar-item w3-button w3-hover-none buttonMenu d-flex"
            >
              <b-col md="1">
                <img src="../img/cliente.png">
              </b-col>
              <b-col
                class="text-center"
                md="7"
              >
                <span>&nbsp;Minhas Clientes</span>
              </b-col>
            </router-link>
          </b-row>
        </b-nav-item>

        <b-nav-item>
          <b-row>
            <a
              class="w3-bar-item w3-button w3-hover-none d-flex"
              @click="sair()"
            >
              <b-col>
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
  margin-left: 10px;
}

.buttonMenu {
  margin-bottom: -10px;
  margin-left: 10px;
}


</style>