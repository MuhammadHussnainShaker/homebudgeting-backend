import mongoose from 'mongoose'
import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import { MonthlyCategoricalExpense } from '../models/monthlyCategoricalExpenses.model.js'

const createMonthlyCategoricalExpense = asyncHandler(async (req, res) => {
  const { parentId, description, projectedAmount, actualAmount, month } =
    req.body

  if (!description?.trim()) {
    throw new ApiError(
      400,
      'Description for monthly categorical expense is required',
    )
  }

  if (!month) {
    throw new ApiError(400, 'Month for monthly categorical expense is required')
  }

  if (!parentId && mongoose.Types.ObjectId.isValid(parentId)) {
    throw new ApiError(400, 'Missing or invalid Parent ID')
  }

  const monthlyCategoricalExpense = await MonthlyCategoricalExpense.create({
    userId: req.user._id,
    parentId: parentId,
    description: description.trim(),
    projectedAmount: projectedAmount ?? 0,
    actualAmount: actualAmount ?? 0,
    month,
  })

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        monthlyCategoricalExpense,
        'Monthly categorical expense created successfully',
      ),
    )
})

const toggleMonthlyCategoricalExpenseSelectable = asyncHandler(
  async (req, res) => {
    const { monthlyCategoricalExpenseId } = req.params
    const { selectable } = req.body

    if (!mongoose.Types.ObjectId.isValid(monthlyCategoricalExpenseId)) {
      throw new ApiError(400, 'Invalid monthly categorical expense ID format')
    }

    if (typeof selectable != 'boolean') {
      throw new ApiError(400, 'Please send the value in Boolean data type')
    }

    const updatedMonthlyCategoricalExpense =
      await MonthlyCategoricalExpense.findByIdAndUpdate(
        {
          _id: monthlyCategoricalExpenseId,
          userId: req.user._id,
        },
        {
          selectable: selectable,
        },
        {
          new: true,
        },
      )
        .lean()
        .exec()

    if (!updatedMonthlyCategoricalExpense) {
      throw new ApiError(
        404,
        'Monthly categorical expense not found or unauthorized',
      )
    }

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          updatedMonthlyCategoricalExpense,
          'The monthly categorical expense record is updated successfully',
        ),
      )
  },
)

const fetchSelectableCategoricalExpenses = async ({ userId, month }) => {
  if (!month) {
    throw new ApiError(
      400,
      'Month is required to fetch selectable categorical expenses',
    )
  }

  const monthStart = new Date(month)

  const monthEnd = new Date(
    Date.UTC(monthStart.getUTCFullYear(), monthStart.getUTCMonth() + 1, 1),
  )

  const selectableCategoricalExpenses = await MonthlyCategoricalExpense.find({
    userId: userId,
    month: {
      $gte: monthStart,
      $lt: monthEnd,
    },
    selectable: true,
  })
    .select('description')
    .sort({ month: 1 })
    .lean()

  return selectableCategoricalExpenses
}

const getMonthlyCategoricalExpenses = asyncHandler(async (req, res) => {
  const { month } = req.params

  if (!month) {
    throw new ApiError(
      400,
      'Month is required to get monthly categorical expense records',
    )
  }

  const monthStart = new Date(month)

  const monthEnd = new Date(
    Date.UTC(monthStart.getUTCFullYear(), monthStart.getUTCMonth() + 1, 1),
  )

  const monthlyCategoricalExpenses = await MonthlyCategoricalExpense.find({
    userId: req.user._id,
    month: {
      $gte: monthStart,
      $lt: monthEnd,
    },
  })
    .sort({ month: 1 })
    .lean() // Returns plain JS objects instead of heavy Mongoose documents for better speed and memory.
    .exec() //Returns a proper Promise for better error tracking and consistent async/await behavior.

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        monthlyCategoricalExpenses,
        `Monthly categorical expense records for ${monthStart.toISOString().slice(0, 7)} is fetched successfully`,
      ),
    )
})

const updateMonthlyCategoricalExpense = asyncHandler(async (req, res) => {
  const { monthlyCategoricalExpenseId } = req.params
  const { description, projectedAmount, actualAmount } = req.body

  if (!mongoose.Types.ObjectId.isValid(monthlyCategoricalExpenseId)) {
    throw new ApiError(400, 'Invalid monthly categorical expense ID format')
  }

  const existingMonthlyCategoricalExpense =
    await MonthlyCategoricalExpense.findOne({
      _id: monthlyCategoricalExpenseId,
      userId: req.user._id,
    })
      .lean()
      .exec()

  const dataToUpdate = {}

  if (description !== undefined && description !== null) {
    const trimmed = description.trim()
    if (trimmed.length > 0) {
      dataToUpdate.description = trimmed
    }
  }

  if (projectedAmount !== undefined && projectedAmount !== null)
    dataToUpdate.projectedAmount = projectedAmount

  if (
    existingMonthlyCategoricalExpense.selectable === false &&
    actualAmount !== undefined &&
    actualAmount !== null
  )
    dataToUpdate.actualAmount = actualAmount

  if (Object.keys(dataToUpdate).length === 0) {
    throw new ApiError(400, 'At least one field must be provided to update')
  }

  const updatedMonthlyCategoricalExpense =
    await MonthlyCategoricalExpense.findOneAndUpdate(
      { _id: monthlyCategoricalExpenseId, userId: req.user._id },
      { $set: dataToUpdate },
      {
        new: true,
        runValidators: true,
      },
    )
      .lean()
      .exec()

  if (!updatedMonthlyCategoricalExpense) {
    throw new ApiError(
      404,
      'Monthly categorical expense record not found or unauthorized',
    )
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        updatedMonthlyCategoricalExpense,
        'The monthly categorical expense record is updated successfully',
      ),
    )
})

const deleteMonthlyCategoricalExpense = asyncHandler(async (req, res) => {
  const { monthlyCategoricalExpenseId } = req.params

  if (!mongoose.Types.ObjectId.isValid(monthlyCategoricalExpenseId)) {
    throw new ApiError(400, 'Invalid monthly categorical expense ID format')
  }

  const deletedRecord = await MonthlyCategoricalExpense.findOneAndDelete({
    _id: monthlyCategoricalExpenseId,
    userId: req.user._id,
  }).exec()

  if (!deletedRecord) {
    throw new ApiError(
      404,
      'Monthly categorical expense record not found or you do not have permission to delete it',
    )
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        null,
        'The monthly categorical expense record is deleted successfully',
      ),
    )
})

export {
  createMonthlyCategoricalExpense,
  toggleMonthlyCategoricalExpenseSelectable,
  fetchSelectableCategoricalExpenses,
  getMonthlyCategoricalExpenses,
  updateMonthlyCategoricalExpense,
  deleteMonthlyCategoricalExpense,
}
