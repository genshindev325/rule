// app/pages/eventSetting.tsx

'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useIonRouter, IonRouterLink } from '@ionic/react';
import { SERVER_URL } from '@/app/config';
import { useAuth } from '@/app/components/auth/authContext';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store/store';

interface UpcomingEvent {
  _id: string;
  eventName: string;
  eventDate: string;
  coverImage: string;
  maleFee: string;
  maleTotal: string;
  femaleFee: string;
  femaleTotal: string;
  category: string;
  description: string;
  eventStartTime: Date;
  eventEndTime: Date;
};

interface IEventSetting {
  isOpen: boolean;
  onClose: () => void;
  event: UpcomingEvent;
  onChangeEventDetail: (eventId: string, eventName: string, coverImage: string, eventDate: string, maleFee: string, maleTotal: string, femaleFee: string, femaleTotal: string) => void
}

const EventSettingModal: React.FC<IEventSetting> = ({ isOpen, onClose, onChangeEventDetail, event }) => {
  const router = useIonRouter();
  const { profile } = useAuth();
  const token = useSelector((state: RootState) => state.auth.token);
  const modalRef = useRef<HTMLDivElement>(null);
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [maleFee, setMaleFee] = useState('');
  const [maleTotal, setMaleTotal] = useState('');
  const [femaleFee, setFemaleFee] = useState('');
  const [femaleTotal, setFemaleTotal] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [eventStartTime, setEventStartTime] = useState('');
  const [eventEndTime, setEventEndTime] = useState('');
  
  useEffect(() => {
    setEventName(event.eventName);
    setEventDate(event.eventDate.split('T')[0]);
    setCoverImage(event.coverImage)
    setMaleFee(event.maleFee);
    setMaleTotal(event.maleTotal);
    setFemaleFee(event.femaleFee);
    setFemaleTotal(event.femaleTotal);
    setCategory(event.category);
    setDescription(event.description);
    setEventStartTime(new Date(event.eventStartTime).toISOString().substring(11, 16));
    setEventEndTime(new Date(event.eventEndTime).toISOString().substring(11, 16));
  }, [isOpen])

  // Handle file selection  
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const formData = new FormData();
      formData.append('file', event.target.files[0]);

      try {
        toast.info('画像がクラウドにアップロードされるまでしばらくお待ちください。', {
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          bodyClassName: 'text-xs sm:text-sm',
        });
        const response = await fetch(`${SERVER_URL}/api/upload`, {
          method: 'POST',
          body: formData,
        });

        if (response.status === 200) {
          const data = await response.json();
          console.log("storeIamge-url: " + data.url);
          setCoverImage(data.url);
        } else {
          console.log(response.status);
        }
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  const handleSubmit = (async (e: React.FormEvent<HTMLFormElement>) => {
    if (!token) {
      router.push('/auth/login');
    } else {
      e.preventDefault();

      // Add event settings logic here
      const formData = new FormData(e.currentTarget);
      const _eventStartTime = formData.get('startTime');
      const _eventEndTime = formData.get('endTime');
      let eventStartTime, eventEndTime;

      if (eventDate && _eventStartTime) {
        const [startHours, startMinutes] = _eventStartTime.toString().split(':').map(Number);
        eventStartTime = new Date(Date.UTC(
          new Date(eventDate).getFullYear(),
          new Date(eventDate).getMonth(),
          new Date(eventDate).getDate(),
          startHours,
          startMinutes
        ));
      }
      
      if (eventDate && _eventEndTime) {
        const [endHours, endMinutes] = _eventEndTime.toString().split(':').map(Number);
        eventEndTime = new Date(Date.UTC(
          new Date(eventDate).getFullYear(),
          new Date(eventDate).getMonth(),
          new Date(eventDate).getDate(),
          endHours,
          endMinutes
        ));
      }

      const store = profile?._id;
      
      const response = await fetch(`${SERVER_URL}/api/events/${event._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          eventName,
          category,
          coverImage,
          description,
          eventDate,
          eventStartTime,
          eventEndTime,
          maleTotal,
          femaleTotal,
          maleFee,
          femaleFee,
          store
        }),
      });

      if (response.status === 200) {
        toast.success('イベント設定が正常に変更されました。', {
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          bodyClassName: 'text-xs sm:text-sm',
        });
        onClose();
        onChangeEventDetail(event._id, eventName, coverImage, eventDate, maleFee, maleTotal, femaleFee, femaleTotal)
      } else {
        console.log(response.status);
        console.log("try again.");
      }
    }
  });

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  if(!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 overflow-y-auto">
      <div ref={modalRef} className="bg-white text-gray-800 p-4 rounded shadow-md w-full mx-6 sm:w-4/5 max-w-[500px]">
        <form onSubmit={handleSubmit}>
          {/* Event settings */}
          <h3 className='text-gray-600 text-xs sm:text-sm py-1 sm:py-2'>イベント名</h3>
          <div className="">
            <input
              type="name"
              name='eventName'
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              className="w-full text-xs sm:text-sm p-1 sm:p-2 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100"
              placeholder="イベント名"
              required
            />
          </div>
          <h3 className='text-gray-600 text-xs sm:text-sm py-1 sm:py-2'>カテゴリ</h3>
          <div className=""> {/*will be modified*/}
            <select
              id="category"
              name="category"
              className="block w-full p-1 sm:p-2 text-xs sm:text-sm bg-gray-100 rounded-md focus:outline-none"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="" className='text-xs sm:text-sm'>選択してください</option>
              <option value="ランチ" className='text-xs sm:text-sm'>ランチ</option>
              <option value="ディナー" className='text-xs sm:text-sm'>ディナー</option>
              <option value="合コン" className='text-xs sm:text-sm'>合コン</option>
              <option value="婚活" className='text-xs sm:text-sm'>婚活</option>
              <option value="趣味交流会" className='text-xs sm:text-sm'>趣味交流会</option>
              <option value="その他" className='text-xs sm:text-sm'>その他 ...</option>
            </select>
          </div>
          <h3 className='text-gray-600 text-xs sm:text-sm py-1 sm:py-2'>カパー画像</h3>
          <div className=''>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              id="file-input"
            />
            <label htmlFor="file-input" className='w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gray-100 hover:bg-gray-200 font-light text-xl flex flex-col justify-center items-center'>+</label>
            {coverImage && (
              <div className='flex mx-auto w-28 h-28'>
                <img src={`${coverImage}`} onClick={() => setCoverImage('')} className='object-contain' />
              </div>
            )}
          </div>
          <h3 className='text-gray-600 py-1 sm:py-2 text-xs sm:text-sm'>説明文</h3>
          <div className="">
            <textarea
              name='description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full text-xs sm:text-sm p-1 sm:p-2 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100"
              placeholder="説明文"
              rows={1}
              required
            />
          </div>
          {/* schedule */}
          <div className='w-full flex flex-row space-x-1 items-center sm:flex-col sm:space-x-0 sm:items-start'>
            <div className='flex-1 sm:w-full'>
              <h3 className='text-gray-600 text-xs sm:text-sm py-1 sm:py-2'>日程</h3>
              <input
                type="date"
                name='schedule'
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full p-1 sm:p-2 text-xs sm:text-sm bg-gray-100 rounded-md focus:outline-none focus:border-blue-100"
                required
              />
            </div>
            <div className='flex-1 sm:w-full'>
              <h3 className='text-gray-600 text-xs sm:text-sm py-1 sm:py-2'>開始時間</h3>
              <input
                type="time"
                name='startTime'
                value={eventStartTime}
                onChange={(e) => setEventStartTime(e.target.value)}
                className="w-full p-1 sm:p-2 text-xs sm:text-sm bg-gray-100 rounded-md focus:outline-none focus:border-blue-100"
                required
              />
            </div>
            <div className='flex-1 sm:w-full'>
              <h3 className='text-gray-600 py-1 sm:py-2 text-xs sm:text-sm'>終了時間</h3>
              <input
                type="time"
                name='endTime'
                value={eventEndTime}
                onChange={(e) => setEventEndTime(e.target.value)}
                className="w-full p-1 sm:p-2 bg-gray-100 rounded-md text-xs sm:text-sm focus:outline-none focus:border-blue-100"
                placeholder="21:00"
                required
              />
            </div>
          </div>
          {/* recurited number */}
          <div className=''>
            <div className='flex gap-4'>
              <div className='flex-1'>
                <h3 className='text-gray-600 text-xs sm:text-sm py-1 sm:py-2'>男性の募集人数</h3>
                <input
                  type="number"
                  name='maleTotal'
                  value={maleTotal}
                  onChange={(e) => setMaleTotal(e.target.value)}
                  className="w-full text-xs p-1 sm:p-2 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100"
                  placeholder="男性の募集人数"
                  required
                />
              </div>
              <div className='flex-1'>
                <h3 className='text-gray-600 text-xs sm:text-sm py-1 sm:py-2'>女性の募集人数</h3>
                <input
                  type="number"
                  name='femaleTotal'
                  value={femaleTotal}
                  onChange={(e) => setFemaleTotal(e.target.value)}
                  className="w-full text-xs p-1 sm:p-2 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100"
                  placeholder="女性の募集人数"
                  required
                />
              </div>
            </div>
          </div>
          {/* fee */}
          <div className=''>
            <div className='flex gap-4'>
              <div className='flex-1'>
                <h3 className='text-gray-600 text-xs sm:text-sm py-1 sm:py-2'>男性の料金</h3>
                <input
                  type="number"
                  name='maleFee'
                  value={maleFee}
                  onChange={(e) => setMaleFee(e.target.value)}
                  className="w-full text-xs p-1 sm:p-2 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100"
                  placeholder="男性料金"
                  required
                />
              </div>
              <div className='flex-1'>
                <h3 className='text-gray-600 text-xs sm:text-sm py-1 sm:py-2'>女性の料金</h3>
                <input
                  type="number"
                  name='femaleFee'
                  value={femaleFee}
                  onChange={(e) => setFemaleFee(e.target.value)}
                  className="w-full text-xs p-1 sm:p-2 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100"
                  placeholder="女性料金"
                  required
                />
              </div>
            </div>
          </div>
          {/* buttons */}
          <div className='flex flex-col pt-2 space-y-2'>
            <button type="submit" className="w-full py-1 bg-blue-500 text-xs sm:text-sm text-white rounded-md hover:bg-blue-600 duration-300">
              保存
            </button>
            <button type="button" className="w-full py-1 bg-gray-300 text-xs sm:text-sm text-black rounded-md hover:bg-gray-400 duration-300" onClick={onClose}>
              下書き
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EventSettingModal;