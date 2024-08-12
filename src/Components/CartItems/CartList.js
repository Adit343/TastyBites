import { useDispatch } from "react-redux";
import { CDN_URL } from "../../../utils/constant";
import { removeItem } from "../../../utils/cartSlice";

const CartList = ({ items }) => {
  const dispatch = useDispatch();

  const handleRemoveItem = (item) => {
    dispatch(removeItem(item));
  };

  return (
    <div>
      {items.map((item) => (
        <div
          key={item.card.info.id}
          className="p-2 m-2 border-gray-200 border-b-2 shadow-lg flex flex-col md:flex-row justify-between"
        >
          <div className="md:w-9/12">
            <div className="py-2 font-bold">
              <span>{item.card.info.name}</span>
              <span>
                - ₹
                {item.card.info.price / 100 || item.card.info.defaultPrice / 100}
              </span>
            </div>
            <p className="text-xs">{item.card.info.description}</p>
          </div>
          <div className="md:w-3/12 p-4 flex flex-col items-center">
            <img
              src={CDN_URL + item.card.info.imageId}
              alt=""
              className="w-full h-auto mb-2 md:mb-0"
            />
            <button
              className="p-1 rounded-lg bg-black text-white shadow-lg mt-2 md:mt-0"
              onClick={() => handleRemoveItem(item)}
            >
              Remove -
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartList;
