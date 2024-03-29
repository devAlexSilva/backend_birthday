//middleware para controlar acesso nas rotas com auth

import jwt from 'jsonwebtoken'

export const middleware = (req, res, next) => {

    const  auth  = req.headers.authorization;

    if(!auth) return res.status(498).json({message: 'token ausente'});

    const token = auth.replace('Bearer ', '');

    jwt.verify(token, process.env.AUTH_CONFIG, (err, decoded)=>{
        if(err) return res.status(406).json({message: 'token incompativel'});
        
        next();
        
    });

}