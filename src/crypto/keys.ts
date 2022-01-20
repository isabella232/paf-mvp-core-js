// Not provided by ecdsa-secp256r1 unfortunately
export interface PrivateKey {
    sign: (toSign: string) => string
}

export interface PublicKey {
    verify: (toVerify: string, signature: string) => boolean
}
