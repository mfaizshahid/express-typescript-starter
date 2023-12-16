import { type Response } from "express";
import httpStatus from "http-status";

export default class ApiResponse<T> {
  constructor(
    protected data: T,
    protected statusMessage: string = "Success",
    protected statusCode: number = httpStatus.OK,
  ) {
    this.statusCode = statusCode;
    this.data = data;
    this.statusMessage = statusMessage;
  }

  send(res: Response): Response {
    return res.status(this.statusCode).json(this);
  }
}
