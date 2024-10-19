const HomePage = () => {
  return (
    <>
      <div id="app">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <span className="index-loading">Loading</span>
          <p className="index-info">
            Loadingの表示のままの場合
            <br />
            Goolge Chrome{" "}
            <a target="_blank" href="https://www.google.com/intl/ja_jp/chrome/">
              最新版
            </a>
            をご利用ください。
          </p>
        </div>
      </div>
      <div>
        <h1>Welcome to the Home Page</h1>
      </div>
    </>
  );
};

export default HomePage;
