import React, { useState } from "react";
import "./App.css";

function App() {
  const [elements, setElements] = useState([]);
  const [draggedElementType, setDraggedElementType] = useState(null);

  const handleDragStart = (event, elementType) => {
    event.dataTransfer.setData("text/plain", elementType);
    setDraggedElementType(elementType);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const elementType = event.dataTransfer.getData("text/plain");
    setDraggedElementType(null);

    let element;

    if (elementType === "text") {
      element = (
        <div
          key={Date.now()}
          className="droppable"
          style={{ backgroundColor: "#6BB77B", border: "1px solid black" }}
        >
          <p contentEditable={true} style={{ border: "none" }}>
            Editable Text
          </p>
          <button
            style={{ float: "right" }}
            contentEditable={false}
            class="btn btn-primary"
            onClick={() => handleDeleteElement(element)}
          >
            Delete
          </button>
        </div>
      );
    } else if (elementType === "image") {
      element = (
        <div key={Date.now()} className="droppable">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e)}
          />
          <img
            src=""
            alt="Uploaded"
            style={{
              width: "30rem",
              height: "30rem",
            }}
          />
          <br />
          <button
            style={{ float: "right" }}
            onClick={() => handleDeleteElement(element)}
            class="btn btn-primary"
          >
            Delete
          </button>
        </div>
      );
    } else if (elementType === "video") {
      element = (
        <div key={Date.now()} className="droppable">
          <input
            className=" btn-primary my-4"
            type="file"
            accept="video/*"
            onChange={(e) => handleVideoUpload(e)}
          />
          <video
            controls
            style={{
              width: "30rem",
              height: "12rem",
            }}
          >
            <source src="" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <button
            class="btn btn-primary"
            onClick={() => handleDeleteElement(element)}
            style={{ float: "right" }}
          >
            Delete
          </button>
        </div>
      );
    }

    setElements([...elements, element]);
  };

  const handleDeleteElement = (elementToDelete) => {
    const updatedElements = elements.filter(
      (element) => element.key !== elementToDelete.key
    );
    setElements(updatedElements);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const imgElement = (
        <div key={Date.now()} className="droppable">
          <img
            src={e.target.result}
            alt="Uploaded"
            style={{
              width: "30rem",
              height: "15rem",
            }}
          />
          <br />
          <input
            className=" btn-primary my-4"
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e)}
          />
          <button
            class="btn btn-primary mx-3 my-4"
            onClick={() => handleDeleteElement(imgElement)}
          >
            Delete
          </button>
        </div>
      );
      setElements([...elements, imgElement]);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleVideoUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const videoElement = (
        <div key={Date.now()} className="droppable">
          <video
            controls
            style={{
              width: "30rem",
              height: "15rem",
            }}
          >
            <source src={e.target.result} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <br />
          <input
            type="file"
            accept="video/*"
            onChange={(e) => handleVideoUpload(e)}
          />
          <button
            class="btn btn-primary mx-3 my-4"
            onClick={() => handleDeleteElement(videoElement)}
          >
            Delete
          </button>
        </div>
      );
      setElements([...elements, videoElement]);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="App">
      <div id="toolbox">
        <div id="t1">
          <h2
            className="card "
            style={{
              textAlign: "center",
              width: "200%",
              margin: "-2.5rem 0  60px -38px",
            }}
          >
            Elements
          </h2>
          <div
            className="toolbox-item card draggable"
            draggable
            style={{ textAlign: "center", backgroundColor: "skyblue" }}
            onDragStart={(event) => handleDragStart(event, "text")}
          >
            Text
          </div>
          <div
            className="toolbox-item card draggable"
            draggable
            style={{ textAlign: "center", backgroundColor: "skyblue" }}
            onDragStart={(event) => handleDragStart(event, "image")}
          >
            Image
          </div>
          <div
            className="toolbox-item draggable card"
            draggable
            style={{ textAlign: "center", backgroundColor: "skyblue" }}
            onDragStart={(event) => handleDragStart(event, "video")}
          >
            Video
          </div>
        </div>
      </div>
      <div
        id="canvas"
        className={draggedElementType ? "canvas-highlight card" : ""}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <h2
          className="btn btn-info"
          style={{ textAlign: "center", width: "98%", cursor: "default" }}
        >
          Drag Element Here
        </h2>
        {elements.map((element) => element)}
        <a
          className="nav-link  btn btn-info mx-5 "
          aria-current="page"
          href="https://psgpraveen.netlify.app/"
        >
          Handcrafted ❤ by PsgPraveen
        </a>
      </div>
    </div>
  );
}

export default App;
