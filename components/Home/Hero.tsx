import React from "react";

import Image from "next/image";
function Hero() {
    return (
        <div className="grid grid-col-1
        md:grid-cols-2">
            <div>
                
                <h2 className="text-[40px] md:text-[60px]
                front-bold">Premium Car Rental in Your Area</h2>
                <h2 className="Text-[20px] text-gray-500 pr-20 mt-5">
                Book the selected car effortlesslt,pay for driving only, 
                <br />Buy the Car Now </h2>
                <button className="p-2 mt-5 bg-blue-500 text-white
                px-4 rounded-full
                hover:scale-105 transition-all">Explore Cars</button>

            </div>

            <div>
            <Image src ='/car.png'
            alt="logo"
            width={490}
            height={500}
            className="w-full object-cover all"/>
            </div>


        </div>
    )
}

export default Hero 