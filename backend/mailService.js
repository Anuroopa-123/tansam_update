const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.hostinger.com',
  port: 465, // Use 587 if you're not using SSL
  secure: true, // true for 465, false for 587
  auth: {
    user: 'contact@tansam.org',   // Your Hostinger email
    pass: '=35;ssWv'                      // Use your actual password or app password
  }
});

async function sendInternshipEmail(data) {
  const mailOptions = {
    from: '"Internship Form" <contact@tansam.org>',
    to: 'contact@tansam.org', // Receiving email
    cc: ['hr@tansam.org', 'hannahrr@tansam.org','nateshc@tansam.org'],
    subject: 'New Internship Application',
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <div style="background-color:rgb(151, 195, 243); color: #ffffff; padding: 20px;">
            <h2 style="margin: 0;">Internship Application</h2>
          </div>
          <div style="padding: 20px;">
            <p><strong>Name:</strong> ${data.fullName}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Contact:</strong> ${data.contactNumber}</p>
            <p><strong>College:</strong> ${data.collegeName}</p>
            <p><strong>Start Date:</strong> ${data.startDate}</p>
            <p><strong>End Date:</strong> ${data.endDate}</p>
            <p><strong>Duration:</strong> ${data.duration}</p>
            <p><strong>Course:</strong> ${data.course}</p>
            <p><strong>Referred By:</strong> ${data.referredBy || 'N/A'}</p>
          </div>
          <div style="background-color: #f1f1f1; padding: 15px; text-align: center; font-size: 12px; color: #888;">
            © ${new Date().getFullYear()} TANSAM. All rights reserved.
          </div>
        </div>
      </div>
    `
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}


async function sendContactMessage(data) {
  const mailOptions = {
    from: '"Contact Form" <contact@tansam.org>',
    to: 'contact@tansam.org',
    cc: ['hr@tansam.org'],
    subject: 'New Contact Message',
    html: `
      <div style="font-family: Arial; padding: 20px;">
        <h3>New Contact Message</h3>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Message:</strong></p>
        <p>${data.message.replace(/\n/g, '<br>')}</p>
      </div>
    `
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Contact email sent:', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending contact email:', error);
    throw error;
  }
}

async function sendFeedbackEmail(data) {
  const mailOptions = {
    from: '"Feedback Form" <contact@tansam.org>',
    to: 'contact@tansam.org',
    cc: ['hr@tansam.org'],
    subject: 'New Visitor Feedback',
    html: `
      <div style="font-family: Arial; padding: 20px;">
        <h2>Visitor Feedback</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Designation:</strong> ${data.designation}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Visit Purpose:</strong> ${data.visitPurpose}</p>
        <p><strong>Rating:</strong> ${data.rating} / 5</p>
        <p><strong>Message:</strong><br>${data.message.replace(/\n/g, '<br>')}</p>
      </div>
    `
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Feedback email sent:', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending feedback email:', error);
    throw error;
  }
}

module.exports = { sendInternshipEmail, sendContactMessage, sendFeedbackEmail };
