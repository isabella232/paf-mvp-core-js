import SimpleSchema from "simpl-schema";
import { SchemaMap } from "schema-to-types";
export declare class Schema {
    Source: SimpleSchema;
    Preferences: SimpleSchema;
    Id: SimpleSchema;
    IdAndPrefs: SimpleSchema;
    IdAndOptionalPrefs: SimpleSchema;
    MessageBase: SimpleSchema;
    GetIdPrefsRequest: SimpleSchema;
    GetIdPrefsResponse: SimpleSchema;
    PostIdPrefsRequest: SimpleSchema;
    PostIdPrefsResponse: SimpleSchema;
    GetNewIdRequest: SimpleSchema;
    GetNewIdResponse: SimpleSchema;
    constructor();
}
export declare const schemas: Schema;
export declare const schemaMap: SchemaMap;
