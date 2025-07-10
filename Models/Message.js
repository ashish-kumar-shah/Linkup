const { Schema, model } = require('mongoose');

const messageSchema = new Schema(
  {
    from: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    to: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    isRead:{type:Boolean,default:false},
  
  },
  { timestamps: true }
);

const Message = model('Message', messageSchema);
module.exports = Message;
