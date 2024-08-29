"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import TicketSale from "../../components/sales/TicketSale";
import BookSale from "@/app/components/sales/BookSale";
import { CancelButton, OKButton } from "../../components/button/Buttons";


export default function CustomerSales() {
  const router = useRouter();
  const [ticket, setTicket] = useState(0);
  const [book,setBook] = useState(0);
  const [isFetching, setIsFetching] = useState<boolean>(false);


  const handleNext = () => {
    if (ticket === 0 && book === 0) {
      alert("チケットまたはセット商品を1つ以上選択してください。");
      return;
    }
    const url = `/customer/confirm?ticket=${ticket}&book=${book}`;
    router.push(url);
  };

  const handleCancel = () => {
    router.push("/sales");
  };

  return (
    <div className="container mx-auto flex flex-col items-center justify-center w-1/2">
      <h1 className="text-3xl font-bold mb-5">購入</h1>
      <div className="flex justify-center space-x-10">
        <TicketSale ticket={ticket} setTicket={setTicket} />
        <BookSale book={book} setBook={setBook}/>
      </div>
      <div className="flex flex-col justify-center w-full mt-20">
        <p className="text-center w-full">確認画面へ進んでください</p>
        <OKButton onClick={handleNext} className="text-3xl py-12">
          次へ
        </OKButton>
      </div>
      <div className="flex justify-center w-full mt-10">
        {!isFetching ? (
          <CancelButton
            onClick={handleCancel}
            className="flex w-52 py-8 text-xl border rounded-full"
          >
            キャンセル
          </CancelButton>
        ) : null}
      </div>
    </div>
  );
}
