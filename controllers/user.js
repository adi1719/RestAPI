const User = require("../models/user");

async function getAllUsers(req, res) {
  const allDbUsers = await User.find({});
  return res.json(allDbUsers);
}

async function getUserById(req, res) {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ error: "Requested ID not found" });
  }
  return res.json(user);
}

async function createNewUser(req, res) {
  const body = req.body;
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender ||
    !body.job_title
  ) {
    res.status(400).json({ msg: "All Field are Required" });
  }
  const result = await User.create({
    firstName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    gender: body.gender,
    jobTitle: body.job_title,
  });

  console.log("Result: ", result);
  res.status(201).json({ msg: "Success", id: result._id });
}

async function updateUserById(req, res) {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedUser) {
      res.status(404).json({ message: "User Not Found" });
    }
    return res.status(200).json(updatedUser);
  } catch (error) {
    return res.status(500).json({ message: "Server Error", error });
  }
}

async function deleteUserById(req, res) {
  await User.findByIdAndDelete(req.params.id);
  return res.json({ status: "Success" });
}

async function getUsersForFrontEnd(req, res) {
  const allDbUsers = await User.find({});
  const html = `<ul>
          ${allDbUsers
            .map((user) => `<li>${user.firstName} - ${user.email}</li>`)
            .join("")}
      </ul>`;
  res.send(html);
}
module.exports = {
  getAllUsers,
  getUserById,
  createNewUser,
  updateUserById,
  deleteUserById,
  getUsersForFrontEnd,
};
