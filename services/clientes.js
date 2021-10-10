import { api } from './config'

export default {

  listar: token =>{
    return api.get('/clientes?page=0&size=400', token )
  },

  deletar: (id, token) => {
    return api.delete(`/clientes/${id}`, token)
  },

  inserir: (client, token) => {
    return api.post(`/clientes/insertClient`, client, token)
  },

  atualizar: (id, value, token) => {
    return api.put(`/clientes/${id}`, value, token)
  }
}