
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import AuthForm from "@/components/AuthForm";
import { ArrowLeft } from "lucide-react";

const Login = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen flex flex-col"
    >
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md space-y-8">
          <div className="absolute top-6 left-6">
            <Link 
              to="/" 
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to home
            </Link>
          </div>
          
          <div className="text-center mb-8">
            <Link to="/" className="inline-block text-2xl font-bold mb-2">
              Wardrobify
            </Link>
          </div>
          
          <AuthForm type="login" />
        </div>
      </div>
    </motion.div>
  );
};

export default Login;
