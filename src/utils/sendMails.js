import nodemailer from 'nodemailer';
const sendMail = async (email, subject, text, html) => {
  const randomString =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);
  try {
    const trasnsporter = nodemailer.createTransport({
      host: 'elementx.online',
      port: 465,
      secure: true,
      auth: {
        user: 'test@elementx.online',
        pass: 'fallin211011',
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const sendMail = await trasnsporter.sendMail({
      from: "'elementX Server' <test@elementx.online>",
      to: email,
      subject: subject,
      html: contentHTML,
    });
    console.log(sendMail);
    res.send('success');
  } catch (error) {
    console.log(error);
  }
};
