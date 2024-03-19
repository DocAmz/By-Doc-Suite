import mongoose, { models } from "mongoose";

const typeDocSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  editorState: {
    type: String,
    required: false
  }
}, { timestamps: true });

const TypeDoc = mongoose.models.TypeDoc || mongoose.model('TypeDoc', typeDocSchema);

export default TypeDoc;