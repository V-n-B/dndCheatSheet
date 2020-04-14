import AWS from 'aws-sdk';

export async function sendRegistrationMail(customerEmail: string, verificationToken: string) {
    const mailParams = getMailParams(customerEmail, verificationToken);
    await new AWS.SES({ apiVersion: '2010-12-01' })
        .sendEmail(mailParams)
        .promise();
}

function getMailParams(customerEmail: string, verificationToken: string) {
    return {
        Destination: {
            ToAddresses: [
                'victor_panteleev@hotmail.com',
                // customerEmail,
            ],
        },
        Message: {
            Body: {
                Html: {
                    Charset: 'UTF-8',
                    Data: `
                        <h1>DnD Cheatsheet</h1>
                        <br />
                        <br />
                        <br />
                        <h3>You're almost there!</h3>
                        <p>
                            Click the link below to confirm your email and finish creating your DnDCheatsheet account.
                            <br />
                            <br />
                            This link will expire in 2 hours and can only be used once.
                            <br />
                            <br />
                            <br />
                            <br />
                        </p>
                        <div>
                            <!--[if mso]>
                            <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${process.env.DND_CHEATSHEET_BASE_URL}/callback/email?token=${verificationToken}" style="height:40px;v-text-anchor:middle;width:300px;" arcsize="10%" stroke="f" fillcolor="#d62828">
                                <w:anchorlock/>
                                <center style="color:#ffffff;font-family:sans-serif;font-size:16px;font-weight:bold;">
                                Create your account
                                </center>
                            </v:roundrect>
                            <![endif]-->
                            <![if !mso]>
                            <table cellspacing="0" cellpadding="0">
                                <tr>
                                    <td align="center" width="300" height="40" bgcolor="#d62828" style="-webkit-border-radius: 5px; -moz-border-radius: 5px; border-radius: 5px; color: #ffffff; display: block;">
                                        <a href="${process.env.DND_CHEATSHEET_BASE_URL}/callback/email?token=${verificationToken}" style="font-size:16px; font-weight: bold; font-family:sans-serif; text-decoration: none; line-height:40px; width:100%; display:inline-block">
                                        <span style="color: #ffffff;">
                                        Create your account
                                        </span>
                                        </a>
                                    </td>
                                </tr>
                            </table>
                            <![endif]>
                        </div>
                        <br />
                        <br />
                        <br />
                        <br />
                        <p>
                            If the button above doesn’t work, paste this link into your web browser:

                            <br />
                            ${process.env.DND_CHEATSHEET_BASE_URL}/callback/email?token=${verificationToken}
                        </p>
                        <br />
                        <br />
                        <p>

                            <em>If you did not make this request, you can safely ignore this email.</em>
                        </p>
                        <br />
                        <br />
                        <p>
                            Kind regards,
                            The DnDCheatsheet team
                        </p>
                    `,
                },
                Text: {
                    Charset: 'UTF-8',
                    Data: `
                        DnD Cheatsheet

                        You're almost there!

                        Paste the following link below in your browser to confirm your email and finish creating your DnDCheatsheet account.

                        This link will expire in 2 hours and can only be used once.

                        ${process.env.DND_CHEATSHEET_BASE_URL}/callback/email?token=${verificationToken}

                        If you did not make this request, you can safely ignore this email.

                        Kind regards,
                        The DnDCheatsheet team
                    `,
                },
            },
            Subject: {
                Charset: 'UTF-8',
                Data: 'Finish creating your account on DnDCheatSheet',
            },
        },
        Source: 'dndCheatSheet@victorpanteleev.com',
        ReplyToAddresses: [
            'noreply@victorpanteleev.com',
        ],
    };
}
