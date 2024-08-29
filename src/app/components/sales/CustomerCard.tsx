"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { HiOutlineTicket } from "react-icons/hi2";
import { LinkButton } from "../button/Buttons";

const CustomerCard = () => {
  return (
    <Card className="w-96 mx-auto mt-10">
      <CardHeader>
        <CardTitle className="text-center">お客様</CardTitle>
        <CardDescription className="text-center text-sm">
          食券は現金購入になります
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center border-2 rounded-lg py-10">
          <HiOutlineTicket className="text-9xl" />
        </div>
        <div className="flex justify-center mt-4">
          <LinkButton href="/sales/customer" className="w-full text-2xl">
            BUY
          </LinkButton>
        </div>
      </CardContent>
      <CardFooter>
        <p className="text-center w-full">購入画面へ進んでください</p>
      </CardFooter>
    </Card>
  );
};

export default CustomerCard;
