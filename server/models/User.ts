import { Schema, model, models, Model as MongooseModel } from 'mongoose'
import bcrypt from 'bcrypt'

export interface UserProps {
  [key: string]: any
  _id: string
  email: string
  password: string
  role: 'user' | 'admin'
}
interface InstanceMethods extends Schema<UserProps> {
  isCorrectPassword(password: string): Promise<boolean>
}
export interface Model extends MongooseModel<UserProps, {}, InstanceMethods> {
  findAndValidate(username: string, password: string): Promise<UserProps | null>
}

const UserSchema = new Schema<UserProps, Model, InstanceMethods>({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Must match an email address!'],
  },
  password: {
    type: String,
    required: true,
    minlength: [5, 'Password is too short'],
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  __v: {
    type: Number,
    select: false
  }
}, {
  // schema options

  toObject: {
    transform: function (doc, rep, options) {
      delete rep.password
      rep._id = rep._id.toString()
      return rep
    }
  }
})

UserSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

// compare the incoming password with the hashed password
UserSchema.methods.isCorrectPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
UserSchema.statics.findAndValidate = async function (username, password) {
  let user = await this.findOne({ username })
  if (!user) return null
  let isValid = await user.isCorrectPassword(password)
  return isValid ? user : null
}

const User = models.User as Model || model<UserProps, Model>('User', UserSchema)

export default User