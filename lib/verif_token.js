const jwt = require('jsonwebtoken')

const rotasPermissivas = [
    {
        method: 'POST',
        baseUrl: '/usuario'
    }
]

module.exports = (req, res, next) => {
    // Lê o token passado no cabeçalho da requisição
    const token = req.headers['x-access-token']

    // Se o token não existir, retorna HTTP 403: Forbidden
    if(token) {
         // Verifica se o token é válido e está dentro do prazo de validade
        jwt.verify(token, process.env.TOKEN_SECRET, (erro, decodificado) => {
        
            // Token inválido/expirado
            if(erro) return res.status(403).send({
                auth: false,
                message: 'Falha ao autenticar o token'
            })

            // O TOKEN ESTÁ OK!

            // Salva o id na request para uso posterior
            req.infoLogado = decodificado

            // Chama a próxima função de middleware
            next()
        })
    }

    else{
        for(let rota of rotasPermissivas){
            if (req.baseUrl === rota.baseUrl && req.method === rota.method) 
            {
                // Deixa passar
                next()
                return
            }
        }

        // Senão, retorna um erro de falta de token
        return res.status(403).send({
        auth: false,
        message: 'Nenhum token fornecido'
        })
    }    
}



   
