import { api } from './config'


export default {

    listar: (token) =>{
        return api.get('/estoque', token )
    },

    login: (loginUser) =>{
        return api.post('/login', loginUser )
    },

    cadastrar: (CadMaterial, token) =>{
        return api.post('/estoque/material', CadMaterial, token)
    },

    atualizar: (UpdMaterial, token) => {
        return api.put('/estoque/material', UpdMaterial, token)
    },

    apagar: (Delmaterial, token) => {
        return api.delete('/estoque/material', {data: Delmaterial}, token)
    },


}