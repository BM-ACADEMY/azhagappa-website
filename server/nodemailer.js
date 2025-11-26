const nodemailer = require('nodemailer');

const sendMail = async (name, email, phone, university, course, message) => {
 const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  }
});


  const ownerMailOptions = {
    from: `"Pravishraj Memorial Academy" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER,
    subject: "📬 New Enquiry Received",
    html: `
      <div style="font-family:sans-serif">
        <h2>New Enquiry</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>University:</strong> ${university}</p>
        <p><strong>Courses:</strong> ${course}</p>
        <p><strong>Message:</strong><br/>${message}</p>
        <hr/>
        <p>— Sent via Website Enquiry Form</p>
      </div>
    `,
  };

  const userMailOptions = {
    from: `"Pravishraj Memorial Academy" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "✅ Thank You for Your Enquiry!",
    html: `
      <div style="font-family:sans-serif">
        <p>Dear ${name},</p>
        <p>Thanks for contacting us! We’ve received your enquiry and will respond shortly.</p>
        <h4>Your Submitted Details:</h4>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>University:</strong> ${university}</p>
        <p><strong>Courses:</strong> ${course}</p>
        <p><strong>Message:</strong> ${message}</p>
        <br/>
        <p>Best regards,<br/><strong>Pravishraj Memorial Academy</strong></p>
      </div>
    `,
  };

  await transporter.sendMail(ownerMailOptions);
  await transporter.sendMail(userMailOptions);

  console.log("✔ Emails sent successfully");
};

module.exports = sendMail;