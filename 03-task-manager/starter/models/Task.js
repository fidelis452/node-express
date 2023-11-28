const mongoose = require("mongoose")

const taskSchema = new mongoose.Schema({
   name: {
      // validators
      type: String,
      required: [true, 'Must provide a name'],
      trim: true,
      maxLength: [20, 'The name cannot be more that 20 character']
   },
   completed: {
      type: Boolean,
      default: false
   }
})

module.exports = mongoose.model('Task', taskSchema);