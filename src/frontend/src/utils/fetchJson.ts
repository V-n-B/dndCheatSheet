interface IFetchResult {
    status: number;
    json?: any;
    errorCode?: string;
    message?: string;
}

export async function fetchJson(
    url: string,
    method: 'POST' | 'GET',
    body?: {},
    allowedErrorCodes?: string[],
    allowedHTTPErrorCodes?: number[]
): Promise<IFetchResult> {
    let bodyString = undefined;
    let status = 0;
    if (body) {
        bodyString = JSON.stringify(body);
    }

    const response = await fetch(url, {
        method: method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: bodyString,
    });

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.indexOf('text/html') !== -1) {
        throw new Error(`Received HTML, does this route exist? (${url})`);
    }
    if (response.headers.get('Content-Length') && response.headers.get('Content-Length') === '0') {
        console.log('content lenght is 0', response);
        return { status };
    }

    status = response.status;

    let json;
    if (status !== 404) {
        json = await response.json();
    }

    if (status < 400) {
        return { status: status, json: json };
    }
    let code = 'DEFAULT';
    if (json && json.code) {
        code = json.code;
    }
    let message;
    if (json && json.message) {
        message = json.message;
    }

    if (status >= 400 && status < 500) {
        if (allowedErrorCodes && allowedErrorCodes.includes(code)) {
            return { status: status, errorCode: code, message: message };
        }
        if (allowedHTTPErrorCodes && allowedHTTPErrorCodes.includes(status)) {
            return { status: status, errorCode: code };
        }
    }

    throw new Error(`${status} ${code}`);
}
