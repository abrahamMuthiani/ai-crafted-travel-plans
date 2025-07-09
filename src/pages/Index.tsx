
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Calendar, Users, Sparkles, Plane, Hotel, Camera } from "lucide-react";
import { useState } from "react";
import TripPlannerForm from "@/components/TripPlannerForm";
import TripItinerary from "@/components/TripItinerary";

const Index = () => {
  const [showPlanner, setShowPlanner] = useState(false);
  const [generatedTrip, setGeneratedTrip] = useState(null);

  const handleTripGenerated = (tripData: any) => {
    setGeneratedTrip(tripData);
  };

  if (generatedTrip) {
    return <TripItinerary tripData={generatedTrip} onBack={() => setGeneratedTrip(null)} />;
  }

  if (showPlanner) {
    return <TripPlannerForm onTripGenerated={handleTripGenerated} onBack={() => setShowPlanner(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <Plane className="h-16 w-16 text-blue-600 animate-pulse" />
                <Sparkles className="h-8 w-8 text-purple-500 absolute -top-2 -right-2" />
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
              AI Trip Planner
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Let artificial intelligence craft your perfect journey. From personalized itineraries to hotel recommendations, 
              we'll create an unforgettable travel experience tailored just for you.
            </p>
            <Button 
              onClick={() => setShowPlanner(true)}
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Start Planning Your Trip
              <Sparkles className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How Our AI Creates Your Perfect Trip
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our advanced AI technology combines your preferences with real-time data to craft personalized travel experiences
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <MapPin className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-xl font-bold text-gray-900">Smart Destinations</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-600 text-center">
                AI analyzes your interests and travel style to suggest perfect destinations, attractions, and hidden gems
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Calendar className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-xl font-bold text-gray-900">Optimized Itineraries</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-600 text-center">
                Get day-by-day plans with optimal timing, travel routes, and activity suggestions based on your schedule
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Hotel className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-xl font-bold text-gray-900">Perfect Accommodations</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-600 text-center">
                AI-curated hotel recommendations that match your budget, preferences, and location requirements
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="text-white">
              <div className="text-4xl font-bold mb-2">10,000+</div>
              <div className="text-blue-100">Trips Planned</div>
            </div>
            <div className="text-white">
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-blue-100">Destinations</div>
            </div>
            <div className="text-white">
              <div className="text-4xl font-bold mb-2">98%</div>
              <div className="text-blue-100">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Ready to Explore the World?
        </h2>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Join thousands of travelers who trust our AI to create their perfect adventures
        </p>
        <Button 
          onClick={() => setShowPlanner(true)}
          size="lg" 
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          Create Your Journey
          <Camera className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default Index;
