<script>
import { Pie  } from 'vue-chartjs'
import agenda from '/services/agenda'

export default {
  
    data(){
    return {
      dados: [],
      clientes: '',
      volumeRusso: '',
      fioAfio: '',
      volumeLeve: '',
      megaVolume: '',
      gelNaTip: '',
      fibraDeVidro: '',
      blindagemComFibra: '',
      blindagemComun: '',
    }
  },

  extends: Pie ,
  async mounted () {
    await agenda.listar({ headers: { Authorization: 'Bearer ' + localStorage.getItem('token')} }).then((response)=>{
      this.clientes = response.data.map(date => date.procedimento)
      this.volumeRusso = this.clientes.filter(tipos => tipos == 'Volume Russo')
      this.fioAfio = this.clientes.filter(tipos => tipos == 'Fio a Fio')
      this.volumeLeve = this.clientes.filter(tipos => tipos == 'Volume Leve')
      this.megaVolume = this.clientes.filter(tipos => tipos == 'Mega Volume')
      this.gelNaTip = this.clientes.filter(tipos => tipos == 'Gel na Tip')
      this.fibraDeVidro = this.clientes.filter(tipos => tipos == 'Fibra de Vidro')
      this.blindagemComFibra = this.clientes.filter(tipos => tipos == 'Blindagem com Fibra')
      this.blindagemComun = this.clientes.filter(tipos => tipos == 'Blindagem Comum')


     this.dados.push(
        this.volumeRusso.length,
        this.fioAfio.length,
        this.volumeLeve.length,
        this.megaVolume.length,
        this.gelNaTip.length,
        this.fibraDeVidro.length,
        this.blindagemComFibra.length,
        this.blindagemComun.length,

       )
      }),
    
    this.renderChart({
      labels: ['Volume Russo','Fio a Fio','Volume Leve','Mega Volume','Gel na Tip','Fibra de Vidro','Blindagem com Fibra','Blindagem Comum'],
      datasets: [
        {
          label: 'Numero de clientes por Mês 2021',
          backgroundColor: ['red','black','green','orange','blue','pink','yellow','purple'],
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