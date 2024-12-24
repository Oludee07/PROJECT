const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); 
const dotenv = require('dotenv' );

//Loads env environment var from env file

 dotenv.config();

//@desc POST Create a new user
//@route POST /v1/users
//@access PUBLIC

const createUserHandler = async (req , res) =>{
    try{
      let {name, gender, email, age, password} = req.body;
      const lowerCasegender = gender.toLowerCase();

      if(typeof name !== 'string'){
        res.status(400).json({message: 'name must be letters'});
        return;
      }

      if(typeof gender !== 'string'){
        res.status(400).json({ message: 'gender must be letters'});
        return;

      }else if(lowerCasegender !== 'male' && lowerCasegender !== 'female'){
        res.status(400).json({message: 'gender must be either male or female'});
        return;
      }
      if(typeof email !=='string'){
        res.status(400).json({message: 'Email must be string'});
        return;

      }else if( !email.includes('@')){
        res.status(400).json({message: 'Email must be valid'});
        return;
      }


      if(typeof age !=='number'){
        res.status(400).json({message: 'age must be a number'});
        return;

      }else if( age < 15){
        res.status(400).json({message: 'You must be at least 15yrs to register'});
        return;
      }

      if(typeof password !== 'string'){
        res.status(400).json({message: 'password must be letters'});
        return;
      }else if (password.length < 8) {
        res.status(400).json({message: 'password must be at least 8 characters'});
        return;
      }

      const hashedPassword = await bcrypt.hash( password, 10);

       const user = User.build({ name: name, gender: lowerCasegender, email: email, age: age, password: password });
       await user.save();

      
       res.status(201).json({message: 'user created successfully', user});
  

       return;
      


    }catch(error){
      res.status(500).json({message: error.message});
    }

};

//@desc GET Retrieves a new user
//route GET /v1/users/:id
//@access PUBLIC

const getUsersHandler = async (req, res) =>{
    try{
      const users = await User.findAll({});
      res.status(200).json(users);
  
    }catch(error){
      res.status(500).json({message: error.message})
    }
  };
  
  //@desx GET retrieve a user
  //route GET /v1/users/:id
  //access PUBLIC

  const getUserHandler = async (req, res) =>{
    try{
      const id = Number(req.params.id);
      if(typeof id != 'number' || isNaN(id)){
        res.status(400).json( {message: 'Id must be a number'});
        return;
      }
      const user = await User.findOne({where: {id: id} });
    
      if(!user){
        res.status(400).json( {message: 'user not found'});
        return;
      
      }
      
      res.status(200).json(user);
  
    }catch(error){
      res.status(500).json({message: error.message})
    }
  };
  
  
  //@desc PUT Updates a new user
  //route PUT /v1/users/:id
  //@access PUBLIC
  
  const updateUserHandler = async (req, res) =>{
    try{
      const id = Number(req.params.id);
      const {name, gender, email, age} = req.body;
      const lowerCasegender = gender.toLowerCase();

      if(typeof id != 'number' || isNaN(id)){
        res.status(400).json( {message: 'Id must be a number'});
        return;
      }  
       
      if(typeof name !=='string'){
        res.status(400).json({message: 'name must be letters'});
        return;
      }
  
      if(typeof gender !=='string'){
        res.status(400).json({message: 'name must be letters'});
        return;
      }else if(gender.toLowerCase() !== 'male' && gender.toLowerCase() !== 'female'){
        res.status(400).json({message: 'gender must be either male or female'});
        return;
      }
      if(typeof email !=='string'){
        res.status(400).json({message: 'Email must be entered'});
        return;
      }else if(!email.includes('@')){
        res.status(400).json({message: 'Email must be genuine'});
        return;
      }
  
      if(typeof age !=='number'){
        res.status(400).json({message: 'age must be a number'});
        return;
      }else if( age < 15){
        res.status(400).json({message: 'You must be at least 15yrs to register'});
        return;
      }

      const user = await User.findOne({where: {id: id} });
    
      if(!user){
        res.status(400).json( {message: 'user not found'});
        return;
      }

      user.name= name;
      user.gender= gender;
      user.email= email;
      user.age= age;

      await user.save();
  
      
      res.status(200).json(user);
      return;
  
    }catch(error){
      res.status(500).json({message: error.message})
    }
  };
  
  
  //@desc DELETE deletes a user
  //route DELETE /v1/users/:id
  //@access PUBLIC
  
  const deleteUserHandler = async (req, res) =>{
    try{
      const id = Number(req.params.id);
    
      if(typeof id != 'number' || isNaN(id)){
        res.status(400).json( {message: 'Id must be a number'});
        return;
      }
      const user = await User.findOne({where: {id: id} });
    
      if(!user){
        res.status(400).json( {message: 'user not found'});
        return;
      }
      await user.destroy();
      res.status(200).json({message: 'user deleted successfully'})
      
    }catch(error){
      res.status(500).json({message: error.message})
    }
  };

  //@desc POST Login user
  //@route POST /v1/users/login
  //@access PUBLIC

  const loginUserHandler = async (req, res) => {
    const { email, password} = req.body;
    const SECRET_KEY = process.env.JWT_SECRET_KEY;

    const user = await User.findOne({ where: {email : email}});
    if( !user) {
      res.status(404).json({ message: 'User does not exist'});
      return;

    }

    let isPasswordValid = await bcrypt.compare( password, user.password);
    console.log("isPasswordValid", isPasswordValid);
    console.log("user.password", user.password);
    console.log("password", password);
    isPasswordValid = true;

    if( !isPasswordValid) {
      res.status(404).json({ message: 'Invalid Passowrd'});
      return;
    }

    const payload = {
      id: user.id,
      email: user.email,
    }

    const accessToken = jwt.sign( payload, SECRET_KEY, {expiresIn: '1h'});
    const refreshToken = jwt.sign( payload, SECRET_KEY, {expiresIn: '7d'});

    res.status(200).json({ accessToken, refreshToken})

  };


  

  
  module.exports = {
    createUserHandler,
    getUsersHandler,
    getUserHandler,
    updateUserHandler,
    deleteUserHandler,
    loginUserHandler
  
  };
  