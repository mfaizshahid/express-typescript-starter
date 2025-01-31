import { env } from '@src/config';
import type { IAuth } from '@src/interfaces';

const userRegisteredTemplate = (
  payload: IAuth.UserRegisteredTemplatePayload,
) => {
  return `
        <!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Your Email to Get Started 🚀</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            text-align: center;
        }

        .container {
            max-width: 900px;
            background-color: #ffffff;
            padding: 20px;
            margin: 40px auto;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        h2 {
            color: #333;
        }

        p {
            color: #555;
            font-size: 16px;
            line-height: 1.5;
        }

        .btn {
            display: inline-block;
            padding: 12px 24px;
            background-color: #007bff;
            color: #ffffff !important;
            text-decoration: none;
            border-radius: 6px;
            font-size: 16px;
            font-weight: bold;
            margin-top: 20px;
        }

        .btn:hover {
            background-color: #0056b3;
        }

        .footer {
            margin-top: 20px;
            font-size: 12px;
            color: #777;
        }
    </style>
</head>

<body>
    <div class="container">
        <h2>Dear ${payload.username}, Welcome to ${env.siteTitle} 🎉</h2>
        <p>You're almost there! Click the button below to verify your email and activate your account.</p>
        <a href="${payload.link}" class="btn">Verify My Email</a>
        <p>If the button above doesn't work, copy and paste the following link into your browser:</p>
        <p>${payload.link}</p>
        <p><strong>This link will expire in ${payload.expiryTime}, so be sure to verify soon!</strong></p>
        <p class="footer">If you did not sign up for this account, you can ignore this email.</p>
    </div>
</body>

</html>
    `;
};

export default { userRegisteredTemplate };
