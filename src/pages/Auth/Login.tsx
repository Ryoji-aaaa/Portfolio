import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// type LoginProps = {
//   type: "email" | "password";
//   placeholder: "メールアドレス"|"メールアドレス";
//   onChange: (value: string) => void;
//   required: boolean;
//   onLogin: () => void;
// };

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    //add verification logic here
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert("正しいメールアドレスを入力してください");
      return;
    }
    if (password.length < 6) {
      alert("パスワードは6文字以上にしてください");
      return;
    }
    // show the email and password in the console
    console.log("Email:", email);
    console.log("Password:", password);
    //(Draft) check if the email and password are correct
    const correctEmail = "aaa.111@icloud.com";
    const correctPassword = "QWERTY";
    if (email === correctEmail && password === correctPassword) {
      alert("ログイン成功！");
      navigate("/mypage");
    } else {
      alert("メールアドレスまたはパスワードが正しくありません");
    }


  };
  return (
    <div>
      <h1>ログイン</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="メールアドレス"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="パスワード"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">ログイン</button>
      </form>
      <p>
        アカウントをお持ちでない方は
        <button onClick={() => navigate("/register")} style={{ background: "none", border: "none", color: "blue", textDecoration: "underline", cursor: "pointer" }}>こちら</button>
      </p>
          </div>
  );
};

export default Login;
