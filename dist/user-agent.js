"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isBrowserKnownToSupport3PC = void 0;
const isBrowserKnownToSupport3PC = (browser) => {
    return !browser.name.includes('Safari');
};
exports.isBrowserKnownToSupport3PC = isBrowserKnownToSupport3PC;
//# sourceMappingURL=user-agent.js.map