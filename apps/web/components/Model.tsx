"use client";
import { CardWithForm } from "@/components/ui/CardWithForm"
import {Component} from "@/components/ui/uploadBox"
import { useState } from "react";

const Model = () => {

  const [zipUrl, setZipUrl] = useState<string>("");

  return (
    <div className='flex justify-center items-center gap-10'>
        <div>
        <CardWithForm zipUrl={zipUrl}></CardWithForm>
        </div>
        <div>
        <Component className="w-[500px]" onuploadDone={(zipUrl)=>{
          setZipUrl(zipUrl);
        }}></Component>
        </div>
    </div>
  )
}

export default Model


