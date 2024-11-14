import BaseException from "./baseException.ts";

class UnauthorizedException extends BaseException{
    constructor(message?: string) {
        super(401, message || "Unauthorized", "UnauthorizedException", true);
    }
}

export default UnauthorizedException;