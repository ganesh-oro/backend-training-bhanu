import BaseException from "./baseException.ts";

class UnauthorizedException extends BaseException{
    constructor(message?: string) {
        super(message || "Unauthorized",401, "UnauthorizedException", true);
    }
}

export default UnauthorizedException;