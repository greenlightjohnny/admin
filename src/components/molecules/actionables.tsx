import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import clsx from "clsx"
import React from "react"
import Button from "../fundamentals/button"
import MoreHorizontalIcon from "../fundamentals/icons/more-horizontal-icon"

export type ActionType = {
  label: string
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
  variant?: "normal" | "danger"
  icon: React.ReactNode
}

type ActionablesProps = {
  actions: ActionType[]
}

/**
 * A component that accepts multiple actionables and renders them as a dropdown menu.
 * If only a single actionable is provided, it will render a button instead.
 */
const Actionables: React.FC<ActionablesProps> = ({ actions }) => {
  if (!actions || actions?.length === 0) {
    return null
  }

  return actions.length > 1 ? (
    <div>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <Button
            className="w-8 h-8 p-1.5 focus:border-none focus:shadow-none"
            variant="ghost"
            size="small"
          >
            <MoreHorizontalIcon size={20} />
          </Button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Content
          sideOffset={5}
          className="border bg-grey-0 border-grey-20 rounded-rounded shadow-dropdown p-xsmall min-w-[200px] z-30"
        >
          {actions.map((action, i) => {
            return (
              <DropdownMenu.Item key={i}>
                {
                  <Button
                    variant="ghost"
                    size="small"
                    className={clsx(
                      "w-full",
                      action.variant === "danger" ? "text-rose-50" : ""
                    )}
                    onClick={action.onClick}
                  >
                    {action.icon}
                    {action.label}
                  </Button>
                }
              </DropdownMenu.Item>
            )
          })}
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  ) : (
    <Button variant="ghost" size="small" onClick={actions[0].onClick}>
      {actions[0].icon}
      {actions[0].label}
    </Button>
  )
}

export default Actionables