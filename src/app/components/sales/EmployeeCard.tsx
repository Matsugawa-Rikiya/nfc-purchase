"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { HiOutlineIdentification } from "react-icons/hi2";
import { CommitButton } from "../button/Buttons";
import { getIDmStr } from "@/app/lib/nfc/rcs300.mjs";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

import { useRouter } from "next/navigation";

const EmployeeCard = () => {
  const [idm, setIdm] = useState<string | undefined>("");
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleClick = async () => {
    setIsScanning(true);
    try {
      await getIDmStr(navigator).then((idmString) => {
        if (idmString) {
          const cleanedIdm = idmString.replace(/\s/g, "");
          setIdm(cleanedIdm);
          router.push(`/sales/${cleanedIdm}`);
        } else {
          setIdm(undefined);
          toast({
            title: "Error",
            description: "IDmが取得できませんでした",
          });
        }
      });
    } catch (e) {
      console.error(e);
      toast({
        title: "Error",
        description: "エラーが発生しました。もう一度お試しください。",
      });
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <Card className="w-96 mx-auto mt-10">
      <CardHeader>
        <CardTitle className="text-center">社員のみなさま</CardTitle>
        <CardDescription className="text-center text-sm">
          {process.env.NEXT_PUBLIC_CARD_NAME}をかざしてください
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center border-2 rounded-lg py-10">
          <HiOutlineIdentification className="text-9xl" />
        </div>
        <div className="flex justify-center mt-4">
          {isScanning ? (
            <p>now scaning...</p>
          ) : (
            <CommitButton
              onClick={handleClick}
              className="w-full text-2xl py-6"
            >
              SCAN
            </CommitButton>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <p className="text-center w-full">{idm}</p>
      </CardFooter>
    </Card>
  );
};

export default EmployeeCard;
