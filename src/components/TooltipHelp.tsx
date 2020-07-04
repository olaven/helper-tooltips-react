import React, { createContext, ReactElement, useState } from "react";

interface TooltipHelp {
  /**
   * Button triggering context-wide
   * `Tooltip`-visibility
   */
  HelpButton: (props) => ReactElement | null
  /**
   * Tooltip to be wrapped around other 
   * elements. 
   */
  Tooltip: ({ content, children }) => ReactElement | null
}
type ProviderArguments = {
  children: any,
  predicate: () => boolean,
  renderButton: (visible: boolean) => ReactElement,
  renderTooltip: (visible: boolean, children, content) => ReactElement
}





export const TooltipHelp = createContext<TooltipHelp>({ HelpButton: () => null, Tooltip: () => null });

export const TooltipHelpProvider = ({ children, predicate, renderTooltip, renderButton }: ProviderArguments) => {

  const [visible, setVisible] = useState(false)

  const Tooltip = ({ children, content }) => renderTooltip(visible, children, content)
  const HelpButton = () => predicate() ?
    <div onClick={() => setVisible(!visible)}>
      {renderButton(visible)}
    </div> :
    null


  return <TooltipHelp.Provider value={{ HelpButton, Tooltip }}>
    {children}
  </TooltipHelp.Provider>
};

