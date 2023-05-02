import "./App.css";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

function App() {
  const {
    loginWithRedirect,
    logout,
    user,
    isAuthenticated,
    getAccessTokenSilently,
  } = useAuth0();

  const callApi = () => {
    axios
      .get("http://localhost:5000/")
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err.message));
  };

  const callProtectedApi = async () => {
    try {
      const token = await getAccessTokenSilently();
      console.log(token);
      console.log(`Bearer ${token}`);
      const res = await axios.get("http://localhost:5000/protected", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Response from callProtectedApi ->", res.data);
    } catch (err) {
      console.log("Error in callProtectedApi ->", err);
    }

    // axios
    //   .get("http://localhost:5000/protected")
    //   .then((res) => console.log("res from callProtectedApi ->", res.data))
    //   .catch((err) => console.log(err));
  };

  return (
    <div className="App">
      <h1>Auth0 Authentication</h1>
      <button onClick={() => loginWithRedirect()}>Log In</button>
      <button
        onClick={() =>
          logout({ logoutParams: { returnTo: window.location.origin } })
        }
      >
        Log Out
      </button>
      <h4>{isAuthenticated ? "Logged in" : "Logged out"}</h4>

      <button onClick={callApi}>Call API route</button>
      <button onClick={callProtectedApi}>Call Protected API route</button>

      {isAuthenticated && (
        <pre style={{ textAlign: "left" }}>{JSON.stringify(user, null, 2)}</pre>
      )}
    </div>
  );
}

export default App;
