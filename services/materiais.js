import { api } from './config'


export default {

    listar: (token) =>{
        return api.get('/estoque', token )
    },

    login: (loginUser) =>{
        return api.post('/login', loginUser )
    },

    cadastrar: (CadMaterial, token) =>{
        return api.post('/inserirMaterial', CadMaterial, token)
    },

    atualizar: (UpdMaterial) => {
        return api.put('/alterarMaterial', UpdMaterial)
    },

    apagar: (Delmaterial) => {
        return api.delete('/deletarMaterial', {data: Delmaterial})
    }

}