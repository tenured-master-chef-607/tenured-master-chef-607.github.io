const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files (e.g., index.html)
app.use(express.static("public"));

// Route to handle form submission
app.post("/submit-feedback", async (req, res) => {
    const { name, email, event_date, feedback } = req.body;

    // Configure Nodemailer
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "your-email@gmail.com", // Replace with your Gmail
            pass: "your-email-password", // Replace with your Gmail password or app password
        },
    });

    const mailOptions = {
        from: email,
        to: "mypersonalemail@gmail.com", // Your personal email
        subject: `New Reservation Feedback from ${name}`,
        text: `You have received new feedback:
        
        Name: ${name}
        Email: ${email}
        Event Date: ${event_date}
        Feedback: ${feedback}
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.send("Feedback submitted successfully!");
    } catch (error) {
        console.error(error);
        res.status(500).send("There was an error sending your feedback. Please try again.");
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

