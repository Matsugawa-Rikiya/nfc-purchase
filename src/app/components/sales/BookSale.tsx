import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface BookSaleProps {
  book: number;
  setBook: React.Dispatch<React.SetStateAction<number>>;
}

const BookSale: React.FC<BookSaleProps> = ({ book, setBook }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBook(Number(e.target.value));
  };

  return (
    <div className="flex">
      <Card className="w-96 mx-auto mt-10">
        <CardHeader>
          <CardTitle className="text-center">セット</CardTitle>
          <CardDescription className="text-center text-lg">
            3,000円/冊
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col justify-center items-end border-2 rounded-lg p-10">
            <input
              type="number"
              className="text-center text-9xl font-bold w-full"
              defaultValue={0}
              min={0}
              onChange={handleChange}
            />
            <p className="text-5xl">冊</p>
          </div>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
};

export default BookSale;
