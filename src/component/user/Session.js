import React from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "./../../App";
import TopHeader from "../genric/TopHeader";
import Header from "../genric/Header";
import { useState } from "react";
import Popup from "reactjs-popup";
import TextField from "@material-ui/core/TextField";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { makeStyles } from "@material-ui/core/styles";
import CardInput from "../pages/CardInput";
import { getAllItemById } from "../../Shared/Services";
import { getAllMappingData } from "../../Shared/Services";
import { getAllMedia } from "../../Shared/Services";

// Util imports

const useStyles = makeStyles({
  root: {
    maxWidth: 500,
    margin: "35vh auto",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignContent: "flex-start",
  },
  div: {
    display: "flex",
    flexDirection: "row",
    alignContent: "flex-start",
    justifyContent: "space-between",
  },
  button: {
    margin: "2em auto 1em",
  },
});

var BACKEND_URL = "http://localhost:4000";

const Session = () => {
  console.log("hyyyy-------------------->>>>>>>>>");
  let navigate = useNavigate();
  const [name, setName] = useState("");
  const [mappingData, setMappingData] = useState([])
  const [priceId, setPriceId] = useState("");
  const [id, setId] = useState("");
  const classes = useStyles();
  const stripe = useStripe();
  const elements = useElements();
  const [medias, setMedias] = useState([]);
  const userInfo = React.useContext(UserContext).userInfo;
  const [isAdmin, setIsAdmin] = React.useState(false);
  const getvalue = (data) => {
    let key = Object.keys(data);
    return data[key];
  };
  const getAllMedias = () => {
      getAllMedia()
      .then((result) => {
        setMedias(result.data);
      })
      .catch((error) => {
        setMedias([]);
        console.log(error);
        alert("Error happened!");
      });
  };
  const getAllMappingDatas = () =>{
    getAllMappingData()
    .then((res) =>{
      setMappingData(res.data)
    }).catch((err) =>{
      console.log(err);
    })
  }

  React.useEffect(() => {
    console.log(userInfo);
    if (userInfo.role === "Admin") {
      setIsAdmin(true);
    }
    if (!userInfo) {
      if (localStorage.getItem("role")) {
        if (userInfo.role === "Admin") {
          setIsAdmin(true);
        }
      } else {
        navigate("/");
      }
      console.log("navigate");
    }

    getAllMedias();
    getItemById();
    getAllMappingDatas()
  }, [userInfo]);

  const handleSubmitSub = async () => {
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    const result = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
      billing_details: {
        name: name,
      },
    });
    if (result.error) {
      console.log(result.error.message);
    } else {
      console.log("99999");
      await axios.post(`${BACKEND_URL}/sub`, {
        payment_method: result.paymentMethod.id,
        name: name,
        medias: medias,
        priceId: priceId,
        id: id,
      }).then((res) =>{
      console.log(res.data);
      const { client_secret, status } = res.data;
      if (status === "requires_action") {
        stripe.confirmCardPayment(client_secret).then(function (result) {
          if (result.error) {
            console.log("There is an error");
            console.log(result.error);
          } else {
            console.log("you got the money!");
          }
        });
      }
    }).catch((err) =>{
      console.log(err);
    })
    }
  };

  const getItemById = (id) => {
    getAllItemById(id)
      .then((response) => {
        console.log(response.data[0].price_Id, "data");
        setPriceId(response.data[0].price_Id);
        setId(response.data[0].id);
        console.log(response.data[0].price_Id);
      })
      .catch(() => {
        console.log("Something went wrong");
      });
  };
  console.log(localStorage.getItem("email"));
  console.log(id);

  return (
    <div className="masterDiv">
      <Header isAdmin={isAdmin} />
      <div className="mainPage">
        <TopHeader isAdmin={isAdmin} title={"Training Session"} />
        <div className="pageHeading">Training Session</div>
        <div className="row">
          <div className="col-md-12">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th width="200">Name</th>
                  <th width="200">Thumbnail</th>
                  <th width="200">Cost of video</th>
                  <th width="200">video</th>
                </tr>
              </thead>
              <tbody>
                {medias &&
                  medias.map((media) => {
                    var thumbnailUrl = media.thumbnail.replaceAll('"', "")
                    var video = media.videos.replaceAll('"',"").replaceAll('\\\\', '/')
                    return (
                      <tr key={media.id} data-rowid={media.id}>
                        <td>{media.name}</td>
                        <td className="table_section">
                          <Popup
                            trigger={
                              <img
                                data-productkey={`${media.id}`}
                                src={`${BACKEND_URL}/${thumbnailUrl}`}
                              />
                            }
                            onOpen={(e) => {
                              getItemById(e.target.dataset.productkey);
                            }}
                            position="right center"
                            padding-right="60px"
                            width="700px"
                          >
                            <div className={classes.root}>
                              <div className={classes.content}>
                                <TextField
                                  label="Name"
                                  id="outlined-name-input"
                                  margin="normal"
                                  variant="outlined"
                                  type="email"
                                  required
                                  value={name}
                                  onChange={(e) => setName(e.target.value)}
                                  fullWidth
                                />
                                <CardInput />
                                <div>
                                  <Button
                                    variant="contained"
                                    color="primary"
                                    className={classes.button}
                                    onClick={handleSubmitSub}
                                  >
                                    Subscription
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </Popup>
                        </td>
                        <td>{media.price}</td>
                        {mappingData &&
                          mappingData.map((data) =>{
                            return (
                              <tr>
                        <td>
                           {media.id === data.mediumId ?(
                            <video
                              preload="auto"
                              width="320"
                              height="240"
                              controls
                            >
                              <source
                                src={`${BACKEND_URL}/${video}`}
                              />
                               ;Your browser does not support the video tag.
                            </video>
                           ):(
                            ''
                           )
                          }
                        </td>
                        </tr>
                            )
                            })}
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Session;
