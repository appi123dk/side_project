import { useState, useEffect } from "react";
import Button from "./Button";
import styles from "./App.module.css";

function App() {
  const [showing, setShowing] = useState(true);
  const [counter, setCounter] = useState(0);
  const [timer, setTimer] = useState(10);

  const changeShowing = () => setShowing(!showing);
  const plusOne = () => setCounter((prev) => prev + 1);
  const setZero = () => setCounter(0);

  useEffect(() => {
    console.log("watch");
    if (showing === false){     
      console.log(showing);
      let watch = setInterval(function(){
        setTimer((prev) => prev - 1);
      }, 1000);

      setTimeout(() => {
        setShowing(true);
        setTimer(10);
        clearInterval(watch);
      }, 10000);
    }
  }, [showing])

  const Title = ({className}) => {
    useEffect(() => {
      console.log("hello!!");
    }, [])
    if (showing) {
      return <h1 className={className}>카운터 : {counter}</h1>
    } else {
      return <h1 className={className}>카운터를 표시할 수 없습니다</h1> 
    }
    // return <h1 className={className}>카운터 : {counter}</h1>
  };

  return (
    <div>
      <Title className={styles.title}/>
      <p>남은시간 {timer}초</p>
      <Button text={showing ? "숨기기" : "표시하기"} onClick={changeShowing}/>
      <Button text="카운트 업!" onClick={plusOne}/>
      <Button text="RESET" onClick={setZero}/>
    </div>
  );
}

export default App;
