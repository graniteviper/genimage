import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Model from "@/components/Model";
import Packs from "@/components/Packs";
import Camera from "@/components/Camera";

const page = () => {
  return (
    <div className="h-screen">
      <div className="flex justify-center">
        <Tabs defaultValue="account" className="w-[400px] flex items-center justify-center py-4">
          <TabsList className="flex gap-2">
            <TabsTrigger value="model">Model</TabsTrigger>
            <TabsTrigger value="packs">Packs</TabsTrigger>
            <TabsTrigger value="camera">Camera</TabsTrigger>
          </TabsList>
          <TabsContent value="model">
            <Model />
          </TabsContent>
          <TabsContent value="camera">
            <Camera />
          </TabsContent>
          <TabsContent value="packs">
            <Packs />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default page;
