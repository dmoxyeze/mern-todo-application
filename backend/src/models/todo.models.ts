import mongoose, { Schema } from "mongoose";
import slugify from "slugify";

const TodoSchema: Schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      minlength: [5, "Title is shorter than the minimum allowed length (5)"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      minlength: [
        10,
        "Description is shorter than the minimum allowed length (10)",
      ],
    },
    slug: {
      type: String,
    },
    status: {
      type: String,
      required: [true, "Status is required"],
      enum: {
        values: ["Pending", "Ongoing", "Completed"],
        message: "Status can either be Pending, Ongoing or Completed",
      },
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

TodoSchema.pre("save", function (next) {
  this.slug = slugify(this.title, { lower: true }) + "-" + this.id;
  next();
});

const Todo = mongoose.model("Todo", TodoSchema);

export default Todo;
