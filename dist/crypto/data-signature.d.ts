import { Identifier, Preferences, Source } from "../model/generated-model";
import { UnsignedData } from "../model/model";
import { PrivateKey, PublicKey } from "./keys";
export declare const SIGN_SEP = "\u2063";
export declare abstract class DataSigner<T extends {
    source: Source;
}> {
    protected abstract signatureString(data: UnsignedData<T>): string;
    sign(ecdsaPrivateKey: PrivateKey, data: UnsignedData<T>): string;
    verify(ecdsaPublicKey: PublicKey, data: T): boolean;
}
export declare class IdSigner extends DataSigner<Identifier> {
    protected signatureString(data: UnsignedData<Identifier>): string;
}
export declare class PrefsSigner extends DataSigner<Preferences> {
    protected signatureString(preferences: UnsignedData<Preferences>): string;
}
