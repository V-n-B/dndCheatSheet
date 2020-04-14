import AWS from 'aws-sdk';

export async function sendWelcomeEmail(customerEmail: string, username: string) {
    const mailParams = getMailParams(customerEmail, username);
    await new AWS.SES({ apiVersion: '2010-12-01' })
        .sendEmail(mailParams)
        .promise();
}

function getMailParams(customerEmail: string, username: string) {
    return {
        Destination: {
            ToAddresses: [
                'victor_panteleev@hotmail.com',
                customerEmail,
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
                        <h3>Welcome to DnD Cheatsheet, ${username}</h3>
                        <br />
                        <br />
                        <p>
                            We hope you'll enjoy our product!
                            <br />
                            <br />
                            Kind regards,
                            <br />
                            The DnDCheatsheet team
                        </p>
                    `,
                },
                Text: {
                    Charset: 'UTF-8',
                    Data: `
                        DND CheatSheet,


                        Welcome to DnD Cheatsheet, ${username}


                        We hope you'll enjoy our product!

                        Kind regards,
                        The DnDCheatsheet team
                    `,
                },
            },
            Subject: {
                Charset: 'UTF-8',
                Data: `Welcome to DnD Cheatsheet, ${username}`,
            },
        },
        Source: 'dndCheatSheet@victorpanteleev.com',
        ReplyToAddresses: [
            'victor_panteleev@hotmail.com',
        ],
    };
}

