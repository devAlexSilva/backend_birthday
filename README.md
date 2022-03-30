
# Birthday Admin

***construção do backend de uma aplicação para envio agendado de e-mails personalizados***  

o usuario se cadastra, realiza o login e adiciona lembretes com a data do aniversario junto com uma descrição
de quem quer lembrar.  
Quando chegar naquela data, ele receberá um email personalizado alertando sobre o aniversario  
e com o horoscopo do dia para aquela pessoa.

## Apêndice

é possivel o envio pra gmail realizando a configuração de autenticação OAuth.  
Nesse caso, fiz pela _Google Developers_ para gerar um refresh token.
o que é opcional, basta conferir a [documentação do noidemailer](https://nodemailer.com/smtp/oauth2/)

## Melhorias

***tasks finalizadas***  
- CRUD de usuarios e lembretes - ok
- autenticação de login e geração de token - ok
- agendamento do envio de emails - ok
- configuração de segurança Oauth2 pro gmail ok
- coleta de dados em sites de horoscopo

***Em fase de desenvolvimento***  
- personalização de emails
- testes integrado com frontend

## Stacks e libs utilizadas

* nodeJs (ES6 modules)
* express
* postgresql com prisma
* jwt
* OAuth2
* node-cron (scheduler)
* nodemailer (envio de email)
* puppeteer
* dotenv e cors