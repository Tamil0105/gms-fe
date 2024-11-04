export interface User {
    username: string;
    email: string;
    password: string;
    phone?: string;
  }
  
  export interface Contact {
    id: number;
    name: string;
    email: string;
    phone: string;
    message: string;
  }
  export interface Login {
    userName: string;
    password:string
  }
  export type Testimonial = {
    id: number;
    authorName: string;
    content: string;
    rating: number;
    createdAt: Date;
  fileType: 'image' | 'video'|'youtube'|'instagram';
    mediaUrl:string
  };
  export type NewsFeed = {
    id: number;
    date: string;
    fileType: 'image' | 'video'|'youtube'|'instagram';
    details: string;
    mediaUrl: string;
  };
  export type PortFolio = {
    id: number;
    date: string;
    fileType: 'image' | 'video'|'youtube'|'instagram';
    details: string;
    mediaUrl: string;
  };
  export type User = {
    id: number; // User's unique ID
    username: string; // User's username
    password: string; // User's hashed password
    email: string; // User's email address
    emailVerified: boolean; // Indicates if the user's email is verified
    phone?: string; // Optional phone number
  };
  type Contact = {
    id: number;
    name: string;
    email: string;
    phone: string;
    message: string;
    isRead: boolean;
};

export type ContactsData = {
    contacts: Contact[];
    unreadCount: number;
    unreadIds: number[];
    totalContacts: number;
    pageCount: number;
};
