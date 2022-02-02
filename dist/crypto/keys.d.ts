export interface PrivateKey {
    sign: (toSign: string) => string;
}
export interface PublicKey {
    verify: (toVerify: string, signature: string) => boolean;
}
export interface PublicKeys {
    [host: string]: PublicKey;
}
export declare const publicKeyFromString: (keyString: string) => PublicKey;
export declare const privateKeyFromString: (keyString: string) => PrivateKey;
