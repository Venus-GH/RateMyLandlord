import React, { useState } from "react";
import emailjs from "emailjs-com";

import { init } from "emailjs-com";
init("user_oZWm5y7fvI9ZzqhF6DKxk");

const ContactForm = (props) => {
  const { to_email, reply_to } = props;
  const [sent, updateSent] = useState(false);
  console.log("state", sent);

  function sendEmail(e) {
    e.preventDefault();
    updateSent(true);

    emailjs.sendForm("service_4jzje77", "template_n15gkp6", e.target).then(
      (result) => {
        console.log(result.text);
      },
      (error) => {
        console.log(error.text);
      }
    );
  }

  return sent === true ? (
    <p>Your message has been sent!</p>
  ) : (
    <form className="contact-form" onSubmit={sendEmail}>
      <input type="hidden" name="to_email" value={to_email} />
      <input type="hidden" name="reply_to" value={reply_to} />
      <input type="text" name="from_name" placeholder="Your name" />
      <textarea
        name="message"
        placeholder="E.g. Hi there, I'm wondering if you'd be willing to chat with me about this property. I think they've illegally raised the rent!"
      />
      <label>Message</label>
      <input type="submit" value="Send" />
    </form>
  );
};

export default ContactForm;
