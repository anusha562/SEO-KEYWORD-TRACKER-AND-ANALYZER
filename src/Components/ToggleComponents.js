import React, { useState } from 'react';
import WordCloud from './WordCloud';
import Ranking from './Ranking';

function ToggleComponentButton() {
  const [showComponents, setShowComponents] = useState(false);


  return (
    <div>
      {showComponents && ( <div style={{ display: "flex", justifyContent: "space-between", width: "50%" }}>
            <Ranking style={{ flex: 1 }} />
            <WordCloud style={{ flex: 1 }} />
          </div>)}
    </div>
  );
}

export default ToggleComponentButton;
