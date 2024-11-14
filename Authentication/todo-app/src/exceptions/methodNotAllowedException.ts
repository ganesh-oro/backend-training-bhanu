import BaseException from "./baseException.ts";

class MethodnotallowedException extends BaseException{
    constructor(message?: string) {
        super(405, message || "Method not allowed", "MethodnotallowedException", true);
    }
}

export default MethodnotallowedException;