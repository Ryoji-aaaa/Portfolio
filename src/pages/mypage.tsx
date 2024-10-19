import { useEffect } from "react";
import { useRouter } from "next/router";

const MyPage = () => {
  const router = useRouter();

  useEffect(() => {
    const loggedIn = localStorage.getItem("loggedIn");
    if (loggedIn !== "true") {
      router.push("/login");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    router.push("/login");
  };

  return (
    <div>
      <h1>Welcome to My Page</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default MyPage;
