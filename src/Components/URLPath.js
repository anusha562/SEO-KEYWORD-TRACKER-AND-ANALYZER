import axios from "axios";
import { useRef, useState } from "react";
import Dropdown  from "react-dropdown";
import validUrl from 'valid-url';
import "./URLPath.css";

// This component gets input from the user and also gets data from json
  const URLPath = ({getWordCount, getUrlData ,setIsLoading, getChartData, setChartData, setdensitydata}) => {
  const inputRef = useRef();
  const [selectedOption, setSelectedOption] = useState("");
  const [errorMessage, setErrorMessage] = useState('');

  const onClickHandler = async () => {
    const websiteUrl = inputRef.current.value;
    const selectedAlgorithm = selectedOption.value;

    if(!validUrl.isUri(websiteUrl))
    {
      setErrorMessage('Please enter a valid website URL');
      return;
    }
    else{
      setErrorMessage('');
    }

    try {
      setIsLoading(true)
      let response;
      
      if (selectedAlgorithm === "Naive") {
        response = await axios.post("http://localhost:5000/naive", {
          websiteUrl
        });
      } else if (selectedAlgorithm === "Rabin-Karp") {
        response = await axios.post("http://localhost:5000/rabin-karp", {
          websiteUrl
        });
      } else if (selectedAlgorithm === "KMP") {
        response = await axios.post("http://localhost:5000/kmp", {
          websiteUrl
        });
      } else if (selectedAlgorithm === "Suffix Tree") {
        response = await axios.post("http://localhost:5000/suffix-tree", {
          websiteUrl
        });
      } else if (selectedAlgorithm === "Suffix Array") {
        response = await axios.post("http://localhost:5000/suffix-array", {
          websiteUrl
        });
      } else if (selectedAlgorithm === "All") {
        response = await axios.post("http://localhost:5000/all", {
          websiteUrl
        });
      }
      console.log(response.data.keyword_density)
      // Getting the data from json
      getWordCount(response.data.top_words_and_counts)
      getUrlData(response.data.url_links)
      setChartData(response.data.execution_times)
      setdensitydata(response.data.keyword_density)

    } catch (error) {
      console.log(error);
    }finally{
      setIsLoading(false)
    }
  };
  return (
    <>
     <h3 style={{ marginBottom: '20px' }}>SEO Word Analyzer</h3>
  <input ref={inputRef} style={{ width: 400, marginBottom: '10px' }} placeholder="Enter Url" />
  {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
  <div style={{ marginBottom: '10px', display: "flex", justifyContent: "space-between" }}>
  <div>
    <Dropdown
      className="dropdown-toggle btn btn-primary"
      data-bs-toggle="dropdown"
      options={["Naive","Rabin-Karp", "KMP", "Suffix Tree", "Suffix Array"]}
      value={selectedOption}
      onChange={(selected) => setSelectedOption(selected)}
      placeholder="Select an option"
    />
  </div>
  <span style={{ marginLeft: '100px' }}></span>
  <div style={{ minWidth: '100px' }}>
    
  </div>
  <span style={{ marginLeft: '100px' }}></span>
  <div style={{ minWidth: '100px' }}>
    <button onClick={onClickHandler} className="btn btn-primary" style={{ width: '100%', height: '40px' }}>
      Generate
    </button>
  </div>
</div>

    </>
  );
};

export default URLPath;
