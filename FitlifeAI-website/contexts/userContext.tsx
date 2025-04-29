// import React, { createContext, useState, useContext, ReactNode } from 'react';

// // 1. Define types
// interface UserInfo {
//   username: string;
//   gender: string;
//   age: string;
//   occupation: string;
//   physicalActivity: string;
//   // You can add more fields later
// }

// interface UserContextType {
//   userInfo: UserInfo;
//   updateUserInfo: (newInfo: Partial<UserInfo>) => void;
// }

// interface UserProviderProps {
//   children: ReactNode;
// }

// // 2. Create Context
// const UserContext = createContext<UserContextType | undefined>(undefined);

// // 3. Provider Component
// export const UserProvider = ({ children }: UserProviderProps) => {
//   const [userInfo, setUserInfo] = useState<UserInfo>({
//     username: '',
//     gender: '',
//     age: '',
//     occupation: '',
//     physicalActivity: '',
//   });

//   const updateUserInfo = (newInfo: Partial<UserInfo>) => {
//     setUserInfo((prev) => ({ ...prev, ...newInfo }));
//   };

//   return (
//     <UserContext.Provider value={{ userInfo, updateUserInfo }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// // 4. Custom Hook
// export const useUser = (): UserContextType => {
//   const context = useContext(UserContext);
//   if (!context) {
//     throw new Error('useUser must be used within a UserProvider');
//   }
//   return context;
// };



import React, { createContext, useState, useContext, ReactNode } from 'react';

// 1. Define full User Info type
interface UserInfo {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  gender: string;
  age: string;
  occupation: string;
  physicalActivity: string;
  sleepHours: number;
  qualityOfSleep: number;
  stressLevel: number;

}

// 2. Define Context type
interface UserContextType {
  userInfo: UserInfo;
  updateUserInfo: (newInfo: Partial<UserInfo>) => void;
}

// 3. Define props for provider
interface UserProviderProps {
  children: ReactNode;
}

// 4. Create Context
const UserContext = createContext<UserContextType | undefined>(undefined);

// 5. Provider Component
export const UserProvider = ({ children }: UserProviderProps) => {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    gender: '',
    age: '',
    occupation: '',
    physicalActivity: '',
    sleepHours: 0, // Set initial value for sleepHours
    qualityOfSleep: 0, // Set initial value for qualityOfSleep
    stressLevel: 0, // Set initial value for stressLevel
  });

  // Allow partial updates
  const updateUserInfo = (newInfo: Partial<UserInfo>) => {
    setUserInfo((prev) => ({
      ...prev,
      ...newInfo,
    }));
  };

  return (
    <UserContext.Provider value={{ userInfo, updateUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};

// 6. Custom Hook
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
