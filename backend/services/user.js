import bcrypt from "bcrypt";

export async function createUserService(db, data) {
  try {
    const { first_name, last_name, email, password } = data;

    const isUserExist = await db.get("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    if (isUserExist) throw new Error("User already exists.");

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await db.run(
      "INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)",
      [first_name, last_name, email, hashedPassword]
    );

    return { id: result.lastID, email };
  } catch (err) {
    throw new Error(err.message || err);
  }
}

export async function loginUserService(req, db, data) {
  try {
    const { email, password } = data;

    const user = await db.get("SELECT * FROM users WHERE email = ?", [email]);
    if (!user) throw new Error("User not found.");

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) throw new Error("Invalid password.");

    req.session.user = {
      id: user.id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
    };

    return { message: "Logged in successfully", session: req.session.user };
  } catch (err) {
    throw new Error(err.message || err);
  }
}

export default { createUserService, loginUserService };
