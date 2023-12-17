import { useEffect, useState } from "react";
import ReactWordcloud from "react-wordcloud";

const WordCloud = ({ wordCount }) => {
  const [displayedWords, setDisplayedWords] = useState([]);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    if (wordCount && wordIndex < wordCount.length) {
      const timeout = setTimeout(() => {
        setDisplayedWords((prevWords) => [...prevWords, wordCount[wordIndex]]);
        setWordIndex(wordIndex + 1);
      }, 500); // Adjust the delay between words (in milliseconds)

      return () => clearTimeout(timeout);
    }
  }, [wordCount, wordIndex]);

  const options = {
    rotations: 3,
    rotationAngles: [0, 90],
    fontSizes: [40, 80],
  };

  return (
    <div className="wordcloud-container">
      <div className="wordcloud-title">
        <h2>SEO Keyword Cloud</h2>
      </div>
      <div className="wordcloud-content">
        <ReactWordcloud words={displayedWords} options={options} />
      </div>
    </div>
  );
};

export default WordCloud;

