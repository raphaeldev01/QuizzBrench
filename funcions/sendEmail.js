const nodemailer = require('nodemailer');

const SenderEmailForget = async(email, user, code) => {// Configuração do transporte SMTP para Gmail
const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    auth: {
        user: "88c774001@smtp-brevo.com",
        pass: "wtvMzScnDyK67AGQ",
    }
});

// Configuração do e-mail
const mailOptions = {
    from: 'quizzbranch@gmail.com',
    to: email,
    subject: 'Recuperação de Conta – Seu Código de Verificação ',
    text: `Olá, ${user}!

Recebemos uma solicitação para recuperar sua conta. Use o código abaixo para redefinir sua senha:

🔐 **Código de verificação: ${code}

Este código é válido por 10 minutos. Se você não solicitou esta recuperação, ignore este e-mail.

Atenciosamente,
Equipe QuizzBranch`
};

// Enviar e-mail
return await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return {error: true}
    } else {
        return { error: false, info}
    }
});
}

module.exports = {
    SenderEmailForget
}