"use client";

import React, { useState, useEffect } from "react";

const NFCReaderComponent = () => {
  const [nfcData, setNfcData] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if ('NDEFReader' in window) {
      const nfcReader = new (window as any).NDEFReader(); // TypeScriptではany型として扱う
      const startNFCScan = async () => {
        try {
          await nfcReader.scan(); // NFCタグのスキャンを開始
          nfcReader.onreading = (event: any) => {
            const decoder = new TextDecoder();
            for (const record of event.message.records) {
              if (record.recordType === "text") {
                const textData = decoder.decode(record.data);
                setNfcData(textData); // 読み取ったデータを保存
              }
            }
          };
          nfcReader.onerror = (event: Event) => {
            setError("NFCの読み取り中にエラーが発生しました");
          };
        } catch (err) {
          setError("NFCのスキャンを開始できませんでした");
          console.error("Error starting NFC scan:", err);
        }
      };

      startNFCScan(); // コンポーネントがマウントされたらスキャンを開始
    } else {
      setError("このブラウザはNFCをサポートしていません");
    }
  }, []);

  return (
    <div>
      <h1>NFC Reader</h1>
      {nfcData && <p>読み取ったデータ: {nfcData}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default NFCReaderComponent;
