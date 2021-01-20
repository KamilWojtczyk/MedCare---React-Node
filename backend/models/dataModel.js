import mongoose from "mongoose";

const alldataSchema = mongoose.Schema(
  {
    topic: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
  
const AllData = mongoose.model("AllData", alldataSchema);
  
export default AllData;
  