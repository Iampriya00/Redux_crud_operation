import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cartReducer from "./auth/cartSlice";
import userReducer from "./auth/userSlice"; // Correct import for userReducer
import createSagaMiddleware from "redux-saga";
import { persistReducer, persistStore } from "redux-persist";
import storage from "./storage"; // Ensure this points to the correct storage configuration (e.g., localStorage or AsyncStorage)

const sagaMiddleware = createSagaMiddleware();

// Combine reducers
const reducers = combineReducers({
  cart: cartReducer,
  user: userReducer, // Correct reducer for user state
});

// Persist reducer configuration
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart", "user"], // Persist both 'cart' and 'user' slices
};
const persistedReducer = persistReducer(persistConfig, reducers);

// Configure store with middleware and reducers
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"], // Add rehydrate to ignored actions
      },
    }).concat(sagaMiddleware),
});

// Run saga middleware
// sagaMiddleware.run(yourSaga); // Uncomment and provide your saga to run it

// Create the persistor
export const persistor = persistStore(store);

// Export the configured store
export default store;
