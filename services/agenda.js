import { api } from './config'


export default {

    listar: (token) =>{
        return api.get('/horarios', token )
    },

    cadastrar: (CadMaterial, token) =>{
        return api.post('/inserirHorario', CadMaterial, token)
    },

    atualizar: (UpdMaterial) => {
        return api.put('/alterarHorario', UpdMaterial)
    },

    apagar: (Delmaterial) => {
        return api.delete('/deletarHorario', {data: Delmaterial})
    },

}