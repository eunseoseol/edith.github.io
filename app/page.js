"use client"; // 클라이언트 컴포넌트로 지정
import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy, doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const q = query(collection(db, 'JarvisArticle'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const articlesData = await Promise.all(querySnapshot.docs.map(async (docSnapshot) => {
        const data = docSnapshot.data();
        const userDocRef = doc(db, 'users', data.author);
        const userDocSnapshot = await getDoc(userDocRef);
        const userData = userDocSnapshot.exists() ? userDocSnapshot.data() : { profile: { name: 'Unknown', profileImage: null } };
        return {
          id: docSnapshot.id,
          ...data,
          authorName: userData.profile?.name || 'Unknown',
          authorProfileImage: userData.profileImage || null
        };
      }));
      setArticles(articlesData);
    };

    const fetchUsers = async () => {
      const q = query(collection(db, 'users'));
      const querySnapshot = await getDocs(q);
      const usersData = querySnapshot.docs.map(docSnapshot => {
        const data = docSnapshot.data();
        return {
          id: docSnapshot.id,
          profileImage: data.profileImage || null,
          name: data.profile?.name || 'Unknown',
        };
      });
      setUsers(usersData);
    };

    fetchArticles();
    fetchUsers();
  }, []);

  const extractPreviewText = (html) => {
    if (typeof document !== 'undefined') {
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = html;
      const textContent = tempDiv.textContent || tempDiv.innerText || "";
      return textContent.substring(0, 200) + (textContent.length > 200 ? "..." : ""); // 첫 200자 표시
    }
    return "";
  };

  const extractFirstImage = (html) => {
    if (typeof document !== 'undefined') {
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = html;
      const img = tempDiv.querySelector("img");
      return img ? img.src : null;
    }
    return null;
  };

  const calculateReadTime = (text) => {
    const wordsPerMinute = 200;
    const words = text.split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  };

  return (

    <Head>
        <title>Home Page - 스타트업 창업가 커뮤니티</title>
        <meta property="og:title" content="Home Page - 스타트업 창업가 커뮤니티" />
        <meta property="og:description" content="Made by Eunseo Seol" />
        <meta property="og:image" content="https://photos5.appleinsider.com/gallery/product_pages/189-hero.jpg" />
        <meta property="og:url" content="https://edith3141.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Home Page - Your Site Title" />
        <meta name="twitter:description" content="Description of your home page" />
        <meta name="twitter:image" content="https://example.com/home-page-image.jpg" />
      </Head>
    <main className="p-4 flex flex-col lg:flex-row">
      {/* Articles Section */}
      
      <div className="w-full lg:w-3/4 p-4">
        {articles.map(article => (
          <Link key={article.id} href={`/article/${article.id}`} legacyBehavior>
            <a className="block border p-4 mb-4 cursor-pointer hover:bg-gray-100 transition-colors duration-300 rounded-lg">
              {extractFirstImage(article.content) && (
                <div className="mb-4">
                  <img src={extractFirstImage(article.content)} alt={article.title} className="w-full h-auto rounded-lg" />
                </div>
              )}
              <div className="flex items-center mb-4">
                {article.authorProfileImage ? (
                  <img
                    src={article.authorProfileImage}
                    alt="Profile"
                    className="w-8 h-8 rounded-full mr-2"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gray-500 text-white flex items-center justify-center mr-2">
                    {article.authorName.slice(0, 2)}
                  </div>
                )}
                <div className="text-sm text-gray-500">
                  <p className="font-bold">{article.authorName}</p>
                  <p>{calculateReadTime(article.content)} min read • {formatDistanceToNow(new Date(article.createdAt.toDate()))} 전</p>
                </div>
              </div>
              <h2 className="text-xl font-bold mb-2">{article.title}</h2>
              <p className="mb-4">{extractPreviewText(article.content)}</p>
            </a>
          </Link>
        ))}
      </div>

      {/* User Suggestions Section */}
      <div className="w-full lg:w-1/4 p-4 mb-8 lg:mb-0 lg:ml-4">
        <h2 className="text-lg font-semibold mb-4">Who to follow</h2>
        <div className="overflow-x-auto">
          <div className="flex space-x-4">
            {users.map(user => (
              <div key={user.id} className="flex-shrink-0 border p-4 rounded-lg w-48 flex flex-col items-center">
                {user.profileImage ? (
                  <img
                    src={user.profileImage}
                    alt="Profile"
                    className="w-12 h-12 rounded-full mb-2"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gray-500 text-white flex items-center justify-center mb-2">
                    {user.name.slice(0, 2)}
                  </div>
                )}
                <div className="text-center mb-2">
                  <p className="font-bold">{user.name}</p>
                </div>
                <button className="bg-blue-500 text-white text-sm px-3 py-1 rounded-full">Follow</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
