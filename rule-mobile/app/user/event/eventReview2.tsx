// app/user/event/eventReview2.tsx

'use client';

import React, { useState } from 'react';
import FullCarousel from '@/app/components/user/search/fullCarousel';
import Star from '@/app/components/user/event/starSVG';

const EventReview2: React.FC = () => {
  const maleGradient = 'bg-gradient-to-r from-[#7c5ded] to-[#83d5f7]';
  const femaleGradient = 'bg-gradient-to-r from-[#fb298e] to-[#ff9dc7]';
  const container = 'w-full rounded-xl -mt-36 bg-white px-4 sm:px-6 md:px-8 py-6 sm:py-12 md:py-20 md:m-6 flex flex-col shadow-md space-y-2';
  const fromTop = 'pt-[750px] md:pt-[1200px] lg:pt-[1250px] xl:pt-[1350px]';
  const locationSVG = '/svg/location.svg';

  const textLg = 'text-lg sm:text-xl md:text-2xl font-bold';
  const textMd = 'text-md sm:text-lg md:text-xl py-2 sm:py-4 md:py-6 font-bold';
  const textSm = 'text-sm sm:text-md md:text-lg font-semibold';

  const title = '街コン・合コン・飲み会イベント';
  const date = '2023年9月20日 17:00~20:00';
  const imageUrl = '/image/img_1.png';
  const imageUrl5 = '/image/img_5.png';
  const maleFee = 5000;
  const maleTotal = 8;
  const males = 7;
  const maleRate = males/maleTotal;
  const femaleFee = 2000;
  const femaleTotal = 8;
  const females = 2;
  const femaleRate = females/femaleTotal;
  const rateEvent = 3;
  const rateStore = 4;
  const eventFilledStars = Math.min(rateEvent, 5);
  const eventEmptyStars = 5 - eventFilledStars;
  const storeFilledStars = Math.min(rateStore, 5);
  const storeEmptyStars = 5 - storeFilledStars;
  
  const items = [
    {
      imageUrl: '/image/img_1.png',
    },
    {
      imageUrl: '/image/img_2.png',
    },
    {
      imageUrl: '/image/img_3.png',
    },
    {
      imageUrl: '/image/img_4.png',
    },
    // will be added or get from database
  ];

  const description = 'イベントの説明が入ります。イベントの説明が入ります。イベントの説明が入ります。イベントの説明が入ります。イベントの説明が入ります。イベントの説明が入ります。イベントの説明が入ります。イベントの説明が入ります。イベントの説明が入ります。イベントの説明が入ります。イベントの説明が入ります。イベントの説明が入ります。イベントの説明が入ります。イベントの説明が入ります。イベントの説明が入ります。イベントの説明が入ります。イベントの説明が入ります。';
  
  const handle20Over = () => {};
  const handleStudent = () => {};
  const handleAnime = () => {};

  return (
    <div className="flex flex-col min-h-screen w-screen bg-white space-y-1">
      {/* header */}
      <div className={`h-60 md:h-72 w-full ${maleGradient}`}>
        <h2 className='text-3xl text-center text-white font-bold pt-10'>イベントレビュー</h2>
      </div>
      {/* container */}
      <div className='px-4'>
        <div className={`${container}`}>
          {/* title */}
          <h2 className='text-lg sm:text-xl font-bold'>{title}</h2>
          <h2 className='text-md sm:text-lg'>{date}</h2>
          {/* buttons */}
          <div className='flex flex-row space-x-2 text-xs sm:text-sm md:text-md lg:text-lg font-semibold mt-4'>
            <button className='rounded-full bg-gray-200 px-3 md:px-4 py-1' onClick={handle20Over}>20代以上</button>
            <button className='rounded-full bg-gray-200 px-3 md:px-4 py-1' onClick={handleStudent}>大学生Only</button>
            <button className='rounded-full bg-gray-200 px-3 md:px-4 py-1' onClick={handleAnime}>アニメ好き</button>
          </div>
          <img src={`${imageUrl}`} className='py-2' />
          {/* male */}
          <div className='rounded-lg bg-gray-200 p-4 sm:p-6 flex flex-col space-y-1'>
            <div className='flex flex-row'>
              <div className={`${maleGradient} px-2 py-1 rounded-full w-10 sm:w-20 text-center text-xs sm:text-sm md:text-md text-white my-auto`}>男性</div>
              <h2 className={`${textSm} pl-2`}>募集人数</h2>
              <h2 className={`${textSm} pl-2`}>|</h2>
              <h2 className={`${textSm} pl-2`}>{males}/{maleTotal}</h2>
              <div className="w-24 md:w-40 bg-white h-3 md:h-6 rounded-full my-auto ml-2 ml-auto">
                <div 
                  className={`h-3 md:h-6 ${maleGradient}`} 
                  style={{ width: `${maleRate * 100}%` }}
                ></div>
              </div>
            </div>
            <div className='flex flex-row-reverse'>
              <h2 className={`${textSm} pl-2`}>料金  <strong className='text-lg'>{maleFee}</strong>円(税込)</h2>
            </div>
          </div>
          {/* female */}
          <div className='rounded-lg bg-gray-200 p-4 sm:p-6 flex flex-col space-y-1'>
            <div className='flex flex-row'>
              <div className={`${femaleGradient} px-2 py-1 rounded-full w-10 sm:w-20 text-center text-xs sm:text-sm md:text-md text-white my-auto`}>女性</div>
              <h2 className={`${textSm} pl-2`}>募集人数</h2>
              <h2 className={`${textSm} pl-2`}>|</h2>
              <h2 className={`${textSm} pl-2`}>{females}/{femaleTotal}</h2>
              <div className="w-24 md:w-40 bg-white h-3 md:h-6 rounded-full my-auto ml-2 ml-auto">
                <div 
                  className={`h-3 md:h-6 ${femaleGradient}`} 
                  style={{ width: `${femaleRate * 100}%` }}
                ></div>
              </div>
            </div>
            <div className='flex flex-row-reverse'>
              <h2 className={`${textSm} pl-2`}>料金  <strong className='text-lg'>{femaleFee}</strong>円(税込)</h2>
            </div>
          </div>
          {/* button */}
          <div className='py-6 flex'>
            <button type='submit' className={`grow rounded-lg border-solid border-2 border-gray-500 ${textMd}`}>イベント概要</button>
          </div>
          <h2 className={`${textSm}`}>{description}</h2>
        </div>
      </div>
      {/* send review about event */}
      <div className='flex flex-col px-4 sm:px-6 md:px-8 space-y-4 py-8'>
        <div className='flex flex-row'>
          <h2 className={`${textLg}`}>イベントを評価:</h2>
          {/* event star rating */}
          <div className='space-x-1 flex ml-auto'>
            {[...Array(eventFilledStars)].map((_, index) => (
              <Star key={index} gradientColors={['#7c5ded', '#83d5f7']} size={24} />
            ))}
            {[...Array(eventEmptyStars)].map((_, index) => (
              <Star key={index + eventFilledStars} gradientColors={['#d1d5db', '#d1d5db']} size={24} />
            ))}
          </div>
        </div>
        <textarea
          className="w-full px-6 mt-3 py-3 bg-gray-100 rounded-md focus:outline-none"
          placeholder="イベントのレビューを書く"
          rows={6}          
        />
        <button id="btn_event" className={`grow bg-gray-800 rounded-full text-white ${textMd}`}>送信する</button>
      </div>
      {/* location button with gradient */}
      <div className={`py-6 px-4 sm:px-6 md:px-8 flex w-full`}>
        <button className={`grow ${maleGradient} rounded-xl text-white ${textMd}`}>開催場所</button>
      </div>
      {/* store info */}
      <div className='px-4 sm:px-6 md:px-8'>
        <h2 className={`${textMd}`}>店舗名 (店舗名が入ります)</h2>
        <h2 className={`${textSm}`}>料理ジャンル: 居酒屋、海鮮、日本酒バー</h2>
        <div className='pt-6'>
          <FullCarousel items={items} />
        </div>
        <h2 className={`${textSm}`}>{description}</h2>
      </div>
      {/* Access */}
      <div className='px-4 sm:px-6 md:px-8 flex flex-col space-y-1'>
        <h2 className={`${textMd} flex`}><img src={`${locationSVG}`} className='w-6 h-6 mr-4'/>アクセス</h2>
        <h2 className={`${textSm} border-b-2 border-solid border-gray-300`}>大阪府大阪市中央区東心斎橋1-17-2 アニーズビル1F</h2>
        <h2 className={`${textSm}`}>大阪メトロ御堂筋線「長堀橋駅」より徒歩10分</h2>
        <h2 className={`${textSm}`}>大阪メトロ長堀鶴見緑地線「長堀橋駅」より徒歩5分</h2>
        <img src={`${imageUrl5}`} className='py-2' />
        <div className={`py-6 px-4 sm:px-6 md:px-8 flex w-full`}>
          <button className={`grow rounded-xl border-2 border-solid border-gray-800 ${textMd}`}>注意事項</button>
        </div>
        <h2 className={`${textSm}`}>{description}</h2>
      </div>
      {/* send review about store */}
      <div className='flex flex-col px-4 sm:px-6 md:px-8 space-y-4 py-8'>
        <div className='flex flex-row'>
          <h2 className={`${textLg}`}>お店を評価:</h2>
          {/* event star rating */}
          <div className='space-x-1 flex ml-auto'>
            {[...Array(storeFilledStars)].map((_, index) => (
              <Star key={index} gradientColors={['#7c5ded', '#83d5f7']} size={24} />
            ))}
            {[...Array(storeEmptyStars)].map((_, index) => (
              <Star key={index + storeFilledStars} gradientColors={['#d1d5db', '#d1d5db']} size={24} />
            ))}
          </div>
        </div>
        <textarea
          className="w-full px-6 mt-3 py-3 bg-gray-100 rounded-md focus:outline-none"
          placeholder="お店のレビューを書く"
          rows={6}          
        />
        <button id="btn_event" className={`grow bg-gray-800 rounded-full text-white ${textMd}`}>送信する</button>
        <div className={`py-6 flex w-full`}>
          <button className={`grow bg-gray-300 rounded-full text-white ${textMd}`}>TOPにもどる</button>
        </div>
      </div>
    </div>
  );
};

export default EventReview2;
