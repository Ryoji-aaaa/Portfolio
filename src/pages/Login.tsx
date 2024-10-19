import React, { useState } from "react";
import { useRouter } from "next/router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
        //alert("メールアドレスまたはパスワードが違います");
      }
    } else {
      //alert("アカウントが存在しません");
    }
  };

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    // alert("正しいメールアドレスを入力してください");
    return;
  }
  if (password.length < 6) {
    // alert("パスワードは6文字以上にしてください");
    return;
  }
  

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
        <button type="submit">ログイン</button>
      </form>
      <p>
        アカウントをお持ちでない方は
        <button
          onClick={() => {
            /* Add your navigation logic here */
          }}
          style={{
            background: "none",
            border: "none",
            color: "blue",
            textDecoration: "underline",
            cursor: "pointer",
          }}
        >
          こちら
        </button>
      </p>
    </div>
  );
};

export default Login;
