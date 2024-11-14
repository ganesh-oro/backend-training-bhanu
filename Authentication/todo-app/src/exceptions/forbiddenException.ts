import BaseException from "./baseException.ts";

class ForbiddenException extends BaseException {
    constructor(message?: string) {
        super(403, message || "Forbidden", "ForbiddenException", true);
    }
}

export default ForbiddenException;