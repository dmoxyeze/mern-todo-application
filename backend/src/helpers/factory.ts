import { Request, Response, NextFunction } from "express";
import { Model, Models } from "mongoose";
import { catchAsync } from ".";
import HttpException from "../common/http-exception";

export const deleteOne = (Model: Model<Models>) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) {
      return next(new HttpException("No document with that ID was found", 404));
    }
    res.status(200).json({
      success: true,
      status: "success",
      data: null,
    });
  });

export const getOne = (Model: Model<Models>) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const doc = await Model.findById(req.params.id);
    if (!doc) {
      return next(new HttpException("No document with that ID was found", 404));
    }
    res.status(200).json({
      success: true,
      status: "success",
      data: {
        doc,
      },
    });
  });
