const nodemailer = require("nodemailer"); 
const MailSender = async (email,title , body)=>{
 try{

  require("dotenv").config();
   let transporter = nodemailer.createTransport({
    // host:process.env.HOST,
    service:"Gmail",
    auth:{
      user:'notionstudy566@gmail.com', 
      pass:'pnuikthpxgangtpm'
    }

   })
   
   let info = await transporter.sendMail({
    to: `${email}`, 
    from:`StudyNotion - Karan Sehgal`, 
    subject:`${title}`, 
    html : `${body}`
   }); 
   return info;
 }
 catch(err){
  console.log(err); 
 }
}
module.exports = MailSender; 