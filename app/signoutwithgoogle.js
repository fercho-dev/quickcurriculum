import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";

async function signOutUser() {
    //Sign out with the Firebase client
    await signOut(auth);

    //Clear the cookies in the server
    const response = await fetch("/api/logoutwithgoogle", {
      method: "POST",
    });

    if (response.status === 200) {
      router.push("/login");
    }
  }