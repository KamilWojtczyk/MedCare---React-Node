import asyncHandler from "express-async-handler";
import Data from "../models/dataModel.js";

// @desc Get all data
// @route Get /api/data
// @access Private

const getData = asyncHandler(async (req, res) => {
  const datas = await Data.find({});
  res.json(datas);
});

export { getData };
