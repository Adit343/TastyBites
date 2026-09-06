import { useEffect, useState } from "react";

const useOnlineStatus = (): boolean => {
  const [onlineStatus, setOnlineStatus] = useState<boolean>(true);

  useEffect(() => {
    const handleOffline = () => setOnlineStatus(false);
    const handleOnline = () => setOnlineStatus(true);

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, []);

  return onlineStatus;
};

export default useOnlineStatus;
