"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { HiOutlineIdentification } from "react-icons/hi2";
import {
  CancelButton,
  CommitButton,
  OKButton,
} from "@/app/components/button/Buttons";
import { getIDmStr } from "@/app/lib/nfc/rcs300.mjs";
import { useToast } from "@/components/ui/use-toast";
import { set } from "react-hook-form";
import { putSales } from "@/app/sql/sqls";

const ConfirmPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const name = searchParams.get("name");
  const userid = searchParams.get("userid");
  const cardid = searchParams.get("cardid");
  const ticket = searchParams.get("ticket");
  const book = searchParams.get("book");

  const [idm, setIdm] = useState<string | undefined>("");
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const { toast } = useToast();

  const handleClick = async () => {
    setIsScanning(true);
    try {
      await getIDmStr(navigator).then((idmString) => {
        if (idmString) {
          setIdm(idmString?.replace(/\s/g, ""));
          setIsConfirmed(true);
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
    }
    setIsScanning(false);
  };

  const today = new Date().toLocaleDateString();

  const ticketPrice = 400; // チケットの単価
  const bookPrice = 3000; // ブックの単価

  // ticketとbookを数値に変換し、nullチェックを行う
  const ticketCount = ticket ? parseInt(ticket, 10) : 0;
  const bookCount = book ? parseInt(book, 10) : 0;

  const ticketSubtotal = ticketCount * ticketPrice; // チケットの小計
  const bookSubtotal = bookCount * bookPrice; // ブックの小計
  const totalAmount = ticketSubtotal + bookSubtotal; // 合計金額

  const handleOK = async () => {
    try {
      setShowMessage(true); // メッセージを表示
      // DB登録
      if (userid) {
        // useridがnullでないことを確認
        try {
          await putSales(userid, ticketCount, bookCount);
          router.push("/sales");
        } catch (error) {
          console.error("Error recording data:", error);
          toast({
            title: "Error",
            description: "DB登録に失敗しました",
          });
        }
      } else {
        console.error("userid is null");
        toast({
          title: "Error",
          description: "ユーザーIDが無効です",
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <>
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
                <p>社員ID:</p>
                <p>カードID:</p>
              </div>
              <div className="flex flex-col w-2/3 text-left space-y-10">
                <p className="pl-10 font-bold">{name}</p>
                <p className="pl-10 font-bold">{userid}</p>
                <p className="pl-10">{cardid}</p>
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
              <tr>
                <td className="border px-4 py-2">ブック</td>
                <td className="border px-4 py-2">
                  {bookPrice.toLocaleString()}円
                </td>
                <td className="border px-4 py-2">{book}冊</td>
                <td className="border px-4 py-2">
                  {bookSubtotal.toLocaleString()}円
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
            {isConfirmed && (
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
                承認カードをかざしてください
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
                  <CommitButton onClick={handleClick} className="w-full">
                    SCAN
                  </CommitButton>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <p className="text-center w-full">{idm}</p>
            </CardFooter>
          </Card>
        </div>
      </div>
      {showMessage && (
        <div className="w-full text-center text-3xl ">
          ご購入ありがとうございました。
          <br />
          またのご利用をお待ちしております。
        </div>
      )}
    </>
  );
};

export default ConfirmPage;
