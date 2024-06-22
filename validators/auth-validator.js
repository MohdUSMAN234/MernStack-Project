const { z } = require("zod");

const loginSchema = z.object({
      email: z
      .string({ required_error: "Email is required"})
      .trim()
      .min(3, { message: "Email must be at least of 3 chars." })
      .max(225, { message: "Email must not be more than 225 characters" }),

      password: z
      .string({ required_error: "Password is required"})
      .min(6, { message: "password must be at least of 6 chars." })
      .max(1024, "Password must not be more than 225 characters" ),

})

//Creating an object schema
const signupSchema = loginSchema.extend({

username: z
      .string({ required_error: "Name is required" })
      .trim()
      .min(3, { message: "Name must be at least of 3 characters" })
      .max(225, { message: "Name must not be more than 225 characters" }),

phone: z
      .string({ required_error: "Phone is required" })
      .trim()
      .min(10, { message: "phone must be at least of 10 characters" })
      .max(12, { message: "phone must not be more than 12 characters" }),

});

module.exports = {signupSchema, loginSchema};