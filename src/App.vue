<template>
<div>

<div class="w3-sidebar w3-bar-block" style="width:20%" id="menu">
  <div id="menuInt">
    <a @click="insert()" class="w3-bar-item w3-button w3-hover-gray">Inserir</a>
    <br>
    <a @click="estoque()" class="w3-bar-item w3-button w3-hover-gray">Estoque</a>
  </div>
</div>

    <lista id="cont" v-show="mostraEstoque" />
    <inserir id="cont" v-show="mostraInsert" />

<footer id="cont" class="fixed">
  <hr>
    <p>Desenvolvido por &copy;Henrique_Duarte</p>
</footer>

</div>
</template>

<script>

require('/style/w3.css')

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

#menu{
background-color: rgb(39, 39, 39);
color: white;
margin-top: -20px;
height: 110%;
}

#cont {
  margin-left: 15%;
  padding: 2%
}

#menuInt {
  margin-top: 50px;
  font-size: 14pt;
}

footer {
    text-align: center;
    position: fixed;
    bottom: 0;
    width: 90%;
    background-color:rgb(255, 255, 255);
    color: black;
}

</style>
