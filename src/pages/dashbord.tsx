import React from "react";
import { Link } from "react-router-dom";
import Card from "../components/card/main";
import { FiPhone, FiMessageSquare, FiUpload, FiSettings } from "react-icons/fi";

const Dashboard: React.FC = () => {
    const cardData = [
        {
          title: "Contacts",
          subtitle: "Manage your contacts",
          href: "/contacts",
          Icon: FiPhone, // Updated icon for contacts
        },
        {
          title: "Testimonials",
          subtitle: "View and manage testimonials",
          href: "/testimonials",
          Icon: FiMessageSquare, // Updated icon for testimonials
        },
        {
          title: "Carousel Image Uploading",
          subtitle: "Upload images for the carousel",
          href: "/carousel",
          Icon: FiUpload, // Updated icon for image uploading
        },
        {
          title: "Products Edit and Update",
          subtitle: "Edit and update product details",
          href: "/products",
          Icon: FiSettings, // Updated icon for product editing
        },
      ];
  return (
   
    <div className="p-4">
    <p className="text-xl font-semibold mb-2">Settings</p>
    <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
    {cardData.map((card, index) => (
          <Card
            key={index}
            title={card.title}
            subtitle={card.subtitle}
            href={card.href}
            Icon={card.Icon}
          />
        ))}
    </div>
  </div>
  );
};

export default Dashboard;


