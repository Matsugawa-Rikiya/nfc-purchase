"use client";

import { useRouter } from "next/navigation";
import React, { useState, useEffect, Suspense } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { HiOutlineIdentification } from "react-icons/hi2";
import { CancelButton, OKButton } from "@/app/components/button/Buttons";
import { getIDmStr } from "@/app/lib/nfc/rcs300.mjs";
import { useToast } from "@/components/ui/use-toast";
import { putSoldSeparately, getUserByNfcId } from "@/app/sql/sqls";

// コンポーネントの定義
const CheckPage = () => {
  const router = useRouter();
  const [name, setName] = useState<string | null>(null);
  const [ticket, setTicket] = useState<string | null>(null);
  const [idm, setIdm] = useState<string | undefined>("");
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const { toast } = useToast();
  const [employeeName, setEmployeeName] = useState<string | null>(null);
  const [employeeId, setEmployeeId] = useState<string | null>(null);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  // 検索パラメータをuseEffectで取得
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const paramName = searchParams.get("name");
    const paramTicket = searchParams.get("ticket");

    setName(paramName);
    setTicket(paramTicket);
  }, []);

  // NFCカードを自動的にスキャンする
  useEffect(() => {
    const autoScan = async () => {
      setIsScanning(true);
      try {
        const idmString = await getIDmStr(navigator); // NFCカードスキャン
        if (idmString) {
          const cleanedIdm = idmString.replace(/\s/g, "");
          setIdm(cleanedIdm);
          setIsFetching(true);
          const userData = await getUserByNfcId(cleanedIdm); // 認証

          if (userData && userData.length > 0) {
            setEmployeeName(userData[0].name);
            setEmployeeId(userData[0].userid);

            if (userData[0].is_admin) {
              setIsAdmin(true);
              setIsConfirmed(true); // OKボタンを表示する
            } else {
              setIsAdmin(false);
            }
          } else {
            toast({
              title: "Error",
              description: "販売者情報が見つかりませんでした",
            });
          }
          setIsFetching(false);
        } else {
          toast({
            title: "Error",
            description: "IDmが取得できませんでした",
          });
        }
      } catch (e) {
        console.error("Error during NFC scan:", e);
        toast({
          title: "Error",
          description: "エラーが発生しました。もう一度お試しください。",
        });
      } finally {
        setIsScanning(false);
      }
    };

    autoScan(); // ページが読み込まれたときに自動でスキャンを開始
  }, []);

  const today = new Date().toLocaleDateString();
  const ticketPrice = 400; // チケットの単価
  const ticketCount = ticket ? parseInt(ticket, 10) : 0;
  const ticketSubtotal = ticketCount * ticketPrice;
  const totalAmount = ticketSubtotal;

  const handleOK = async () => {
    try {
      if (name && employeeName && employeeId) {
        try {
          await putSoldSeparately(name, ticketCount, employeeName, employeeId);
          const confirmed = window.confirm(
            "ご購入ありがとうございました。OKを押して続行してください。"
          );
          if (confirmed) {
            router.push("/sales");
          }
        } catch (error) {
          console.error("Error recording data:", error);
          toast({
            title: "Error",
            description: "DB登録に失敗しました",
          });
        }
      } else {
        console.error("必要な情報が不足しています");
        toast({
          title: "Error",
          description: "必要な情報が無効です",
        });
      }
    } catch (e) {
      console.error("DB Error:", e);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex w-full p-10 space-x-5">
        <div className="flex flex-col w-1/2 items-center border-2 p-5">
          <h1 className="text-5xl font-bold">
            {!isConfirmed ? "注文内容" : "領収書"}
          </h1>
          <hr className="w-full border-t-2 border-gray-300 mt-4" />
          <div className="text-4xl mt-10 w-full">
            <p className="text-right">{today}</p>
            <div className="flex w-full">
              <div className="flex flex-col w-1/3 text-right space-y-10">
                <p>お名前:</p>
                <p>販売者ID:</p>
                <p>販売者名:</p>
              </div>
              <div className="flex flex-col w-2/3 text-left space-y-10">
                <p className="pl-10 font-bold">{name}</p>
                {isAdmin && employeeName && employeeId && (
                  <div className="pl-10 font-bold flex flex-col space-y-10">
                    <p>{employeeId}</p>
                    <p>{employeeName}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          <table className="table-auto w-full mt-10 text-3xl">
            <thead>
              <tr>
                <th className="px-4 py-2">アイテム</th>
                <th className="px-4 py-2">単価</th>
                <th className="px-4 py-2">数量</th>
                <th className="px-4 py-2">小計</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2">チケット</td>
                <td className="border px-4 py-2">
                  {ticketPrice.toLocaleString()}円
                </td>
                <td className="border px-4 py-2">{ticket}枚</td>
                <td className="border px-4 py-2">
                  {ticketSubtotal.toLocaleString()}円
                </td>
              </tr>
            </tbody>
            <tfoot className="text-4xl font-semibold bg-gray-100">
              <tr>
                <td className="border px-4 py-2 text-right" colSpan={3}>
                  合計金額
                </td>
                <td className="border px-4 py-2">
                  {totalAmount.toLocaleString()}円
                </td>
              </tr>
            </tfoot>
          </table>
          <div className="flex w-full items-center justify-center space-x-10 mt-20">
            {isConfirmed && isAdmin && (
              <OKButton className="w-1/2 py-10 text-2xl" onClick={handleOK}>
                OK
              </OKButton>
            )}
            <CancelButton
              className="w-1/2 py-10 text-2xl"
              onClick={handleCancel}
            >
              Cancel
            </CancelButton>
          </div>
        </div>
        <div className="flex flex-col w-1/2 items-center border-2 p-5">
          <h1 className="text-5xl font-bold">販売担当</h1>
          <Card className="w-96 mx-auto mt-10">
            <CardHeader>
              <CardTitle className="text-center">Confirmation</CardTitle>
              <CardDescription className="text-center text-sm">
                NFCカードをかざしてください
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center border-2 rounded-lg py-10">
                <HiOutlineIdentification className="text-9xl" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Suspense>
  );
};

export default CheckPage;
