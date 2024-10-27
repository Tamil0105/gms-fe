// import { Contact } from "../types/types";
// import { useContacts } from "../hook/useContacts";
// import { AiOutlineCopy } from "react-icons/ai"; // Importing copy icon
// import { useState } from "react";

// // CSV export helper function
// const exportToCSV = (contacts: Contact[]) => {
//   const csvContent = [
//     ["Name", "Email", "Phone", "Message"],
//     ...contacts.map((contact) => [
//       contact.name,
//       contact.email,
//       contact.phone,
//       contact.message,
//     ]),
//   ]
//     .map((row) => row.join(","))
//     .join("\n");

//   const blob = new Blob([csvContent], { type: "text/csv" });
//   const link = document.createElement("a");
//   link.href = URL.createObjectURL(blob);
//   link.download = "contacts.csv";
//   link.click();
// };

// const Contacts = () => {
//   const { getContacts, queryClient } = useContacts();
//   const [copiedItem, setCopiedItem] = useState<string | null>(null);
//   const [darkTheme, _] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 5;

//   if (getContacts.isLoading) {
//     return <p>Loading...</p>;
//   }

//   const contactsData = queryClient.getQueryData(["contacts"]) as {
//     unreadCount: number;
//     unreadIds: number[];
//     contacts: Contact[];
//   };

//   const contacts = contactsData.contacts;
//   const totalPages = Math.ceil(contacts.length / itemsPerPage);

//   const copyToClipboard = (item: string) => {
//     navigator.clipboard.writeText(item);
//     setCopiedItem(item);
//     setTimeout(() => setCopiedItem(null), 2000); // Show copied message for 2 seconds
//   };

//   const handlePageChange = (pageNumber: number) => {
//     setCurrentPage(pageNumber);
//   };

//   const paginatedContacts = contacts.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   return (
//     <div
//       className={`p-4 md:p-8 ${
//         darkTheme ? "bg-gray-900 text-white" : "bg-white text-gray-900"
//       } transition-colors`}
//     >
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-xl md:text-2xl font-bold">Contacts</h2>
//         <button
//           onClick={() => exportToCSV(contacts)}
//           className="bg-blue-500 text-white px-3 py-1 md:px-4 md:py-2 rounded-lg hover:bg-blue-600 transition-colors"
//         >
//           Export Contacts
//         </button>
//       </div>
//       <div className="flex-1 overflow-hidden">
//       <div className="min-w-full  p-1  overflow-auto">

//          <div className="flex-1 overflow-hidden">
//         <div className="min-w-full p-1 overflow-auto">
//           { paginatedContacts.length < 0 ? (
//             <p>no data</p>
//           ) : (

//             <table className=" ">
//           <thead>
//             <tr className={`${darkTheme ? "bg-gray-800" : "bg-gray-200"}`}>
//               <th className="p-2 md:p-3 text-left">Profile</th>
//               <th className="p-2 md:p-3 text-left">Name</th>
//               <th className="p-2 md:p-3 text-left">Email</th>
//               <th className="p-2 md:p-3 text-left">Phone</th>
//               <th className="p-2 md:p-3 text-left">Message</th>
//             </tr>
//           </thead>
//           <tbody>
//             {paginatedContacts.map((contact) => (
//               <tr
//                 key={contact.id}
//                 className={`border-b ${
//                   darkTheme ? "border-gray-700" : "border-gray-200"
//                 }`}
//               >
//                 <td className="p-2 md:p-3">
//                   <div className="w-8 h-8 md:w-12 md:h-12 flex items-center justify-center bg-blue-500 text-white rounded-full text-lg font-bold">
//                     {contact.email.charAt(0).toUpperCase()}
//                   </div>
//                 </td>

//                 <td className="p-2 md:p-3">{contact.name}</td>

//                 {/* Email column with copy functionality */}
//                 <td className="p-2 md:p-3">
//                   <div className="flex items-center gap-2">
//                     {contact.email}
//                     <button
//                       onClick={() => copyToClipboard(contact.email)}
//                       className="text-green-500 hover:text-green-600"
//                     >
//                       <AiOutlineCopy />
//                     </button>
//                   </div>
//                   {copiedItem === contact.email && (
//                     <p className="text-xs text-green-500">Copied!</p>
//                   )}
//                 </td>

//                 {/* Phone column with copy functionality */}
//                 <td className="p-2 md:p-3">
//                   <div className="flex items-center gap-2">
//                     {contact.phone}
//                     <button
//                       onClick={() => copyToClipboard(contact.phone)}
//                       className="text-purple-500 hover:text-purple-600"
//                     >
//                       <AiOutlineCopy />
//                     </button>
//                   </div>
//                   {copiedItem === contact.phone && (
//                     <p className="text-xs text-purple-500">Copied!</p>
//                   )}
//                 </td>

//                 <td className="p-2 md:p-3">{contact.message}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//           )}
//         </div>
//       </div>
//       </div>
//     </div>

//       {/* Pagination */}
//       <div className="flex justify-center mt-4 space-x-2">
//         {Array.from({ length: totalPages }, (_, i) => (
//           <button
//             key={i + 1}
//             onClick={() => handlePageChange(i + 1)}
//             className={`px-2 py-1 rounded ${
//               currentPage === i + 1
//                 ? "bg-blue-500 text-white"
//                 : "bg-gray-200 text-gray-800"
//             } hover:bg-blue-400 transition`}
//           >
//             {i + 1}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Contacts;
import React, { useEffect, useState } from "react";
import { MdViewSidebar } from "react-icons/md";
import useSidebarStore from "../store/sidebar";
import { useContacts } from "../hook/useContacts";
import { Contact, ContactsData } from "../types/types";
import Table from "../components/table/main";
import '../index.css'

