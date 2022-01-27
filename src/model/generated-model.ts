/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

/**
 * A domain name
 */
export type Domain = string;
/**
 * GET /v1/id-prefs request
 */
export type GetIdPrefsRequest = MessageBase;
/**
 * Number of seconds since UNIX Epoch time (1970/01/01 00:00:00)
 */
export type Timestamp = number;
/**
 * The base64 representation of a data signature
 */
export type Signature = string;
/**
 * GET /v1/id-prefs response
 */
export type GetIdPrefsResponse = MessageBase & {
  body: IdAndOptionalPreferences;
};
/**
 * A version number. To be detailed.
 */
export type Version = 0;
/**
 * GET /v1/new-id request
 */
export type GetNewIdRequest = MessageBase;
/**
 * GET /v1/new-id response
 */
export type GetNewIdResponse = MessageBase & {
  body: {
    identifiers: Identifier[];
  };
};
/**
 * POST /v1/id-prefs request
 */
export type PostIdPrefsRequest = MessageBase & {
  body: IdAndPreferences;
};
/**
 * POST /v1/id-prefs response
 */
export type PostIdPrefsResponse = MessageBase & {
  body: IdAndPreferences;
};

/**
 * ** Please ignore **
 * Only needed to have an entry point for generating all interfaces together
 */
export interface _ {
  domain?: Domain;
  "get-id-prefs-request"?: GetIdPrefsRequest;
  "get-id-prefs-response"?: GetIdPrefsResponse;
  "get-new-id-request"?: GetNewIdRequest;
  "get-new-id-response"?: GetNewIdResponse;
  "id-and-optional-preferences"?: IdAndOptionalPreferences;
  "id-and-preferences"?: IdAndPreferences;
  identifier?: Identifier;
  "message-base"?: MessageBase;
  "post-id-prefs-request"?: PostIdPrefsRequest;
  "post-id-prefs-response"?: PostIdPrefsResponse;
  preferences?: Preferences;
  signature?: Signature;
  source?: Source;
  timestamp?: Timestamp;
  version?: Version;
}
/**
 * The base properties of a request or response to/from an operator
 */
export interface MessageBase {
  sender: Domain;
  receiver: Domain;
  timestamp: Timestamp;
  signature: Signature;
}
/**
 * A list of identifiers and optionally, some preferences
 */
export interface IdAndOptionalPreferences {
  preferences?: Preferences;
  identifiers: Identifier[];
}
/**
 * User preferences
 */
export interface Preferences {
  version: Version;
  data: {
    /**
     * `true` if the user accepted the usage of browsing history for ad personalization, `false` otherwise
     */
    use_browsing_for_personalization: boolean;
  };
  source: Source;
}
/**
 * Source of data representing what contracting party created and signed the data
 */
export interface Source {
  timestamp: Timestamp;
  domain: Domain;
  signature: Signature;
}
/**
 * A user identifier
 */
export interface Identifier {
  version: Version;
  /**
   * The identifier type. To date only "prebid_id" is supported
   */
  type: "prebid_id";
  /**
   * If set to false, means the identifier has not yet been persisted as a cookie
   */
  persisted?: boolean;
  /**
   * The identifier value
   */
  value: string;
  source: Source;
}
/**
 * A list of identifiers and some preferences
 */
export interface IdAndPreferences {
  preferences: Preferences;
  identifiers: Identifier[];
}
