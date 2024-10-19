import React, { useState, useEffect } from 'react';

const ReservationForm: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');

  useEffect(() => {
    // ローカルストレージからデータを取得してフォームに反映
    const savedDate = localStorage.getItem('selectedDate');
    const savedProduct = localStorage.getItem('selectedProduct');
    if (savedDate) setSelectedDate(savedDate);
    if (savedProduct) setSelectedProduct(savedProduct);
  }, []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // ローカルストレージに選択した情報を保存
    localStorage.setItem('selectedDate', selectedDate);
    localStorage.setItem('selectedProduct', selectedProduct);
    alert('予約が確定しました');
  };

  return (
    <div>
      <h2>商品の予約</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          required
        />
        <select
          value={selectedProduct}
          onChange={(e) => setSelectedProduct(e.target.value)}
          required
        >
          <option value="">商品を選択</option>
          <option value="product1">商品1</option>
          <option value="product2">商品2</option>
          <option value="product3">商品3</option>
        </select>
        <button type="submit">予約確定</button>
      </form>
    </div>
  );
};

export default ReservationForm;
