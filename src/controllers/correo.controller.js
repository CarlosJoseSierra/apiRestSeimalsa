import { getConnection, querys, sql } from "../database";
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    /**
     * Para utilizar otro servicio de correo electrónico, como Yahoo o Outlook, debes
     * cambiar el valor de la propiedad service y ajustar la configuración de autenticación correspondiente.
     */
    service: "gmail",
        host: 'smtp.gmail.com', // Your SMTP server hostname
        port: 587,                 // Typically port 587 for SMTP with STARTTLS
        secure: false,  
        auth: {
            user: "requerimientosseimalsa@gmail.com",
            pass: "pawk xskk oriv yruu",
    },
  });

export const EnviarCorreo = async (req, res) => {
    const {asunto, mensaje } = req.body;
   
    const mailOptions = {
        from: "requerimientosseimalsa@gmail.com",
        to: "csierra.ace@gmail.com",
        subject: asunto,
        text: mensaje,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return res.status(400).json({ status: "400", msg: error.message ,token:0});
        } else {
            return res.json({status: "ok", msg: "Correo Enviado",token:0});
        }
      }); 
};
