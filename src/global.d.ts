import Chrome from "chrome";

declare namespace chrome {
  export default Chrome;
}

declare module "virtual:reload-on-update-in-background-script" {
  export const reloadOnUpdate: (watchPath: string) => void;
  export default reloadOnUpdate;
}

declare module "virtual:reload-on-update-in-view" {
  const refreshOnUpdate: (watchPath: string) => void;
  export default refreshOnUpdate;
}

declare module "*.svg" {
  import React = require("react");
  export const ReactComponent: React.SFC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

declare module "*.jpg" {
  const content: string;
  export default content;
}

declare module "*.png" {
  const content: string;
  export default content;
}

declare module "*.json" {
  const content: string;
  export default content;
}

// custom
declare global {
  type StringObject = Record<string, string>;
  type NumberObject = Record<string, number>;
  type UnknownObject = Record<string, unknown>;
  type BooleanObject = Record<string, boolean>;
  type UnixTimestamp = number;

  type WithId<T> = T & {
    id: string;
  };

  type Truthy<T> = false extends T
    ? never
    : 0 extends T
    ? never
    : "" extends T
    ? never
    : null extends T
    ? never
    : undefined extends T
    ? never
    : T;

  type Falsy = false | 0 | "" | null | undefined;
  type Maybe<T> = T | undefined;

  type EmptyCallback = () => void;
}

declare module "react" {
  type FCC<Props = Record<string, unknown>> = React.FC<
    React.PropsWithChildren<Props>
  >;
}
