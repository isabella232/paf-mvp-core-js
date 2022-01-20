// The endpoints exposed by the operator API

export const signAndVerifyEndpoints = {
    verifyRead: '/verify/read',
    signWrite: '/sign/write',
    signPrefs: '/sign/prefs',
}

export const redirectEndpoints = {
    read: '/redirect/read',
    write: "/redirect/write"
}

export const jsonEndpoints = {
    read: '/json/read',
    verify3PC: '/json/verify3pc',
    write: "/json/write",
}

export const uriParams = {
    data: 'prebid', // FIXME should deprecate
    returnUrl: 'url',
    signature: 'signature',
    receiver: 'receiver',
    sender: 'sender',
    timestamp: 'timestamp',
    body: 'body'
}

