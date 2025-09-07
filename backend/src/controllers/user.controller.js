import {
  createUserService,
  loginUserService,
} from "../services/user.service.js";

async function createUserController(req, res) {
  try {
    const db = req.app.get("db");
    const data = await createUserService(db, req.body);
    res.status(201).json({ data, message: "User created successfully." });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

async function loginUserController(req, res) {
  try {
    const db = req.app.get("db");
    const result = await loginUserService(req, db, req.body);
    res.status(200).json({
      message: "User logged in successfully",
      session: result.session,
      success: true,
      status: 200,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

async function logoutUserController(req, res) {
  try {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Logout failed", error: err });
      }

      res.clearCookie("connect.sid");
      res.status(200).json({ message: "Logged out successfully" });
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export { loginUserController, createUserController, logoutUserController };
