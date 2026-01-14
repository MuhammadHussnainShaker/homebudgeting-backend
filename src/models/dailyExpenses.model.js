import mongoose from 'mongoose'

const dailyExpenseSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    monthlyCategoricalExpenseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'MonthlyCategoricalExpense',
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
    },
    date: {
      // exact day/time of expense — store as JS Date (normalize to UTC when creating)
      type: Date,
      required: true,
    },
  },
  { timestamps: true },
)

export const DailyExpense = mongoose.model('DailyExpense', dailyExpenseSchema)
