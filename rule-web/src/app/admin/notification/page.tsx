'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/admin/navbar';
import AuthWrapper from '@/components/auth/authWrapper';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { RootState } from '@/store/store';
import { formatDateTime } from '@/utils/datetime';
import { markAsRead, setNotifications } from '@/store/features/notification/NotificationSlice';
  
const POLLING_INTERVAL = 1000 * 60;

const StoreNotification: React.FC = () => {
  const notifications = useSelector((state: RootState) => state.notification.notifications);
  const token = useSelector((state: RootState) => state.auth.token);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleMarkAsRead = () => {
    const unreadNotificationIds = notifications
      .filter(notification => notification.status === 'unread')
      .map(notification => notification._id);
    
    if (unreadNotificationIds.length > 0) {
      dispatch(markAsRead(unreadNotificationIds));
    }
  };

  const handleMarkAsReadServer = async () => {
    const unreadNotificationIds = notifications
      .filter(notification => notification.status === 'unread')
      .map(notification => notification._id);

    if (unreadNotificationIds.length === 0) {
      console.log('No unread notifications to mark as read.');
      return;
    }

    try {
      const response_notifications = await fetch('/api/admin/notifications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },            
        body: JSON.stringify({ notificationIds: unreadNotificationIds }),
      });
      if (response_notifications.ok) {
        console.log("OK")
      } else {
        console.log(response_notifications.status);
      }
    } catch (error) {
      console.log('Error: ', error);
    }
  }

  useEffect(() => {
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
      handleMarkAsRead();
      handleMarkAsReadServer();
      const intervalId = setInterval(fetchData, POLLING_INTERVAL);
      return () => clearInterval(intervalId);
    }
  }, [token]);

  return (
    <AuthWrapper allowedRoles={['admin']}>
      <div className="min-h-screen w-full flex bg-gray-100 text-gray-800">
        <div className="w-20">
          <Navbar />
        </div>
        <div className="w-full p-10 pb-16">
          <h1 className="text-2xl font-bold mb-5">通知</h1>
          {notifications.map((notification, index) => (
            <div key={index} className="bg-white p-5 mb-4 rounded-lg shadow flex">
              <div className='flex-1 text-md font-semibold'>{notification.entityName}</div>
              <div className='flex-1 text-md font-semibold'>{notification.message}</div>
              <div className='flex-1 text-md font-semibold'>{formatDateTime(notification.createdAt)}</div>
            </div>
          ))}
        </div>
      </div>
    </AuthWrapper>
  );
};

export default StoreNotification;
