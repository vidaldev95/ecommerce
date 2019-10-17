const transporter = require("nodemailer").createTransport(require("../config/email"));
const { root: link } = require("../config/index");

module.exports = ({ usuario, recovery }, cb) => {
    const message = `
        <h1 style="text-align: center;">Recuperação de senha</h1>
        <br />
        <p>Acesse este link para redefinir sua senha.</p>
        <a href="${link}/v1/api/usuarios/senha-recuperada?token=${recovery.token}">
            ${link}/v1/api/usuarios/senha-recuperada?token=${recovery.token}
        </a>
        <br /> <br /><hr />
        <p>
            Obs: Se você não solicitou a redefinição, apenas ignore esse email.
        </p>
        <p>Atenciosamente, Equipe E-commerce</p>
    `;

    const opcoesEmail = {
        from: "naoresponda@ecommerce.teste.com",
        to: usuario.email,
        subject: "Redefinição de senha - Ecommerce",
        html: message
    };

    if( process.env.NODE_ENV === "production" ){
        transporter.sendMail(opcoesEmail, (error, info) => {
            if(error){
                console.log(error);
                return cb("Aconteceu um erro no envio do email, tente novamente.");
            } else {
                return cb(null, "Link para redefinição de senha foi enviado com sucesso para seu email.");
            }
        });
    } else {
        console.log(opcoesEmail);
        return cb(null, "Link para redefinição de senha foi enviado com sucesso para seu email");
    }
}