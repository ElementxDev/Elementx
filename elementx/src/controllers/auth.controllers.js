import nodemailer from 'nodemailer';
import { Buffer } from 'buffer';
import { User, Order } from '../models';
import { userSchema, loginUserSchema } from '../libs/schema.validator';
import {
  EMAIL_HOST,
  EMAIL_PORT,
  EMAIL_USER,
  EMAIL_PASSWORD,
  ELEMENTX_LOCAL_HOME_PAGE,
} from '../config';
import createError from 'http-errors';
import { signAccessToken } from '../helpers/signAccessToken';

export const login = async (req, res, next) => {
  try {
    const result = await loginUserSchema.validateAsync(req.body);
    console.log(result);
    const userFound = await User.findOne({
      email: result.email,
    });

    if (!userFound) throw createError.Unauthorized('The user does not exists');

    const isMatch = await userFound.validPassword(result.password);

    if (!isMatch)
      throw createError.Unauthorized(
        'No pudimos encontrar una cuenta con esa dirección de correo electrónico o contraseña.'
      );

    const token = await signAccessToken(
      userFound.id,
      userFound.isAdmin,
      userFound.isRoot,
      userFound.isUser
    );

    res.json({ token });
  } catch (error) {
    if (error.isJoi) error.status = 400;
    next(error);
  }
};

