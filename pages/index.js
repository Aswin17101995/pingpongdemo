import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useEffect, useState, version } from "react";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from '@vercel/speed-insights/next';

const inter = Inter({ subsets: ["latin"] });

export default function Home() {

  const [position, setPosition] = useState({ x: 500, y: 100});
  const [velocity, setVelocity] = useState({ dx: 5, dy: 5});
  const [direction,setDirection] = useState({x:0,y:1})
  const [sliders,setslider] = useState({
    x:500,
    y:0
  })
  const [score,setScore] = useState(0)  
  const [delta,setDelta] = useState(0)
  const [lasttime,setLasttime] = useState(0)

  useEffect(()=>{
    let ball_ele = document.getElementById('ball')
    let slider_ele = document.getElementById('slider')
    let ball_bottom = parseInt(ball.getBoundingClientRect().bottom)
    let slider_top = parseInt(slider_ele.getBoundingClientRect().top)
    let  isRange = false 
    console.log(parseInt(position.y))
    if(parseInt(position.x) > slider_ele.getBoundingClientRect().left && 
      parseInt(position.x) < slider_ele.getBoundingClientRect().left + 150
    ){
      isRange = true
    }

    // console.log(parseInt(position.y),'233')
    if(position.y > 541 && position.y < 543){
     
    }



    if( isRange && parseInt(position.y) <= 541   && parseInt(position.y) >= 537 && direction.y > 0){
      console.log("dash",parseInt(position.y))
      setDirection({
        ...direction,
        y:direction.y* -1
      })
      setVelocity({
        dx:velocity.dx+.2,
        dy:velocity.dy+0.2
      })
      setScore((prevScore)=> prevScore+1)
    }
  },[position,sliders,direction])

  useEffect(()=>{
    if(position.x < 0 || position.x > window.innerWidth - 25){
      setDirection({
        ...direction,
        x:direction.x* -1
      })
    }
    if(position.y < 0 || position.y > window.innerHeight -25){
      setDirection({
        ...direction,
        y:direction.y* -1
      })
    }
  },[position])




  useEffect(() => {
    const randomNumber = (min,max)=>{
      return Math.random() * (max - min) + min
    }

 

    // if(position.y > window.innerHeight || position.y < 0){
    //   direction.y *= -1;
    // }
    // let direction = {x:-1,y:0}
    let heading = randomNumber(0.2,2 * Math.PI)
    if(Math.abs(direction.x) <=.2 || Math.abs(direction.x) >= 0.9){
      setDirection({x:Math.cos(heading),y:Math.sin(heading)})
    }

    const moveBall = (time) => {
      // console.log(direction
      // console.log(delta)
      setPosition({
        x:position.x + (velocity.dx * direction.x),
        y:position.y + (velocity.dy * direction.y)
       })

    };

    const animationId = requestAnimationFrame(moveBall);

    return () => cancelAnimationFrame(animationId);
  }, [position,direction,velocity]);


  useEffect(()=>{
    const handelMouse = (e)=>{
      // console.log(e)
      let slider = document.getElementById('slider')
      let box = document.getElementById('box')
      let sizes = box.getBoundingClientRect()
      // console.log(sizes)
      // console.log(slider)
      setslider({
        x:e.clientX - 75,
        y:slider.getBoundingClientRect().bottom - 30
      })
    }
    if(window){
      window.addEventListener('mousemove',handelMouse)
    }

    return(()=>{
      window.removeEventListener('mousemove',handelMouse)
    })
  })
  return (
    <>
    <Head>
      <title>PingPong</title>
      <meta name="description" content="This is pingpong game developed using ReactJS for Educational purpose. Used requestAnimationFrame API for amimation for the ball and used window Object for handling edge cases" />
      <meta name="robots" content="follow, index"></meta>
      <meta property="og:title" content="React PingPong" />
      <meta property="og:description" content="This is pingpong game developed using ReactJS for Educational purpose. Used requestAnimationFrame API for amimation for the ball and used window Object for handling edge cases" />
      <meta property="og:image" content="./pingpong.png" />
    </Head>
    <Analytics/>
    <SpeedInsights />
      <div className={styles.box} id="box">
        <div className={styles.score}>
          <div className={styles.scores}>{score}</div>
          <div className={styles.scoretxt}>Score</div>
        </div>
       <span className={styles.slider} id="slider" style={{left:`${sliders.x}px`}}>
       </span>
       <div className={styles.ball} id='ball' style={{ left: position.x, top: position.y }}>

       </div>
      </div>
    </>
  );
}
