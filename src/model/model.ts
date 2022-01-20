import {Id, Source} from "./generated-model";

export type UnsignedMessage<T> = Omit<T, 'signature'>
export type UnsignedData<T extends { source: Source }> = Omit<T, 'source'> & { source: UnsignedMessage<Source> }

export const isEmptyListOfIds = (ids: (Id | undefined)[]) => ids.filter(n => n !== undefined).length === 0

export interface NewPrefs {
    identifier: Id,
    optIn: boolean
}
