import * as handlebars from "handlebars";
import {welcomeTemplate} from "@/mailer/welcome";
import nodemailer from "nodemailer";


const email=process.env.EMAIL;
const pass=process.env.EMAIL_PASS;

const transporter = nodemailer.createTransport({
    service:"gmail",
    auth: {
        user: email,
        pass: pass,
    },
});
export const MyMailer =async (name,to,subject)=>{
    try{
        const htmlBody = await compileMailTemplate(name,"https://kk-pf.netlify.app/");

        const info =await transporter.sendMail({
            from:`"doFoodies" <${email}>`,
            to,
            subject,
            html: htmlBody,
        });
        console.log(info.messageId);


    }
    catch (e) {
        console.log(e);

    }
}
export async function compileMailTemplate(name,urlLink){
    const template=handlebars.compile(welcomeTemplate);
    const htmlBody=template({
        name:name,
        url:urlLink,
    });
    return htmlBody;
}