"use client";


import React, { useState, useEffect } from "react";

export default function Page() {
  const [isMobile, setIsMobile] = useState(false);

  const hoverStyle = {
    maxWidth: '150px',
    marginBottom: '20px',
    transition: 'transform 0.3s ease-in-out'
  };
  const mobilehoverStyle = {
    maxWidth: '150px',
    marginBottom: '0px',
    transition: 'transform 0.3s ease-in-out'
  };
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // 768px 미만을 모바일로 간주합니다.
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

 

  // 이곳에 다른 useEffect 훅들 및 로직 추가...

  if (isMobile) {
    return (
      <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
  
      <video autoPlay loop muted playsInline style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', objectFit: 'cover', zIndex: -1 }}>
  
      <source src="/background.mp4" type="video/mp4" />
    </video>
  
  <div style={{ position: 'relative', zIndex: 1, width: '100%', paddingTop: '20px', paddingBottom: '100px', height: 'calc(100vh - 20px)',  display: 'flex', flexDirection: 'column', alignItems: 'flex-start', alignItems: 'center' }}>
  
      
            <main className="p-4" style={{ height: '100vh' }}>
  
          {/* 사용자가 로그인되어 있으면 Welcome 메시지를 표시하고, 그렇지 않으면 Home Page를 표시합니다. */}
          <div style={{ position: 'relative', zIndex: 1, paddingBottom: '40px', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',marginTop: '-50px' // Move the whole block up by 50px
  }}>
  
  <a href="https://apps.apple.com/us/app/edith-space-assistant/id6450296741"
             
            >
              <img src="/book.png" alt="Book" style={{maxWidth: '50%'}} />
            </a>
  
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: 'white' }}>
              Introducing the 
            </h1>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: 'white' }}>
       Space Assistant, E.D.I.T.H.
         
          
  
       
        </main>
       
      </div>
  
      </div>
  
    );
  }

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>

    <video autoPlay loop muted playsInline style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', objectFit: 'cover', zIndex: -1 }}>

    <source src="/background.mp4" type="video/mp4" />
  </video>

<div style={{ position: 'relative', zIndex: 1, width: '100%', paddingTop: '20px', paddingBottom: '100px', height: 'calc(100vh - 20px)', overflowY: 'scroll', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', alignItems: 'center' }}>

    
          <main className="p-4" style={{ height: '100vh' }}>

        {/* 사용자가 로그인되어 있으면 Welcome 메시지를 표시하고, 그렇지 않으면 Home Page를 표시합니다. */}
        <div style={{ position: 'relative', zIndex: 1, paddingBottom: '40px', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',marginTop: '-50px' // Move the whole block up by 50px
}}>

<a href="https://apps.apple.com/us/app/edith-space-assistant/id6450296741"
             onMouseOver={(e) => e.currentTarget.firstChild.style.transform = 'scale(1.1)'}
             onMouseOut={(e) => e.currentTarget.firstChild.style.transform = 'scale(1)'}
          >
            <img src="/book.png" alt="Book" style={hoverStyle} />
          </a>

          <h1 style={{ fontSize: '48px', fontWeight: 'bold', color: 'white' }}>
            Introducing the 
          </h1>
          <h1 style={{ fontSize: '48px', fontWeight: 'bold', color: 'white' }}>
     Space Assistant, E.D.I.T.H.
          </h1>
         
        {/* book1.png on the left */}
        <img src="/book1.png" alt="Book1"style={{ position: 'absolute', left: -400, top: '100%', maxWidth: '75%', marginBottom: '20px' }} />
        <img src="/book2.png" alt="Book2" style={{ position: 'absolute', right: -400, top: '150%', maxWidth: '75%', marginBottom: '20px' }} />
        <img src="/book3.png" alt="Book3" style={{ position: 'absolute', left: -400, top: '200%', maxWidth: '75%', marginBottom: '20px' }} />
        <img src="/book4.png" alt="Book4" style={{ position: 'absolute', right: -400, top: '250%', maxWidth: '75%', marginBottom: '20px' }} />
        <img src="/book5.png" alt="Book5" style={{ position: 'absolute', left: -400, top: '300%', maxWidth: '75%', marginBottom: '20px' }} />
        <img src="/book6.png" alt="Book6" style={{ position: 'absolute', right: -400, top: '350%', maxWidth: '75%', marginBottom: '20px' }} />
        <img src="/book7.png" alt="Book7" style={{ position: 'absolute', left:-400, top: '400%', maxWidth: '75%', marginBottom: '20px' }} />
        <img src="/book8.png" alt="Book8" style={{ position: 'absolute', right: -400, top: '450%', maxWidth: '75%', marginBottom: '20px' }} />
        <h1 style={{ fontSize: '48px', fontWeight: 'bold', color: 'white', position: 'absolute', right: -400, top: '500%',  }}> 
          </h1>
          <div style={{ paddingBottom: '40px' }}>
        <a href="https://www.instagram.com/edith3.141/" style={{
          }}>
                <img src="/instagram.png" alt="instagram" style={{ position: 'absolute', right: 150, top: '530%', maxWidth: '5%', marginBottom: '120px' }} />

          </a>
          <a href="https://twitter.com/edith3141" style={{
          }}>
                <img src="/x.png" alt="x" style={{ position: 'absolute', left: -150, top: '530%', maxWidth: '5%', marginBottom: '120px' }} />
          </a>
          <a href="https://www.tiktok.com/@edith3.141" style={{
          }}>
                <img src="/tiktok.png" alt="tiktok" style={{ position: 'absolute', right: -150, top: '530%', maxWidth: '5%', marginBottom: '120px' }} />

          </a>
          <a href="https://medium.com/@edith3141" style={{
          }}>
                <img src="/medium.png" alt="medium" style={{ position: 'absolute', left: 150, top: '530%',  maxWidth: '5%', marginBottom: '10%'}} />


          </a>

          </div>

        

        

      </div>
     
      </main>
     
    </div>

    </div>

  );
}

