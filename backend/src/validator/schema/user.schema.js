import zod from "zod";

export const userSchema = zod.object({
  first_name: zod.string("first name is required").min(3, {
    message: "first name must be at least 3 characters",
  }),
  last_name: zod.string("last name is required").min(1, {
    message: "last name must be at least 1 characters",
  }),
  email: zod.email("Invalid email address"),
  password: zod.string("password is required min length 6").min(6, {
    message: "password must be at least 6 characters",
  }),
});

export const loginSchema = zod.object({
  email: zod.email({ message: "Invalid email address" }),
  password: zod.string("password is required").min(6, {
    message: "password must be at least 6 characters",
  }),
});
