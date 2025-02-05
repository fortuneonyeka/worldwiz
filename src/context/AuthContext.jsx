import { createContext, useContext, useEffect, useReducer } from "react";

const AuthContext = createContext();

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isAuthenticated: JSON.parse(localStorage.getItem("isAuthenticated")) || false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "login":
      localStorage.setItem("user", JSON.stringify(action.payload));
      localStorage.setItem("isAuthenticated", JSON.stringify(true));
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };

    case "logout":
      localStorage.removeItem("user");
      localStorage.removeItem("isAuthenticated");
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };

    default:
      throw new Error("Invalid action type: " + action.type);
  }
};

const FAKE_USER = {
  name: "Fortune",
  email: "fortune@example.com",
  password: "superdev",
  avatar: "https://i.pravatar.cc/100",
};

const AuthProvider = ({ children }) => {
  const [{ user, isAuthenticated }, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (!isAuthenticated) {
      localStorage.removeItem("user");
      localStorage.removeItem("isAuthenticated");
    }
  }, [isAuthenticated]);

  const login = (email, password) => {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: "login", payload: FAKE_USER });
      return { success: true };
    }
    if (email !== FAKE_USER.email) {
      return { error: "Invalid email address." };
    }
    if (password !== FAKE_USER.password) {
      return { error: "Invalid password" };
    }
  };

  const logout = () => {
    dispatch({ type: "logout" });
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("AuthContext was used outside of AuthProvider");
  }
  return context;
};

export { useAuth, AuthProvider };
