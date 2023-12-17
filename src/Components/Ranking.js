import { useState } from "react";
import "./Ranking.css"; // Import your CSS file here
import Popover from '@material-ui/core/Popover';

const Ranking = ({wordCount, urlData, densitydatajs}) => {
  // const rankingData = urlData.url_links;
  console.log(densitydatajs)
  const [anchorEl1, setAnchorEl1] = useState(null);
  const [anchorEl2, setAnchorEl2] = useState(null);
  const [anchorEl3, setAnchorEl3] = useState(null);
  const [anchorEl4, setAnchorEl4] = useState(null);
  const [anchorEl5, setAnchorEl5] = useState(null);

  const handleRanking1Click = (event) => {
    setAnchorEl1(event.currentTarget);
  };
  const handleRanking2Click = (event) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleRanking3Click = (event) => {
    setAnchorEl3(event.currentTarget);
  };
  const handleRanking4Click = (event) => {
    setAnchorEl4(event.currentTarget);
  };
  const handleRanking5Click = (event) => {
    setAnchorEl5(event.currentTarget);
  };

  const handleClose1 = () => {
    setAnchorEl1(null);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };
  const handleClose3 = () => {
    setAnchorEl3(null);
  };
  const handleClose4 = () => {
    setAnchorEl4(null);
  };
  const handleClose5 = () => {
    setAnchorEl5(null);
  };

  const ranking1Url = urlData.find((item) => item.ranking === 1)?.link;
  const ranking2Url = urlData.find((item) => item.ranking === 2)?.link;
  const ranking3Url = urlData.find((item) => item.ranking === 3)?.link;
  const ranking4Url = urlData.find((item) => item.ranking === 4)?.link;
  const ranking5Url = urlData.find((item) => item.ranking === 5)?.link;
  const wordFrequencyDensity1=wordCount.map((item,index)=>({
    ...item,
    density:densitydatajs[index].density
  }))
  const densityForURL2=densitydatajs.slice(5,10)
  const wordFrequencyDensity2=wordCount.slice(5,10).map((item,index)=>({
    ...item,
    density:densityForURL2[index].density
  }))
  const densityForURL3=densitydatajs.slice(10,15)
  const wordFrequencyDensity3=wordCount.slice(10,15).map((item,index)=>({
    ...item,
    density:densityForURL3[index].density
  }))
  const densityForURL4=densitydatajs.slice(15,20)
  const wordFrequencyDensity4=wordCount.slice(15,20).map((item,index)=>({
    ...item,
    density:densityForURL4[index].density
  }))
  const densityForURL5=densitydatajs.slice(20,25)
  const wordFrequencyDensity5=wordCount.slice(20,25).map((item,index)=>({
    ...item,
    density:densityForURL5[index].density
  }))
  console.log(densitydatajs)
    console.log(wordFrequencyDensity1)
    console.log(wordFrequencyDensity2)
    console.log(wordFrequencyDensity3)
    return (
      <div style={{marginRight:"150px"}}>
        
        <div className="d-flex flex-row">
          <div className="border border-primary p-3 ranking-container">
            <h2 className="ranking-title" onClick={handleRanking1Click}> Url 1 
            </h2>
            <table className="table table-bordered ranking-table">
              <thead className="thead-dark">
                <tr>
                  <th>Words</th>
                  <th>Frequency</th>
                  <th>Density</th>
                </tr>
              </thead>
              <tbody>
                {wordFrequencyDensity1.slice(0,5).map((item, index) => (
                  <tr key={index}>
                    <td>{item.text}</td>
                    <td>{item.value}</td> 
                    <td>{item.density}</td> 
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Popover
            id="ranking1-popover"
            open={Boolean(anchorEl1)}
            anchorEl={anchorEl1}
            onClose={handleClose1}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            {ranking1Url}
          </Popover>
    
          <div className="border border-primary p-3 ranking-container">
            <h2 className="ranking-title" onClick={handleRanking2Click}>Url 2</h2>
            <table className="table table-bordered ranking-table">
              <thead className="thead-dark">
                <tr>
                  <th>Words</th>
                  <th>Frequency</th>
                  <th>Density</th>
                </tr>
              </thead>
              <tbody>
                {wordFrequencyDensity2.map((item, index) => (
                  <tr key={index}>
                    <td>{item.text}</td>
                    <td>{item.value}</td>
                    <td>{item.density}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Popover
            id="ranking2-popover"
            open={Boolean(anchorEl2)}
            anchorEl={anchorEl2}
            onClose={handleClose2}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            {ranking2Url}
          </Popover>

          <div className="border border-primary p-3 ranking-container">
            <h2 className="ranking-title" onClick={handleRanking3Click}>Url 3</h2>
            <table className="table table-bordered ranking-table">
              <thead className="thead-dark">
                <tr>
                  <th>Words</th>
                  <th>Frequency</th>
                  <th>Density</th>
                </tr>
              </thead>
              <tbody>
                {wordFrequencyDensity3.map((item, index) => (
                  <tr key={index}>
                    <td>{item.text}</td>
                    <td>{item.value}</td>
                    <td>{item.density}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <Popover
            id="ranking3-popover"
            open={Boolean(anchorEl3)}
            anchorEl={anchorEl3}
            onClose={handleClose3}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            {ranking3Url}
          </Popover>                  
        <div className="d-flex flex-row">
          <div className="border border-primary p-3 ranking-container">
            <h2 className="ranking-title" onClick={handleRanking4Click}>Url 4</h2>
            <table className="table table-bordered ranking-table">
              <thead className="thead-dark">
                <tr>
                  <th>Words</th>
                  <th>Frequency</th>
                  <th>Density</th>
                </tr>
              </thead>
              <tbody>
                {wordFrequencyDensity4.map((item, index) => (
                  <tr key={index}>
                    <td>{item.text}</td>
                    <td>{item.value}</td>
                    <td>{item.density}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Popover
            id="ranking4-popover"
            open={Boolean(anchorEl4)}
            anchorEl={anchorEl4}
            onClose={handleClose4}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            {ranking4Url}
          </Popover>

          <div className="border border-primary p-3 ranking-container">
            <h2 className="ranking-title" onClick={handleRanking5Click}>Url 5</h2>
            <table className="table table-bordered ranking-table">
              <thead className="thead-dark">
                <tr>
                  <th>Words</th>
                  <th>Frequency</th>
                  <th>Density</th>
                </tr>
              </thead>
              <tbody>
                {wordFrequencyDensity5.map((item, index) => (
                  <tr key={index}>
                    <td>{item.text}</td>
                    <td>{item.value}</td>
                    <td>{item.density}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Popover
            id="ranking5-popover"
            open={Boolean(anchorEl5)}
            anchorEl={anchorEl5}
            onClose={handleClose5}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            {ranking5Url}
          </Popover>
        </div>
      </div>
    );
                };    

export default Ranking;


