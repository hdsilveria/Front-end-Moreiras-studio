<script>
import { Bar  } from 'vue-chartjs'
import agenda from '/services/agenda'

export default {
  
    data(){
    return {
      dados: [],
      clientes: '',
      clientesDezembro: '',
      clientesNovembro: '',
      clientesOutubro: '',
      clientesSetembro: '',
      clientesAgosto: '',
      clientesJulho: '',
      clientesJunho: '',
      clientesMaio: '',
      clientesAbril: '',
      clientesMarco: '',
      clientesFavereiro: '',
      clientesJaneiro: '',

    }
  },

  extends: Bar ,
  async mounted () {
    await agenda.listar({ headers: { Authorization: 'Bearer ' + localStorage.getItem('token')} }).then((response)=>{
      this.clientes = response.data.map(date => date.data.slice(3,10))
      this.clientesDezembro = this.clientes.filter(horarios => horarios == '12/2021')
      this.clientesNovembro = this.clientes.filter(horarios => horarios == '11/2021')
      this.clientesOutubro = this.clientes.filter(horarios => horarios == '10/2021')
      this.clientesSetembro = this.clientes.filter(horarios => horarios == '09/2021')
      this.clientesAgosto = this.clientes.filter(horarios => horarios == '08/2021')
      this.clientesJulho = this.clientes.filter(horarios => horarios == 7)
      this.clientesJunho = this.clientes.filter(horarios => horarios == 6)
      this.clientesMaio = this.clientes.filter(horarios => horarios == 5)
      this.clientesAbril = this.clientes.filter(horarios => horarios == 4)
      this.clientesMarco = this.clientes.filter(horarios => horarios == 3)
      this.clientesFavereiro = this.clientes.filter(horarios => horarios == 2)
      this.clientesJaneiro = this.clientes.filter(horarios => horarios == 1)


     this.dados.push(
        this.clientesJaneiro.length,
        this.clientesFavereiro.length,
        this.clientesMarco.length,
        this.clientesAbril.length,
        this.clientesMaio.length,
        this.clientesJunho.length,
        this.clientesJulho.length,
        this.clientesAgosto.length, 
        this.clientesSetembro.length, 
        this.clientesOutubro.length, 
        this.clientesNovembro.length,
        this.clientesDezembro.length,
       )
      }),
    
    this.renderChart({
      labels: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
      datasets: [
        {
          label: 'Numero de clientes por Mês 2021',
          backgroundColor: 'rgba(244,191,187,1)',
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