'use client';

import React, { useRef, useEffect, useState } from 'react';
import Navbar from '@/components/admin/navbar';
import AuthWrapper from '@/components/auth/authWrapper';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { RootState } from '@/store/store';
import { formatDateTime } from '@/utils/datetime';
import { markAsRead, setNotifications } from '@/store/features/notification/NotificationSlice';
  
const POLLING_INTERVAL = 1000 * 5;

const StoreNotification: React.FC = () => {
  let notifications = useSelector((state: RootState) => state.notification.notifications);
  const token = useSelector((state: RootState) => state.auth.token);
  const router = useRouter();
  const dispatch = useDispatch();
  const observer = useRef<IntersectionObserver | null>(null);

  const handleMarkAsRead = async (messageId: string) => {
    try {
      const response_notifications = await fetch('/api/admin/notifications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },            
        body: JSON.stringify({ notificationIds: messageId }),
      });
      if (response_notifications.ok) {
        dispatch(markAsRead([messageId]));
      } else {
        console.log(response_notifications.status);
      }
    } catch (error) {
      console.log('Error: ', error);
    } finally {
    }
  }

  useEffect(() => {
    try {
      if (!token) {
        router.push('/auth/signin');
      } else {
        const fetchData = async () => {
          try {
            const response_notifications = await fetch('/api/admin/notifications', {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
              },
            });
            if (response_notifications.ok) {
              const result = await response_notifications.json();
              dispatch(setNotifications(result.data));
            } else {
              console.log(response_notifications.status);
            }
          } catch (error) {
            console.log('Error: ', error);
          }
        };
  
        fetchData();
        const intervalId = setInterval(fetchData, POLLING_INTERVAL);
        return () => clearInterval(intervalId);
      }
    } catch (error) {
      console.log("error: " + error);
    }
  }, [token]);

  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const messageId = entry.target.getAttribute('data-id');
            if (messageId) {
              handleMarkAsRead(messageId);
            }
          }
        });
      },
      { threshold: 1 }
    );

    const elements = document.querySelectorAll('.unreadmessage');
    elements.forEach((el) => observer.current?.observe(el));

    return () => {
      observer.current?.disconnect();
    };
  }, [notifications]);

  return (
    <AuthWrapper allowedRoles={['admin']}>
      <div className="min-h-screen w-full flex bg-gray-100 text-gray-800">
        <div className="w-24">
          <Navbar />
        </div>
        <div className="w-full p-10 pb-16">
          <h1 className="text-2xl font-bold mb-5">通知</h1>
          {notifications.map((notification, index) => (
            <div key={index}>
              <div className={`border border-dashed border-violet-500 w-full my-12 transition-all duration-1000 ${
                notification.status === "read" ? 'opacity-0 border-none' : 'opacity-100 border-top-2'
              }`} />
              <div className="relative bg-white p-5 mb-4 rounded-lg shadow flex">
                <div className='flex-1 text-md font-semibold'>{notification.entityName}</div>
                <div className='flex-1 text-md font-semibold'>{notification.message}</div>
                <div className='flex-1 text-md font-semibold'>{formatDateTime(notification.createdAt)}</div>
                <div data-id={notification._id} className={`absolute right-4 -top-4 bg-green-500 rounded-lg px-2 py-1 transition-all duration-1000 ${
                  notification.status === "unread" ? "opacity-100 unreadmessage" : "opacity-0 w-0 h-0 p-0"
                }`}>
                  <h2 className='text-base text-white font-semibold '>new</h2>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AuthWrapper>
  );
};

export default StoreNotification;
