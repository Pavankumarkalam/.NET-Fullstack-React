// src/redux/actions.js
export const login = (username, password) => (dispatch) => {
    // Hard-coded credentials
    const credentials = [
      { username: "Mani", password: "Mani@123"},
      { username: "test", password: "test@123" },
    ];
    
    const user = credentials.find(
      (cred) => cred.username === username && cred.password === password
    );
    
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      dispatch({ type: "LOGIN_SUCCESS", payload: user });
    } else {
      dispatch({ type: "LOGIN_FAIL" });
      alert("Invalid credentials");
    }
  };
  
  export const logout = () => (dispatch) => {
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
  };
  
  export const checkAuth = () => (dispatch) => {
    // Force a re-login on application start by ensuring localStorage is cleared.
    localStorage.removeItem("user");
    dispatch({ type: "LOGIN_FAIL" });
  };
  
  
