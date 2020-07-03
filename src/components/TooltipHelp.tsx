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
type ProviderArguments = { children: any, predicate: () => boolean }





export const TooltipHelp = createContext<TooltipHelp>({ HelpButton: () => null, Tooltip: () => null });

export const TooltipHelpProvider = ({ children, predicate }: ProviderArguments) => {

  const [visible, setVisible] = useState(false)

  const Tooltip = ({ content, children }) => <div>
    {content}
    {children}
  </div>


  //NOTE: questionable gain by turning this into an HOF instead of just passing it as props.. I should reconsider this.
  const modifyVisibility = (visible: boolean) =>
    () => {
      setVisible(visible)
    }

  const HelpButton = (props: any) => predicate() ? <div {...props}>
    {visible ?
      <button
        onClick={modifyVisibility(false)} /> :
      <button
        onClick={modifyVisibility(true)} />
    }
  </div> : null


  return <TooltipHelp.Provider value={{ HelpButton, Tooltip }}>
    {children}
  </TooltipHelp.Provider>
};

