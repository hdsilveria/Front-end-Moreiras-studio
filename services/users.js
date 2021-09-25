import { api } from './config'


export default {

        criarUsuario: (cadUsuario, token) =>{
            return api.post('/users/createUser', cadUsuario, token)
        },
    
        listarUsuario: (token) =>{
            return api.get('/users', token )
        },

        apagar: (delUser, token) => {
            return api.delete('/users/deleteUser', {data: delUser}, token)
        },


}