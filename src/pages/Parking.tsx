
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Navigation } from "lucide-react";

const Parking = () => {
  const [locationPermission, setLocationPermission] = useState<boolean | null>(null);
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);

  const requestLocation = async () => {
    try {
      const result = await navigator.permissions.query({ name: "geolocation" });
      if (result.state === "granted") {
        setLocationPermission(true);
        loadParkingSpaces();
      } else if (result.state === "prompt") {
        navigator.geolocation.getCurrentPosition(
          () => {
            setLocationPermission(true);
            loadParkingSpaces();
          },
          () => {
            setLocationPermission(false);
            toast({
              title: "Location access denied",
              description: "Please enable location services to find parking spaces near you.",
              variant: "destructive",
            });
          }
        );
      } else {
        setLocationPermission(false);
      }
    } catch (error) {
      console.error("Error requesting location:", error);
      setLocationPermission(false);
    }
  };

  const loadParkingSpaces = () => {
    // Simulate loading parking spaces
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  useEffect(() => {
    requestLocation();
  }, []);

  if (locationPermission === false) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center space-y-4 max-w-md mx-auto">
          <MapPin className="w-16 h-16 text-primary mx-auto" />
          <h2 className="text-2xl font-bold">Location Access Required</h2>
          <p className="text-muted-foreground">
            Please enable location services to find available parking spaces near you.
          </p>
          <Button onClick={requestLocation} className="mt-4">
            Enable Location
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Available Parking Spaces</h1>
          <Button variant="outline" className="gap-2">
            <Navigation className="w-4 h-4" /> Near Me
          </Button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="h-48 bg-card animate-pulse rounded-lg"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {parkingSpaces.map((space, index) => (
              <div
                key={index}
                className="bg-card p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-lg">{space.name}</h3>
                    <p className="text-muted-foreground text-sm">
                      {space.distance} away
                    </p>
                  </div>
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                    {space.availableSpots} spots
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div
                      className="bg-primary rounded-full h-2"
                      style={{
                        width: `${(space.availableSpots / space.totalSpots) * 100}%`,
                      }}
                    />
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{space.availableSpots} available</span>
                    <span>{space.totalSpots} total</span>
                  </div>
                </div>
                <Button className="w-full mt-4">Reserve Spot</Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const parkingSpaces = [
  {
    name: "Central Parking",
    distance: "0.2 km",
    availableSpots: 15,
    totalSpots: 50,
  },
  {
    name: "City Center Garage",
    distance: "0.5 km",
    availableSpots: 8,
    totalSpots: 30,
  },
  {
    name: "Downtown Parking",
    distance: "0.8 km",
    availableSpots: 25,
    totalSpots: 40,
  },
  {
    name: "Market Street Lot",
    distance: "1.2 km",
    availableSpots: 12,
    totalSpots: 35,
  },
  {
    name: "Park Avenue Garage",
    distance: "1.5 km",
    availableSpots: 20,
    totalSpots: 45,
  },
  {
    name: "Plaza Parking",
    distance: "1.8 km",
    availableSpots: 5,
    totalSpots: 25,
  },
];

export default Parking;
