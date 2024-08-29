"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getUserByNfcId } from "@/app/sql/sqls";
import SalesPane from "@/app/components/sales/SalesPane";
import { CancelButton } from "@/app/components/button/Buttons";
import DataPane from "@/app/components/sales/DataPane";

export default function EmployeeSales() {
  const { id } = useParams<{ id: string }>();
  const [employee, setEmployee] = useState<{
    name: string | null;
    userid: string | null;
    cardid: string | null;
  } | null>(null);
  const [rows, setRows] = useState<any[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rows = await getUserByNfcId(id);
        setRows(rows);
        if (rows.length === 0) {
          setEmployee({ name: null, userid: null, cardid: id });
        } else {
          const { name, userid, cardid } = rows[0];
          setEmployee({ name, userid, cardid });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsFetching(false);
      }
    };

    if (id) {
      setIsFetching(true);
      fetchData();
    }
  }, []);

  const handleCancel = () => {
    router.push("/sales");
  };

  return (
    <div className="flex flex-col px-20">
      <div className="flex w-full items-start gap-20 justify-center">
        {isFetching ? (
          <div>Loading...</div>
        ) : employee !== null && rows.length > 0 ? (
          <SalesPane employee={employee} />
        ) : (
          <DataPane
            employee={employee ?? { name: null, userid: null, cardid: null }}
          />
        )}
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
