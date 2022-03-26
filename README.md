
# Birthday Admin

***construção do backend de uma aplicação para envio agendado de e-mails personalizados***  


o usuario se cadastra, realiza o login e adiciona lembretes com a data do aniversario junto com uma descrição 
de quem quer lembrar.  
Quando chegar naquela data, ele receberá um email personalizado alertando sobre o aniversario  
e com o horoscopo do dia para aquela pessoa.


## Apêndice

é possivel o envio pra gmail realizando a configuração do app na google cloud api.
O que já foi feito, caso queiram clonar o repositório, lembrem-se de configurar com as variaveis ambiente  
de acordo com sua própria configuração.


## Melhorias

***tasks finalizadas***  
- CRUD de usuarios e lembretes - ok
- autenticação de login e geração de token - ok
- agendamento do envio de emails - ok
- configuração de segurança Oauth2 pro gmail ok

***Em fase de desenvolvimento***  
- personalização de emails
- integração com api de horoscopo


## Stacks e libs utilizadas

* nodeJs (ES6)
* postgresql com prisma (ORM)
* node-cron (scheduler)
* nodemailer (envio de email)
* express
* jwt 
* googleapis
* dotenv e cors

