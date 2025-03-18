const Notification = ({ message, hasError }) => {
  return <p className={hasError ? "message error" : "message"}>{message}</p>;
};

export default Notification;
