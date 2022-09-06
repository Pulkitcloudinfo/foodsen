import React, { useState, useEffect } from "react";

import { Typography, Row, Col, Card } from "antd";
import axios from "axios";
import Calendar from "react-calendar";
import { getAllItemById } from "../../Shared/Services";

const { Title } = Typography;

var BACKEND_URL = "http://localhost:4000";
const TrainingSessions = (props) => {
  const [filePath, setFilePath] = useState("");
  const [name, setName] = useState("");
  const [videos, setVideos] = useState([]);
  const [cost, setCost] = useState("");
  const [duration, setDuration] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [medias, setMedias] = useState([]);
  const [dateState, setDateState] = useState("");

  const hadleSubmit = (e) => {
    e.preventDefault();

    var event = new Date(dateState);

    let date = JSON.stringify(event);
    date = date.slice(1, 11);
    console.log(date);

    let formData = new FormData();
    const config = {
      header: { "content-type": "multipart/form-data" },
    };
    // formData.append('file' , files[0])
    for (let key in videos) {
      formData.append("file", videos[key]);
    }

    formData.append("name", name);
    formData.append("cost", cost);
    formData.append("date", date);

    axios
      .post(`http://localhost:4000/createMedia`, formData, config)
      .then((response) => {
        console.log(response.data);
        // getAllMedias();
        let url = response.data.url;
        let fileName = response.data.fileName;
        let Cost = response.data.Cost;
        let Name = response.data.Name;
        let Date = response.data.Date;
        if (response.data.success) {
          let variable = {
            url: url,
            fileName: fileName,
            name: Name,
            cost: Cost,
            date: Date,
          };
          setFilePath(response.data.url);

          axios
            .post(`http://localhost:4000/thumbnail`, variable)
            .then((response) => {
              if (response.data.success) {
                setDuration(response.data.fileDuration);
                setThumbnail(response.data.url);
              } else {
                alert("Failed to make the thumbnails");
              }
            });
        } else {
          alert("Failed to upload video");
        }
      });
  };
  const getAllMedias = () => {
    axios
      .get(`${BACKEND_URL}/getAllMedia`)
      .then((result) => {
        setMedias(result.data);
      })
      .catch((error) => {
        setMedias([]);
        console.log(error);
        alert("Error happened!");
      });
  };
  useEffect(() => {
    getAllMedias();
    getItemById();
  }, []);
  const getItemById = (id) => {
    getAllItemById(id)
      .then((response) => {
        console.log(response.data, "data");
      })
      .catch(() => {
        console.log("Something went wrong");
      });
  };
  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th width="200">Name</th>
                <th width="200">Videos</th>
                <th width="200">Product_Id</th>
                <th width="200">End_Date</th>
              </tr>
            </thead>
            <tbody>
              {medias &&
                medias.map((media) => {
                  console.log(media);
                  var videoUrl = media.videos
                    .replaceAll("\\\\", "/")
                    .replaceAll("[", "")
                    .replaceAll("]", "")
                    .replaceAll('"', "");
                  var thumbnailUrl = media.thumbnail.replaceAll('"', "");
                  console.log(thumbnailUrl);

                  return (
                    <tr>
                      <td>{media.name}</td>

                      <td className="table_section">
                        <div>
                          <tr>
                            <td className="table_video_section">
                              <img
                                src={`${BACKEND_URL}/${thumbnailUrl}`}
                                alt="haha"
                                align="left"
                                onClick={getItemById}
                              />
                            </td>
                          </tr>
                        </div>

                        <video preload="auto" width="320" height="240" controls>
                          <source src={`${BACKEND_URL}/${videoUrl}`} />
                          ;Your browser does not support the video tag.
                        </video>
                      </td>
                      <td>{media.product_Id}</td>
                      <td>{media.end_Date}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
      <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
        <div style={{ textAlign: "center" }}>
          <Title level={2}> Upload Video</Title>
        </div>
        <br />
        <form onSubmit={hadleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              className="form-control"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="videos">Upload Videos</label>
            <input
              type="file"
              name="videos"
              id="videos"
              multiple
              className="form-control"
              accept=".mp4, .mkv"
              onChange={(e) => {
                setVideos(e.target.files);
              }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="cost">cost of image</label>
            <input
              type="text"
              name="cost"
              id="cost"
              className="form-control"
              onChange={(e) => setCost(e.target.value)}
            />
          </div>

          <Calendar onChange={(e) => setDateState(e)} />
          <p>
            Current selected date is <b>(dateState)</b>
          </p>

          <button type="submit" className="btn btn-primary mt-2">
            Submit
          </button>
        </form>

        {thumbnail && (
          <div
            style={{
              background: "#ECECEC",
              padding: "30px",
              wordBreak: "break-all",
            }}
          >
            <Row gutter={16}>
              <Col span={8}>
                <Card hoverable={true} title="Video Path" bordered={false}>
                  {filePath}
                </Card>
              </Col>
              <Col span={8}>
                <Card hoverable={true} title="Duration" bordered={false}>
                  {duration}
                </Card>
              </Col>
              <Col span={8}>
                <Card hoverable={true} title="Thumbnail Path" bordered={false}>
                  {thumbnail}
                </Card>
              </Col>
            </Row>
          </div>
        )}
      </div>
    </>
  );
};

export default TrainingSessions;
