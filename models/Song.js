import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  // Schema definition here
});

export default mongoose.model('User', UserSchema);