const TablePage: React.FC<{ darkMode: boolean }> = ({ darkMode }) => {
  const { toggleMobileSidebar } = useSidebarStore();
  const { getContacts } = useContacts();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 25;
  const data = getContacts(currentPage, itemsPerPage) as any;
  const ContactsData = data.data as ContactsData;
  useEffect(() => {
    const fetchContacts = () => {
      data.refetch();
    };

    fetchContacts();
  }, [currentPage]);

  const exportToCSV = (contacts: Contact[]) => {
    const csvContent = [
      ["Name", "Email", "Phone", "Message"],
      ...contacts.map((contact) => [
        contact.name,
        contact.email,
        contact.phone,
        contact.message,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "contacts.csv";
    link.click();
  };

  // const copyToClipboard = (text: string) => {
  //   navigator.clipboard.writeText(text).then(() => {
  //     alert(`${text} copied to clipboard!`);
  //   });
  // };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };
  const columns = [
    // { key: "profile", title: "Profile", type: "text" },
    { key: "name", title: "User Name", type: "text" },
    { key: "phone", title: "Contact Number", type: "text" },
    { key: "email", title: "Email ID", type: "email" },
    { key: "message", title: "Messages", type: "text" },
  ];

  console.log(ContactsData);
  return (
    <div
      className={`h-screen w-full flex flex-col ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      {/* Header */}
      <header className="flex justify-between items-center p-2 border-b border-gray-600">
        <h1 className="text-lg font-semibold flex gap-2 items-center md:mb-0">
          <button
            className={`lg:hidden xl:hidden p-2 rounded bg-gray-800 text-white shadow-lg z-50`}
            onClick={toggleMobileSidebar}
          >
            <MdViewSidebar className="h-5 w-5" />
          </button>
          Contacts
        </h1>
        <button
          onClick={() => exportToCSV(data.data.contacts)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Export
        </button>
      </header>

      {/* Table Container */}
      
          <div className="flex-1 custom-scrollbar overflow-hidden ">
            <div className="min-w-full p-1 overflow-auto">
              {data?.data?.contacts?.length < 0 ? (
                <p>no data</p>
              ) : (
                <Table
                  darkMode={true}
                  columns={columns as any}
                  loading={data.isLoading}
                  data={data?.data?.contacts}
                />
              )}
            </div>
          </div>
      
      {/* <div className="flex-1 overflow-hidden p-4">
        {data.isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="loader" />
          </div>
        ) : (
          <div className="overflow-x-auto max-h-[700px] border border-gray-600 rounded">
            <table className="min-w-full divide-y divide-gray-600">
              <thead>
                <tr>
                  <th className="px-2 py-2 text-left">Profile</th>
                  <th className="px-2 py-2 text-left">Name</th>
                  <th className="px-2 py-2 text-left">Email</th>
                  <th className="px-2 py-2 text-left">Phone</th>
                  <th className="px-2 py-2 text-left">Message</th>
                </tr>
              </thead>
              <tbody>
                {data.data.contacts?.map((item:Contact) => (
                  <tr key={item.id} className="odd:bg-gray-800 even:bg-gray-700">
                    <td className="px-2 py-2 text-center">
                      <div className="w-8 h-8 flex items-center justify-center bg-gray-300 rounded-full">
                        {item.name.charAt(0)}
                      </div>
                    </td>
                    <td className="px-2 py-2">{item.name}</td>
                    <td className="px-2 py-2">
                      <button
                        onClick={() => copyToClipboard(item.email)}
                        className="text-blue-500 underline hover:text-blue-700"
                      >
                        {item.email}
                      </button>
                    </td>
                    <td className="px-2 py-2">
                      <button
                        onClick={() => copyToClipboard(item.phone)}
                        className="text-blue-500 underline hover:text-blue-700"
                      >
                        {item.phone}
                      </button>
                    </td>
                    <td className="px-2 py-2">{item.message}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div> */}

      {/* Pagination */}
      <div className="flex justify-center items-center p-3 bg-gray-700 rounded-t-lg shadow-md">
    <button
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
        className={`w-24 px-3 py-1 bg-gray-600 text-white rounded-full mx-1 text-sm transition duration-300 
            hover:bg-gray-500 hover:scale-105 ${
                currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
            } shadow-md`}
    >
        Previous
    </button>

    <span className="mx-2 font-medium text-sm text-gray-300">Page {currentPage}</span>

    <button
        onClick={handleNextPage}
        disabled={ContactsData?.pageCount <= 1}
        className={`w-24 px-3 py-1 bg-gray-600 text-white rounded-full mx-1 text-sm transition duration-300 
            hover:bg-gray-500 hover:scale-105 ${
                ContactsData?.pageCount <= 1 ? "opacity-50 cursor-not-allowed" : ""
            } shadow-md`}
    >
        Next
    </button>
</div>

    </div>
  );
};

// Example usage of the component
const Contacts: React.FC = () => {
  return <TablePage darkMode={true} />;
};

export default Contacts;
