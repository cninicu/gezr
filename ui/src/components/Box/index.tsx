import React from "react";

type BoxProps = {
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void | undefined;
  className?: string;
};

const Box: React.FunctionComponent<BoxProps> = (props) => {
  const getClassNames = () => {
    let classes = "box";

    if (props.className) {
      classes += ` ${props.className}`;
    }

    return classes;
  };
  return (
    <div className={getClassNames()} onClick={props.onClick}>
      {props.children}
    </div>
  );
};

export default Box;
