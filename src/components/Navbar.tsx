
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X, User } from "lucide-react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHomepage = location.pathname === "/";
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navbarClasses = `fixed top-0 left-0 right-0 z-50 px-6 transition-all duration-300 ${
    scrolled || !isHomepage
      ? "py-3 bg-white/80 backdrop-blur-lg border-b"
      : "py-5 bg-transparent"
  }`;

  const logoClasses = `text-xl font-semibold tracking-tight transition-all duration-300 ${
    scrolled || !isHomepage ? "text-foreground" : "text-white"
  }`;
  
  const navLinkClasses = `relative px-2 py-1 transition-all duration-200 hover:text-primary ${
    scrolled || !isHomepage ? "text-foreground" : "text-white"
  }`;

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Features", path: "/#features" },
    { name: "About", path: "/#about" }
  ];

  return (
    <nav className={navbarClasses}>
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className={logoClasses}>
          <span className="flex items-center gap-1">
            Wardrobify
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link key={link.name} to={link.path} className={navLinkClasses}>
              {link.name}
              <motion.span
                className="absolute left-0 right-0 bottom-0 h-[2px] bg-primary rounded-full"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.2 }}
              />
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center space-x-3">
          <Link to="/login">
            <Button variant="ghost" className={scrolled || !isHomepage ? "" : "text-white hover:text-white hover:bg-white/20"}>
              Log in
            </Button>
          </Link>
          <Link to="/signup">
            <Button variant="default" className="relative overflow-hidden group">
              <span className="relative z-10">Get Started</span>
              <motion.div
                className="absolute inset-0 bg-black/10"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />
            </Button>
          </Link>
        </div>

        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className={scrolled || !isHomepage ? "text-foreground" : "text-white"} />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <div className="flex flex-col h-full py-6">
              <div className="flex items-center justify-between mb-8">
                <span className="text-xl font-semibold">Wardrobify</span>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <X className="h-5 w-5" />
                    <span className="sr-only">Close</span>
                  </Button>
                </SheetTrigger>
              </div>
              
              <div className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className="text-foreground hover:text-primary py-2 transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
              
              <div className="mt-auto space-y-3">
                <Link to="/login" className="block w-full">
                  <Button variant="outline" className="w-full">
                    Log in
                  </Button>
                </Link>
                <Link to="/signup" className="block w-full">
                  <Button className="w-full">Get Started</Button>
                </Link>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Navbar;
