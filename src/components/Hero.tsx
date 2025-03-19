
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with gradient overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2070')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-background z-10"></div>
      </div>

      {/* Floating elements */}
      <div className="absolute inset-0 z-10 overflow-hidden">
        <motion.div 
          className="absolute top-[30%] left-[65%] w-24 h-24 rounded-full opacity-20 bg-primary"
          animate={{ 
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ 
            repeat: Infinity,
            duration: 5,
            ease: "easeInOut",
          }}
        />
        <motion.div 
          className="absolute top-[60%] left-[20%] w-32 h-32 rounded-full opacity-10 bg-white"
          animate={{ 
            y: [0, 30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ 
            repeat: Infinity,
            duration: 7,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div 
          className="absolute top-[15%] left-[30%] w-16 h-16 rounded-full opacity-10 bg-white"
          animate={{ 
            y: [0, -20, 0],
            x: [0, 20, 0],
          }}
          transition={{ 
            repeat: Infinity,
            duration: 6,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      {/* Content */}
      <div className="container relative z-20 px-6 md:px-12 py-24 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-3 py-1 mb-6 rounded-full text-sm font-medium text-white bg-white/10 border border-white/20 backdrop-blur-sm">
              Reimagine Your Wardrobe
            </span>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight text-balance"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Your AI Stylist for Perfect Outfits Every Day
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto text-pretty"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Digitize your wardrobe, get AI-powered outfit recommendations based on weather, occasion, and your unique style.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link to="/signup">
              <Button size="lg" className="w-full sm:w-auto bg-white text-foreground hover:bg-white/90 transition-all duration-300">
                Get Started
              </Button>
            </Link>
            <Link to="/#features">
              <Button variant="outline" size="lg" className="w-full sm:w-auto text-white border-white/30 hover:bg-white/10 transition-all duration-300">
                Learn More
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <motion.div 
          className="w-[30px] h-[50px] rounded-full border-2 border-white/30 flex justify-center p-2"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <motion.div 
            className="w-1.5 h-1.5 bg-white rounded-full"
            animate={{ y: [0, 15, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;
