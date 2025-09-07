export const validate = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    const errorMessages = error.issues.map((issue) => {
      return { field: issue.path[0], message: issue.message };
    });
    res.status(400).json({ message: "Validation failed", errorMessages });
  }
};
