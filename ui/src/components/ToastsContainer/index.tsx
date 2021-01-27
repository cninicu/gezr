import React from "react";

import "./_index.scss";
import Toast from "../Toast";

type ToastsContainerProps = {
  dismissToast: (toastId: number) => void;
  toasts: any[];
};

const ToastsContainer: React.FunctionComponent<ToastsContainerProps> = (
  props
) => {
  return (
    <ul className="toasts-container">
      {props.toasts.map((toast) => {
        const { id } = toast;
        return (
          <Toast
            {...toast}
            key={id!}
            onDismissClick={() => {
              props.dismissToast(id!);
            }}
          />
        );
      })}
    </ul>
  );
};

export default ToastsContainer;
