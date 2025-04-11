import { CardWithForm } from "@/components/ui/CardWithForm"
import {Component} from "@/components/ui/uploadBox"

const page = () => {
  return (
    <div className='w-screen h-screen flex justify-center items-center gap-10'>
        <div>
        <CardWithForm></CardWithForm>
        </div>
        <div>
        <Component className="w-[500px]"></Component>
        </div>
    </div>
  )
}

export default page


