"use client";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import { Button } from "@/components/ui/button"
  import { Input } from "@/components/ui/input"
  import { Label } from "@/components/ui/label"
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export function CardWithForm({zipUrl}:{zipUrl:string}) {
  const router = useRouter();
  const [name, setName] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [ethnicity, setEthnicity] = useState<string>("");
  const [eyeColor, setEyeColor] = useState<string>("");
  const [bald, setBald] = useState<boolean>(false);
  const [Age, setAge] = useState<number>(0);
  const {getToken} = useAuth();

  async function trainModel(){
    const input = {
      name,
      age: Age,
      gender,
      ethnicity,
      eyeColor,
      bald,
      zipUrl
    }
    const token = await getToken();
    const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/ai/training`, input,
      {
        headers:{
          Authorization: `Bearer ${token}`
        }
      }
    );
    if(res){
      router.push("/");
    }

  }

    return (
      <Card className="w-[450px]">
        <CardHeader>
          <CardTitle>Train Model</CardTitle>
          <CardDescription>Submit personal data to train the model.</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Enter your name" onChange={(e)=>{setName(e.target.value)}}/>
              </div>
              
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="age">Age</Label>
                <Input id="age" type="number" placeholder="Enter your age" onChange={(e)=>{setAge(parseInt(e.target.value))}}/>
              </div>
              
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="gender">Gender</Label>
                <Select onValueChange={(e)=>{setGender(e)}}>
                  <SelectTrigger id="gender">
                    <SelectValue placeholder="Select gender"/>
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="ethnicity">Ethnicity</Label>
                <Select onValueChange={(e)=>{setEthnicity(e)}}>
                  <SelectTrigger id="ethnicity">
                    <SelectValue placeholder="Select ethnicity" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="White">White</SelectItem>
                    <SelectItem value="Black">Black</SelectItem>
                    <SelectItem value="Asian_American">Asian American</SelectItem>
                    <SelectItem value="East_Asian">East Asian</SelectItem>
                    <SelectItem value="South_Asian">South Asian</SelectItem>
                    <SelectItem value="Hispanic">Hispanic</SelectItem>
                    <SelectItem value="Pacific">Pacific Islander</SelectItem>
                    <SelectItem value="Middle_Eastern">Middle Eastern</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="eyeColor">Eye Color</Label>
                <Select onValueChange={(e)=>{setEyeColor(e)}}>
                  <SelectTrigger id="eyeColor">
                    <SelectValue placeholder="Select eye color" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="brown">Brown</SelectItem>
                    <SelectItem value="blue">Blue</SelectItem>
                    <SelectItem value="green">Green</SelectItem>
                    <SelectItem value="hazel">Hazel</SelectItem>
                    <SelectItem value="grey">Grey</SelectItem>
                    <SelectItem value="amber">Amber</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox id="bald" onCheckedChange={(e)=>{setBald(!bald)}}/>
                <Label htmlFor="bald">Bald</Label>
              </div>
              
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="zipUrl">ZIP URL</Label>
                <Input id="zipUrl" placeholder="will ne autogenerated (zipurl)" />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={()=>{
            router.push("/")
          }}>Cancel</Button>
          <Button disabled={!Age || !ethnicity || !gender || !eyeColor || !name || !zipUrl} onClick={trainModel}>Train Model</Button>
        </CardFooter>
      </Card>
    )
  }