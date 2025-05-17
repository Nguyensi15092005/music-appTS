import { NextFunction, Request, Response } from "express";
import { uploadToCloudinary } from "../../helper/uploadToCloudinary";

// upload 1 file
export const uploadSingle = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await uploadToCloudinary(req["file"].buffer);
    req.body[req["file"].fieldname] = result;
  } catch (error) {
    console.log("Lỗi uploadCloud", error);
  }
  next();

}

// upload nhìu file
export const uploadFields = async (req: Request, res: Response, next: NextFunction) => {
  console.log(req["files"]);
  for (const key in req["files"]) {
    req.body[key] = [];
    const arr = req["files"][key];
    for (const item of arr) {
      try {
        const result = await uploadToCloudinary(item.buffer);
        req.body[key].push(result);
      } catch (error) {
        console.log("Lỗi upload file")
      }
    }
  }
  next();

}