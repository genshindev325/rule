// app/store/eventSettings/page.tsx

'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AuthWrapper from '@/components/auth/authWrapper';
import { useAuth } from '@/components/auth/authContext';
import Navbar from '@/components/store/navbar';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

// Get today's date in the YYYY-MM-DD format
const today = new Date();
const getTodayDate = (): string => {
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

interface IEventSetting {
  isVisible: boolean;
  eventID: number;
  onCancel: () => void;
  onEventChange: (eventID: number, newEventName: string, newEventDate: string, newMaleTotal: string | null, newFemaleTotal: string | null) => void;
}

const EventSettingModal: React.FC<IEventSetting> = ({ isVisible, eventID, onCancel, onEventChange }) => {
    const modalRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { profile } = useAuth();
  const [eventName, setEventName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [photoImageUrl, setPhotoImageUrl] = useState<string | null>(null);
  const [eventDate, setEventDate] = useState(getTodayDate());
  const [eventStartTime, setEventStartTime] = useState('');
  const [eventEndTime, setEventEndTime] = useState('');
  const [description, setDescription] = useState('');
  const [maleTotal, setMaleTotal] = useState('');
  const [maleFee, setMaleFee] = useState('');
  const [femaleTotal, setFemaleTotal] = useState('');
  const [femaleFee, setFemaleFee] = useState('');
  const token = useSelector((state: RootState) => state.auth.token);
  
  // fetch event information
  useEffect(() => {
    if (!token) {
      router.push('/auth/signin');
      } else {
      if (eventID !== null && isVisible === true) {
        const fecthData = async () => {
          const response = await fetch(`/api/events/${eventID}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json', 
              'Authorization': `Bearer ${token}`
            },
          });
      
          if (response.status === 200) {
            const result = await response.json();
            setEventName(result.data.eventName);
            setSelectedCategory(result.data.category);
            setPhotoImageUrl(result.data.coverImage);
            setEventDate(result.data.eventDate.split('T')[0]);
            setEventStartTime(new Date(result.data.eventStartTime).toISOString().substring(11, 16));
            setEventEndTime(new Date(result.data.eventEndTime).toISOString().substring(11, 16));
            setDescription(result.data.description);
            setMaleTotal(result.data.maleTotal);
            setMaleFee(result.data.maleFee);
            setFemaleTotal(result.data.femaleTotal);
            setFemaleFee(result.data.femaleFee);
          } else {
            console.log("Fetch event data failed: " + response.status);
          }
        };

        fecthData();
      }
    }
  }, [isVisible])

  // Handle file selection  
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const formData = new FormData();
      formData.append('file', event.target.files[0]);

      try {
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (response.status === 200) {
          const data = await response.json();
          setPhotoImageUrl(data.url);
        } else {
          console.log(response.status);
        }
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  const handleDeleteImage = () => {
    setPhotoImageUrl('');
  }

  const handleSubmit = (async (e: React.FormEvent<HTMLFormElement>) => {
    if (!token) {
      router.push('/auth/signin');
    } else {
      e.preventDefault();

      // Add event settings logic here
      const coverImage = `${photoImageUrl}`;
      const formData = new FormData(e.currentTarget);
      const eventName = formData.get('eventName')?.toString() || '';
      const category = selectedCategory;
      const description = formData.get('description');
      const _eventStartTime = formData.get('startTime');
      const _eventEndTime = formData.get('endTime');
      let eventStartTime, eventEndTime;
      if(eventDate && _eventStartTime)
        eventStartTime = new Date(eventDate?.toString() + ' ' + _eventStartTime?.toString());
      if(eventDate && _eventEndTime)
        eventEndTime = new Date(eventDate?.toString() + ' ' + _eventEndTime?.toString());
      const maleTotal = formData.get('maleTotal')?.toString() || '';
      const femaleTotal = formData.get('femaleTotal')?.toString() || '';
      const maleFee = formData.get('maleFee')?.toString() || '';
      const femaleFee = formData.get('femaleFee')?.toString() || '';
      const store = profile?._id;
      
      const response = await fetch(`/api/events/${eventID}`, {
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
        toast.success('イベントを成功させましょう。', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        });
        onCancel();
        onEventChange(eventID, eventName, eventDate, maleTotal, femaleTotal)
      } else {
        console.log(response.status);
        console.log("Create event failed.");
      }
    }
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onCancel();
      }
    };

    if (isVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isVisible, onCancel]);

  if (!isVisible) return null;

  return (
    <AuthWrapper allowedRoles={['store']}>
      <div className="fixed inset-0 flex items-center justify-center bg-gray-800 text-gray-800 bg-opacity-50 z-50">
        <div ref={modalRef} className="bg-white py-4 px-3 sm:px-4 md:px-5 lg:px-6 rounded-lg shadow-md w-full max-w-xl">
          <h2 className="text-lg font-bold mb-2">イベント設定</h2>
          <form onSubmit={handleSubmit}>
            {/* Event settings */}
            <h3 className='py-1 text-sm sm:text-md'>イベント名</h3>
            <div className="mb-2">
              <input
                type="name"
                name='eventName'
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                className="w-full p-2 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100 text-sm sm:text-md"
                placeholder="イベント名"
                required
              />
            </div>
            <h3 className='py-1 text-sm sm:text-md'>カテゴリ</h3>
            <div className="mb-2"> {/*will be modified*/}
              <select
                id="category"
                name="category"
                className="block w-full p-2 bg-gray-100 rounded-md focus:outline-none text-sm sm:text-md"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                required
              >
                <option value="text-sm sm:text-md">選択してください</option>
                <option value="ランチ">ランチ</option>
                <option value="ディナー">ディナー</option>
                <option value="合コン">合コン</option>
                <option value="婚活">婚活</option>
                <option value="趣味交流会">趣味交流会</option>
                <option value="その他">その他 ...</option>
              </select>
            </div>
            <h3 className='py-1 text-sm sm:text-md'>表紙画像</h3>
            <div className='mb-2'>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="file-input"
              />
              <label htmlFor="file-input" className='w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-300 duration-500 font-bold text-xl flex flex-col justify-center items-center'>
                +
              </label>
              {photoImageUrl && (
                <div className='flex-1 justify-center items-center mx-auto w-40 h-40 pt-2'>
                  <img src={`${photoImageUrl}`} onClick={handleDeleteImage} />
                </div>
              )}
            </div>
            <h3 className='py-1 text-sm sm:text-md'>説明文</h3>
            <div className="mb-2">
              <textarea
                name='description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full mt-3 p-2 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100 text-sm sm:text-md"
                placeholder="説明文"
                rows={2}
                required
              />
            </div>
            {/* schedule */}
            <div className='mb-2'>
              <div className='flex gap-4'>
                <div className='flex-1'>
                  <h3 className='py-1 text-sm sm:text-md'>日程</h3>
                  <input
                    type="date"
                    name='schedule'
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full p-2 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100 text-sm sm:text-md"
                    value={eventDate}
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>
                <div className='flex-1'>
                  <h3 className='py-1 text-sm sm:text-md'>開始時間</h3>
                  <input
                    type="time"
                    name='startTime'
                    value={eventStartTime}
                    onChange={(e) => setEventStartTime(e.target.value)}
                    className="w-full p-2 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100 text-sm sm:text-md"
                    placeholder="17:00"
                    required
                  />
                </div>
                <div className='flex-1'>
                  <h3 className='py-1 text-sm sm:text-md'>終了時間</h3>
                  <input
                    type="time"
                    name='endTime'
                    value={eventEndTime}
                    onChange={(e) => setEventEndTime(e.target.value)}
                    className="w-full p-2 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100 text-sm sm:text-md"
                    placeholder="21:00"
                    required
                  />
                </div>
              </div>
            </div>
            {/* recurited number */}
            <div className='mb-2'>
              <div className='flex gap-4'>
                <div className='flex-1'>
                  <h3 className='py-1 text-sm sm:text-md'>男性の募集人数</h3>
                  <input
                    type="number"
                    name='maleTotal'
                    value={maleTotal}
                    onChange={(e) => setMaleTotal(e.target.value)}
                    className="w-full p-2 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100 text-sm sm:text-md"
                    placeholder="男性の募集人数"
                    required
                  />
                </div>
                <div className='flex-1'>
                  <h3 className='py-1 text-sm sm:text-md'>女性の募集人数</h3>
                  <input
                    type="number"
                    name='femaleTotal'
                    value={femaleTotal}
                    onChange={(e) => setFemaleTotal(e.target.value)}
                    className="w-full p-2 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100 text-sm sm:text-md"
                    placeholder="女性の募集人数"
                    required
                  />
                </div>
              </div>
            </div>
            {/* fee */}
            <div className='mb-2'>
              <div className='flex gap-4'>
                <div className='flex-1'>
                  <h3 className='py-1 text-sm sm:text-md'>男性の料金</h3>
                  <input
                    type="number"
                    name='maleFee'
                    value={maleFee}
                    onChange={(e) => setMaleFee(e.target.value)}
                    className="w-full p-2 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100 text-sm sm:text-md"
                    placeholder="男性料金"
                    required
                  />
                </div>
                <div className='flex-1'>
                  <h3 className='py-1 text-sm sm:text-md'>女性の料金</h3>
                  <input
                    type="number"
                    name='femaleFee'
                    value={femaleFee}
                    onChange={(e) => setFemaleFee(e.target.value)}
                    className="w-full p-2 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100 text-sm sm:text-md"
                    placeholder="女性料金"
                    required
                  />
                </div>
              </div>
            </div>
            {/* buttons */}
            <div className='flex flex-row justify-end gap-4 pt-6'>
              <button type="submit" className="w-48 py-1 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 duration-300">
                保存
              </button>
              <button type="button" className="w-48 py-1 px-4 bg-gray-300 text-black rounded-md hover:bg-gray-400 duration-300" onClick={onCancel}>
                キャンセル
              </button>
            </div>
          </form>
        </div>
      </div>
    </AuthWrapper>
  );
};

export default EventSettingModal;
