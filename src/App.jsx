import React, { useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";

const App = () => {
  let [showContent, setShowContent] = useState(false);
  useGSAP(() => {
    const tl = gsap.timeline();

    tl.to(".vi-mask-group", {
      rotate: 10,
      duration: 2,
      ease: "Power4.easeInout",
      transformOrigin: "50% 50%",
    }).to(".vi-mask-group", {
      scale: 10,
      duration: 2,
      delay: -1.8,
      ease: "Expo.easeInout",
      transformOrigin: "50% 50%",
      opacity: 0,
      onUpdate: function () {
        if (this.progress() >= 0.9) {
          document.querySelector(".svg").remove();
          setShowContent(true);
          this.kill();
        }
      },
    });
  });

  

  useGSAP(() => {

    if(!showContent) return ;

    let main = document.querySelector(".main");

    gsap.to(".main" ,{
      scale:1,
      rotate:0,
      duration:2,
      delay:"-1",
      ease:"Expo.easeInOut",
    });

    gsap.to(".sky" ,{
      scale:2,
      rotate:0,
      duration:2,
      delay:"-.8",
      ease:"Expo.easeInOut",
    });

    gsap.to(".bg" ,{
      scaleX:"1.2",
      rotate:0,
      duration:2,
      delay:"-.8",
      ease:"Expo.easeInOut",
    });

    gsap.to(".character" ,{
      rotate:0,
    
      bottom:"-35%",
      duration:2,
      delay:"-.8",
      ease:"Expo.easeInOut",
    });

    main?.addEventListener("mousemove", function (e) {
      console.log(e.clientX, e.clientY);
      const MoveX = (e.clientX / window.innerWidth - 0.5) * 40;
      // console.log(MoveX);

      gsap.to(".main .text", {
        x: `${MoveX * 0.4}%`,
      });
      gsap.to(".sky", {
        x: `${MoveX * 0.6}%`,
      });

      gsap.to(".bg", {
        x: `${-MoveX * 0.6}%`,
      });

      gsap.to(".character", {
        x: `${MoveX * 0.4}%`,
      });
    });
  }, [showContent]);

  return (
    <>
      {/* Pura screen cover karne wala div, background black hai, center mein SVG dikh rahi hai */}
      <div className="svg flex items-center justify-center fixed top-0 left-0 z-[2] w-full h-screen overflow-hidden bg-[#000]">
        <svg viewBox="0 0 800 600">
          <defs>
            {/*
            Mask bana rahe hain — black part invisible, white part dikhega.
            Future mein tu is mask ko animate kar sakta hai ya text change kar sakta hai.
          */}
            <mask id="viMask">
              {/* 
              Pura area black kar diya — matlab invisible.
              TODO: Is height="100" ko height="100%" kar dena future mein — responsive banega.
            */}
              <rect width="100%" height="100" fill="black" />

              {/* 
              Text ko ek group mein rakha hai — future mein animate karna ho toh easy rahega.
              Jaise GSAP ya Framer Motion se text ko zoom, fade wagairah.
            */}
              <g className="vi-mask-group">
                <text
                  x="50%"
                  y="50%"
                  fontSize="250"
                  textAnchor="middle"
                  fill="white" // sirf ye hi part dikhega image ka
                  dominantBaseline="middle"
                  fontFamily="Arial Black"
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
            href="./bg.png" // TODO: Image ko public folder mein daal ya import se la future mein
            width="100%"
            height="100%"
            // preserveAspectRatio="XMidYMid slice"
            mask="url(#viMask)" // yehi mask apply ho raha hai yahan
          />
        </svg>
      </div>

      {showContent && (
        <div className="main w-full rotate-[-20deg] scale-[1.7]">
          <div className="landing relative w-full h-screen overflow-hidden bg-black">
            <div className="nav absolute top-0 left-0 py-2 px-10 w-full  z-10">
              <div className="logo flex content-center text-center align-middle gap-5">
                <div className="lines flex flex-col gap-2 mt-6">
                  <div className="line w-10 h-1 bg-cyan-100 "></div>
                  <div className="line w-7 h-1 bg-cyan-100 "></div>
                  <div className="line w-5 h-1 bg-cyan-100 "></div>
                </div>
                <h3 className="text-4xl mt-4 leading-none text-cyan-100">
                  RockStar
                </h3>
              </div>
            </div>

            <div className="viewimages overflow-hidden relative w-full h-screen">
              <img
                className="sky absolute scale-[3] rotate-[-20deg] top-0 left-0 w-full h-full object-center"
                src="./sky.png"
              />
              <img
                className="bg absolute scale-x-[1.5] rotate-[-5deg] top-0 left-0 w-full h-full object-center"
                src="./bg.png"
              />
              <div className="text absolute text-9xl  text-white top-0 left-1/2 -translate-x-1/2">
                <h1 className="-ml-10">grand</h1>
                <h1 className="ml-20">theft</h1>
                <h1 className="-ml-20">auto</h1>
              </div>
              <img
                className="character absolute -bottom-[150%] left-[37%] -translate-x-1/2 rotate-[-5deg]  h-full scale-[1.3]"
                src="./girlbg.png"
              />
            </div>
            <div className="btmbar text-white absolute bottom-0 left-0 w-full py-15 px-10 bg-gradient-to-t from-black to-transparent">
              <div className="flex  gap-4 items-center">
                <i className=" text-2xl ri-arrow-down-line"></i>
                <h3 className="text-sm font-[Helvetica_Now_Display]">
                  Scroll Down
                </h3>
              </div>
              <img
                className=" absolute h-[40px] top-1/2 left-1/2 -translate-x-1/2"
                src="./ps5.png"
                alt="none"
              />
            </div>
          </div>
          <div className="w-full h-screen px-10 flex justify-center items-center bg-black">
            <div className="cont w-full h-[80%] flex">
              <div className="limg w-1/2 relative  h-full">
                <img
                  className="h-[650px] scale-[1.1] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  src="./imag.png"
                  alt=""
                />
              </div>
              <div className="rt w-[40%] flex flex-col gap-4  text-white ">
                <h1 className="text-8xl">Still Hunting,</h1>
                <h1 className="text-8xl  font-light">Not running</h1>
                <p className="text-shadow-2xs text-shadow-gray-600 font-extralight tracking-wide mt-6">
                  GTA 6 marks the return of Rockstar Games' legendary franchise
                  with a bold new chapter set in the vibrant and crime-filled
                  streets of Leonida, inspired by Miami. The game introduces a
                  dual-protagonist story, stunning next-generation visuals, and
                  a living, breathing open world that reacts to your every move.
                  With improved physics, deeper narratives, and evolved
                  gameplay, GTA 6 aims to redefine the open-world genre.
                </p>
                <p class="text-lg mb-6 tracking-wider ">
                  Ready to conquer the streets, blaze through missions, and live
                  the ultimate crime saga? Click the button below to{" "}
                  <span class="text-yellow-400 font-semibold">
                    dive into the explosive world of GTA 6
                  </span>{" "}
                  — where danger, power, and adrenaline await.
                </p>
                <button className=" border-2 border-amber-500 py-2 text-black bg-amber-400">Download Now</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default App;
