export const ErrHandler = (StatusCode, ErrMessage) => {
    const error = new Error();
    error.StatusCode = StatusCode;
    error.message = ErrMessage;
    return error;
}