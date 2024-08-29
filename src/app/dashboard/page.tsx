"use client";

import { HiPresentationChartBar } from "react-icons/hi2";
import { HiTicket } from "react-icons/hi2";
import { HiTableCells } from "react-icons/hi2";
import { TbNfc } from "react-icons/tb";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LinkButton } from "../components/button/Buttons";

export default function Dashboard() {
  return (
    <Tabs defaultValue="sales" className="container mx-auto w-full h-[600px]">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="sales">
          <HiPresentationChartBar className="text-2xl" />
          　販売
        </TabsTrigger>
        <TabsTrigger value="inventory">
          <HiTicket className="text-2xl" />
          　在庫
        </TabsTrigger>
        <TabsTrigger value="master">
          <HiTableCells className="text-2xl" />
          　マスタ
        </TabsTrigger>
      </TabsList>
      <TabsContent
        value="sales"
        className="border-2 h-[600px] flex items-center justify-center"
      >
        <LinkButton href="/sales" className="flex py-5">
          <TbNfc className="text-2xl text-white" />
          　販売アプリ起動
        </LinkButton>
      </TabsContent>
      <TabsContent
        value="inventory"
        className="border-2 h-[600px]"
      ></TabsContent>
      <TabsContent value="master" className="border-2 h-[600px]"></TabsContent>
    </Tabs>
  );
}
