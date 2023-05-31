import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { ref, set, child, update } from 'firebase/database';

export const registerUser = async ({
  auth,
  database,
  name,
  email,
  password,
}) => {
  try {
    // Create user
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    // Database reference
    const databaseRef = ref(database);

    // Create user data
    const userData = {
      name,
      email,
      watchedMovies: [],
      queuedMovies: [],
      lastLogin: Date.now(),
    };

    // Add to the database
    set(child(databaseRef, 'users/' + user.uid), userData);

    return user;
  } catch (err) {
    console.log(err);
  }
};

export const loginUser = async ({ auth, database, name, email, password }) => {
  try {
    // Create user
    const { user } = await signInWithEmailAndPassword(auth, email, password);

    // Database reference
    const databaseRef = ref(database);

    // Create user data
    const userData = {
      lastLogin: Date.now(),
    };

    // Update to the database
    update(child(databaseRef, 'users/' + user.uid), userData);

    return user;
  } catch (err) {
    console.log(err);
  }
};

export const logOutUser = async (auth) => {
  try {
    await signOut(auth);
    console.log('Logged out succesfully!');
  } catch (err) {
    console.log(err);
  }
};

export const addMovieToDatabase = () => {};
