import React, { useEffect, useState } from "react";
import "./../../css/style.css";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "./../../App";
// import { login } from "../Shared/Services";
import { login } from "./../../Shared/Services";
import { refreshTokens } from "./../../Shared/Services";


export default function Login() {
  const userInfo = React.useContext(UserContext).userInfo;
  const setUserInfo = React.useContext(UserContext).setUserInfo;

  let navigate = useNavigate();
  const routeChange = (path) => {
    navigate(path);
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [wrongPassword, setWrongPassword] = useState(false);

  const roleData = async () => {
    await refreshTokens().then((result) => {
      setRole(result.data.user[0].role);
    });
  };

  const submit = (e) => {
    e.preventDefault();
    login(email, password)
      .then(function (response) {
        console.log(response.data);
        if (password === response.data.user[0].password) {
          localStorage.clear();
          setUserInfo({
            id: response.data.user[0].id,
            role: "Takeaway",
            role: "Admin",
            email: response.data.user[0].email,
          });
          if (response.data.user[0].role == 1) {
            localStorage.setItem("role", "admin");
            localStorage.setItem("id", response.data.user[0].id);
            localStorage.setItem("email", response.data.user[0].email);
          } else if (response.data.user[0].role == 0) {
            localStorage.setItem("role", "Takeaway");
            localStorage.setItem("id", response.data.user[0].id);
            localStorage.setItem("email", response.data.user[0].email);
          } else {
            alert("No role found");
          }

          routeChange("/Home");
        } else {
          setWrongPassword(true);
          setTimeout(() => {
            setWrongPassword(false);
          }, 2000);
        }
      })
      .catch(function (error) {
        console.log(error);
        alert("error");
      });
  };

  React.useEffect(() => {
    localStorage.clear();
    console.log(userInfo);
    roleData();
    if (userInfo.role === "Admin") {
      console.log(userInfo);
      navigate("/Home");
    } else if (userInfo.role === "Takeaway") {
      console.log(userInfo);
      navigate("/Home");
    } else {
      let role = localStorage.getItem("role");
      if (role === "role") {
        navigate("/Home");
      }
    }
  }, [userInfo]);

  return (
    <div className="Login">
      <center>
        <h3>Admin Login</h3>
      </center>
      <form onSubmit={(e) => submit(e)}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        {wrongPassword && (
          <span className="passwordWarning"> Wrong email name or password</span>
        )}
        <div>
          <button type="submit" className="btn btn-primary" onClick={submit}>
            Submit
          </button>
        </div>
      </form>

      <Link className="registerLink" to="/register">
        Register
      </Link>
      <Link className="Login" to="/Login"></Link>

      <div></div>
    </div>
  );
}
