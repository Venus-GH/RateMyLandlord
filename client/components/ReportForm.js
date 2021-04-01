import React, { useState } from "react";
import emailjs from "emailjs-com";

import { init } from "emailjs-com";
init("user_oZWm5y7fvI9ZzqhF6DKxk");

const ReportForm = (props) => {
  const { reply_to } = props;
  const [sent, updateSent] = useState(false);

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
      <input type="hidden" name="reply_to" value={reply_to} />
      <input type="text" name="from_name" placeholder="Your name" />
      <textarea
        name="message"
        placeholder="Write your message here! (e.g. Hi there, I see an issue with this report...)"
      />
      <button className="btn-small" type="submit" value="Send">
        Send
      </button>
    </form>
  );
};

export default ReportForm;
