import firebase from '@firebase/app';
import '@firebase/firestore'
import app from '../base';

const User = {
  collection: 'users',
  baseRecord: {
    uid: null,
    created_at: firebase.firestore.FieldValue.serverTimestamp(),
    updated_at: firebase.firestore.FieldValue.serverTimestamp(),
  },
  create: async (stxAddress) => {
    const existingUser = await app.firestore()
      .collection(User.collection)
      .doc(stxAddress)
      .get()
    if (existingUser.exists) { return }

    await app.firestore()
      .collection(User.collection)
      .doc(stxAddress)
      .set({ ...User.baseRecord, uid: stxAddress })
    return
  }
};

export default User;
