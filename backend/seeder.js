import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import users from "./data/users.js";
import patients from "./data/patients.js";
import data from "./data/data.js";
import User from "./models/userModel.js";
import Patient from "./models/patientModel.js";
import Data from "./models/dataModel.js";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Data.deleteMany();
    await User.deleteMany();
    await Patient.deleteMany();

    await Data.insertMany(data);

    const createdUsers = await User.insertMany(users);

    const adminUser = createdUsers[0]._id;

    const samplePatients = patients.map((patient) => {
      return {
        ...patient,
        user: adminUser,
      };
    });

    await Patient.insertMany(samplePatients);

    console.log("Data Imported!".green.inverse);
  } catch (error) {
    console.log(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    await Patient.deleteMany();
    await Data.deleteMany();

    console.log("Data Destroyed!".red.inverse);
  } catch (error) {
    console.log(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
