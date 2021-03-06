import { api } from './config'


export default {

    criarUsuario: (cadUsuario, token) =>{
        return api.post('/users/createUser', cadUsuario, token)
    },

    listarUsuario: token =>{
        return api.get('/users', token )
    },

    apagar: (id, token) => {
        return api.delete(`/users/${id}`, token)
    },

    encontrarEmail: email => {
        return api.post('/recuperarSenha/email', email)
    },
    
    alterarSenha: user => {
        return api.post('/recuperarSenha/changPassword', user)
    }

}