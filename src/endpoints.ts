// The endpoints exposed by the operator API

export const signAndVerifyEndpoints = {
    verifyRead: '/verify/read',
    signWrite: '/sign/write',
    signPrefs: '/sign/prefs',
}

export const redirectEndpoints = {
    read: '/v1/redirect/get-ids-prefs',
    write: "/v1/redirect/post-ids-prefs"
}

export const jsonEndpoints = {
    read: '/v1/ids-prefs',
    write: "/v1/ids-prefs",
    verify3PC: '/v1/3pc',
    newId: '/v1/new-id',
    identity: '/v1/identity'
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

