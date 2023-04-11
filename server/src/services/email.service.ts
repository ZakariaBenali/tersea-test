import nodemailer from 'nodemailer';

export class MailService {
	private transporter: nodemailer.Transporter;

	constructor() {
		this.transporter = nodemailer.createTransport({
			host: 'sandbox.smtp.mailtrap.io',
			port: 2525,
			auth: {
				user: '6f3420aa3f8efd',
				pass: 'bff5712ba1baa0',
			},
		});
	}

	async sendEmail(from: string, to: string, subject: string, html: string) {
		const mailOptions = {
			from,
			to,
			subject,
			html,
		};

		return await this.transporter.sendMail(mailOptions, function (error, info) {
			if (error) {
				console.log(error);
			} else {
				console.log('Email sent: ' + info.response);
			}
		});
	}
}
