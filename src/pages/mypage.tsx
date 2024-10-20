import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/react";

const MyPage = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  const handleLogout = () => {
    signOut({ callbackUrl: "/login" });
  };

  return (
    <div>
      <h1>Welcome to My Page</h1>
      {session && <p>Logged in as {session.user ? session.user.email : "session_null"}</p>}
      <button onClick={handleLogout}>Logout</button>
      <p>
        パスワードをリセットしたい場合は
        <button
          className="underlineURL"
          onClick={() => {
            router.push("/request-reset");
          }}
        >
          こちら
        </button>
      </p>
    </div>
  );
};

export default MyPage;
