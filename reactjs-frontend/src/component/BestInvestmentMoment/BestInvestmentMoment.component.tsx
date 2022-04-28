import React, {useState} from 'react';
import * as moment from 'moment';



const BestInvestmentMoment = (props: any) => {
    const [range, setRange] = useState(5);
    const [amount, setAmount] = useState(135000);

    return (
        <div>
            <div id="message" className='text-success'>{props.message}</div>
            <div id="error-message" className='text-danger'>{props.errorMessage}</div>

            <div className='d-flex justify-content-center mt-3'>
                <label className='col-form-label me-1'>Range:</label>
                <input type='number' className='form-control me-4 w-auto' id='range' name='range' value={range} onChange={e => setRange(parseInt(e.target.value))} />
                <label className='col-form-label me-1'>Amount:</label>
                <input type='number' className='form-control me-4 w-auto' id='amount' name='amount' value={amount} onChange={e => setAmount(parseFloat(e.target.value))}/>
                <button type='button' id="btn-get-result" className='btn btn-primary me-2' onClick={() => props.handleGetResult(range, amount)}>Get Result</button>
                <button type='button' id="btn-clear-cache" className='btn btn-secondary' onClick={props.handleClearCache}>Clear Cache</button>
            </div>
            
            {
                props.data.buyDate &&
                <div className='mt-3'>
                    <div className='row'>
                        <div className='col-md-6 text-end'>Buy Date:</div>
                        <div className='col-md-6 text-start fw-bold'>{moment.default(props.data.buyDate).format("YYYY-MM-DD")}</div>
                    </div>
                    <div className='row'>
                        <div className='col-md-6 text-end'>Buy Price:</div>
                        <div className='col-md-6 text-start fw-bold'>{props.data.buyPrice}</div>
                    </div>
                    <div className='row'>
                        <div className='col-md-6 text-end'>Sell Date:</div>
                        <div className='col-md-6 text-start fw-bold'>{moment.default(props.data.sellDate).format("YYYY-MM-DD")}</div>
                    </div>
                    <div className='row'>
                        <div className='col-md-6 text-end'>Sell Price:</div>
                        <div className='col-md-6 text-start fw-bold'>{props.data.sellPrice}</div>
                    </div>
                    <div className='row'>
                        <div className='col-md-6 text-end'>Revenue:</div>
                        <div className='col-md-6 text-start fw-bold'>${props.data.revenue.toFixed(3)}</div>
                    </div>
                    <div className='row'>
                        <div className='col-md-6 text-end'>Profit:</div>
                        <div className='col-md-6 text-start fw-bold'>${props.data.profit.toFixed(3)}</div>
                    </div>
                </div>
            }
        </div>
    );
};

export default BestInvestmentMoment;