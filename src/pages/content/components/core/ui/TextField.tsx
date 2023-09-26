import { Transition } from "@headlessui/react";
import classNames from "classnames";
import React, { forwardRef } from "react";

import If from "./If";
import Label from "./Label";

type Props = React.InputHTMLAttributes<unknown> & {
  icon?: JSX.Element;
  iconFullWidth?: boolean;
  iconPosition?: "left" | "right";
  iconFull?: boolean;
  iconNoBackground?: boolean;
  allowedRegex?: RegExp;
  forbiddenRegex?: RegExp;
  button?: JSX.Element;
};

const Hint: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <span
      className={`block pl-1 text-xs
        font-normal leading-tight text-gray-500 dark:text-gray-400`}
    >
      {children}
    </span>
  );
};

const Icon: React.FC<{
  icon?: JSX.Element;
  iconFullWidth?: boolean;
  iconPosition: "left" | "right";
  iconFull?: boolean;
  iconNoBackground?: boolean;
}> = ({ icon, iconFullWidth, iconPosition, iconFull, iconNoBackground }) => {
  return (
    <If condition={icon}>
      <span
        className={classNames("flex h-full items-center", {
          "px-2 [&>*]:h-6": !iconFull,
          "overflow-hidden rounded-l-md": iconFull,
          "[&>*]:w-6": !iconFullWidth && !iconFull,
          "[&>*]:h-fit [&>*]:w-fit": iconFullWidth,
          "rounded-s-md": iconPosition === "left",
          "rounded-e-md": iconPosition === "right",
          "bg-slate-700 [&>*]:text-white": !iconNoBackground,
        })}
      >
        {icon}
      </span>
    </If>
  );
};

const Input = forwardRef<React.ElementRef<"input">, Props>(
  function TextFieldInputComponent(
    {
      icon,
      iconFullWidth,
      iconPosition = "right",
      iconFull,
      iconNoBackground,
      allowedRegex,
      forbiddenRegex,
      button,
      className,
      children,
      ...props
    },
    ref
  ) {
    return (
      <div
        className={classNames(
          `active-within:ring-2 relative flex h-10 w-full items-center
        rounded-md border border-gray-200 bg-white font-medium text-gray-800
        shadow-sm ring-primary-200 ring-offset-1 transition-all focus-within:ring-2
        hover:border-gray-300 hover:bg-gray-50 
        dark:border-black-200 dark:bg-black-400
        dark:text-gray-200 dark:focus-within:ring-primary-500/70 dark:focus-within:ring-offset-black-500
        dark:hover:border-black-100 dark:focus:bg-black-400 lg:text-sm`,
          className,
          {
            [`cursor-not-allowed bg-gray-100 hover:bg-gray-100 dark:bg-black-400`]:
              props.disabled,
          }
        )}
      >
        <If condition={children}>
          <span className={"flex pl-2.5"}>{children}</span>
        </If>

        <If condition={iconPosition === "left"}>
          <Icon
            icon={icon}
            iconFullWidth={iconFullWidth}
            iconPosition={iconPosition}
            iconFull={iconFull}
            iconNoBackground={iconNoBackground}
          />
        </If>

        <input
          {...props}
          className={classNames(
            `h-10 flex-1 rounded-md bg-transparent px-3 py-2 outline-none disabled:cursor-not-allowed disabled:opacity-30`,
            className
          )}
          ref={ref}
          onKeyDown={(e: any) => {
            const authorizedKeys = ["Backspace", "ArrowLeft", "ArrowRight"];
            const value = e.key as string;

            if (authorizedKeys.includes(value)) return;
            if (forbiddenRegex && value) {
              const match = value.match(forbiddenRegex);

              if (match) {
                e.preventDefault();
              }
            }
            if (allowedRegex && value) {
              const match = value.match(allowedRegex);

              if (!match) {
                e.preventDefault();
              }
            }
          }}
          onWheelCapture={(e) => {
            if (props.type === "number") e.currentTarget.blur();
          }}
        />
        <If condition={iconPosition === "right"}>
          <Icon
            icon={icon}
            iconFullWidth={iconFullWidth}
            iconPosition={iconPosition}
            iconFull={iconFull}
            iconNoBackground={iconNoBackground}
          />
        </If>
        {button && button}
      </div>
    );
  }
);

type TextFieldComponent = React.FC<
  React.PropsWithChildren<{
    className?: string;
    center?: boolean;
  }>
> & {
  Label: typeof Label;
  Hint: typeof Hint;
  Input: typeof Input;
  Error: typeof ErrorMessage;
};

const TextField: TextFieldComponent = ({ children, className, center }) => {
  return (
    <div
      className={classNames(`flex`, className, {
        "flex-col space-y-1": !center,
        "justify-center": center,
      })}
    >
      {children}
    </div>
  );
};

const ErrorMessage: React.FC<
  { error: Maybe<string> } & React.HTMLAttributes<unknown>
> = ({ error, ...props }) => {
  const shouldDisplay = !!error;

  return (
    <Transition
      show={shouldDisplay}
      appear={shouldDisplay}
      enter="ease-out duration-200"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="ease-in duration-50"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <Hint>
        <span {...props} className={"py-0.5 text-red-700 dark:text-red-500"}>
          {error}
        </span>
      </Hint>
    </Transition>
  );
};

TextField.Hint = Hint;
TextField.Label = Label;
TextField.Input = Input;
TextField.Error = ErrorMessage;

export default TextField;
