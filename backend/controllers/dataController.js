import asyncHandler from "express-async-handler";
import AnyData from "../models/dataModel.js"
import User from "..//models/userModel.js"

// @desc Get all data
// @route Get /api/data
// @access Private
const getData = asyncHandler(async (req, res) => {
    const data = await AnyData.find({});
    res.json(data);
  });

export {
  getData
};
