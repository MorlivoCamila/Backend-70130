const nodemailer        = require('nodemailer')
const { configObject }  = require('../config')

const transport = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth:{
        user: configObject.gmail_user,
        pass: configObject.gmail_pass
    }
})   

exports.sendEmail = async ({userClient, subject, html}) => {
    try {  

        let result = await transport.sendMail({
            from: `Camila Morlivo <${configObject.gmail_user}`,
            to: userClient,
            subject: subject,
            html,
            attachments: []
        })

    } catch (error) {
        console.log(error);
        
    }
    
}