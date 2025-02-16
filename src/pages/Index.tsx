
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { MapPinned } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
      <div className="space-y-6 text-center max-w-3xl mx-auto fade-in">
        <div className="space-y-2">
          <div className="inline-block">
            <span className="px-3 py-1 text-sm bg-primary/10 text-primary rounded-full">
              Smart Parking Solutions
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
            Find Your Perfect
            <span className="text-primary"> Parking Space</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-[600px] mx-auto">
            Discover available parking spots in real-time. Quick, easy, and hassle-free parking experience.
          </p>
        </div>
        
        <Button
          onClick={() => navigate("/parking")}
          size="lg"
          className="group relative overflow-hidden rounded-full px-8 py-6 transition-all duration-300 hover:shadow-lg hover:shadow-primary/25"
        >
          <span className="relative z-10 flex items-center gap-2">
            <MapPinned className="w-5 h-5" />
            Find Parking Now
          </span>
          <div className="absolute inset-0 z-0 bg-gradient-to-r from-primary/80 to-primary transition-all duration-300 group-hover:scale-105" />
        </Button>

        <div className="pt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl bg-card shadow-sm hover:shadow-md transition-shadow duration-300 slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <feature.icon className="w-10 h-10 text-primary mb-4" />
              <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const features = [
  {
    icon: MapPinned,
    title: "Real-time Availability",
    description: "See parking spots update in real-time as they become available.",
  },
  {
    icon: MapPinned,
    title: "Location Based",
    description: "Find the closest available parking spots to your destination.",
  },
  {
    icon: MapPinned,
    title: "Easy Navigation",
    description: "Get turn-by-turn directions to your chosen parking spot.",
  },
];

export default Index;
