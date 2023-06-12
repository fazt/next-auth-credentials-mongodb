"use client";
import { useSession, signOut } from "next-auth/react";

function ProfilePage() {
  const { data: session, status } = useSession();

  console.log(session, status);

  return (
    <div>
      <h1>Profile</h1>

      <pre>
        {JSON.stringify(
          {
            session,
            status,
          },
          null,
            2
        )}
      </pre>

      <button
      className="bg-zinc-800 px-4 py-2 block mb-2"
        onClick={() => {
          signOut();
        }}
      >
        Signout
      </button>
    </div>
  );
}

export default ProfilePage;
