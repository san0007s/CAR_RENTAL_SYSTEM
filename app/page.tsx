"use client"
import CarsFItersOptions from "@/components/Home/CarsFItersOptions";
import CarsList from "@/components/Home/CarsList";
import Hero from "@/components/Home/Hero";
import Searchinput from "@/components/Home/Searchinput";
import TostMsg from "@/components/TostMsg";
import { BookCreatedFlagContext } from "@/context/BookCreatedFlagContext";
import { getCarsList } from "@/services";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {

  const[carsList,setCarsList]=useState<any>([])
  const[carsOrgList,setCarsOrgList]=useState<any>([])
  const[showToastMsg,setShowToastMsg]=useState<boolean>(false);

  useEffect(()=>{
    getCarsList_();
  },[])
  const getCarsList_ = async()=>{
    const result:any = await getCarsList();
    setCarsList(result?.carLists)
    setCarsOrgList(result?.carLists);
  }

  const filterCarList=(brand:string)=>{
    const filterList=carsOrgList.filter((item:any)=>
    item.carBrand==brand);

    setCarsList(filterList);
  }

  const orderCarList=(order:any)=>{
    const sortedData = [...carsOrgList].sort((a,b)=>
    order==-1? a.price - b.price:b.price-a.price);
    setCarsList(sortedData);
  }

  return (
    <div className="p-5 sm:px-10 md:px-20">
      <BookCreatedFlagContext.Provider value={{showToastMsg,setShowToastMsg}}>
        <Hero/>
        <Searchinput/>
        <CarsFItersOptions carsList={carsOrgList}
        orderCarList={(value:string)=>orderCarList(value)}
        setBrand={(value:string)=>filterCarList(value)}/>
        <CarsList carsList = {carsList} />
        {showToastMsg?<TostMsg/>:null}
      </BookCreatedFlagContext.Provider>
    </div>
  );
}
