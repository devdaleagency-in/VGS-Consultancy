import mongoose from 'mongoose';

const ContentSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    unique: true,
    enum: ['success-stories', 'destinations', 'about']
  },
  data: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  }
}, { timestamps: true });

const Content = mongoose.models.Content || mongoose.model('Content', ContentSchema);

export default Content;
