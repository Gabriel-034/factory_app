"use client"

import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [username, setUsername] = useState("");
  const router = useRouter();

  const handleSignOut = async () => {
    let { error } = await supabase.auth.signOut();
    if (error) console.error('Error signing out:', error.message);
    else router.push('/login');
  };

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN') {
          setUsername(session?.user?.user_metadata?.full_name || "");
        }
      }
    );

    // Cleanup the subscription on unmount
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <>
  <div>you are Logged in {username}</div>
  <div>There's nothing more here :(</div>
  <div>
    <div className="text-blue-500 hover:underline"onClick={handleSignOut}>Log out</div>
  </div>
  </>
  );
}
