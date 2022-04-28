import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import BestInvestmentMomentContainer from './';



test('BestInvestmentContainer - click "Get Result" button', async () => {
    const { container } = render(<BestInvestmentMomentContainer />);
    
    // Test Get Result button click.
    const btnGetResult = container.querySelector("#btn-get-result");
    fireEvent.click(btnGetResult as Element);

    await waitFor(() => {
        expect(screen.getByText(/buy date/i)).not.toBeNull();
    }, {timeout: 10000});
});

test('BestInvestmentContainer - click "Clear Cache" button', async () => {
    const { container } = render(<BestInvestmentMomentContainer />);
    
    // Test Clear Cache button click.
    const btnClearCache = container.querySelector("#btn-clear-cache");
    fireEvent.click(btnClearCache as Element);
    
    await waitFor(() => {
        expect(screen.getByText(/successfully/i)).not.toBeNull();
    }, {timeout: 10000});
});