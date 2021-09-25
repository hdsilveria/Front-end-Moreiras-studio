<script>
import { Doughnut  } from 'vue-chartjs'
import agenda from '/services/agenda'

export default {
  
    data(){
    return {
      dados: [],
      aplicacao: '',
      manutencao: '',
    }
  },

  extends: Doughnut ,
  async mounted () {
    await agenda.listar({ headers: { Authorization: 'Bearer ' + localStorage.getItem('token')} }).then((response)=>{
      this.clientes = response.data.rows.map(date => date.tipo)
      this.aplicacao = this.clientes.filter(tipos => tipos == 'Aplicação')
      this.manutencao = this.clientes.filter(tipos => tipos == 'Manutenção')

     this.dados.push(
        this.aplicacao.length,
        this.manutencao.length,
       )
      }),
    
    this.renderChart({
      labels: ['Aplicação', 'Manutenção'],
      datasets: [
        {
          backgroundColor: ['rgba(244,191,187,1)','rgba(158,104,100,1)'],
          data: this.dados,
          borderWidth: 5,
        },
      ]
    })
  },

}
</script>

<style>

</style>