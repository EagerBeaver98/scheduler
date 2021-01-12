import {useState} from "react";


export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  const transition = (newMode, skip) => {
    setMode(newMode);
    if (!skip) {
      setHistory([...history, newMode]);
    } else {
      setHistory([history[0], newMode]);
    }
  }
  const back = () => {
    if (history.length <= 1) {
      setMode(history[0]);
    } else {
      setHistory(history.pop())
      setMode(history[history.length - 1]);
    }
  }

  return { mode, transition, back };
}

