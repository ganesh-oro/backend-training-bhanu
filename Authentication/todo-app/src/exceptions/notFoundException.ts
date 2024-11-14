import BaseException from "./baseException.ts";

class NotfoundException extends BaseException {
    constructor(message?: string) {
        super(404, message || "Not found", "NotfoundException", true);
    }
}

export default NotfoundException