export interface Sla {
  deliveryTime?: number;
  minDeliveryTime?: number;
  maxDeliveryTime?: number;
  lastMileTravel?: number;
  serviceability?: string;
  slaString?: string;
  lastMileTravelString?: string;
  iconType?: string;
}

export interface RestaurantInfo {
  id: string;
  name: string;
  cloudinaryImageId: string;
  cuisines: string[];
  costForTwo?: string;
  costForTwoMessage?: string;
  avgRating?: number | string;
  sla?: Sla;
}

export interface RestaurantCardProps {
  resData: RestaurantInfo;
}

export interface MenuItemInfo {
  id: string;
  name: string;
  description?: string;
  imageId?: string;
  price?: number;
  defaultPrice?: number;
}

export interface MenuItemCard {
  card: {
    info: MenuItemInfo;
  };
}

export interface ItemListProps {
  items: MenuItemCard[];
}

export interface CategoryData {
  title: string;
  itemCards?: MenuItemCard[];
}

export interface RestaurantCategoryProps {
  data: CategoryData;
  showItems: boolean;
  setShowIndex: () => void;
}

export interface UserContextType {
  loggedInUser: string | null;
  setUserName: (name: string) => void;
}

export interface CartState {
  items: MenuItemCard[];
}

export interface RootState {
  cart: CartState;
}
