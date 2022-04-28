import React, { useState } from 'react';
import axios from 'axios';
import BestInvestmentMoment from './BestInvestmentMoment.component';



const BestInvestmentMomentContainer = () => {
    const [bestInvestmentMomentData, setBestInvestmentMomentData] = useState({});
    const [message, setMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const getBestInvestmentMoment = async (range: number, amount: number) => {
        setBestInvestmentMomentData({});
        setMessage("");
        setErrorMessage("");

        try {
            const res = await axios.get(
                process.env.REACT_APP_BASE_API_URL + "/gold-price/best-investment-moment",
                {
                    params: { range: range, amount: amount }
                }
            );

            setBestInvestmentMomentData(res.data);
        } catch (err: any) {
            setErrorMessage(err.response.data.message);
        }
    };

    const clearCache = async () => {
        setMessage("");
        setErrorMessage("");

        try {
            await axios.delete(process.env.REACT_APP_BASE_API_URL + "/cache/clear-all");
            setMessage("The cache cleared successfully.");
        } catch (err: any) {
            setErrorMessage(err.response.data.message);
        }
    };

    return (
        <div className='text-center mt-5'>
            <h1 className='mb-5'>Best Investment Moment for Gold Price</h1>
            <BestInvestmentMoment
                handleGetResult={getBestInvestmentMoment}
                handleClearCache={clearCache}
                data={bestInvestmentMomentData}
                message={message}
                errorMessage={errorMessage} />
        </div>
    );
};

export default BestInvestmentMomentContainer;