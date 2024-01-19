const AppError = require("../utils/appError");
const User = require("./../models/userModel");
const catchAsync = require("./../utils/catchAsync");

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
};

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  // SEND RESPONSE
  res.status(200).json({
    status: "success",
    requestedAt: req.requestTime,
    results: users.length,
    data: { users }
  });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  // Log request body for debugging
  console.log(req.body);

  // 1) Check if user is trying to update password-related fields
  if (
    req.body.password ||
    req.body.passwordConfirm ||
    req.body.passwordChangedAt
  ) {
    return next(
      new AppError(
        "This route is not for password updates. Please use /updateMyPassword instead.",
        400
      )
    );
  }

  // 2) Extract fields to update directly from req.body
  const { name } = req.body;

  // 3) Update user document
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    { name },
    {
      new: true,
      runValidators: true
    }
  );

  // 4) Handle null response
  if (!updatedUser) {
    return next(new AppError("User not found.", 404));
  }

  // 5) Respond with updated user
  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser
    }
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: "success",
    data: null
  });
});

exports.getUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined."
  });
};

exports.createUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined."
  });
};

exports.updateUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined."
  });
};

exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined."
  });
};
