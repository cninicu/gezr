import React, { useEffect } from "react";

// import { FeedbackLink } from "components/shared/UserFeedback";
// import ProgressCircle from "elements/ProgressCircle";

// import { ToastMessageType } from "store/toast-feedback/types";
// import { createIconElement } from "commonlib/react/icons/utils";

import { ReactComponent as ExitIcon } from "../../icons/uncheck-gradient.svg";

import "./_index.scss";
import { createIconElement } from "../../utils";

const DISMISS_TIMEOUT = 10000;

type ToastProps = {
  text: string;
  // links?: FeedbackLink[];
  onDismissClick: () => void;
};

const Toast: React.FunctionComponent<ToastProps> = (props) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      props.onDismissClick();
    }, DISMISS_TIMEOUT);

    return () => clearTimeout(timer);
  }, []);

  return (
    <li className={"toast"}>
      <div className="toast__content">
        <p className="has-text-weight-bold">{props.text}</p>
        {/*{props.links && (*/}
        {/*  <div className="toast__content__links">*/}
        {/*    {props.links.map((link, index) => (*/}
        {/*      <a key={index} href={link.pathname}>*/}
        {/*        {link.text}*/}
        {/*      </a>*/}
        {/*    ))}*/}
        {/*  </div>*/}
        {/*)}*/}
      </div>
      {createIconElement(ExitIcon, {
        classNames: { container: "toast__dismiss__icon" },
        handleClick: props.onDismissClick,
      })}
    </li>
  );
};

export default Toast;
