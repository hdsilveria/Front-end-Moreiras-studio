<template>
<div>

<ul class="nav justify-content-left">
  <li class="nav-item">
    <button id="menuText" class="btn btn-dark" @click="insert()">Inserir</button>
  </li>
  <li class="nav-item">
    <button id="menuText" class="btn btn-dark" @click="estoque()">Estoque</button>
  </li>
</ul>

    <lista v-show="mostraEstoque" />
    <inserir v-show="mostraInsert" />

</div>
</template>

<script>

import lista from './components/lista'
import inserir from './components/inserir'

export default {
  data(){
    return { mostraEstoque: true, mostraInsert: false  }
  },

  components: { lista, inserir },

  methods:{

  estoque: function(){
      this.mostraEstoque = true;
      this.mostraInsert = false;
  },

  insert: function(){
      this.mostraEstoque = false;
      this.mostraInsert = true;
  },

  }
}
</script>

<style>

ul{
  background-color: black;
}

li {
  padding: 10px;
}

#menuText {
  font-size: 26pt;
  margin-left: 200px;
  color: white;
  background-color: rgba(0, 0, 0, 0);
}

</style>
