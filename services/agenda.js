import { api } from './config'


export default {

    listar: token =>{
        return api.get('/agenda/horario?page=0&size=100', token )
    },

    cadastrar: (CadHorario, token) =>{
        return api.post('/agenda/horario', CadHorario, token)
    },

    atualizar: (UpdHorario, id, token) => {
        return api.put(`/agenda/horario/${id}`, UpdHorario, token)
    },

    apagar: (Delmaterial, token) => {
        return api.delete(`/agenda/horario/${Delmaterial}`, token)
    },

}