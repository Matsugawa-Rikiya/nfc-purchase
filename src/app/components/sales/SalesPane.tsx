import React, { useState } from "react";
import TicketSale from "./TicketSale";

import { OKButton } from "../button/Buttons";
import BookSale from "./BookSale";
import { useRouter } from "next/navigation";

interface SalesPaneProps {
  employee: {
    name: string | null;
    userid: string | null;
    cardid: string | null;
  };
}

const SalesPane: React.FC<SalesPaneProps> = ({ employee }) => {
  const router = useRouter();
  const [ticket, setTicket] = useState(0);
  const [book, setBook] = useState(0);

  const handleNext = () => {
    const url = `/sales/${employee.cardid}/confirm?name=${employee.name}&userid=${employee.userid}&cardid=${employee.cardid}&ticket=${ticket}&book=${book}`;
    router.push(url);
  };

  return (
    <div className="flex flex-col items-center justify-center w-1/2">
      <h1 className="text-3xl font-bold mb-5">購入</h1>
      <div className="flex items-end">
        <h2 className="text-5xl font-semibold">
          {employee.name} （{employee.userid}）
        </h2>
        <h3 className="text-3xl"> 様</h3>
      </div>
      <p className="pt-3">いつもご利用ありがとうございます。</p>
      <div className="flex justify-between space-x-10">
        <TicketSale ticket={ticket} setTicket={setTicket} />
        <BookSale book={book} setBook={setBook} />
      </div>
      <div className="flex flex-col justify-center w-full mt-20">
        <p className="text-center w-full">確認画面へ進んでください</p>
        <OKButton onClick={handleNext} className="text-3xl py-12">
          次へ
        </OKButton>
      </div>
    </div>
  );
};

export default SalesPane;
