"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.schemaMap = exports.schemas = exports.Schema = void 0;
const simpl_schema_1 = __importDefault(require("simpl-schema"));
simpl_schema_1.default.extendOptions(['typeName']);
const Timestamp = {
    type: simpl_schema_1.default.Integer,
    min: 0
};
const Domain = {
    type: String
    // TODO: add more constraints
};
const Signature = {
    type: String
    // TODO: add more constraints
};
const Version = {
    type: Number,
    allowedValues: [0]
};
class Schema {
    constructor() {
        this.MessageBase = new simpl_schema_1.default({
            sender: Domain,
            receiver: Domain,
            timestamp: Timestamp,
            signature: Signature
        });
        this.Source = new simpl_schema_1.default({
            domain: Domain,
            timestamp: Timestamp,
            signature: Signature
        });
        this.Id = new simpl_schema_1.default({
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
        });
        this.Preferences = new simpl_schema_1.default({
            version: Version,
            data: new simpl_schema_1.default({
                opt_in: Boolean
            }),
            source: this.Source
        });
        this.IdAndPrefs = new simpl_schema_1.default({
            preferences: {
                type: this.Preferences,
            },
            identifiers: {
                type: Array
            },
            'identifiers.$': this.Id
        });
        this.IdAndOptionalPrefs = new simpl_schema_1.default({
            preferences: {
                type: this.Preferences,
                optional: true
            },
            identifiers: {
                type: Array
            },
            'identifiers.$': this.Id
        });
        this.GetIdPrefsRequest = this.MessageBase;
        this.GetIdPrefsResponse = new simpl_schema_1.default({
            body: this.IdAndOptionalPrefs
        });
        this.GetIdPrefsResponse.extend(this.MessageBase);
        this.PostIdPrefsRequest = new simpl_schema_1.default({
            body: this.IdAndPrefs
        });
        this.PostIdPrefsRequest.extend(this.MessageBase);
        this.PostIdPrefsResponse = this.GetIdPrefsResponse;
        this.GetNewIdRequest = this.MessageBase;
        this.GetNewIdResponse = new simpl_schema_1.default({
            body: new simpl_schema_1.default({
                identifiers: {
                    type: Array,
                    minCount: 1,
                    maxCount: 1
                },
                'identifiers.$': this.Id
            })
        });
        this.GetNewIdResponse.extend(this.MessageBase);
    }
}
exports.Schema = Schema;
exports.schemas = new Schema();
// Needed for auto-generation of model
exports.schemaMap = exports.schemas;
//# sourceMappingURL=schemas.js.map