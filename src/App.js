import React, { useState } from "react";
import ReactTyped from "react-typed";
import "./App.css";
import Ranking from "./Components/Ranking";
import WordCloud from "./Components/WordCloud";
import URLPath from "./Components/URLPath";
import { CircularProgress } from "@mui/material";
import BarGraph from "./Components/BarGraph";
// Importing every component here

function App() {
  const [showComponents, setShowComponents] = useState(false);
  const [wordCountData, setWordCountData] = useState([]);
  const [urlData, seturlData] = useState([]);
  const [densitydata, setdensitydata] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  console.log(densitydata);
  const handleExploreClick = () => {
    setShowComponents(true);
  };

  return (
    <div
      className="App"
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {showComponents ? (
        <>
          <URLPath
            getWordCount={setWordCountData}
            getUrlData={seturlData}
            setIsLoading={setIsLoading}
            setChartData={setChartData}
            setdensitydata={setdensitydata}
          />
          {isLoading && <CircularProgress />}
          {chartData.length!==0 &&
              <>
              <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", flex: 1 }}>
              <div style={{ flex: 1 }}>
                <Ranking wordCount={wordCountData} urlData={urlData} densitydatajs={densitydata} />
              </div>
              <div style={{ flex: 1 }}>
                <WordCloud wordCount={wordCountData} />
              </div>
            </div>
            {chartData.length!==0 &&

            <div style={{ flex: 1 }}>
              <BarGraph data={chartData} />
            </div>
            }
            </>
          }
        </>
      ) : (
        <div className="landing-page">
          <h1>SEO Keyword Tracker and Analyzer</h1>
          <h2>
            <p style={{ fontSize: "1.2rem", marginBottom: "20px" }}>
              <ReactTyped
                strings={[
                  "SEO Keyword Tracker and Analyzer assists in tracking and analyzing SEO keywords",
                ]}
                typespeed={500}
                loop
              />
            </p>
          </h2>
          <button className="explore-button" onClick={handleExploreClick}>
            Explore
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
