import React from "react";
import { render, fireEvent } from "@testing-library/react"
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

    const { queryByText } = launch(<TestComponent />)
    expect(queryByText(helpButtonText)).toBeInTheDocument();
});

test('Does not render if predicate is false', () => {

    const { queryByText } = launch(<TestComponent />, () => false);
    expect(queryByText(helpButtonText)).toBeNull()
});

test('Tooltip does not show tooltip as default', () => {

    const { queryByText } = launch(<TestComponent />);
    expect(queryByText(tooltipContent)).not.toBeInTheDocument();
});

test('Tooltip does show if users presses help button', () => {

    const { queryByText, getByText } = launch(<TestComponent />);

    expect(queryByText(tooltipContent)).not.toBeInTheDocument();
    fireEvent.click(getByText(helpButtonText));

    expect(queryByText(tooltipContent)).toBeInTheDocument();
    expect(queryByText(understoodButtonText)).toBeInTheDocument();
});

test('Tooltips may be hidden after being shown', () => {

    const { getByText, queryByText } = launch(<TestComponent />);

    fireEvent.click(getByText(helpButtonText));

    expect(queryByText(helpButtonText)).not.toBeInTheDocument();
    expect(getByText(understoodButtonText)).toBeInTheDocument();
    expect(getByText(tooltipContent)).toBeInTheDocument();

    fireEvent.click(getByText(understoodButtonText));
    expect(getByText(helpButtonText)).toBeInTheDocument();
    expect(queryByText(understoodButtonText)).not.toBeInTheDocument();
    expect(queryByText(tooltipContent)).not.toBeInTheDocument();
});