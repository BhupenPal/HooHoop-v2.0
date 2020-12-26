export const makeErrorMessage = (message) => {
  return typeof message == 'string' ? message : "Something Went Wrong";
}