import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { UserAuth } from '../context/AuthContext';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './../firebase'; // Firestore 인스턴스 가져오기
import { BellIcon, PencilAltIcon } from '@heroicons/react/outline'; // Heroicons 사용, 필요 시 설치: npm install @heroicons/react

const Navbar = () => {
  const { user, googleSignIn, logOut } = UserAuth();
  const [loading, setLoading] = useState(true);
  const [profileImage, setProfileImage] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false); // 메뉴 박스 표시 상태 관리
  const [notifications, setNotifications] = useState([]);
  const [notificationMenuOpen, setNotificationMenuOpen] = useState(false); // 알림 메뉴 박스 표시 상태 관리
  const notificationRef = useRef(null);

  const handleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignOut = async () => {
    try {
      await logOut();
      setMenuOpen(false); // 로그아웃 시 메뉴 닫기
    } catch (error) {
      console.log(error);
    }
  };

  const handleProfileView = () => {
    setMenuOpen(false); // 프로필 보기 클릭 시 메뉴 닫기
  };

  const fetchNotifications = async () => {
    if (user) {
      const q = query(collection(db, 'notifications'), where('recipient', '==', user.email));
      const querySnapshot = await getDocs(q);
      const notificationsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNotifications(notificationsData);
    }
  };

  useEffect(() => {
    const checkAuthentication = async () => {
      if (user) {
        // Firestore에서 사용자 프로필 이미지 가져오기
        const userDocRef = doc(db, 'users', user.email);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          if (userData.profileImage) {
            setProfileImage(userData.profileImage);
          }
        }

        // 알림 가져오기
        await fetchNotifications();
      }
      setLoading(false);
    };
    checkAuthentication();
  }, [user]);

  useEffect(() => {
    // 알림 메뉴 박스 외부 클릭 시 메뉴 닫기
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setNotificationMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="content-container">
      <div className="h-20 w-full border-b-2 flex items-center justify-between p-2 relative">
        <ul className="flex">
          <li className="p-2 cursor-pointer">
            <Link href="/">
              <span className="text-xl lg:text-1.5xl font-semibold text-black-600">
                스타트업 창업가 커뮤니티
              </span>
            </Link>
          </li>
        </ul>
        {loading ? null : !user ? (
          <ul className="flex">
            <li onClick={handleSignIn} className="p-2 cursor-pointer">
              로그인하기
            </li>
          </ul>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center' }} className="relative space-x-4">
            <div className="relative p-2 cursor-pointer flex items-center bg-gray-100 rounded-full hover:bg-gray-200 h-10">
              <Link href="/about" className="flex items-center px-4 py-2">
                <PencilAltIcon className="w-5 h-5 mr-1" />
                글쓰기
              </Link>
            </div>
            <div className="relative p-2 cursor-pointer bg-gray-100 rounded-full hover:bg-gray-200 h-10 w-10 flex items-center justify-center" ref={notificationRef}>
              <div onClick={() => setNotificationMenuOpen(!notificationMenuOpen)}>
                <BellIcon className="w-6 h-6" />
              </div>
              {notificationMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-300 rounded shadow-lg z-10">
                  <div className="p-2 text-sm font-bold border-b">알림</div>
                  {notifications.length > 0 ? (
                    notifications.map(notification => (
                      <div key={notification.id} className="p-2 border-b text-sm">
                        <p className="text-gray-700">{notification.message}</p>
                        <p className="text-xs text-gray-500">{new Date(notification.timestamp.toDate()).toLocaleString()}</p>
                      </div>
                    ))
                  ) : (
                    <div className="p-2 text-sm text-gray-500">알림이 없습니다.</div>
                  )}
                </div>
              )}
            </div>
            <div className="relative cursor-pointer" onClick={() => setMenuOpen(!menuOpen)}>
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-10 h-10 rounded-full"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gray-500 text-white flex items-center justify-center">
                  {user.displayName ? user.displayName.slice(0, 2) : 'U'}
                </div>
              )}
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded shadow-lg">
                  <Link href="/profile" legacyBehavior>
                    <a
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={handleProfileView}
                    >
                      프로필 보기
                    </a>
                  </Link>
                  <div
                    onClick={handleSignOut}
                    className="block px-4 py-2 text-gray-700 cursor-pointer hover:bg-gray-100"
                  >
                    로그아웃
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
