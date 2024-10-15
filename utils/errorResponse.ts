export function ErrorResponse(message: string, statusCode: number) {
  return { statusCode: statusCode, message: message };
}
