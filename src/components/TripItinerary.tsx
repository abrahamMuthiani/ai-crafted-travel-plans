
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Calendar, Users, DollarSign, Clock, Star, Wifi, Car, Utensils, Dumbbell } from "lucide-react";

interface TripItineraryProps {
  tripData: any;
  onBack: () => void;
}

const TripItinerary = ({ tripData, onBack }: TripItineraryProps) => {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case "sightseeing": return <MapPin className="h-4 w-4" />;
      case "dining": return <Utensils className="h-4 w-4" />;
      case "culture": return <Star className="h-4 w-4" />;
      case "entertainment": return <Clock className="h-4 w-4" />;
      default: return <MapPin className="h-4 w-4" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case "sightseeing": return "bg-blue-100 text-blue-800";
      case "dining": return "bg-green-100 text-green-800";
      case "culture": return "bg-purple-100 text-purple-800";
      case "entertainment": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button 
          onClick={onBack}
          variant="ghost" 
          className="mb-6 hover:bg-white/80"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Plan Another Trip
        </Button>

        {/* Trip Overview */}
        <Card className="mb-8 shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
            <CardTitle className="text-3xl font-bold text-center">
              Your Personalized Trip to {tripData.destination}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid md:grid-cols-4 gap-4">
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600">Duration</p>
                  <p className="font-semibold">{tripData.duration}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600">Travelers</p>
                  <p className="font-semibold">{tripData.travelers}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <DollarSign className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600">Budget</p>
                  <p className="font-semibold">{tripData.budget}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600">Dates</p>
                  <p className="font-semibold">{tripData.dates}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Itinerary */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Daily Itinerary</h2>
            <div className="space-y-6">
              {tripData.itinerary.map((day: any, dayIndex: number) => (
                <Card key={dayIndex} className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                  <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                    <CardTitle className="text-xl">{day.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {day.activities.map((activity: any, activityIndex: number) => (
                        <div key={activityIndex} className="border-l-4 border-blue-200 pl-4 py-2">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-2">
                                <Badge variant="outline" className="font-semibold">
                                  {activity.time}
                                </Badge>
                                <Badge className={getActivityColor(activity.type)}>
                                  {getActivityIcon(activity.type)}
                                  <span className="ml-1 capitalize">{activity.type}</span>
                                </Badge>
                              </div>
                              <h4 className="font-semibold text-lg text-gray-900 mb-1">
                                {activity.title}
                              </h4>
                              <p className="text-gray-600 mb-2">{activity.description}</p>
                              <div className="flex items-center space-x-4 text-sm text-gray-500">
                                <span className="flex items-center">
                                  <Clock className="h-4 w-4 mr-1" />
                                  {activity.duration}
                                </span>
                                <span className="flex items-center">
                                  <DollarSign className="h-4 w-4 mr-1" />
                                  {activity.estimatedCost}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Hotels */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Recommended Hotels</h2>
            <div className="space-y-6">
              {tripData.hotels.map((hotel: any, hotelIndex: number) => (
                <Card key={hotelIndex} className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{hotel.name}</CardTitle>
                        <p className="text-sm text-gray-600">{hotel.location}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="font-semibold">{hotel.rating}</span>
                        </div>
                        <p className="text-lg font-bold text-blue-600">{hotel.pricePerNight}</p>
                        <p className="text-xs text-gray-500">per night</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{hotel.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {hotel.amenities.map((amenity: string, amenityIndex: number) => (
                        <Badge key={amenityIndex} variant="secondary" className="text-xs">
                          {amenity === "WiFi" && <Wifi className="h-3 w-3 mr-1" />}
                          {amenity === "Gym" && <Dumbbell className="h-3 w-3 mr-1" />}
                          {amenity === "Restaurant" && <Utensils className="h-3 w-3 mr-1" />}
                          {amenity}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Save Trip Button */}
        <div className="mt-12 text-center">
          <Button 
            size="lg"
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Save This Trip
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TripItinerary;
