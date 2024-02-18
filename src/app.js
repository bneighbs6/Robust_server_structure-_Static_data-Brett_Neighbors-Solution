const express = require("express");
const app = express();

const users = require("./data/users-data");
const states = require("./data/states-data");

// Needed to change the order of the TODOs. "/users/:userId" and "/states/:stateCode" need to be before the "/users" and "/states" respectively 



// TODO: return a single user by id from /users/:userId in form of { data: Object }

// Create route for "/users/:userId"
app.use("/users/:userId", (req, res, next) => {
  const userId = req.params.userId; // same as { userId } = req.params; 
  
  // using find(), find the user.id that matches userId from users array
  const foundUser = users.find((user) => user.id === Number(userId)); // Number(userId) sets userId to a number
  
  // Conditional Statements
  if (foundUser) {
    res.send({ data: foundUser })
  } else {
    next(`User ID not found: ${userId}`)
  }
})



// TODO: return an array of users from /users in form of { data: Array }

// Create route for "/users"
app.use("/users", (req, res, next) => {
    res.send({ data: users }); // send all of users data to client
});



// TODO: Return a single state from /states/:stateCode in the form of { data: { stateCode: String, name: String } }

// Create Route for "/states/:stateCode"
app.use("/states/:stateCode", (req, res, next) => {
  const { stateCode } = req.params; // create stateCode parameter
  const foundState = states[stateCode] // set foundState var = result of s
  console.log(foundState)
  if (foundState) {
    res.send({ data: { stateCode, name: foundState } })
  } else {
    next(`State code not found: ${stateCode}`)
  }
})



// TODO: return all states from /states in the form of { data: Array }
app.use("/states", (req, res, next) => {
  res.json({ data: states })
})



// TODO: add not-found handler
app.use((req, res, next) => {
  res.send(`Not found: ${req.originalUrl}`)
});

// TODO: Add error handler
app.use((error, req, res, next) => {
  console.log(error);
  res.send(error); 
})

module.exports = app;
