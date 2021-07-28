import mongoose from 'mongoose';
import { PasswordService } from '../services/password';

//Interface that describes the properties required to create new user

interface UserAttributes {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;

        delete ret.password;
        delete ret.__v;
        delete ret._id;
      },
    },
  }
);

userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashed = await PasswordService.toHash(this.get('password'));
    this.set('password', hashed);
  }

  done();
});
//Interface that describes user model properties
interface userModel extends mongoose.Model<userDoc> {
  build(attrs: UserAttributes): userDoc;
}

//Interface describing properties of user document

interface userDoc extends mongoose.Document {
  email: string;
  password: string;
}
userSchema.statics.build = (attrs: UserAttributes) => {
  return new User(attrs);
};

const User = mongoose.model<userDoc, userModel>('User', userSchema);

export { User };
