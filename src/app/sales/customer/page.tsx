"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import TicketSale from "../../components/sales/TicketSale";
import { CancelButton, OKButton } from "../../components/button/Buttons";

export default function CustomerSales() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [ticket, setTicket] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleNext = () => {
    if (name.trim() === "") {
      setErrorMessage("名前（社員ID）を入力してください。");
      return;
    }
    if (ticket === 0) {
      setErrorMessage("チケットを1つ以上選択してください。");
      return;
    }

    setErrorMessage(null); // エラーをクリア
    const url = `/sales/customer/check?name=${encodeURIComponent(
      name
    )}&ticket=${ticket}`;
    router.push(url);
        router.push(url);
  };

  const handleCancel = () => {
    router.push("/sales");
  };

  return (
    <div className="container mx-auto flex flex-col items-center justify-center w-1/2">
      <h1 className="text-3xl font-bold mb-5">購入</h1>
      {/* エラーメッセージ表示 */}
      {errorMessage && (
        <div className="text-red-500 text-lg mt-4">{errorMessage}</div>
      )}

      {/* 名前入力欄 */}
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full text-xl p-3 border rounded-md mb-5"
        placeholder="名前（社員ID）を入力してください"
      />

      <div className="flex justify-center space-x-10">
        <TicketSale ticket={ticket} setTicket={setTicket} />
      </div>

      <div className="flex flex-col justify-center w-full mt-20">
        <OKButton onClick={handleNext} className="text-3xl py-12">
          次へ
        </OKButton>
      </div>

      <div className="flex justify-center w-full mt-10">
        <CancelButton
          onClick={handleCancel}
          className="flex w-52 py-8 text-xl border rounded-full"
        >
          キャンセル
        </CancelButton>
      </div>
    </div>
  );
}
