import { useState } from "react";

const useNotification = () => {
  const [notification, setNotification] = useState({
    message: "",
    type: "",
  });

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification({ message: "", type: "" });
    }, 4000);
  };

  return { notification, showNotification };
};

export default useNotification;
