import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover";
import { Button } from "../ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { LogOut, User2, Menu } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  const navLinks =
    user?.role === "recruiter"
      ? [
          { label: "Companies", path: "/admin/companies" },
          { label: "Jobs", path: "/admin/jobs" },
        ]
      : [
          { label: "Home", path: "/" },
          { label: "Jobs", path: "/jobs" },
          { label: "Browse", path: "/browse" },
        ];

  const defaultAvatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    user?.fullname || "U"
  )}&background=333&color=fff`;

  return (
    <header className="bg-[#111111] shadow-sm backdrop-blur-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-4">
        {/* Logo */}
        <motion.div
          className="flex items-center gap-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            to="/"
            className="text-white text-xl font-bold tracking-tight flex items-center"
          >
            Job<span className="text-gray-400">Verse</span>
          </Link>
        </motion.div>

        {/* Nav Links */}
        <ul className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-400">
          {navLinks.map((link, idx) => (
            <li key={idx}>
              <Link
                to={link.path}
                className="hover:text-white transition-colors duration-200"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Auth / Avatar */}
        {!user ? (
          <div className="hidden md:flex items-center gap-3">
            <Link to="/login">
              <Button
                variant="ghost"
                className="text-gray-300 border border-gray-600 hover:bg-white hover:text-black transition-all"
              >
                Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-white text-black hover:bg-gray-100 font-semibold">
                Signup
              </Button>
            </Link>
          </div>
        ) : (
          <Popover>
            <PopoverTrigger asChild>
              <Avatar className="cursor-pointer hover:opacity-90 transition">
                <AvatarImage
                  src={user?.profile?.profilePhoto || defaultAvatarUrl}
                  alt="User"
                />
                <AvatarFallback>{user?.fullname?.charAt(0) || "U"}</AvatarFallback>
              </Avatar>
            </PopoverTrigger>
            <PopoverContent className="w-80 bg-[#1a1a1a] text-gray-300 shadow-lg rounded-lg border border-[#2c2c2c]">
              <div className="p-3">
                <div className="flex gap-3 items-center mb-3">
                  <Avatar>
                    <AvatarImage
                      src={user?.profile?.profilePhoto || defaultAvatarUrl}
                      alt="User"
                    />
                    <AvatarFallback>{user?.fullname?.charAt(0) || "U"}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold text-base">{user?.fullname}</h4>
                    <p className="text-sm text-gray-500">
                      {user?.profile?.bio || "No bio"}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-2 text-sm">
                  {user.role === "student" && (
                    <div className="flex items-center gap-2">
                      <User2 className="h-4 w-4 text-gray-400" />
                      <Link to="/profile">
                        <Button
                          variant="link"
                          className="p-0 h-auto text-gray-300 hover:text-white"
                        >
                          View Profile
                        </Button>
                      </Link>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <LogOut className="h-4 w-4 text-red-500" />
                    <Button
                      onClick={logoutHandler}
                      variant="link"
                      className="p-0 h-auto text-red-500 hover:text-red-400"
                    >
                      Logout
                    </Button>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        )}

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Menu className="text-white" />
          </Button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-[#1a1a1a] text-gray-300 px-4 py-4 space-y-4"
          >
            {navLinks.map((link, idx) => (
              <div key={idx}>
                <Link
                  to={link.path}
                  className="block w-full text-left hover:text-white"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </div>
            ))}

            {!user && (
              <div className="flex flex-col gap-2 mt-2">
                <Link to="/login">
                  <Button
                    variant="ghost"
                    className="text-gray-300 border border-gray-600 hover:bg-white hover:text-black"
                  >
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-white text-black hover:bg-gray-100 font-semibold w-full">
                    Signup
                  </Button>
                </Link>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
