"use client"

import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const handleSignOut = async () => {
    let { error } = await supabase.auth.signOut();
    if (error) console.error('Error signing out:', error.message);
    else router.push('/login');
  };

  return (
    <>
  <div>you are Logged in</div>
  <div>There's nothing more here :(</div>
  <div>
    <div className="text-blue-500 hover:underline"onClick={handleSignOut}>Log out</div>
  </div>
  </>
  );
}
