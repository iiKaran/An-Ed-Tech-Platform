const Enquiry = require("../models/Enquiry");
const User = require("../models/User");
exports.AskAnEnquiry = async (req, res) => {
  try {
    const { question, askTo } = req.body;
    const userId = req.user.id; // due to middlewares
    console.log(askTo)
    if (!question || !userId) {
      return res.status(400).json({
        success: false,
        message: "Incomplete Request",
      });
    }
    const foundUser = await User.findById(userId);
    const foundTeacher = await User.findById(userId);
    if (!foundUser) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }
    if (!foundTeacher) {
      return res.status(404).json({
        success: false,
        message: "Instructor not found",
      });
    }

    // all cases handled

    const createdQuery = await Enquiry.create({
      question: question,
      askBy: userId,
      askTo: askTo,
    });
    return res.status(200).json({
      success: true,
      message: "query created successfully",
      createdQuery,
    });
  } catch (err) {
    console.log("error while asking for an Enquiry", err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.respondAnEnquiry = async (req, res) => {
  try {
    const { queryId, answer } = req.body;
    const userId = req.user.id;
    
    const enquiryId = queryId;

    const foundQuery = await Enquiry.findByIdAndUpdate(enquiryId, {
      answer: answer,
      respondby: userId,
    });

    return res.status(200).json({
      success: true,
      message: "Query resolved",
      foundQuery,
    });
  } catch (err) {
    console.log("error while responding an Enquiry", err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.getAllEnquiriesByStudent = async (req, res) => {
  try {
    const studentId = req.user.id;

    if (!studentId)
      return res.status(404).json({
        success: false,
        message: "cant find student",
      });

    // found
    const queries = await Enquiry.find({
      askBy: studentId,
    }).populate("askTo");

    return res.status(200).json({
      success: true,
      message: "Queries Fetched Successfully",
      data: queries,
    });
  } catch (err) {
    console.log("error while getting all Enquiries By Student", err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.getAllEnquiriesAskedToInstructor = async (req, res) => {
  try {
    const userId = req.user.id;
    const foundTeacher = await User.findById(userId);
    if (!foundTeacher) {
      return res.status(404).json({
        success: false,
        message: "Instructor not found",
      });
    }
    const queries = await Enquiry.find({
      askTo: userId,
      answer:null,
    }).populate("askBy");

    return res.status(200).json({
      success: true,
      message: "Queries Fetched Successfully",
      data: queries,
    });
  } catch (err) {
    console.log("error while getting all Enquiries By Student", err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
