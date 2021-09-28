import { api } from './config'

export default {

  listar: token =>{
    return api.get('/clientes?page=0&size=100', token )
  },

  deletar: (id) => {
    return api.delete(`/clientes/${id}`)
  }
}