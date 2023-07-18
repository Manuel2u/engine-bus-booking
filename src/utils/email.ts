import formData from "form-data";
import Mailgun from "mailgun.js";
const mailgun = new Mailgun(formData);
import { config } from "../config/index";

const batman = mailgun.client({
  username: config.mail.username,
  key: config.mail.key,
});

interface Imessage {
  text: string;
  html: string;
}

async function sendEmail(email: string, subject: string, message: Imessage) {
  try {
    const response = await batman.messages.create(config.mail.domain, {
      from: `${config.app.name} <no-reply@${config.mail.domain}>`,
      to: [email],
      subject: subject,
      text: message.text,
      html: message.html,
    });

    console.log(response); // logs response data
  } catch (error) {
    console.log(error); // logs any error
    throw error;
  }
}

export {sendEmail};

// sendEmail("emmanueldodoo94@gmail.com", "Hello", {
//   text: "Hello",
//   html: "<h1>Hello</h1>",
// });
