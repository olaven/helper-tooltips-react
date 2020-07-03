import * as React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { TooltipHelpProvider } from '../index'

const launch = (Component: React.ReactElement, predicate = () => true) => render(<TooltipHelpProvider predicate={predicate}>
    {Component}
</TooltipHelpProvider>)

test('Renders', async () => {

    const { getByText } = launch(<div />)
    expect(getByText('help')).toBeInTheDocument();
})