import SimpleSchema, {SchemaDefinition} from "simpl-schema";
import {SchemaMap} from "schema-to-types";

SimpleSchema.extendOptions(['typeName']);

type TypedSchemaDefinition = SchemaDefinition & { typeName?: string };

const Timestamp: TypedSchemaDefinition = {
    type: SimpleSchema.Integer,
    min: 0
}

const Domain: TypedSchemaDefinition = {
    type: String
    // TODO: add more constraints
}

const Signature: TypedSchemaDefinition = {
    type: String
    // TODO: add more constraints
}

const Version: TypedSchemaDefinition = {
    type: Number,
    allowedValues: [0]
}

export class Schema {
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

    constructor() {
        this.MessageBase = new SimpleSchema({
            sender: Domain,
            receiver: Domain,
            timestamp: Timestamp,
            signature: Signature
        })

        this.Source = new SimpleSchema({
            domain: Domain,
            timestamp: Timestamp,
            signature: Signature
        })

        this.Id = new SimpleSchema({
            version: Version,
            type: {
                type: String,
                allowedValues: ["prebid_id"]
            },
            persisted: {
                type: Boolean,
                defaultValue: true,
                optional: true
            },
            value: {
                type: String
                // TODO: add more constraints
            },
            source: this.Source
        })

        this.Preferences = new SimpleSchema({
            version: Version,
            data: new SimpleSchema({
                opt_in: Boolean
            }),
            source: this.Source
        })

        this.IdAndPrefs = new SimpleSchema({
            preferences: {
                type: this.Preferences,
            },
            identifiers: {
                type: Array
            },
            'identifiers.$': this.Id
        })

        this.IdAndOptionalPrefs = new SimpleSchema({
            preferences: {
                type: this.Preferences,
                optional: true
            },
            identifiers: {
                type: Array
            },
            'identifiers.$': this.Id
        })

        this.GetIdPrefsRequest = this.MessageBase

        this.GetIdPrefsResponse = new SimpleSchema({
            body: this.IdAndOptionalPrefs
        })
        this.GetIdPrefsResponse.extend(this.MessageBase)

        this.PostIdPrefsRequest = new SimpleSchema({
            body: this.IdAndPrefs
        })
        this.PostIdPrefsRequest.extend(this.MessageBase)

        this.PostIdPrefsResponse = this.GetIdPrefsResponse

        this.GetNewIdRequest = this.MessageBase

        this.GetNewIdResponse = new SimpleSchema({
            body: new SimpleSchema({
                identifiers: {
                    type: Array,
                    minCount: 1,
                    maxCount: 1
                },
                'identifiers.$': this.Id
            })
        })
        this.GetNewIdResponse.extend(this.MessageBase)
    }
}

export const schemas = new Schema();

// Needed for auto-generation of model
export const schemaMap: SchemaMap = (schemas as unknown) as SchemaMap;
