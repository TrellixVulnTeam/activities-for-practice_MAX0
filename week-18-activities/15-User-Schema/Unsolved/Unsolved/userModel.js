var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var UserSchema = new Schema({
  /* TODO:
   * Add four entries into our schema. These should be:
   *

   * 1: username: A string that will be be required, and also trimmed.
   * 2: password: A string that will be required, trimmed, and at least 6 characters.
   * 3: email: A string that must be a valid email address and unique in our collection.
   * 4: userCreated: A date that will default to the current date.
   *
   * TIP: The regex for checking if a string is an email is: /.+\@.+\..+/
   * Use that with the model attribute that checks for a valid match.
   * -/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/ */
     // `string` is a required field, and a custom error message is thrown if it is not supplied
  username: {
    type: String,
    trim: true,
    unique: true,
    required: "Username is required"
  },
  password: {
    type: String,
    trim: true,
    required: "Password is required",
    validate: [
      // Function takes in the new `longstring` value to be saved as an argument
      function(input) {
        // If this returns true, proceed. If not, return the error message below
        return input.length >= 6;
      },
      // Error Message
      "Password should be longer."
    ]
  },
  // password: {
  //   type: String,
  //   trim: true,
  //   minlength: 6,
  //   required: "password is Required"
  // },
  email: {
    type: String,
    trim: true,
    unique: true,
    match: [/.+@.+\..+/, "Please enter a valid email address"]
  },
  userCreated: {
    type: Date,
    default: Date.now
  },
});

// This creates our model from the above schema, using mongoose's model method
var User = mongoose.model("User", UserSchema);

// Export the User model
module.exports = User;
