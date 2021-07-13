import { api } from './config'


export default {

    listar: (token) =>{
        return api.get('/horarios', token )
    },

    cadastrar: (CadHorario, token) =>{
        return api.post('/inserirHorario', CadHorario, token)
    },

    atualizar: (UpdHorario) => {
        return api.put('/alterarHorario', UpdHorario)
    },

    apagar: (Delmaterial) => {
        return api.delete('/deletarHorario', {data: Delmaterial})
    },

}