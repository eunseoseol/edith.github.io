import React, { useState, useEffect } from "react";
import Link from "next/link";
import { UserAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, googleSignIn, logOut } = UserAuth();
  const [loading, setLoading] = useState(true);

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
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const checkAuthentication = async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
      setLoading(false);
    };
    checkAuthentication();
  }, [user]);

  return (
    <div className="h-20 w-full border-b-2 flex items-center justify-between p-2">
      <ul className="flex">
       

      </ul>

      {loading ? null : !user ? (
        <ul className="flex">
       
       
        </ul>
      ) : (
        <div style={{ position: 'relative', zIndex: 1, height: '60px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

          <p className="cursor-pointer" onClick={handleSignOut}>
           Blue Pill
          </p>











          
        </div>
      )}
    </div>
  );
};

export default Navbar;
