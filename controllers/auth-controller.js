const User = require("../models/user-model");
const bcrypt = require("bcryptjs");


const home = async (req, res) => {
  try {
    res.status(200).json({ msg: "Welcome to our home page" });
  } catch (error) {
    console.log(error);
  }
};

// *-------------------------------
//* User Registration Logic 📝
// *-------------------------------
// 1. Get Registration Data: 📤 Retrieve user data (username, email, password).
// 2. Check Email Existence: 📋 Check if the email is already registered.
// 3. Hash Password: 🔒 Securely hash the password.
// 4. Create User: 📝 Create a new user with hashed password.
// 5. Save to DB: 💾 Save user data to the database.
// 6. Respond: ✅ Respond with "Registration Successful" or handle errors.

const register = async (req, res) => {
  try {
    // const data = req.body;
    console.log(req.body);
    const { username, email, phone, password } = req.body;

    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(400).json({ message: "email already exists" });
    }



    //hash the password
    const saltRound = 10;
    const hash_password = await bcrypt.hash(password, saltRound);


    const userCreated = await User.create({ username, email, phone, password: hash_password, });

    // res.status(201).json({ message: "User registered successfully" });
    res.status(201).json({ 
      msg: "Registration successful",
      token: await userCreated.generateToken(), 
      userId: userCreated._id.toString(),
     });
  } catch (error) {
   res.status(500).json({ message: "Internal server error" });
    
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExist = await User.findOne({ email });
    console.log(userExist);
    
    if (!userExist) {
      return res.status(400).json({ message: "Invalid Credentials "});
    }

    const user = await bcrypt.compare(password, userExist.password);

    if(userExist) {
      res.status(200).json({
        msg: "Login Successful",
        token: await userExist.generateToken(),
        userId: userExist._id.toString(),
      }); 
    } else {
      res.status(401).json({ message: "Invalid email or password "});
    }

  } catch (error) {

    res.status(500).json({ message:"Internal server error"});
  }
};


//to send user data - User Logic

const user = async (req, res) => {
  try {
    const userData = req.user;
    console.log(userData);
    return res.status(200).json({ userData });
  } catch (error) {
    console.log(`error from the user route ${error}`);
  }
};


module.exports = { home, register, login, user };