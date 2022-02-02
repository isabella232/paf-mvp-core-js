import { GetIdPrefsRequest, GetIdPrefsResponse, GetNewIdResponse, MessageBase, PostIdPrefsRequest, PostIdPrefsResponse } from "../model/generated-model";
import { UnsignedMessage } from "../model/model";
import { PrivateKey, PublicKey } from "./keys";
export declare const SIGN_SEP = "\u2063";
export declare abstract class MessageSigner<T extends MessageBase> {
    protected abstract signatureString(message: UnsignedMessage<T>): string;
    sign(ecdsaPrivateKey: PrivateKey, message: UnsignedMessage<T>): string;
    verify(ecdsaPublicKey: PublicKey, message: T): boolean;
}
export declare class PostIdPrefsRequestSigner extends MessageSigner<PostIdPrefsRequest> {
    protected signatureString(postIdPrefsRequest: UnsignedMessage<PostIdPrefsRequest>): string;
}
export declare class GetIdPrefsRequestSigner extends MessageSigner<GetIdPrefsRequest> {
    protected signatureString(getIdPrefsRequest: UnsignedMessage<GetIdPrefsRequest>): string;
}
export declare class GetIdPrefsResponseSigner extends MessageSigner<GetIdPrefsResponse> {
    protected signatureString(getIdPrefsResponse: UnsignedMessage<GetIdPrefsResponse>): string;
}
export declare class PostIdPrefsResponseSigner extends MessageSigner<PostIdPrefsResponse> {
    protected signatureString(postIdPrefsResponse: UnsignedMessage<PostIdPrefsResponse>): string;
}
export declare class GetNewIdResponseSigner extends MessageSigner<GetNewIdResponse> {
    protected signatureString(getNewIdResponse: UnsignedMessage<GetNewIdResponse>): string;
}
