import React, { useState } from "react";
import { useRouter } from "next/router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const registeredUsers = localStorage.getItem("user");
    if (registeredUsers) {
      const user = JSON.parse(registeredUsers);
      if (user.email === email && user.password === password) {
        //alert("ログイン成功");
        localStorage.setItem("LoggedIn", "true");
        router.push("/mypage");
      } else {
        setErrorMessage("メールアドレスまたはパスワードが違います");
      }
    } else {
      setErrorMessage("アカウントが存在しません");
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setErrorMessage("正しいメールアドレスを入力してください");
      return;
    }
    if (password.length < 6) {
      setErrorMessage("パスワードは6文字以上にしてください");
      return;
    }
  };

  return (
    <div>
      <h1>ログイン</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="メールアドレス"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="パスワード"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        <button type="submit">ログイン</button>
      </form>
      <p>
        アカウントをお持ちでない方は
        <button
          className="underlineURL"
          onClick={() => {
            router.push("/register");
          }}
        >
          こちら
        </button>
      </p>
    </div>
  );
};

export default Login;
