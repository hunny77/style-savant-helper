
import { motion } from "framer-motion";
import { Shirt, Cloud, Calendar, Image, Palette, ShoppingBag } from "lucide-react";

const FeatureCard = ({ icon, title, description, delay = 0 }) => {
  return (
    <motion.div
      className="flex flex-col p-6 rounded-2xl glass-card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="rounded-full w-12 h-12 flex items-center justify-center bg-primary/10 mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </motion.div>
  );
};

const Features = () => {
  const features = [
    {
      icon: <Shirt className="w-6 h-6 text-primary" />,
      title: "Digital Wardrobe",
      description: "Upload and organize your entire clothing collection with smart categorization.",
    },
    {
      icon: <Cloud className="w-6 h-6 text-primary" />,
      title: "Weather Integration",
      description: "Get outfit suggestions tailored to the current weather in your location.",
    },
    {
      icon: <Calendar className="w-6 h-6 text-primary" />,
      title: "Occasion Planning",
      description: "Prepare perfect outfits for any event, from casual outings to formal occasions.",
    },
    {
      icon: <Image className="w-6 h-6 text-primary" />,
      title: "Visual Recognition",
      description: "AI automatically categorizes your uploaded clothing items for seamless organization.",
    },
    {
      icon: <Palette className="w-6 h-6 text-primary" />,
      title: "Style Recommendations",
      description: "Get personalized color and style advice based on your unique preferences.",
    },
    {
      icon: <ShoppingBag className="w-6 h-6 text-primary" />,
      title: "Shopping Suggestions",
      description: "Discover new pieces that perfectly complement your existing wardrobe.",
    },
  ];

  return (
    <section id="features" className="py-24 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <motion.p
            className="text-sm font-medium text-primary mb-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            FEATURES
          </motion.p>
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
          >
            Everything you need for your wardrobe
          </motion.h2>
          <motion.p
            className="text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.2 }}
          >
            Our AI-powered platform simplifies outfit selection and wardrobe management with these powerful features.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={0.1 + index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
