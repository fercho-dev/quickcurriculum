import { signInWithEmailAndPassword } from "firebase/auth";
import { NextResponse } from 'next/server';
import { auth } from "../../firebaseConfig";

export async function POST(req) {
  const { email, password } = await req.json();
  console.log(email, password);
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    const user = userCredential.user;
    return NextResponse.json({ user: user });
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    return NextResponse.json({ error: errorMessage, code: errorCode });
  }
}
