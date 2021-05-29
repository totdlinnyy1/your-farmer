import nodemailer from 'nodemailer'

export async function sendEmail(to: string, html: string) {
	let transporter = nodemailer.createTransport({
		host: 'smtp.ethereal.email',
		port: 587,
		secure: false,
		auth: {
			user: 'x4s43akpjpc55xtz@ethereal.email',
			pass: '8Z9sfqGTaUmRHD87hw'
		}
	})

	let info = await transporter.sendMail({
		from: '"Fred Foo 👻" <foo@example.com>',
		to,
		subject: 'Подтвердите почту',
		html
	})

	console.log('Message sent: %s', info.messageId)

	console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
}
