<script>
import { Line  } from 'vue-chartjs'
import agenda from '/services/agenda'

export default {

  extends: Line,
  
    data(){
    return {
      clientes: [],
      clientsJulho: [],
      clientsAgosto: [],
      clientsSetembro: [],
      clientsOutubro: [],
      clientsNovembro: [],
      clientsDezembro: [],
      allClients: [],
    }
  },

  async mounted () {
    await agenda.listar({ headers: { Authorization: 'Bearer ' + localStorage.getItem('token')} }).then(response=>{
      let vendas = response.data.data.rows.map(date => date)
      vendas.map(proc => proc).forEach(element => {
        if (element.procedimento == 'Volume Russo' && element.tipo == 'Aplicação') {
          element = { valor: 190, data: element.data }
        }
        if (element.procedimento == 'Fio a Fio' && element.tipo == 'Aplicação') {
          element = { valor: 150, data: element.data }
        }
        if (element.procedimento == 'Volume Leve' && element.tipo == 'Aplicação') {
          element = { valor: 140, data: element.data } 
        }
        if (element.procedimento == 'Mega Volume' && element.tipo == 'Aplicação') {
          element = { valor: 240, data: element.data }
        }
        if (element.procedimento == 'Gel na Tip' && element.tipo == 'Aplicação') {
          element = { valor: 130, data: element.data }
        }
        if (element.procedimento == 'Fibra de Vidro' && element.tipo == 'Aplicação') {
          element = { valor: 180, data: element.data }
        }
        if (element.procedimento == 'Blindagem com Fibra' && element.tipo == 'Aplicação') {
          element = { valor: 80, data: element.data }
        }
        if (element.procedimento == 'Blindagem Comum' && element.tipo == 'Aplicação') {
          element = { valor: 60, data: element.data }
        }

        if (element.procedimento == 'Volume Russo' && element.tipo == 'Manutenção') {
          element = { valor: 110, data: element.data }
        }
        if (element.procedimento == 'Fio a Fio' && element.tipo == 'Manutenção') {
          element = { valor: 70, data: element.data }
        }
        if (element.procedimento == 'Volume Leve' && element.tipo == 'Manutenção') {
          element = { valor: 80, data: element.data }
        }
        if (element.procedimento == 'Mega Volume' && element.tipo == 'Manutenção') {
          element = { valor: 180, data: element.data }
        }
        if (element.procedimento == 'Gel na Tip' && element.tipo == 'Manutenção') {
          element = { valor: 70, data: element.data }
        }
        if (element.procedimento == 'Fibra de Vidro' && element.tipo == 'Manutenção') {
          element = { valor: 90, data: element.data }
        }
        if (element.procedimento == 'Blindagem com Fibra' && element.tipo == 'Manutenção') {
          element = { valor: 80, data: element.data }
        }
        if (element.procedimento == 'Blindagem Comum' && element.tipo == 'Manutenção') {
          element = { valor: 60, data: element.data }
        }
        this.clientes.push(element)
      })
        this.clientsJulho = this.clientes.filter(date => date.data.slice(3,10) == '07/2021')
        this.clientsAgosto = this.clientes.filter(date => date.data.slice(3,10) == '08/2021')
        this.clientsSetembro = this.clientes.filter(date => date.data.slice(3,10) == '09/2021')
        this.clientsOutubro = this.clientes.filter(date => date.data.slice(3,10) == '10/2021')
        this.clientsNovembro = this.clientes.filter(date => date.data.slice(3,10) == '11/2021')
        this.clientsDezembro = this.clientes.filter(date => date.data.slice(3,10) == '12/2021')

        this.allClients.push(
        this.clientsJulho.map(valor => valor.valor).reduce((total,soma) => total + soma, 0 ),
        this.clientsAgosto.map(valor => valor.valor).reduce((total,soma) => total + soma, 0 ), 
        this.clientsSetembro.map(valor => valor.valor).reduce((total,soma) => total + soma, 0 ),
        this.clientsOutubro.map(valor => valor.valor).reduce((total,soma) => total + soma, 0 ), 
        this.clientsNovembro.map(valor => valor.valor).reduce((total,soma) => total + soma, 0 ), 
        this.clientsDezembro.map(valor => valor.valor).reduce((total,soma) => total + soma, 0 ), 
        )
      }),
    
      this.renderChart({
      labels: ['Julho','Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
      datasets: [
        {
          label: 'Venda Liquida por Mês em R$',
          backgroundColor: 'rgba(244,191,187,1)',
          data: this.allClients,
          borderWidth: 5,
        },
      ]
    })
  },

}
</script>

<style>
</style>