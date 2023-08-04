import { NextResponse } from 'next/server';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth} from "../../firebaseConfig";

export async function POST(req) {
  const { email, password } = await req.json();
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const user = userCredential.user;
    console.log("signed up")
    console.log(user);
    console.log(userCredential);
    return NextResponse.json({ user: user });
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage);
    return NextResponse.json({ error: errorMessage, code: errorCode });
  };
}
