import * as React from 'react'
import { render } from '@testing-library/react'
import { fireEvent, waitFor } from '@testing-library/dom'
import '@testing-library/jest-dom/extend-expect'
import { TooltipHelpProvider, TooltipHelp } from '../index'
import Tippy from "@tippyjs/react"


const helpButtonText = "Help";
const understoodButtonText = "Understood";
const tooltipContent = "Some Tooltip Content";

const launch = (Component: React.ReactElement, predicate = () => true) => render(<TooltipHelpProvider
    predicate={predicate}
    renderButton={(visible) => <button>{visible ? understoodButtonText : helpButtonText}</button>}
    renderTooltip={(visible, children, content) => <Tippy visible={visible} content={content}>
        {children}
    </Tippy>}
>
    {Component}
</TooltipHelpProvider>);


const TestComponent = () => {

    const { HelpButton, Tooltip } = React.useContext(TooltipHelp);

    return <>
        <HelpButton />
        <Tooltip content={tooltipContent}>
            <div>Some feature</div>
        </Tooltip>
    </>
}

test('Renders', async () => {

    const { getByText } = launch(<TestComponent />)
    expect(getByText(helpButtonText)).toBeInTheDocument();
});

test('Does not render if predicate is false', () => {

    const { getByText } = launch(<TestComponent />, () => false);
    expect(getByText(helpButtonText)).not.toBeInTheDocument();
});

test('Tooltip does not show tooltip as default', () => {

    const { getByText } = launch(<TestComponent />);
    expect(getByText(tooltipContent)).not.toBeInTheDocument();
});

test('Tooltip does show if users presses help button', () => {

    const { getByText } = launch(<TestComponent />);

    expect(getByText(tooltipContent)).not.toBeInTheDocument();
    fireEvent.click(getByText(helpButtonText));

    waitFor(() => {

        expect(getByText(tooltipContent)).toBeInTheDocument();
        expect(getByText(understoodButtonText)).toBeInTheDocument();
    });
})