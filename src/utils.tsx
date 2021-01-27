import React from "react";

export type ReactComponent<P> =
  | React.FunctionComponent<P>
  | React.ComponentClass<P, any>;

export enum IconSize {
  SMALL = "small",
  MEDIUM = "medium",
  LARGE = "large",
}

export type IconConfig = {
  iconSize?: IconSize;
  svgTitle?: string;
  classNames?: {
    container?: string;
    icon?: string;
  };
  handleClick?: () => any;
};

export const createIconElement = (
  Icon: ReactComponent<any>,
  iconConfig: IconConfig = {}
) => (
  <span
    className={`icon ${
      iconConfig.iconSize ? `is-${iconConfig.iconSize}` : ""
    } ${
      iconConfig.classNames?.container ? iconConfig.classNames.container : ""
    }`}
    onClick={iconConfig?.handleClick}
  >
    <Icon
      title={iconConfig.svgTitle}
      className={`ico ${
        iconConfig.iconSize ? `is-${iconConfig.iconSize}` : ""
      } ${iconConfig.classNames?.icon ? iconConfig.classNames.icon : ""}`}
    />
  </span>
);
