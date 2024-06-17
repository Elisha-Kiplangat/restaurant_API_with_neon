"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
require("dotenv/config");
const ejs_1 = __importDefault(require("ejs"));
const path_1 = __importDefault(require("path"));
const mailFunction = async (to, subject, user) => {
    const transporter = nodemailer_1.default.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });
    const sendMail = async (user) => {
        try {
            // Path to the EJS template
            const template = path_1.default.join(__dirname, '../ejs', 'index.ejs');
            // Render the EJS template with the user data
            const content = await ejs_1.default.renderFile(template, { user });
            const mailOption = {
                from: process.env.EMAIL,
                to,
                subject,
                html: content
            };
            transporter.sendMail(mailOption, function (err, info) {
                if (err) {
                    console.error('Error sending email:', err);
                }
                else {
                    console.log('Email sent:', info.response);
                }
            });
        }
        catch (error) {
            console.error('Error rendering email template:', error);
        }
    };
    sendMail(user);
};
exports.default = mailFunction;
