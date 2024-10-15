// app.js or server.js
const nodemailer = require('nodemailer');
const fs = require('fs');

// Function to submit job application
const submit_job_application = async (req, res) => {
  try {
    const { fullName, email, position } = req.body;
    const resume = req.file;

    // Validate required fields
    if (!fullName || !email || !position || !resume) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Create a transporter object using SMTP transport
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST, // e.g., 'smtp.gmail.com'
      port: process.env.EMAIL_PORT, // e.g., 587
      secure: process.env.EMAIL_PORT == 465, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS, // Your email password or app password
      },
    });

    // Verify connection configuration
    await transporter.verify();

    // Read the resume file
    const resumePath = path.join(__dirname, resume.path);
    const resumeContent = fs.readFileSync(resumePath);

    // Set up email data
    const mailOptions = {
      from: `"${fullName}" <${email}>`, // Sender address
      to: process.env.HR_EMAIL, // HR's email address
      subject: `New Job Application for ${position}`, // Subject line
      text: `You have received a new job application.\n\nName: ${fullName}\nEmail: ${email}\nPosition: ${position}`, // Plain text body
      attachments: [
        {
          filename: resume.originalname,
          content: resumeContent,
          contentType: resume.mimetype,
        },
      ],
    };

    // Send mail with defined transport object
    const info = await transporter.sendMail(mailOptions);

    console.log('Message sent: %s', info.messageId);

    // Optionally, delete the resume file after sending
    fs.unlinkSync(resumePath);

    // Respond with success
    res.status(200).json({ message: 'Application submitted successfully.' });
  } catch (error) {
    console.error("Error submitting application", error);
    res.status(500).json({
      message: "Failed to submit application",
      error: error.message,
    });
  }
};


const get_practice_area_data = async (req, res) => {
  try {
    res.render('practiceArea/practice_area_data', { "areaName": "area" });
  } catch (error) {
    console.error("Error saving blog:", error);
    res.status(500).json({
      message: "Failed to create blog",
      error,
    });
  }
};


module.exports = {
  get_practice_area_data,
  submit_job_application
};