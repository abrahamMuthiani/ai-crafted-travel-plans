
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, MapPin, Calendar, Users, DollarSign, Heart, Sparkles } from "lucide-react";
import { toast } from "sonner";

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
    accommodationType: ""
  });
  const [isGenerating, setIsGenerating] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generateTrip = async () => {
    // Validate required fields
    if (!formData.destination || !formData.days || !formData.budget || !formData.travelers) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsGenerating(true);
    
    // Simulate AI generation with a realistic delay
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Mock generated trip data
      const mockTrip = {
        destination: formData.destination,
        duration: `${formData.days} days`,
        budget: formData.budget,
        travelers: formData.travelers,
        dates: formData.startDate && formData.endDate ? `${formData.startDate} to ${formData.endDate}` : "Flexible dates",
        itinerary: Array.from({ length: parseInt(formData.days) || 3 }, (_, i) => ({
          day: i + 1,
          title: `Day ${i + 1} in ${formData.destination}`,
          activities: [
            {
              time: "9:00 AM",
              title: `Morning exploration of ${formData.destination}`,
              description: "Start your day with a visit to the city's most iconic landmarks and attractions.",
              type: "sightseeing",
              estimatedCost: "$25",
              duration: "3 hours"
            },
            {
              time: "1:00 PM",
              title: "Local cuisine experience",
              description: "Enjoy authentic local dishes at a highly-rated restaurant recommended by locals.",
              type: "dining",
              estimatedCost: "$40",
              duration: "2 hours"
            },
            {
              time: "4:00 PM",
              title: "Cultural immersion",
              description: "Visit museums, galleries, or cultural sites that showcase the local heritage.",
              type: "culture",
              estimatedCost: "$20",
              duration: "2 hours"
            },
            {
              time: "7:00 PM",
              title: "Evening entertainment",
              description: "Experience the nightlife or attend a local performance.",
              type: "entertainment",
              estimatedCost: "$35",
              duration: "3 hours"
            }
          ]
        })),
        hotels: [
          {
            name: `Luxury Stay ${formData.destination}`,
            rating: 4.5,
            pricePerNight: "$150",
            amenities: ["WiFi", "Pool", "Spa", "Restaurant"],
            location: "City Center",
            description: "A perfect blend of comfort and luxury in the heart of the city."
          },
          {
            name: `Boutique Hotel ${formData.destination}`,
            rating: 4.2,
            pricePerNight: "$120",
            amenities: ["WiFi", "Breakfast", "Gym", "Bar"],
            location: "Historic District",
            description: "Charming boutique hotel with unique character and excellent service."
          }
        ]
      };

      toast.success("Your personalized trip has been generated!");
      onTripGenerated(mockTrip);
    } catch (error) {
      toast.error("Failed to generate trip. Please try again.");
    } finally {
      setIsGenerating(false);
    }
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
              Plan Your Dream Trip
            </CardTitle>
            <CardDescription className="text-blue-100 text-lg">
              Tell us about your travel preferences and let our AI create the perfect itinerary
            </CardDescription>
          </CardHeader>
          
          <CardContent className="p-8 space-y-6">
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
                  Number of Days *
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
                    <SelectItem value="budget">Budget ($0 - $500)</SelectItem>
                    <SelectItem value="moderate">Moderate ($500 - $1500)</SelectItem>
                    <SelectItem value="luxury">Luxury ($1500 - $5000)</SelectItem>
                    <SelectItem value="ultra-luxury">Ultra Luxury ($5000+)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="travelers" className="text-sm font-semibold text-gray-700 flex items-center">
                  <Users className="mr-2 h-4 w-4 text-blue-600" />
                  Number of Travelers *
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
                placeholder="Tell us about your interests: adventure, culture, food, nightlife, nature, museums, shopping, etc."
                value={formData.interests}
                onChange={(e) => handleInputChange("interests", e.target.value)}
                className="border-gray-300 focus:border-blue-500 min-h-[120px]"
              />
            </div>

            <Button 
              onClick={generateTrip}
              disabled={isGenerating}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                  Generating Your Perfect Trip...
                </>
              ) : (
                <>
                  <Sparkles className="mr-3 h-5 w-5" />
                  Generate My Trip
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
