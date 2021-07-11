import { api } from './config'


export default {

        criarUsuario: (cadUsuario, token) =>{
            return api.post('/criarUser', cadUsuario, token)
        },
    
        listarUsuario: (token) =>{
            return api.get('/usuarios', token )
        },


}