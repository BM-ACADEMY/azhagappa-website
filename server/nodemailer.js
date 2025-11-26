const nodemailer = require('nodemailer');

const sendMail = async (name, email, phone, university, course, message) => {
  // CONFIGURATION CHANGE: Using Port 465 with secure: true
  // This is more stable on cloud servers like Render than port 587
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465, 
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, 
    },
  });

  // 1. Email to the Owner (You)
  const ownerMailOptions = {
    from: `"Pravishraj Website" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER, 
    subject: "📬 New Enquiry Received",
    html: `
      <div style="font-family:sans-serif; border: 1px solid #eee; padding: 20px; border-radius: 8px;">
        <h2 style="color: #333;">New Enquiry Details</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Phone:</strong> <a href="tel:${phone}">${phone}</a></p>
        <p><strong>University:</strong> ${university}</p>
        <p><strong>Course:</strong> ${course}</p>
        <div style="background: #f9f9f9; padding: 15px; border-left: 4px solid #007bff; margin-top: 10px;">
          <strong>Message:</strong><br/>${message}
        </div>
      </div>
    `,
  };

  // 2. Auto-Reply Email to the User
  const userMailOptions = {
    from: `"Pravishraj Memorial Academy" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "✅ We received your enquiry",
    html: `
      <div style="font-family:sans-serif; padding: 20px;">
        <h3 style="color: #2c3e50;">Dear ${name},</h3>
        <p>Thank you for contacting <strong>Pravishraj Memorial Academy</strong>.</p>
        <p>We have received your enquiry regarding <strong>${course}</strong> at <strong>${university}</strong> University.</p>
        <p>Our team will review your details and contact you shortly at <strong>${phone}</strong>.</p>
        <br/>
        <p>Best regards,<br/><strong>The Admissions Team</strong></p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(ownerMailOptions);
    console.log("✔ Owner email sent");
    await transporter.sendMail(userMailOptions);
    console.log("✔ User auto-reply sent");
    return true;
  } catch (error) {
    console.error("❌ Nodemailer Error:", error);
    throw error;
  }
};

module.exports = sendMail;