import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../Context/Context';

const Header = ({ avtar, name, userId }) => {
  const { Socket ,User} = useContext(Context);
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    if (!Socket || !userId) return;

    // Ask backend for status
    Socket.emit('user-status', { from: User?.user?._id, to: userId });

    // Listen for status change updates
    const handleStatus = ({ userId: changedId, status }) => {
      if (changedId === userId) {
        setIsOnline(status);
      }
    };

    Socket.on('user-status-change', handleStatus);

    // Clean up listener when Header unmounts
    return () => {
      Socket.off('user-status-change', handleStatus);
    };
  }, [Socket, userId]);

  return (
    <div className="w-full h-20 border-b flex items-center px-4 gap-3 shrink-0 ">
      <img
        src={avtar || '/default-avatar.png'}
        alt="avatar"
        className="w-12 h-12 rounded-full border object-cover"
      />

      <div className="flex flex-col justify-center">
        <span className="text-lg font-semibold">
          {name || 'Unknown User'}
        </span>
        <span className="text-xs text-gray-500">
          {isOnline ? (
            <span className='text-green-600 font-semibold' >
             Online
          </span>
          ) : 'Offline'}
        </span>
      </div>
    </div>
  );
};

export default Header;
