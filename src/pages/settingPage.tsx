import React, { useEffect, useState } from "react";
import { useAuth } from "../hook/useAuth";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaCheckCircle,
  FaExclamationCircle,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa"; // Importing icons
import { MdArrowBackIos } from "react-icons/md";
import { useNavigate } from "react-router-dom";

type User = {
  username: string;
  email: string;
  phone: string;
  emailVerified: boolean;
  password: string;
};

const SkeletonLoader = () => (
  <div className="h-full w-full  bg-gray-900 text-white ">
    <div className="relative">
      <div className="bg-gradient-to-r from-blue-200 to-yellow-200 h-32 w-full rounded-t-lg animate-pulse"></div>
      <div className="absolute top-16 left-8 h-36 w-36 rounded-full overflow-hidden bg-black flex items-center justify-center animate-pulse">
        <div className="h-full w-full bg-gray-300 rounded-full"></div>
      </div>
    </div>

    <div className="flex flex-col p-3 gap-2 w-full text-white">
      <div className="flex justify-end mb-4">
        <div className="bg-gray-800 text-white px-4 py-2 rounded-md opacity-50 cursor-not-allowed animate-pulse">
          Saving...
        </div>
      </div>

      <div className="grid p-3 grid-cols-1 md:grid-cols-2 gap-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="flex flex-col">
            <div className="h-4 bg-gray-300 rounded mb-2 animate-pulse"></div>
            <div className="h-10 bg-gray-300 rounded animate-pulse"></div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const SettingsPage: React.FC = () => {
  const { verifyEmail } = useAuth();

  // Query to fetch user data
  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await axios.get(`/api/v1/users/1`); // Adjust the URL as needed
      return response.data as User;
    },
  });

  // Mutation to update user data
  const updateUser = useMutation({
    mutationFn: async (profileData: User) => {
      await axios.put(`/api/v1/users/1`, profileData); // Adjust the URL as needed
    },
    onSuccess: () => {
      console.log("Profile updated successfully");
    },
    onError: (error) => {
      console.error("Error updating profile:", error);
    },
  });
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [isEmailVerified, setIsEmailVerified] = useState<boolean>(false);

  const navigate = useNavigate()
  const [errors, setErrors] = useState<{
    username?: string;
    email?: string;
    password?: string;
    phone?: string;
  }>({});
  const [originalEmail, setOriginalEmail] = useState<string>(""); // To track the original email

  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setEmail(user.email);
      setPhone(user.phone);
      setPassword(user.password);
      setIsEmailVerified(user.emailVerified);
      setOriginalEmail(user.email); // Save the original email for comparison
    }
  }, [user]);

  const validateFields = (): boolean => {
    const newErrors: {
      username?: string;
      email?: string;
      password?: string;
      phone?: string;
    } = {};
    if (!username) newErrors.username = "Username is required";
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
    }
    if (!password) newErrors.password = "Password is required";
    if (!phone) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d+$/.test(phone)) {
      newErrors.phone = "Phone number must be numeric";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateFields()) {
      const profileData = {
        username,
        email,
        password,
        phone,
        emailVerified: isEmailVerified,
      };
      updateUser.mutate(profileData); // Call the mutation to update user data
    }
  };

  const handleEmailVerification = () => {
    console.log("Sending verification email...");
    verifyEmail
      .mutateAsync({ email })
      .then(() => {
        console.log("Email verified successfully!");
        setIsEmailVerified(true);
      })
      .catch((error) => {
        console.error("Email verification failed:", error);
      });
  };

  const verify_Email = () => {
    if (email && email !== originalEmail) {
      handleEmailVerification();
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: email ? "Email is unchanged" : "Email is required to verify",
      }));
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };
  if (isLoading) return <SkeletonLoader />;
  if (isError) return <div>Error loading user data</div>;

  return (
    <div className="h-screen w-full bg-gray-900 text-white">
      <div className="relative">
        <div className="bg-gradient-to-r from-blue-200 to-yellow-200 h-32 w-full rounded-t-lg"></div>
        <button
    onClick={() => {navigate('/news-feed')}} // Replace with your actual back function
    className="absolute top-4 left-4 flex items-center text-white bg-gray-800 px-2 py-1 rounded-md hover:bg-gray-700 md:hidden"
>
    <MdArrowBackIos className="mr-1" /> Back
</button>
        <div className="absolute top-16 left-8 h-36 w-36 rounded-full overflow-hidden bg-black flex items-center justify-center">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7wv8-73hPX3NoUBA6XjGw5NwUGZjBfhRUTQ&s"
            alt="Profile picture"
            className="h-full w-full object-cover rounded-full border-4 border-gray-800 shadow-md"
          />
        </div>
      </div>

      <div className="flex flex-col p-3 gap-2 w-full text-white">
        <div className="flex justify-end mb-4">
          <button
            onClick={handleSave}
            disabled={isLoading} // Disable button when loading
            className={`bg-gray-800 text-white px-4 py-2 rounded-md ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {updateUser.isPending ? "Saving..." : "Save"}{" "}
            {/* Change button text based on loading state */}
          </button>
        </div>

        <div className="grid p-3 grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="block flex items-center">
              <FaUser className="mr-2" /> Username
            </label>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`w-full p-2 border rounded-md bg-gray-800 text-white ${
                errors.username ? "border-red-500" : ""
              }`}
            />
            {errors.username && (
              <span className="text-red-500 text-sm">{errors.username}</span>
            )}
          </div>

          <div className="flex flex-col">
            <label className="block flex items-center">
              <FaPhone className="mr-2" /> Phone Number
            </label>
            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={`w-full p-2 border rounded-md bg-gray-800 text-white ${
                errors.phone ? "border-red-500" : ""
              }`}
            />
            {errors.phone && (
              <span className="text-red-500 text-sm">{errors.phone}</span>
            )}
          </div>

          <div className="flex flex-col">
      <label className="block flex items-center">
        <FaLock className="mr-2" /> Password
      </label>
      <div className="relative w-full">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={`w-full p-2 border rounded-md bg-gray-800 text-white ${
            errors.password ? "border-red-500" : ""
          }`}
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute inset-y-0 right-2 flex items-center text-gray-400"
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>
      {errors.password && (
        <span className="text-red-500 text-sm">{errors.password}</span>
      )}
    </div>

          <div className="flex flex-col">
            <label className="block flex items-center">
              <FaEnvelope className="mr-2" /> Email
            </label>
            <div className="flex items-center gap-2 justify-center ">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full p-2 border rounded-md bg-gray-800 text-white ${
                  errors.email ? "border-red-500" : ""
                }`}
              />
              <button
                onClick={verify_Email}
                disabled={email === originalEmail} // Disable if email hasn't changed
                className={`bg-blue-500 text-white px-4 py-2 rounded-md ${
                  email === originalEmail ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                Verify
              </button>
            </div>
            {errors.email && (
              <span className="text-red-500 text-sm">{errors.email}</span>
            )}
            {email && (
              <div className="text-sm mt-2">
                {isEmailVerified ? (
                  <span className="text-green-500 flex gap-2 items-center">
                    <FaCheckCircle />
                    Email is verified
                  </span>
                ) : (
                  <span className="text-yellow-500 flex gap-2 items-center">
                    <FaExclamationCircle />
                    Verification pending
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
