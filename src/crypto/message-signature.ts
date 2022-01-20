import {
    GetIdPrefsRequest,
    GetIdPrefsResponse, GetNewIdResponse,
    MessageBase,
    PostIdPrefsRequest,
    PostIdPrefsResponse
} from "../model/generated-model";
import {UnsignedMessage} from "../model/model";
import {PrivateKey, PublicKey} from "./keys";

export const SIGN_SEP = '\u2063';


export abstract class MessageSigner<T extends MessageBase> {
    protected abstract signatureString(message: UnsignedMessage<T>): string;

    sign(ecdsaPrivateKey: PrivateKey, message: UnsignedMessage<T>): string {
        const toSign = this.signatureString(message);
        return ecdsaPrivateKey.sign(toSign)
    }

    verify(ecdsaPublicKey: PublicKey, message: T): boolean {
        const toVerify = this.signatureString(message);
        const signature = message.signature;

        return ecdsaPublicKey.verify(toVerify, signature)
    }
}

export class PostIdPrefsRequestSigner extends MessageSigner<PostIdPrefsRequest> {
    protected signatureString(postIdPrefsRequest: UnsignedMessage<PostIdPrefsRequest>) {
        const dataToSign = [
            postIdPrefsRequest.sender,
            postIdPrefsRequest.receiver,
        ];

        if (postIdPrefsRequest.body.preferences) {
            dataToSign.push(postIdPrefsRequest.body.preferences.source.signature)
        }

        for (let id of postIdPrefsRequest.body.identifiers ?? []) {
            dataToSign.push(id.source.signature)
        }

        dataToSign.push(postIdPrefsRequest.timestamp.toString())

        return dataToSign.join(SIGN_SEP);
    }
}

export class GetIdPrefsRequestSigner extends MessageSigner<GetIdPrefsRequest> {
    protected signatureString(getIdPrefsRequest: UnsignedMessage<GetIdPrefsRequest>): string {
        return [
            getIdPrefsRequest.sender,
            getIdPrefsRequest.receiver,
            getIdPrefsRequest.timestamp
        ].join(SIGN_SEP)
    }
}

function getIdPrefSignature(getIdPrefsResponse: UnsignedMessage<GetIdPrefsResponse>) {
    const dataToSign = [
        getIdPrefsResponse.sender,
        getIdPrefsResponse.receiver,
    ];

    if (getIdPrefsResponse.body.preferences) {
        dataToSign.push(getIdPrefsResponse.body.preferences.source.signature)
    }

    for (let id of getIdPrefsResponse.body.identifiers ?? []) {
        dataToSign.push(id.source.signature)
    }

    dataToSign.push(getIdPrefsResponse.timestamp.toString())

    return dataToSign.join(SIGN_SEP)
}

export class GetIdPrefsResponseSigner extends MessageSigner<GetIdPrefsResponse> {
    protected signatureString(getIdPrefsResponse: UnsignedMessage<GetIdPrefsResponse>): string {
        return getIdPrefSignature(getIdPrefsResponse);
    }
}

export class PostIdPrefsResponseSigner extends MessageSigner<PostIdPrefsResponse> {
    protected signatureString(postIdPrefsResponse: UnsignedMessage<PostIdPrefsResponse>): string {
        return getIdPrefSignature(postIdPrefsResponse);
    }
}

export class GetNewIdResponseSigner extends MessageSigner<GetNewIdResponse> {
    protected signatureString(getNewIdResponse: UnsignedMessage<GetNewIdResponse>): string {
        return getIdPrefSignature(getNewIdResponse);
    }
}
