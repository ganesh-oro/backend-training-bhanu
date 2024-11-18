import BaseException from "./baseException.ts";

class ForbiddenException extends BaseException {
    constructor(message?: string) {
        super(message || "Forbidden",403, "ForbiddenException", true);
    }
}

export default ForbiddenException;