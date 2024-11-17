import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/sidbar/main";
import { useContacts } from "../hook/useContacts";
import { Contact } from "../types/types";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {


  const {getContacts,updateContact,queryClient} = useContacts()


  const navigate = useNavigate();
  const data  = getContacts(1,25)
  const contacts = queryClient.getQueryData(["contacts"]) as {unreadCount:number,unreadIds:number[],contacts:Contact[]};
  useEffect(() => {
    if (data.isSuccess) {
      updateContact.mutate({ids:contacts.unreadIds,isRead:true});
    }
  }, [data.isSuccess]);


  useEffect(() => {
    // Check if user is authenticated by checking the token
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); // Redirect to login if not authenticated
    }
  }, [navigate]);
  console.log(contacts)
  return (
    <div className="flex  bg-secondary-dark text-white">
      <Sidebar unreadCount={contacts?contacts?.unreadCount:0} />
      {/* Main content */}
      <main className="flex transition-all  w-full  duration-300">
        {children}
      </main>
    </div>
  );
};

export default AuthLayout;
