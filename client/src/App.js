import "./App.css";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

function App() {
  const [urlvalue, setUrl] = useState();
  const [urlcode, setcode] = useState();

  //Function for sending the POST request
  const addUrl = (e) => {
    e.preventDefault();
    //If the URL is blank
    if (!urlvalue) {
      toast.info("Please enter a Valid URL like https://www.google.com");

      return;
    }
    //if the URL does not start with https
    else if (!urlvalue.startsWith("Https") && !urlvalue.startsWith("https")) {
      toast.error("URL should start with 'https' like https://www.google.com");
      return;
    }

    axios
      .post("http://localhost:8001/url", {
        url: urlvalue.charAt(0).toLowerCase() + urlvalue.slice(1),
      })
      .then((res) => {
        setcode(res.data.id);
        setTimeout(function () {
          window.location.reload(1);
        }, 10000);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h1>Simplify</h1>
      <div className="container ">
        <h2>
          Frustrated with the lengthy URLs ? <br /> Simplify your URL today !
        </h2>
        <div className="input-group mb-3 ">
          <input
            type="text"
            className="form-control"
            name="urlvalue"
            placeholder="Enter to Simplify your URL"
            onChange={(e) => setUrl(e.target.value)}
          />
          <button
            type="button"
            className="btn btn-success btn-style"
            onClick={addUrl}
          >
            Simplify
          </button>

          <ToastContainer />
        </div>
        {urlcode ? (
          <h6>
            Your shortened URL is:
            <br />
            <br />
            http://localhost:8001/url/{urlcode}
            <br />
            <br />
            <a
              className="btn btn-success btn-style"
              href={"http://localhost:8001/url/analytics/" + urlcode}
            >
              View Visit Count
            </a>
          </h6>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default App;
