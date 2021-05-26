import { api } from './config'

export default {

    listar: () =>{
        return api.get('/estoque')
    },

    cadastrar: (CadMaterial) =>{
        return api.post('/inserirMaterial', CadMaterial)
    },

    atualizar: (UpdMaterial) => {
        return api.put('/alterarMaterial', UpdMaterial)
    },

    apagar: (Delmaterial) => {
        return api.delete('/deletarMaterial', {data: Delmaterial})
    }

}