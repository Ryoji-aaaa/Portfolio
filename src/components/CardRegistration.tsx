import React from 'react';

const CardRegistration: React.FC = () => {
    return (
        <div>
            <h1>Card Registration</h1>
            <form>
                <div>
                    <label htmlFor="cardNumber">Card Number:</label>
                    <input type="text" id="cardNumber" name="cardNumber" />
                </div>
                <div>
                    <label htmlFor="expiryDate">Expiry Date:</label>
                    <input type="text" id="expiryDate" name="expiryDate" />
                </div>
                <div>
                    <label htmlFor="cvv">CVV:</label>
                    <input type="text" id="cvv" name="cvv" />
                </div>
                <button type="submit">Register Card</button>
            </form>
        </div>
    );
};

export default CardRegistration;