import React, { useState } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import InfoBox from "@/components/InfoBox";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setErrorMessage("正しいメールアドレスを入力してください");
      return;
    }
    if (password.length < 6) {
      setErrorMessage("パスワードは6文字以上にしてください");
      return;
    }

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      setErrorMessage("メールアドレスまたはパスワードが違います");
    } else {
      router.push("/mypage");
    }
  };

  return (
    <div>
      <h1>ログイン</h1>
      <InfoBox mode="hint">
        <p>Guest ユーザーでログインする場合は、</p>
        <p>メールアドレス:abc@example.com</p>
        <p>パスワード:password123</p>
      </InfoBox>
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
      <p>
        パスワードを忘れた場合は
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

export default Login;
