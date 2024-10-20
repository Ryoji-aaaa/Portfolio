import React from 'react';

const DisplayScreen: React.FC = () => {
  return (
    <div>
      <h2>店頭で提示する画面</h2>
      <p>日付: [予約日]</p>
      <p>メールアドレス: [メールアドレス]</p>
      <p>ID: [予約ID]</p>
      <p>バーコード: [バーコード]</p>
      <button onClick={() => window.location.href = '/mypage'}>mypageに戻る</button>
    </div>
  );
    

};

export default DisplayScreen;
