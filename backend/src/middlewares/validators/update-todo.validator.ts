import { check } from "express-validator";
import { Request, Response, NextFunction } from "express";
import validate from "./validate";
import { TODO_STATE } from "../../common/constants";

const ValidateUpdateToDoRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return validate(
    [
      check("id")
        .exists({
          checkNull: true,
          checkFalsy: true,
        })
        .withMessage("Please provide the ID of the Todo you wish to update"),
      check("title")
        .exists({
          checkNull: true,
          checkFalsy: true,
        })
        .withMessage("Title address is required")
        .isLength({ min: 5 })
        .withMessage("Title must be equal to or greater than 5 characters"),
      check("description")
        .exists({
          checkNull: true,
          checkFalsy: true,
        })
        .withMessage("Description is required")
        .isLength({ min: 10 })
        .withMessage(
          "Description must be equal to or greater than 10 characters"
        ),
      // check("status")
      //   .exists({
      //     checkFalsy: true,
      //     checkNull: true,
      //   })
      //   .withMessage("Status is required")
      //   .custom((value) => {
      //     return TODO_STATE.includes(value);
      //   }),
    ],
    req,
    res,
    next
  );
};
export default ValidateUpdateToDoRequest;
