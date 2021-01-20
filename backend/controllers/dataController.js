import asyncHandler from "express-async-handler";
import AllData from "../models/dataModel.js";

// @desc Get all data
// @route Get /api/data
// @access Private


const getData = asyncHandler(async (req, res) => {
  const alldata = await AllData.find({});
  res.json(alldata);
});

export {
  getData
};
