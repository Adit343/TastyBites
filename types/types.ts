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
  promoted?: boolean;
  isPopular?: boolean;
  discountHeader?: string;
  discountSubHeader?: string;
  locality?: string;
  areaName?: string;
}

export interface RestaurantCardProps {
  resData: RestaurantInfo;
  isFavorite?: boolean;
  onToggleFavorite?: (id: string) => void;
}

export interface MenuItemInfo {
  id: string;
  name: string;
  description?: string;
  imageId?: string;
  price?: number;
  defaultPrice?: number;
  isVeg?: boolean;
  calories?: number;
  rating?: number;
  ratingsCount?: string;
  spiceLevel?: 'Mild' | 'Medium' | 'Spicy' | 'Fire';
  tags?: string[];
}

export interface MenuItemCard {
  card: {
    info: MenuItemInfo;
  };
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  description?: string;
  imageId?: string;
  quantity: number;
  isVeg?: boolean;
  restaurantName?: string;
  customizationNotes?: string;
}

export interface ItemListProps {
  items: MenuItemCard[];
  restaurantName?: string;
}

export interface CategoryData {
  title: string;
  itemCards?: MenuItemCard[];
}

export interface RestaurantCategoryProps {
  data: CategoryData;
  showItems: boolean;
  setShowIndex: () => void;
  restaurantName?: string;
}

export interface UserProfile {
  name: string;
  email: string;
  dietPreference?: 'All' | 'Pure Veg' | 'Vegan' | 'Keto';
  memberSince?: string;
  avatarUrl?: string;
}

export interface UserContextType {
  loggedInUser: string | null;
  userProfile: UserProfile | null;
  setUserName: (name: string) => void;
  loginUser: (emailOrName: string, password?: string) => boolean;
  signupUser: (name: string, email: string, password?: string, diet?: 'All' | 'Pure Veg' | 'Vegan' | 'Keto') => boolean;
  logoutUser: () => void;
}

export interface CartState {
  items: CartItem[];
  discountCode?: string;
  discountAmount?: number;
}

export interface RootState {
  cart: CartState;
}

export interface AIMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  suggestedItems?: {
    id: string;
    name: string;
    price: number;
    description: string;
    restaurantName: string;
  }[];
}

export interface TableReservation {
  id: string;
  restaurantName: string;
  guestName: string;
  phone: string;
  guestsCount: number;
  date: string;
  time: string;
  seatingArea: 'Indoor' | 'Outdoor Terrace' | 'VIP Booth' | 'Chef Table';
  specialRequests?: string;
  status: 'Confirmed' | 'Pending';
}

