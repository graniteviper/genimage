"use client";
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';

const Packs = () => {
    const [packs, setPacks] = useState<any[]>([]);
    
    const getPacks = async () => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/pack/bulk`);
            setPacks(res.data.response);
        } catch (error) {
            console.error("Error fetching packs:", error);
        }
    }
    
    useEffect(() => {
        getPacks();
    }, []); // Empty dependency array means this runs once on mount

    const imageUrls: string[] = ["https://imgs.search.brave.com/uEwddb2IJytdOCP3YWZmOer27LiLVJq510h2iAAgNQM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvODU1/MTAzNTc2L3Bob3Rv/L3Blb3BsZS1jaGVl/cmluZy1pbi1mcm9u/dC1vZi12aWJyYW50/LWZpcmV3b3JrLmpw/Zz9zPTYxMng2MTIm/dz0wJms9MjAmYz1n/aVo3TVZXQnV1bXot/aVRqRXUwbS1ZeWpI/NUhGdnZLc1pZX2RV/bUdaZTdJPQ","https://www.thestatesman.com/wp-content/uploads/2020/03/Holi.jpg"]
    
    return (
        <div className='flex gap-4'>
            {packs.length > 0 ? (
                packs.map((pack, index) => (
                    <Card key={index}>
                        <CardHeader>
                            <CardTitle>{pack.name}</CardTitle>
                            <CardDescription>{pack.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <img src={imageUrls[pack.id-1]} alt="Pack Image" />
                        </CardContent>
                        <CardFooter>
                            <Button variant='ghost'>
                                Generate
                            </Button>
                        </CardFooter>
                    </Card>
                ))
            ) : (
                <p>Loading packs...</p>
            )}
        </div>
    )
}

export default Packs