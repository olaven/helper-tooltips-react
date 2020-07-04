# Tooltip Help  
This is a tiny React utility for displaying help to the user, 
at the appropriate times. I made it with [Tippy.js](https://atomiks.github.io/tippyjs/) in mind, but you can use whatever you like!

# Basic Example 
```tsx
import { useContext } from "react"
import { TooltipHelpProvider, TooltipHelp } from "tooltip-help-react";

const Page = () => <TooltipHelpProvider
    predicate={() => user.isNew}
    renderButton={(visible) => <button>
        {visible? "OK!": "Help me"}
    </button >}
    renderTooltip={(visible, children, content) => <div>
        <div style={{color: "yellow"}}>
            {visible && content}
        </div>
        {children}
    </div>}
>
    <SomeComponent/>
</TooltipHelpProvider>

const SomeComponent = () => {

    const { HelpButton, Tooltip } = useContext(TooltipHelp); 

    return <div>
        <HelpButton/>
        <Tooltip content={"Explanation of A"}>
            A!
        </Tooltip>
        <Tooltip content={"Explanation of B"}>
            B!
        </Tooltip>
    </div>
}
```

## Tippy.js Example
```tsx
const Page = () => <TooltipHelpProvider
    predicate={() => user.isNew}
    renderButton={(visible) => <button>
        {visible ? text.tooltips.understoodButton : text.tooltips.helpButton}
    </button >}
    renderTooltip={(visible, children, content) => <Tippy visible={visible} content={content}>
        {children}
    </Tippy>}
>
    <SomeComponent/>
</TooltipHelpProvider>

const SomeComponent = () => {

    const { HelpButton, Tooltip } = useContext(TooltipHelp); 

    return <div>
        <HelpButton/>
        <Tooltip content={"Explanation of A"}>
            A!
        </Tooltip>
        <Tooltip content={"Explanation of B"}>
            B!
        </Tooltip>
    </div>
}
```
