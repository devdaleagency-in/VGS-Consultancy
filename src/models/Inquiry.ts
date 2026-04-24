import mongoose, { Schema, model, models } from 'mongoose';

export interface IInquiry {
  name: string;
  email: string;
  phone: string;
  country: string;
  course: string;
  visaType: string;
  message: string;
  createdAt: Date;
}

const InquirySchema = new Schema<IInquiry>({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    lowercase: true,
    trim: true,
  },
  phone: {
    type: String,
    required: [true, 'Please provide a phone number'],
  },
  country: {
    type: String,
    required: [true, 'Please provide a target country'],
  },
  course: {
    type: String,
    required: [true, 'Please provide a course interest'],
  },
  visaType: {
    type: String,
    required: [true, 'Please select a visa type'],
  },
  message: {
    type: String,
    required: [true, 'Please provide a message'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Inquiry = models.Inquiry || model<IInquiry>('Inquiry', InquirySchema);

export default Inquiry;
