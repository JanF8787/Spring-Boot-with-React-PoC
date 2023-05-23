import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext({
  auth: null,
  setAuth: () => { },
  user: null
});

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const token = localStorage.getItem('jwt');
  const [auth, setAuth] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/user/getInformation", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    })
      .then(res => {
        if (res.ok) {
          res.json()
            .then(data => {
              setUser(data.username);
              setAuth(true);
            });
        }
      });
  }, [auth, token]);

  return (
    <AuthContext.Provider value={{ auth, setAuth, user }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;