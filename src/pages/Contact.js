import React from "react";
import ContactImage from "../assets/ContactLeftSide4.jpg";
import "../styles/Contact.css";

function Contact() {
  return (
    <div className="contact">
      <div
        className="leftSide"
        style={{ backgroundImage: `url(${ContactImage})` }}
      ></div>
      <div className="contact-separator"></div>
      <div className="rightSide">
        <div className="contact-label">Get In Touch</div>
        <h1>Contact <span>Us</span></h1>
        <p className="contact-intro">Have a question or want to place an order? We'd love to hear from you.</p>

        <form id="contact-form" method="POST">
          <div className="input-box">
            <label htmlFor="name">Full Name</label>
            <input name="name" placeholder="Enter your full name..." type="text" required />
          </div>

          <div className="input-box">
            <label htmlFor="email">Email Address</label>
            <input name="email" placeholder="Enter your email..." type="email" required />
          </div>

          <div className="input-box">
            <label htmlFor="message">Message</label>
            <textarea
              rows="6"
              placeholder="Write your message here..."
              name="message"
              required
            ></textarea>
          </div>

          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>
  );
}

export default Contact;