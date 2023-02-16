export default class ErrorResponse {
  constructor(args: {
    statusCode: number;
    timestamp: string;
    path: string;
    message: string;
    type: string;
  }) {
    const { statusCode, timestamp, path, message, type } = args;
    this.statusCode = statusCode;
    this.timestamp = timestamp;
    this.path = path;
    this.message = message;
    this.type = type;
  }
  statusCode: number;
  timestamp: string;
  path: string;
  message: string;
  type: string;
}
