import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import thunk from 'redux-thunk'
// import axiosMiddleware from 'redux-axios-middleware'
import rootReducer from './reducers'

// Middleware: Redux Logger (For Development)
if (process.env.NODE_ENV !== 'production') {
  // middleware.push(createLogger())
}

// Middleware: Redux Persist Config
const persistConfig = {
  // Root?
  key: 'root',
  // Storage Method (React Native)
  storage,
  // Whitelist (Save Specific Reducers)
  whitelist: ['user', 'meetings', 'responsibles'],
}

// Middleware: Redux Persist Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer)

// Redux: Store
const store = createStore(persistedReducer, applyMiddleware(thunk))

// Middleware: Redux Persist Persister
let persistor = persistStore(store)

export { store, persistor }

// window.store = store;
