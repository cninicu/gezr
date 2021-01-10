import React from "react";

export type MessageProps = {
  type?: "is-warning" | "is-dark";
  header?: string;
  body?: string;
  classNames?: string;
};

const Message: React.FunctionComponent<MessageProps> = (props) => {
  const getMessageClasses = () => {
    let classNames = "message ";

    if (props.type) classNames += props.type;

    if (props.classNames) classNames += " " + props.classNames;

    return classNames;
  };

  return (
    <article className={getMessageClasses()}>
      <div className="message-header">
        <p>{props.header}</p>
      </div>
      <div className="message-body">{props.body}</div>
    </article>
  );
};

export default Message;
