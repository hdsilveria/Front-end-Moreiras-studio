import { api } from './config'


export default {

    listar: (token) =>{
        return api.get('/agenda', token )
    },

    cadastrar: (CadHorario, token) =>{
        return api.post('/agenda/horario', CadHorario, token)
    },

    atualizar: (UpdHorario) => {
        return api.put('/agenda/horario', UpdHorario)
    },

    apagar: (Delmaterial) => {
        return api.delete('/agenda/horario', {data: Delmaterial})
    },

}