export const register = async (req, res, next) => {
  try {
    const result = await userSchema.validateAsync(req.body);
    const userFound = await User.findOne({
      email: result.email,
    });

    if (userFound) throw createError.Conflict('The user already exists');

    const buff = Buffer.from(result.email);
    let base64data = buff.toString('base64');

    const verifyCode = Math.round(Math.random() * 9000);
    const user = new User({
      name: result.name,
      surname: result.surname,
      email: result.email,
      phone: result.phone,
      password: result.password,
      birthday: result.birthday,
      province: result.province,
      verifyCode,
    });
    user.password = await user.generateHash(user.password);

    const userSaved = await user.save();
    const token = await signAccessToken(
      userSaved.id,
      userSaved.isAdmin,
      userSaved.isRoot,
      userSaved.isUser
    );
    console.log();
    const contentHTML = `
      <!DOCTYPE html>
    <html>

    <head>
        <title></title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <style type="text/css">
            @media screen {
                @font-face {
                    font-family: 'Lato';
                    font-style: normal;
                    font-weight: 400;
                    src: local('Lato Regular'), local('Lato-Regular'), url(https://fonts.gstatic.com/s/lato/v11/qIIYRU-oROkIk8vfvxw6QvesZW2xOQ-xsNqO47m55DA.woff) format('woff');
                }

                @font-face {
                    font-family: 'Lato';
                    font-style: normal;
                    font-weight: 700;
                    src: local('Lato Bold'), local('Lato-Bold'), url(https://fonts.gstatic.com/s/lato/v11/qdgUG4U09HnJwhYI-uK18wLUuEpTyoUstqEm5AMlJo4.woff) format('woff');
                }

                @font-face {
                    font-family: 'Lato';
                    font-style: italic;
                    font-weight: 400;
                    src: local('Lato Italic'), local('Lato-Italic'), url(https://fonts.gstatic.com/s/lato/v11/RYyZNoeFgb0l7W3Vu1aSWOvvDin1pK8aKteLpeZ5c0A.woff) format('woff');
                }

                @font-face {
                    font-family: 'Lato';
                    font-style: italic;
                    font-weight: 700;
                    src: local('Lato Bold Italic'), local('Lato-BoldItalic'), url(https://fonts.gstatic.com/s/lato/v11/HkF_qI1x_noxlxhrhMQYELO3LdcAZYWl9Si6vvxL-qU.woff) format('woff');
                }
            }

            /* CLIENT-SPECIFIC STYLES */
            body,
            table,
            td,
            a {
                -webkit-text-size-adjust: 100%;
                -ms-text-size-adjust: 100%;
            }

            table,
            td {
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
            }

            img {
                -ms-interpolation-mode: bicubic;
            }

            /* RESET STYLES */
            img {
                border: 0;
                height: auto;
                line-height: 100%;
                outline: none;
                text-decoration: none;
            }

            table {
                border-collapse: collapse !important;
            }

            body {
                height: 100% !important;
                margin: 0 !important;
                padding: 0 !important;
                width: 100% !important;
            }

            /* iOS BLUE LINKS */
            a[x-apple-data-detectors] {
                color: inherit !important;
                text-decoration: none !important;
                font-size: inherit !important;
                font-family: inherit !important;
                font-weight: inherit !important;
                line-height: inherit !important;
            }

            /* MOBILE STYLES */
            @media screen and (max-width:600px) {
                h1 {
                    font-size: 32px !important;
                    line-height: 32px !important;
                }
            }

            /* ANDROID CENTER FIX */
            div[style*="margin: 16px 0;"] {
                margin: 0 !important;
            }
        </style>
    </head>

    <body style="background-color: #f4f4f4; margin: 0 !important; padding: 0 !important;">
        <!-- HIDDEN PREHEADER TEXT -->
        <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: 'Lato', Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">Te damos la bienvenida a Elementx
        </div>
        <table border="0" cellpadding="0" cellspacing="0" width="100%">
            <!-- LOGO -->
            <tr>
                <td bgcolor="#FFA73B" align="center">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                        <tr>
                            <td align="center" valign="top" style="padding: 40px 10px 40px 10px;"> </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr>
                <td bgcolor="#FFA73B" align="center" style="padding: 0px 10px 0px 10px;">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                        <tr>
                            <td bgcolor="#ffffff" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;">
                                <h1 style="font-size: 48px; font-weight: 400; margin: 2;">Hola!</h1> <img src="https://res.cloudinary.com/dpqen1i4f/image/upload/v1657068587/Logo_Elementx_Online_Negro_kzz93o.png" width="125" height="120" style="display: block; border: 0px;" />
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr>
                <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                        <tr>
                            <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 40px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                <p style="margin: 0;">Estamos emocionados de que comiences. Primero, necesitas confirmar tu cuenta. Simplemente presione el botón de abajo.</p>
                            </td>
                        </tr>
                        <tr>
                            <td bgcolor="#ffffff" align="left">
                                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                    <tr>
                                        <td bgcolor="#ffffff" align="center" style="padding: 20px 30px 60px 30px;">
                                            <table border="0" cellspacing="0" cellpadding="0">
                                                <tr>
                                                    <td align="center" style="border-radius: 3px;" bgcolor="#FFA73B">
                                                    <a href="${ELEMENTX_LOCAL_HOME_PAGE}/auth/verify?user=${base64data}&fallin21=${
      userSaved._id
    }&verify=${
      userSaved.verifyCode
    }" target="_blank" style="font-size: 20px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; color: #ffffff; text-decoration: none; padding: 15px 25px; border-radius: 2px; border: 1px solid #FFA73B; display: inline-block;">Confirmar cuenta</a></td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr> <!-- COPY -->
                        <tr>
                            <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 0px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                <p style="margin: 0;">Si eso no funciona, copie y pegue el siguiente enlace en su navegador:
                                <a href="${ELEMENTX_LOCAL_HOME_PAGE}/auth/verify?user=${base64data}&fallin21=${
      userSaved._id
    }&verify=${
      userSaved.verifyCode
    }" target="_blank" style="color:#ffa73b;">${ELEMENTX_LOCAL_HOME_PAGE}/auth/verify?user=${base64data}&fallin21=${
      userSaved._id
    }&verify=${userSaved.verifyCode}</a></p>
                            </td>
                        </tr> <!-- COPY -->
                        <tr>
                            <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                <p style="margin: 0;"><a href="${ELEMENTX_LOCAL_HOME_PAGE}/auth/verify?user=${base64data}&fallin21=${
      userSaved._id
    }&verify=${userSaved.verifyCode}"</a></p>
                            </td>
                        </tr>
                        <tr>
                            <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                <p style="margin: 0;">Si tiene alguna pregunta, simplemente responda a este correo electrónico; siempre estaremos encantados de ayudarle.</p>
                            </td>
                        </tr>
                        <tr>
                            <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 40px 30px; border-radius: 0px 0px 4px 4px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                <p style="margin: 0;">Saludo,<br>Elementx Team</p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr>
                <td bgcolor="#f4f4f4" align="center" style="padding: 30px 10px 0px 10px;">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                        <tr>
                            <td bgcolor="#FFECD1" align="center" style="padding: 30px 30px 30px 30px; border-radius: 4px 4px 4px 4px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                <h2 style="font-size: 20px; font-weight: 400; color: #111111; margin: 0;">Necesitas más ayuda??</h2>
                                <p style="margin: 0;"><a href="" target="_blank" style="color: #FFA73B;">Estamos aquí para ayudarte.</a></p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr>
                <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                        <tr>
                            <td bgcolor="#f4f4f4" align="left" style="padding: 0px 30px 30px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 18px;"> <br>
                                <p style="margin: 0;">© ${new Date().getFullYear()} ElementX. All rights reserved.</p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>

    </html>
      `;

    const trasnsporter = nodemailer.createTransport({
      host: EMAIL_HOST,
      port: EMAIL_PORT,
      secure: true,
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const sendMail = await trasnsporter.sendMail({
      from: "'elementX Team' <support@elementx.online>",
      to: result.email,
      subject: 'Confirmation Email',
      html: contentHTML,
    });

    console.log(sendMail);

    res.json({ token });
  } catch (error) {
    console.log(error);
    if (error.isJoi) error.status = 400;
    next(error);
  }
};

export const addAdmin = async (req, res, next) => {
  console.log(req.body);
  try {
    const result = await userSchema.validateAsync(req.body);
    const userFound = await User.findOne({
      email: result.email,
    });

    if (userFound) throw createError.Conflict('The user already exists');

    const verifyCode = Math.round(Math.random() * 9000);
    const user = new User({
      name: result.name,
      surname: result.surname,
      email: result.email,
      phone: result.phone,
      password: result.password,
      birthday: result.birthday,
      province: result.province,
      verifyCode,
    });
    user.password = await user.generateHash(user.password);

    const userSaved = await user.save();
    const token = await signAccessToken(
      userSaved.id,
      userSaved.isAdmin,
      userSaved.isRoot,
      userSaved.isUser
    );

    res.status(201);
  } catch (error) {
    console.log(error);
    if (error.isJoi) error.status = 400;
    next(error);
  }
};
export const profile = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.userId }).select('-password');

    if (!user) return res.status(401).json({ message: 'User not found' });

    res.json(user);
  } catch (error) {
    console.log(error);
    if (error.isJoi) error.status = 400;
    next(error);
  }
};

export const verifyUser = async (req, res, next) => {
  try {
    let id = req.query.user.split('fallin21')[1];
    let code = req.query.verify;

    if (user.verifyCode === Number(code)) {
      await User.findByIdAndUpdate(
        id,
        { $set: { verifyCode: '' }, verified: true },
        { new: true }
      );
      res.json({ message: true });
    } else {
      res.json('token no valido');
    }
  } catch (error) {
    console.log(error);
    if (error.isJoi) error.status = 400;
    next(error);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({}).populate('orders');
    res.json(users);
  } catch (error) {
    console.log(error);
    if (error.isJoi) error.status = 400;
    next(error);
  }
};
