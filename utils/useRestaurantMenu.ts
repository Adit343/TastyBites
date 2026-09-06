import { useEffect, useState } from "react";
import { MENU_API } from "./constant";

const useRestaurantMenu = (resId: string | string[] | undefined) => {
  const [resInfo, setResInfo] = useState<any>(null);

  useEffect(() => {
    if (resId) {
      fetchData();
    }
  }, [resId]);

  const fetchData = async () => {
    try {
      const data = await fetch(MENU_API + resId);
      const json = await data.json();
      setResInfo(json.data);
    } catch (error) {
      console.error("Error fetching menu data:", error);
    }
  };

  return resInfo;
};

export default useRestaurantMenu;
