import React, { useState } from "react";
import emailjs, { init } from "emailjs-com";

init("user_oZWm5y7fvI9ZzqhF6DKxk");

const ContactForm = (props) => {
  const { to_email, reply_to } = props;
  const [sent, updateSent] = useState(false);
  console.log("state", sent);

  function sendEmail(e) {
    e.preventDefault();
    updateSent(true);

    emailjs.sendForm("service_4jzje77", "template_k20x2qk", e.target).then(
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
        placeholder="Write your message here! (e.g. Hi there, I'm wondering if you'd be willing to chat with me about this property. I think they've illegally raised the rent!)"
      />
      <button className="btn-small" type="submit" value="Send">
        Send
      </button>
    </form>
  );
};

export default ContactForm;
