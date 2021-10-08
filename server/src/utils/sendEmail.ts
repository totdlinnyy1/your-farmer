import nodemailer from "nodemailer";

export async function sendEmail(to: string, html: string) {
  const transporter = nodemailer.createTransport({
    host: "smtp.jino.ru",
    port: 465,
    secure: true,
    auth: {
      user: "noreply@my-farmer-dev.ru",
      pass: "7Vf(JxjB&#Fa",
    },
  });

  try {
    await transporter.sendMail({
      from: '"Твой фермер!" <noreply@my-farmer-dev.ru>',
      to,
      subject: "Подтвердите, пожалуйста, почту",
      html,
    });
  } catch (e) {
    console.log(e);
  }
}
