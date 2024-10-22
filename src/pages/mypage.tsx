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

  const getUserInfo = () => {
    if (session) {
      return {
        email: session.user?.email,
        // id: session.user?.id,
      };
    }
    return null;
  };

  const userInfo = getUserInfo();

  return (
    <div>
      <h1>Welcome to My Page</h1>
      {userInfo ? (
        <>
          <p>Logged in as {userInfo.email}</p>
          {/* <p>User ID: {userInfo.id}</p> */}
        </>
      ) : (
        <p>Loading...</p>
      )}
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
