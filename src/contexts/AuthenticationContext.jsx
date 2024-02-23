import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
};

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

function reducer(state, action) {
  switch (action.type) {
    case "user/login":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    case "user/logout":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    default:
      throw new Error("Action type unknown");
  }
}

function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password)
      dispatch({ type: "user/login", payload: FAKE_USER });
  }

  function logout() {
    dispatch({ type: "user/logout" });
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error("Out of context");

  return context;
}

export { AuthContext, AuthProvider, useAuth };
