// app/pages/terms.tsx

'use client';

import React, { useState } from 'react';

const Terms: React.FC = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const maleGradient = 'bg-gradient-to-r from-[#7c5ded] to-[#83d5f7]';
  const container = 'bg-white rounded-xl -mt-20 py-6 sm:py-10 md:py-14 px-3 sm:px-6 md:px-8 flex flex-col shadow-md';

  const textSm = 'text-center text-sm sm:text-md md:text-lg';
  const textMd = 'text-md sm:text-xl md:text-3xl py-2 sm:py-4 md:py-6 font-bold';

  return (
    <div className="flex flex-col items-center min-h-screen w-screen bg-white">
      <div className={`h-40 md:h-48 w-full px-4 md:px-8 pt-10 flex flex-row ${maleGradient}`} />
      {/* container */}
      <div className={`${container} w-5/6`}>
        <h1 className="text-2xl font-bold text-center py-6">利用規約</h1>
        <div className={`bg-white border border-gray-500 rounded-md p-4 ${textMd} overflow-y-auto h-96`}>
          <p className="mb-4">
            第1条（本利用規約について）
            <br />
            1. この利用規約（以下、「本規約」といいます。）は、株式会社〇〇〇〇（以下、「当社」といいます。）が提供するマッチングサービス（以下、「本サービス」といいます。）を利用する者（以下、「ユーザ」といいます。）に適用されます。ユーザは以下の本規約に同意の上、本サービスを利用ください。
            <br />
            2. 当社はユーザに対する事前の通知なく、本規約をいつでも任意の理由で変更することができるものとします。変更後の本規約は、当サイト上に表示した時点より効力を生じるものとし、ユーザが本規約の変更の効力が生じた後に本サービスを利用した場合には、変更後の本規約に同意したものと見なします。
            <br />
          </p>
          <p>
            第2条（用語の定義）
            <br />
            本規約における次の用語は、以下の意味を有するものとします。
            <br />
            1. 「コンテンツ」とは、テキスト、写真、音声、音楽、画像、イメージを含む全ての種類のデータをいいます。
            <br />
            2. 「ユーザコンテンツ」とは、コンテンツのうち、ユーザが本サービスを利用して作成、投稿、または送信するものをいいます。
          </p>
        </div>
        <p className={`${textSm} text-gray-700 mt-6`}>
          本規約をご確認の上、「利用規約に同意する」にチェックを入れて「アプリを使う」ボタンをタップしてアプリの利用を開始してください。
        </p>
        <div className="flex items-center justify-center mt-4">
          <input type="checkbox" id="agree" checked={isChecked} onChange={handleCheckboxChange} className="w-4 h-4 focus:outline-none" />
          <label htmlFor="agree" className="ml-2 text-sm text-gray-700">
            利用規約に同意する
          </label>
        </div>
        <button className={`mt-6 w-full py-2 px-4 rounded-full text-white text-sm font-semibold ${maleGradient}`}>アプリを使う</button>
      </div>
    </div>
  );
};

export default Terms;
