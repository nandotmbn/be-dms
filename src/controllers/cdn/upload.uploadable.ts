import { Request, Response } from "express";
import message from "../../views/message";

async function uploadUploadable(req: Request, res: Response) {
  return res.send(
    message({
      data: {
        uploadName: req.query.fileName
      },
      message: "Successfully Uploaded",
      statusCode: 201
    })
  )
}

export {uploadUploadable}