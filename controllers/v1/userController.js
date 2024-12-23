//const express = require('express');
const User = require('../../models/User');

//const users = []; //simulate database

//@desc POST Create a new user
//@route POST /v1/users
//@access PUBLIC

const createUserHandler = async (req , res) =>{
    try{
      let {name, gender, age, email} = req.body;
      const lowerCasegender = gender.toLowerCase();

      if(typeof name !=='string'){
        res.status(400).json({message: 'name must be letters'});
        return;
      }

      if(typeof gender !=='string'){
        res.status(400).json({message: 'name must be letters'});
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

       const user = User.build({ name: name, gender: lowerCasegender, age: age, email: email });
       await user.save();

      // const user = {
      //   id: users.length,
      //   name:name,
      //   gender:gender,
      //   age:age,
      //   email: email
     // };

              
      //users.push(user);
       res.status(201).json({message: 'user created successfully', user});
  

       return;
      


    }catch(error){
      res.status(500).json({message: error});
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
      res.status(500).json({message: message.error})
    }
  };
  
  //@desx GET retrieve a user
  //route GET /v1/users/:id
  //access PUBLIC

  const getUserHandler = async (req, res) =>{
    try{
      const id = Number(req.params.id);
      if(typeof id != 'number'){
        res.status(400).json( {message: 'Id must be a number'});
        return;
      }
      const users = await User.findOne({where: {id: id} });
      if(!users){
        res.status(400).json( {message: 'user not found'});
        return;
      
      }
      
      res.status(200).json(users);
  
    }catch(error){
      res.status(500).json({message: message.error})
    }
  };
  
  
  //@desc PUT Updates a new user
  //route PUT /v1/users/:id
  //@access PUBLIC
  
  const updateUserHandler = async (req, res) =>{
    try{
      const id = req.params.id;
      const {name, gender, age, email} = req.body;
  
      if (id >= users.length){
        res.status(404).json({message: 'user not found'});
        return;
    };
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
  
      // const user = {
      //   id: users.length,
      //   name:name,
      //   gender:gender,
      //   age:age,
      //   email: email
      // };
    
      // users[id] = user;
      res.status(200).json(user);
      return;
  
    }catch(error){
      res.status(500).json({message: message.error})
    }
  };
  
  
  //@desc DELETE deletes a user
  //route DELETE /v1/users/:id
  //@access PUBLIC
  
  const deleteUserHandler = async (req, res) =>{
    try{
      const id =req.params.id;
      if (id >= users.length){
      res.status(404).json({message: 'user not found'});
      return;
    }
      users.splice(id, 1);
      res.status(200).json({message: 'user deleted successfully'})
      
    }catch(error){
      res.status(500).json({message: message.error})
    }
  };
  
  
  
  
  
  
  module.exports = {
    createUserHandler,
    getUsersHandler,
    getUserHandler,
    updateUserHandler,
    deleteUserHandler
  
  };
  