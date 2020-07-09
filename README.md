# Tooltip Help  
This is a tiny React utility for displaying help to the user, 
at appropriate times. I made it with [Tippy.js](https://atomiks.github.io/tippyjs/) in mind, but you can use whatever you want to render the tooltips!

# Basic Example 
```tsx
import { useContext } from "react"
import { TooltipHelpProvider, TooltipHelp } from "tooltip-help-react";


const Page = () => <TooltipHelpProvider
    predicate={() => true} //or false? or depending on time since user registration? Depending on whatever you want :-) 
    renderButton={(visible) => <button>
        {visible ? "OK!" : "Help me"}
    </button >}
    renderTooltip={(visible, children, content) => <div>
        <div style={{ color: "orange" }}>
            {visible && content}
        </div>
        {children}
    </div>}
>
    <SomeComponent />
</TooltipHelpProvider>

export default Page;

const SomeComponent = () => {

    const { HelpButton, Tooltip } = useContext(TooltipHelp);

    return <div>
        <HelpButton />
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
import { useContext } from "react"
import Tippy from "@tippyjs/react"
import { TooltipHelpProvider, TooltipHelp } from "tooltip-help-react";

export default () => <CustomTooltipProvider>
    <SomeComponent></SomeComponent>
</CustomTooltipProvider>


const CustomTooltipProvider = ({ children }) => <TooltipHelpProvider
    predicate={() => true}
    renderButton={(visible) => <button>
        {visible ? "Understood" : "Help"}
    </button >}
    renderTooltip={(visible, children, content) => {
        console.log("attemptin to render tooltip");
        //return <div>{visible ? "Hei tooltip" : ""}</div>
        return <Tippy
            visible={visible}
            content={content}>
            {children}
        </Tippy>
    }}
>
    {children}
</TooltipHelpProvider>

const SomeComponent = () => {

    const { HelpButton, Tooltip } = useContext(TooltipHelp);

    return <div>
        <HelpButton />
        <Tooltip content={"Explanation of A"}>
            <div>A</div>
        </Tooltip>
        <Tooltip content={"Explanation of B"}>
            <div>B</div>
        </Tooltip>
    </div>
}
```
