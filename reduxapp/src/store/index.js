import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./auth/userSlice"; // Correct import for userReducer
import createSagaMiddleware from "redux-saga";
import { persistReducer, persistStore } from "redux-persist";
import storage from "./storage"; // Ensure this points to the correct storage configuration

const sagaMiddleware = createSagaMiddleware();

// Combine reducers
const reducers = combineReducers({
  user: userReducer, // User reducer
});

// Persist reducer configuration
const persistConfig = {
  key: "root",
  storage, // Storage for persistence
  whitelist: ["user"], // Persist both 'cart' and 'user' slices
};

const persistedReducer = persistReducer(persistConfig, reducers);

// Configure store with middleware and reducers
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"], // Ignore these actions in serializability check
      },
    }).concat(sagaMiddleware),
});

// Uncomment and configure your saga middleware as needed
// sagaMiddleware.run(yourSaga);

// Create the persistor
export const persistor = persistStore(store);

// Export the configured store
export default store;
