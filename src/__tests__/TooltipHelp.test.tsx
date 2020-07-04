import * as React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { TooltipHelpProvider, TooltipHelp } from '../index'

const launch = (Component: React.ReactElement, predicate = () => true) => render(<TooltipHelpProvider predicate={predicate}>
    {Component}
</TooltipHelpProvider>);

const TestComponent = () => {

    const { HelpButton, Tooltip } = React.useContext(TooltipHelp);

    return <>
        <HelpButton />
        <Tooltip content="explanation">
            <div>Some feature</div>
        </Tooltip>
    </>
}

test('Renders', async () => {

    const { getByText } = launch(<TestComponent />)
    expect(getByText('Help')).toBeInTheDocument();
})