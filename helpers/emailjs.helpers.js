const emailjs = require("@emailjs/nodejs");
const { cfEmailjs } = require("../config/all.config");
const { generateToken, tokenFunction } = require("./jwt");
const { createLinkToVerify } = require("./createLink.helpers");

exports.mailJs = {
    async sendMail(username, email) {
        //   const { username, email } = req.body;
        const linkverf = await createLinkToVerify(username, email);
        // console.log(linkverf);
        const templateParams = {
            to_email: email,
            to_name: username,
            from_name: "Travel_guide",
            reply_to: email,
            message: linkverf,//await createLinkToVerify(username, email),
        };
        emailjs.init({
            publicKey: cfEmailjs.public_key,
        });

        emailjs
            .send(cfEmailjs.service_id, cfEmailjs.template_id, templateParams)
            .then(
                (response) => {
                    console.log("SUCCESS!", response.status, response.text);
                },
                (error) => {
                    console.log("FAILED...", error);
                }
            );
    },
};
