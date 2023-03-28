const user=require('../models/user')

const bcrypt =require('bcryptjs')
const jwt=require('jsonwebtoken')
const secret = "test";
exports. signin = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const User = await user.findOne({ email });
      if (!User)
        return res.status(404).json({ message: "User doesn't exist" });
  
      const isPasswordCorrect = await bcrypt.compare(password, User.password);
  
      if (!isPasswordCorrect)
        return res.status(400).json({ message: "Invalid password" });
  
      const token = jwt.sign({ email: User.email, id: User._id }, secret, {
        expiresIn: "1h",
      });
  
      res.status(200).json({ result: User, token });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
      console.log(error);
    }
  };
  
  exports.signup = async (req, res) => {
    const { email, password, firstName, lastName } = req.body;
    try {
      const User = await user.findOne({ email });
  
      if (User) {
        return res.status(400).json({ message: "User already exists" });
      }
  
      const hashedPassword = await bcrypt.hash(password, 12);
  
      const result = await user.create({
        email,
        password: hashedPassword,
        name: `${firstName} ${lastName}`,
      });
  
      const token = jwt.sign({ email: result.email, id: result._id }, secret, {
        expiresIn: "1h",
      });
      res.status(201).json({ result, token });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
      console.log(error);
    }
  };
  
  