import mongoose from 'mongoose'

const incomeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    projectedAmount: {
      type: Number,
    },
    actualAmount: {
      type: Number,
    },
    month: {
      // store as first day of month (e.g. new Date(Date.UTC(year, monthIndex, 1)))
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

export const Income = mongoose.model('Income', incomeSchema)
