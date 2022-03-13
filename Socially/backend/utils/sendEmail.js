const nodemailer = require('nodemailer');

const trans =  nodemailer.createTransport({
    service:"Gmail",
    auth:{
        user:"harshitrathi200105@gmail.com",
        pass:"kwjoyehfmxzzzugo"
    }
});

module.exports.sendVerificationEmail = async (email, token) => {

    const url = `${process.env.FRONTEND_URL}/user/verifyEmail?token=${token}`;

    await trans.sendMail({
        from: "Email",
        to: email,
        subject: "Verify Your Account",
        text: `Click This Link To Verify Your Account : ${url}`,
    });

}

module.exports.sendForgetPasswordMail = async (email, token) => {
    const url = `${process.env.FRONTEND_URL}/password/reset/${token}`;
    console.log(url);

    await trans.sendMail({
        from:"Email",
        to:email,
        subject:"Forget Password",
        text:`Click This Link To Verify Your Account : ${url}`,
    })
}