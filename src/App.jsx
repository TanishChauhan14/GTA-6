import React, {useState}from 'react'
import { useGSAP } from "@gsap/react";
import gsap from "gsap";


const App = () => {

  let [showContent,setShowContent] = useState(false);
  useGSAP(() => {
    const tl = gsap.timeline();

    tl.to('.vi-mask-group', {
      rotate :10,
      duration : 2,
      ease : "Power4.easeInout",
      transformOrigin : "50% 50%",
    }).to(".vi-mask-group",{
      scale:10,
      duration:2,
      delay:-1.8,
      ease : "Expo.easeInout",
      transformOrigin :"50% 50%",
      opacity: 0 ,
      onUpdate : function (){
        if (this.progress() >= .9 ) {
          document.querySelector(".svg").remove();
          setShowContent(true);
          this.kill();
        }
      }
    })

  } )

  return (
    <>
    {/* Pura screen cover karne wala div, background black hai, center mein SVG dikh rahi hai */}
    <div className="svg flex items-center justify-center fixed top-0 left-0 z-[2] w-full h-screen overflow-hidden bg-[#000]">
      <svg viewBox='0 0 800 600' preserveAspectRatio='XMidYMid slice'>
        <defs>
          {/*
            Mask bana rahe hain — black part invisible, white part dikhega.
            Future mein tu is mask ko animate kar sakta hai ya text change kar sakta hai.
          */}
          <mask id='viMask'>
            {/* 
              Pura area black kar diya — matlab invisible.
              TODO: Is height="100" ko height="100%" kar dena future mein — responsive banega.
            */}
            <rect width="100%" height="100" fill='black' />

            {/* 
              Text ko ek group mein rakha hai — future mein animate karna ho toh easy rahega.
              Jaise GSAP ya Framer Motion se text ko zoom, fade wagairah.
            */}
            <g className='vi-mask-group'>
              <text
                x="50%"
                y="50%"
                fontSize="250"
                textAnchor='middle'
                fill='white' // sirf ye hi part dikhega image ka
                dominantBaseline='middle'
                fontFamily='Arial Black'
              >
                VI
              </text>
            </g>
          </mask>
        </defs>

        {/* 
          Ye image hai bhai — bas wo hi part dikhega jahan VI likha hai.
          Future mein tu image dynamic bhi kar sakta hai — jaise props se bhejna.
        */}
        <image
          href='./bg.png' // TODO: Image ko public folder mein daal ya import se la future mein
          width='100%'
          height='100%'
          preserveAspectRatio='XMidYMid slice'
          mask='url(#viMask)' // yehi mask apply ho raha hai yahan
        />
      </svg>
    </div>

    {showContent && <div className='main w-full '>
      <div className='landing w-full h-screen bg-black'>
      <div className='nav absolute top-0 left-0 py-2 px-10 w-full  z-10'>
        <div className="logo flex content-center text-center align-middle gap-5">
          <div className="lines flex flex-col gap-2 mt-6">
            <div className="line w-10 h-1 bg-cyan-100 "></div>
            <div className="line w-7 h-1 bg-cyan-100 "></div>
            <div className="line w-5 h-1 bg-cyan-100 "></div>
            </div>
            <h3 className='text-4xl mt-4 leading-none text-cyan-100'>RockStar</h3>
        </div>
      </div>
        <div className='viewimages overflow-hidden relative w-full h-screen'>
        <img className='absolute top-0 left-0 w-full h-full object-center' src='./sky.png' />
          <img className='absolute top-0 left-0 w-full h-full object-center' src='./bg.png' />
          <img className='absolute -bottom-[35%] left-3/6 -translate-x-1/2  h-full scale-[1.3]' src='./girlbg.png' />
        </div>
        <div className='btmbar absolute bottom-0 left-0 w-full py-10 px-10 bg-amber-600'></div>
      </div>
      </div>
      }
    </>
  )
};

export default App
