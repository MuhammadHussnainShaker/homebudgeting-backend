import mongoose from 'mongoose'

const parentCategorySchema = new mongoose.Schema(
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
  },
  {
    timestamps: true,
  }
)

export const ParentCategory = mongoose.model(
  'ParentCategory',
  parentCategorySchema
)
