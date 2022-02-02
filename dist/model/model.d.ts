import { Identifier, Source } from "./generated-model";
export declare type UnsignedMessage<T> = Omit<T, 'signature'>;
export declare type UnsignedData<T extends {
    source: Source;
}> = Omit<T, 'source'> & {
    source: UnsignedMessage<Source>;
};
export declare const isEmptyListOfIds: (ids: (Identifier | undefined)[]) => boolean;
export interface NewPrefs {
    identifier: Identifier;
    optIn: boolean;
}
