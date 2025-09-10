function Contact() {
  return (
    <>
      <section className="contact-page" style={{ padding: 24 }}>
        <h1>Contact</h1>
        <p>Need additional information? Reach out via phone or email.</p>
        <ul>
          <li>(123) 456-7869</li>
          <li>carrental@xyz.com</li>
          <li>Bengaluru, Karnataka</li>
        </ul>
        <form onSubmit={(e) => e.preventDefault()} style={{ marginTop: 16 }}>
          <label>Full Name *</label>
          <input type="text" placeholder='E.g: "Joe Shmoe"' />
          <label>Email *</label>
          <input type="email" placeholder="youremail@example.com" />
          <label>Tell us about it *</label>
          <textarea placeholder="Write Here.." />
          <button type="submit">Send Message</button>
        </form>
      </section>
    </>
  );
}

export default Contact;
