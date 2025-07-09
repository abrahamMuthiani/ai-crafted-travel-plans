
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, MapPin, Calendar, Users, DollarSign, Heart, Sparkles, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";

interface TripPlannerFormProps {
  onTripGenerated: (tripData: any) => void;
  onBack: () => void;
}

const TripPlannerForm = ({ onTripGenerated, onBack }: TripPlannerFormProps) => {
  const [formData, setFormData] = useState({
    destination: "",
    days: "",
    startDate: "",
    endDate: "",
    budget: "",
    travelers: "",
    interests: "",
    accommodationType: "",
    travelStyle: ""
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generateTripWithAI = async () => {
    // Validate required fields
    if (!formData.destination || !formData.days || !formData.budget || !formData.travelers) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsGenerating(true);
    setProgress(0);
    
    try {
      // Simulate AI generation with realistic progress
      const steps = [
        { message: "Analyzing destination data...", progress: 20 },
        { message: "Processing preferences...", progress: 40 },
        { message: "Generating itinerary...", progress: 60 },
        { message: "Finding accommodations...", progress: 80 },
        { message: "Finalizing recommendations...", progress: 100 }
      ];

      for (const step of steps) {
        await new Promise(resolve => setTimeout(resolve, 800));
        setProgress(step.progress);
        toast.info(step.message);
      }
      
      // Enhanced mock trip data with more realistic content
      const mockTrip = {
        destination: formData.destination,
        duration: `${formData.days} days`,
        budget: formData.budget,
        travelers: formData.travelers,
        dates: formData.startDate && formData.endDate ? `${formData.startDate} to ${formData.endDate}` : "Flexible dates",
        travelStyle: formData.travelStyle || "Mixed",
        totalEstimatedCost: calculateTotalCost(formData.budget, parseInt(formData.days)),
        itinerary: generateDetailedItinerary(formData),
        hotels: generateHotelRecommendations(formData),
        restaurants: generateRestaurantRecommendations(formData),
        transportation: generateTransportationOptions(formData),
        localTips: generateLocalTips(formData.destination),
        weatherInfo: generateWeatherInfo(formData.destination),
        packingList: generatePackingList(formData)
      };

      toast.success("🎉 Your personalized trip has been generated!");
      onTripGenerated(mockTrip);
    } catch (error) {
      toast.error("Failed to generate trip. Please try again.");
      console.error("Trip generation error:", error);
    } finally {
      setIsGenerating(false);
      setProgress(0);
    }
  };

  const calculateTotalCost = (budget: string, days: number) => {
    const budgetMap: { [key: string]: number } = {
      "budget": 300,
      "moderate": 800,
      "luxury": 2500,
      "ultra-luxury": 5000
    };
    return `$${(budgetMap[budget] || 500) * days}`;
  };

  const generateDetailedItinerary = (data: any) => {
    const daysCount = parseInt(data.days) || 3;
    return Array.from({ length: daysCount }, (_, i) => ({
      day: i + 1,
      title: `Day ${i + 1} - Exploring ${data.destination}`,
      theme: getThemeForDay(i, data.interests),
      activities: generateActivitiesForDay(i, data),
      estimatedCost: `$${80 + (i * 20)}`,
      walkingDistance: `${2 + (Math.random() * 3).toFixed(1)} km`,
      highlights: [`Top attraction visit`, `Local cuisine experience`, `Cultural immersion`]
    }));
  };

  const getThemeForDay = (dayIndex: number, interests: string) => {
    const themes = [
      "City Highlights & Landmarks",
      "Culture & History",
      "Local Life & Cuisine",
      "Nature & Adventure",
      "Shopping & Entertainment"
    ];
    return themes[dayIndex % themes.length];
  };

  const generateActivitiesForDay = (dayIndex: number, data: any) => {
    const baseActivities = [
      {
        time: "9:00 AM",
        title: `Morning exploration of ${data.destination}`,
        description: "Start your day with a visit to the city's most iconic landmarks and attractions.",
        type: "sightseeing",
        estimatedCost: "$25",
        duration: "3 hours",
        difficulty: "Easy",
        bookingRequired: false
      },
      {
        time: "1:00 PM",
        title: "Authentic local cuisine experience",
        description: "Enjoy traditional dishes at a highly-rated restaurant recommended by locals.",
        type: "dining",
        estimatedCost: "$45",
        duration: "2 hours",
        difficulty: "Easy",
        bookingRequired: true
      },
      {
        time: "4:00 PM",
        title: "Cultural immersion activity",
        description: "Visit museums, galleries, or cultural sites showcasing local heritage.",
        type: "culture",
        estimatedCost: "$20",
        duration: "2.5 hours",
        difficulty: "Easy",
        bookingRequired: false
      },
      {
        time: "7:30 PM",
        title: "Evening entertainment",
        description: "Experience nightlife or attend a local performance.",
        type: "entertainment",
        estimatedCost: "$35",
        duration: "3 hours",
        difficulty: "Easy",
        bookingRequired: true
      }
    ];

    return baseActivities.map(activity => ({
      ...activity,
      title: `${activity.title} - ${data.destination} ${dayIndex + 1}`
    }));
  };

  const generateHotelRecommendations = (data: any) => {
    return [
      {
        name: `Premium Stay ${data.destination}`,
        rating: 4.5,
        pricePerNight: "$180",
        amenities: ["WiFi", "Pool", "Spa", "Restaurant", "Gym"],
        location: "City Center",
        description: "A perfect blend of comfort and luxury in the heart of the city.",
        bookingUrl: "#",
        reviews: 1250,
        images: ["/placeholder.svg"]
      },
      {
        name: `Boutique Hotel ${data.destination}`,
        rating: 4.2,
        pricePerNight: "$140",
        amenities: ["WiFi", "Breakfast", "Gym", "Bar", "Concierge"],
        location: "Historic District",
        description: "Charming boutique hotel with unique character and excellent service.",
        bookingUrl: "#",
        reviews: 890,
        images: ["/placeholder.svg"]
      },
      {
        name: `Modern Lodge ${data.destination}`,
        rating: 4.0,
        pricePerNight: "$95",
        amenities: ["WiFi", "Restaurant", "Parking", "24/7 Front Desk"],
        location: "Downtown",
        description: "Contemporary accommodation with modern amenities and great location.",
        bookingUrl: "#",
        reviews: 675,
        images: ["/placeholder.svg"]
      }
    ];
  };

  const generateRestaurantRecommendations = (data: any) => {
    return [
      {
        name: `Local Flavors ${data.destination}`,
        cuisine: "Traditional",
        rating: 4.6,
        priceRange: "$$",
        specialties: ["Local fish", "Traditional stew", "Seasonal vegetables"],
        location: "Old Town"
      },
      {
        name: `Modern Bistro ${data.destination}`,
        cuisine: "Contemporary",
        rating: 4.3,
        priceRange: "$$$",
        specialties: ["Fusion cuisine", "Craft cocktails", "Artisan desserts"],
        location: "Arts District"
      }
    ];
  };

  const generateTransportationOptions = (data: any) => {
    return [
      { type: "Public Transit", cost: "$3/day", description: "Efficient metro and bus system" },
      { type: "Taxi/Rideshare", cost: "$15-25/ride", description: "Convenient door-to-door service" },
      { type: "Bike Rental", cost: "$12/day", description: "Eco-friendly city exploration" },
      { type: "Walking", cost: "Free", description: "Best way to discover hidden gems" }
    ];
  };

  const generateLocalTips = (destination: string) => {
    return [
      `Best time to visit ${destination} is early morning or late afternoon`,
      "Learn a few basic phrases in the local language",
      "Always carry cash as some places don't accept cards",
      "Respect local customs and dress codes",
      "Try street food but choose busy stalls for freshness"
    ];
  };

  const generateWeatherInfo = (destination: string) => {
    return {
      temperature: "22-28°C",
      conditions: "Partly cloudy with occasional showers",
      recommendation: "Pack light layers and a waterproof jacket",
      uvIndex: "Moderate to High - sunscreen recommended"
    };
  };

  const generatePackingList = (data: any) => {
    const baseItems = [
      "Comfortable walking shoes",
      "Weather-appropriate clothing",
      "Portable charger",
      "Travel documents",
      "First aid kit",
      "Sunscreen and sunglasses"
    ];

    if (data.interests?.toLowerCase().includes("adventure")) {
      baseItems.push("Hiking boots", "Water bottle", "Backpack");
    }

    return baseItems;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button 
          onClick={onBack}
          variant="ghost" 
          className="mb-6 hover:bg-white/80"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>

        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
            <CardTitle className="text-3xl font-bold flex items-center justify-center">
              <Sparkles className="mr-3 h-8 w-8" />
              AI Trip Planner
            </CardTitle>
            <CardDescription className="text-blue-100 text-lg">
              Create your perfect journey with artificial intelligence
            </CardDescription>
          </CardHeader>
          
          <CardContent className="p-8 space-y-6">
            {isGenerating && (
              <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-3 mb-2">
                  <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
                  <span className="text-blue-800 font-medium">Generating your perfect trip...</span>
                </div>
                <Progress value={progress} className="w-full" />
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="destination" className="text-sm font-semibold text-gray-700 flex items-center">
                  <MapPin className="mr-2 h-4 w-4 text-blue-600" />
                  Destination *
                </Label>
                <Input
                  id="destination"
                  placeholder="e.g., Paris, France"
                  value={formData.destination}
                  onChange={(e) => handleInputChange("destination", e.target.value)}
                  className="border-gray-300 focus:border-blue-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="days" className="text-sm font-semibold text-gray-700 flex items-center">
                  <Calendar className="mr-2 h-4 w-4 text-blue-600" />
                  Duration *
                </Label>
                <Select onValueChange={(value) => handleInputChange("days", value)}>
                  <SelectTrigger className="border-gray-300 focus:border-blue-500">
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Day</SelectItem>
                    <SelectItem value="2">2 Days</SelectItem>
                    <SelectItem value="3">3 Days</SelectItem>
                    <SelectItem value="4">4 Days</SelectItem>
                    <SelectItem value="5">5 Days</SelectItem>
                    <SelectItem value="7">1 Week</SelectItem>
                    <SelectItem value="10">10 Days</SelectItem>
                    <SelectItem value="14">2 Weeks</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="startDate" className="text-sm font-semibold text-gray-700">
                  Start Date (Optional)
                </Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => handleInputChange("startDate", e.target.value)}
                  className="border-gray-300 focus:border-blue-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="endDate" className="text-sm font-semibold text-gray-700">
                  End Date (Optional)
                </Label>
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => handleInputChange("endDate", e.target.value)}
                  className="border-gray-300 focus:border-blue-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="budget" className="text-sm font-semibold text-gray-700 flex items-center">
                  <DollarSign className="mr-2 h-4 w-4 text-blue-600" />
                  Budget Range *
                </Label>
                <Select onValueChange={(value) => handleInputChange("budget", value)}>
                  <SelectTrigger className="border-gray-300 focus:border-blue-500">
                    <SelectValue placeholder="Select budget" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="budget">Budget ($50-100/day)</SelectItem>
                    <SelectItem value="moderate">Moderate ($100-250/day)</SelectItem>
                    <SelectItem value="luxury">Luxury ($250-500/day)</SelectItem>
                    <SelectItem value="ultra-luxury">Ultra Luxury ($500+/day)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="travelers" className="text-sm font-semibold text-gray-700 flex items-center">
                  <Users className="mr-2 h-4 w-4 text-blue-600" />
                  Travelers *
                </Label>
                <Select onValueChange={(value) => handleInputChange("travelers", value)}>
                  <SelectTrigger className="border-gray-300 focus:border-blue-500">
                    <SelectValue placeholder="Select travelers" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Solo (1 person)</SelectItem>
                    <SelectItem value="2">Couple (2 people)</SelectItem>
                    <SelectItem value="3-4">Small Group (3-4 people)</SelectItem>
                    <SelectItem value="5+">Large Group (5+ people)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="travelStyle" className="text-sm font-semibold text-gray-700">
                Travel Style
              </Label>
              <Select onValueChange={(value) => handleInputChange("travelStyle", value)}>
                <SelectTrigger className="border-gray-300 focus:border-blue-500">
                  <SelectValue placeholder="Select travel style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relaxed">Relaxed & Leisurely</SelectItem>
                  <SelectItem value="active">Active & Adventurous</SelectItem>
                  <SelectItem value="cultural">Cultural & Educational</SelectItem>
                  <SelectItem value="mixed">Mixed Activities</SelectItem>
                  <SelectItem value="luxury">Luxury & Comfort</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="accommodationType" className="text-sm font-semibold text-gray-700">
                Accommodation Preference
              </Label>
              <Select onValueChange={(value) => handleInputChange("accommodationType", value)}>
                <SelectTrigger className="border-gray-300 focus:border-blue-500">
                  <SelectValue placeholder="Select accommodation type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hotel">Hotel</SelectItem>
                  <SelectItem value="resort">Resort</SelectItem>
                  <SelectItem value="apartment">Apartment/Airbnb</SelectItem>
                  <SelectItem value="hostel">Hostel</SelectItem>
                  <SelectItem value="boutique">Boutique Hotel</SelectItem>
                  <SelectItem value="luxury">Luxury Hotel</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="interests" className="text-sm font-semibold text-gray-700 flex items-center">
                <Heart className="mr-2 h-4 w-4 text-blue-600" />
                Interests & Preferences
              </Label>
              <Textarea
                id="interests"
                placeholder="Tell us about your interests: adventure, culture, food, nightlife, nature, museums, shopping, photography, local experiences, etc."
                value={formData.interests}
                onChange={(e) => handleInputChange("interests", e.target.value)}
                className="border-gray-300 focus:border-blue-500 min-h-[120px]"
              />
            </div>

            <Button 
              onClick={generateTripWithAI}
              disabled={isGenerating}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 text-white py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="animate-spin mr-3 h-5 w-5" />
                  Generating Your Perfect Trip...
                </>
              ) : (
                <>
                  <Sparkles className="mr-3 h-5 w-5" />
                  Generate My AI Trip
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TripPlannerForm;
