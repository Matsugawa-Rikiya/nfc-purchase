import React from "react";
import { RecordButton } from "../button/Buttons";
import { putUser } from "@/app/sql/sqls";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

interface DataPaneProps {
  employee: {
    name: string | null;
    userid: string | null;
    cardid: string | null;
  };
}

const DataPane: React.FC<DataPaneProps> = ({ employee }) => {
  const [name, setName] = React.useState<string | null>(null);
  const [userid, setUserid] = React.useState<string | null>(null);
  const { toast } = useToast();
  const router = useRouter();

  const recordUserInfo = async () => {
    if (name !== null && userid !== null && employee.cardid !== null) {
      console.log("name: ", name);
      console.log("userid: ", userid);
      console.log("cardid; ", employee.cardid);

      //DB登録
      try {
        await putUser(name, userid, employee.cardid);
        router.push("/sales/" + employee.cardid);
      } catch (error) {
        console.error("Error recording data:", error);
        toast({
          title: "Error",
          description: "DB登録に失敗しました",
        });
      }
    } else {
      alert("社員番号とお名前を入力してください");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-1/2">
      <h1 className="text-3xl font-bold mb-5">カード情報</h1>
      <h2 className="text-5xl font-semibold">{employee.cardid}</h2>
      <p className="text-red-600 pt-3">
        あなたのカード情報が登録されておりません
      </p>
      <div className="flex text-3xl mt-16 items-center">
        <p className="w-64 text-right">社員番号：</p>
        <input
          type="text"
          className="w-full p-2 border-2 rounded-lg text-center"
          defaultValue={employee.userid ?? ""}
          onChange={(e) => setUserid(e.target.value)}
        />
      </div>
      <div className="flex text-3xl my-10 items-center">
        <p className="w-64 text-right">お名前：</p>
        <input
          type="text"
          className="w-full p-2 border-2 rounded-lg text-center"
          defaultValue={employee.name ?? ""}
          placeholder="姓 名"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <p></p>

      <div className="flex"></div>
      <div className="flex flex-col justify-center w-full">
        <p className="text-center w-full my-12">
          お手数ですが社員番号とお名前を事前登録ください。
          <br />
          一度登録をすると、次回以降はカードをかざすだけで購入できます。
        </p>
        <RecordButton onClick={recordUserInfo} className="text-3xl py-12">
          DB登録
        </RecordButton>
      </div>
    </div>
  );
};

export default DataPane;
