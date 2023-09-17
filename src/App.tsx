import { useState } from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import './App.css';

function App() {
  const [url, setUrl] = useState()
  const [shortendUrl, setShortenedUrl] = useState('')

  const shortenUrl = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://api.shrtco.de/v2/shorten?url=${url}`
      )
      const data = await response.json()
      setShortenedUrl(data.result.full_short_link);
    } catch (e) {
      alert(e);
    }
  };

  return (
    <div className="app">
      <div className='shortener'>
        <h2> Short 'n' Snappy </h2>
        <form onSubmit={shortenUrl}>
          <input
            placeholder='Enter your huge Url here'
            value={url}
            onChange={(e) => setUrl(e.target.value)}/>
          <button> Short it </button>
        </form>
        {/* Section to view shortened URLS */}
        {shortendUrl &&
          <div className="shortener__viewShot">
          {shortendUrl}
          <CopyToClipboard text={shortendUrl}>
            <button onClick={() => alert("The URL has been copied")}>copy</button>
          </CopyToClipboard>
        </div>
        }
      </div>
    </div>
  );
}

export default App;
