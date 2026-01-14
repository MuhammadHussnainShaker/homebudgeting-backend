import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    displayName: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [3, 'Name must be at least 3 characters long'],
      maxlength: [30, 'Name cannot exceed 30 characters'],
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
      // stored form must be E.164: + followed by 10–15 digits
      validate: {
        validator: isE164,
        message:
          'Please provide a valid phone number in E.164 format (e.g., +1234567890)',
      },
      set: function (phone) {
        if (phone === undefined) return phone
        return normalizePhone(phone, this.countryCode || '+92')
      },
    },
    phoneVerified: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
)

export const User = mongoose.model('User', userSchema)

// function to validate if phone number is in E.164 format
function isE164(p) {
  return /^\+\d{10,15}$/.test(p)
}

// function to convert phone number into E.164 format
function normalizePhone(phone, countryCode = '+92') {
  if (phone === undefined || phone === null) return phone
  const cc = String(countryCode).replace(/[^\d]/g, '')
  let s = String(phone)
    .trim()
    .replace(/^00/, '+')
    .replace(/[^\d+]/g, '')
  if (s.startsWith('+')) return '+' + s.slice(1).replace(/\+/g, '')
  s = s.replace(/^0+/, '').replace(/\+/g, '')
  if (s.startsWith(cc)) return '+' + s
  return '+' + cc + s
}
