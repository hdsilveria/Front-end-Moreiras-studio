import { api } from './config'


export default {

    listar: (token) =>{
        return api.get('/estoque?page=0&size=400', token )
    },

    login: (loginUser, token) =>{
        return api.post('/login', loginUser, token )
    },

    cadastrar: (CadMaterial, token) =>{
        return api.post('/estoque/material', CadMaterial, token)
    },

    atualizar: (id, UpdMaterial, token) => {
        return api.put(`/estoque/material/${id}`, UpdMaterial, token)
    },

    apagar: (id, token) => {
        return api.delete(`/estoque/material/${id}`, token)
    },


}