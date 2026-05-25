import axios from "axios";
import { createContext, useEffect, useState } from "react";
// import { food_list } from "../assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const url =
    import.meta?.env?.VITE_API_URL ||
    "https://food-del-backend-lziq.onrender.com";
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);

  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if (token) {
      try {
        await axios.post(
          url + "/api/cart/add",
          { itemId },
          { headers: { token } },
        );
      } catch (err) {
        console.error(
          "addToCart API error:",
          err?.response?.data || err.message || err,
        );
      }
    }
  };

  // // Corrected addToCart function
  // const addToCart = async (itemId) => {
  //   setCartItems((prev) => {
  //     // Correctly check if the item exists in the previous state
  //     if (!prev[itemId]) {
  //       return { ...prev, [itemId]: 1 };
  //     } else {
  //       return { ...prev, [itemId]: prev[itemId] + 1 };
  //     }
  //   });

  //   if (token) {
  //     await axios.post(
  //       url + "/api/cart/add",
  //       { itemId },
  //       { headers: { token } }
  //     );
  //   }
  // };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      const current = prev[itemId] || 0;
      if (current <= 1) {
        const next = { ...prev };
        delete next[itemId];
        return next;
      }
      return { ...prev, [itemId]: current - 1 };
    });
  };

  // // Corrected removeFromCart function
  // const removeFromCart = (itemId) => {
  //   setCartItems((prev) => {
  //     const newCartItems = { ...prev }; // Add a check to ensure the item exists and has a count greater than 0
  //     if (newCartItems[itemId] > 0) {
  //       newCartItems[itemId] -= 1;
  //     } // If the item count is 0, you can optionally remove it from the object
  //     if (newCartItems[itemId] === 0) {
  //       delete newCartItems[itemId];
  //     }
  //     return newCartItems;
  //   });
  // };

  // useEffect(() => {
  //  console.log(cartItems);
  // }, [cartItems])
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = food_list.find((product) => product._id === item);
        if (!itemInfo) continue; // guard: skip if product metadata not yet available
        totalAmount += (itemInfo.price || 0) * cartItems[item];
      }
    }
    return totalAmount;
  };

  const fetchFoodList = async () => {
    try {
      const response = await axios.get(url + "/api/food/list");
      setFoodList(response.data.data || []);
      console.log(response.data);
    } catch (err) {
      console.error(
        "fetchFoodList error:",
        err?.response?.data || err.message || err,
      );
      setFoodList([]);
    }
  };
  const loadCardData = async (token) => {
    try {
      const response = await axios.post(
        url + "/api/cart/get",
        {},
        { headers: { token } },
      );
      setCartItems(response.data.cartData || {});
    } catch (err) {
      console.error(
        "loadCardData error:",
        err?.response?.data || err.message || err,
      );
      setCartItems({});
    }
  };

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadCardData(localStorage.getItem("token"));
      }
    }
    loadData();
  }, []);

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
    setFoodList,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};
export default StoreContextProvider;
