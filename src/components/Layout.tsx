import { ReactNode } from "react";
import Link from "next/link";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <header>
        {/* <nav>
          <Link href="/login">Login</Link> |{" "}
          <Link href="/register">Register</Link> |{" "}
          <Link href="/mypage">My Page</Link>
        </nav> */}
      </header>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
