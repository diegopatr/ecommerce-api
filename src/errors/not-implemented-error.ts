import HttpError from './http-error';

class NotImplementedError extends HttpError {
    constructor(message: string = 'Not Implemented') {
        super(501, message);
        this.name = 'NotImplementedError';
    }
}

export default NotImplementedError;