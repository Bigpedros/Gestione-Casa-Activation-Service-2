export declare const LICENSE_ENGINE_VERSION: "2.1";
export declare const LICENSE_SCHEMA_VERSION: 1;
export declare const LICENSE_CODE_GROUPS: 4;
export declare const LICENSE_CODE_GROUP_LENGTH: 4;
export declare const LICENSE_CODE_RAW_LENGTH: 16;
export declare const LICENSE_PAYLOAD_LENGTH: 15;
/**
 * Alfabeto sicuro ufficiale. Sono esclusi i caratteri visivamente ambigui:
 * O/0, I/1/L, S/5 e Z/2.
 */
export declare const SAFE_ALPHABET: readonly ["A", "B", "C", "D", "E", "F", "G", "H", "J", "K", "M", "N", "P", "Q", "R", "T", "U", "V", "W", "X", "Y", "3", "4", "6", "7", "8", "9"];
export type SafeChar = (typeof SAFE_ALPHABET)[number];
//# sourceMappingURL=constants.d.ts.map