
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, MapPin, Calendar, Users, DollarSign, Clock, Star, Wifi, Car, Utensils, Dumbbell, Download, Share2, Heart, Thermometer, Backpack, Navigation, Info } from "lucide-react";

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

  const handleSaveTrip = () => {
    const tripJson = JSON.stringify(tripData, null, 2);
    const blob = new Blob([tripJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${tripData.destination}-trip-plan.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleShareTrip = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `My Trip to ${tripData.destination}`,
          text: `Check out my ${tripData.duration} trip to ${tripData.destination}!`,
          url: window.location.href
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Trip link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <Button 
            onClick={onBack}
            variant="ghost" 
            className="hover:bg-white/80"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Plan Another Trip
          </Button>
          
          <div className="flex space-x-3">
            <Button onClick={handleShareTrip} variant="outline" size="sm">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
            <Button onClick={handleSaveTrip} variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
          </div>
        </div>

        {/* Trip Overview */}
        <Card className="mb-8 shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
            <CardTitle className="text-3xl font-bold text-center flex items-center justify-center">
              <MapPin className="mr-3 h-8 w-8" />
              Your AI-Crafted Trip to {tripData.destination}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
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
            
            {tripData.totalEstimatedCost && (
              <div className="bg-gradient-to-r from-green-100 to-emerald-100 p-4 rounded-lg">
                <p className="text-sm text-green-700">Total Estimated Cost</p>
                <p className="text-2xl font-bold text-green-800">{tripData.totalEstimatedCost}</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Tabs defaultValue="itinerary" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 bg-white/80 backdrop-blur-sm">
            <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
            <TabsTrigger value="hotels">Hotels</TabsTrigger>
            <TabsTrigger value="restaurants">Dining</TabsTrigger>
            <TabsTrigger value="transport">Transport</TabsTrigger>
            <TabsTrigger value="tips">Local Tips</TabsTrigger>
            <TabsTrigger value="packing">Packing</TabsTrigger>
          </TabsList>

          <TabsContent value="itinerary">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Daily Itinerary</h2>
              {tripData.itinerary.map((day: any, dayIndex: number) => (
                <Card key={dayIndex} className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                  <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                    <CardTitle className="text-xl flex items-center justify-between">
                      <span>{day.title}</span>
                      <Badge variant="secondary" className="bg-white/20 text-white">
                        {day.theme}
                      </Badge>
                    </CardTitle>
                    {day.walkingDistance && (
                      <p className="text-blue-100 text-sm">
                        Walking distance: {day.walkingDistance} | Est. cost: {day.estimatedCost}
                      </p>
                    )}
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
                                {activity.difficulty && (
                                  <Badge variant="secondary">
                                    {activity.difficulty}
                                  </Badge>
                                )}
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
                                {activity.bookingRequired && (
                                  <Badge variant="outline" className="text-orange-600">
                                    Booking Required
                                  </Badge>
                                )}
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
          </TabsContent>

          <TabsContent value="hotels">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Recommended Hotels</h2>
              <div className="grid lg:grid-cols-2 gap-6">
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
                            <span className="text-sm text-gray-500">({hotel.reviews} reviews)</span>
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
          </TabsContent>

          <TabsContent value="restaurants">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Dining Recommendations</h2>
              <div className="grid lg:grid-cols-2 gap-6">
                {tripData.restaurants?.map((restaurant: any, index: number) => (
                  <Card key={index} className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{restaurant.name}</CardTitle>
                          <p className="text-sm text-gray-600">{restaurant.location}</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            <span className="font-semibold">{restaurant.rating}</span>
                          </div>
                          <p className="text-sm font-medium text-green-600">{restaurant.priceRange}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-2">Cuisine: {restaurant.cuisine}</p>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Specialties:</p>
                        <div className="flex flex-wrap gap-1">
                          {restaurant.specialties.map((specialty: string, specIndex: number) => (
                            <Badge key={specIndex} variant="outline" className="text-xs">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="transport">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Transportation Options</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {tripData.transportation?.map((transport: any, index: number) => (
                  <Card key={index} className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <Navigation className="h-6 w-6 text-blue-600" />
                        <div>
                          <h3 className="font-semibold">{transport.type}</h3>
                          <p className="text-sm text-gray-600">{transport.description}</p>
                          <p className="text-sm font-medium text-green-600">{transport.cost}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="tips">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Local Tips & Weather</h2>
              
              {tripData.weatherInfo && (
                <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Thermometer className="mr-2 h-5 w-5" />
                      Weather Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Temperature</p>
                        <p className="font-semibold">{tripData.weatherInfo.temperature}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Conditions</p>
                        <p className="font-semibold">{tripData.weatherInfo.conditions}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-sm text-gray-600">Recommendations</p>
                        <p className="text-sm">{tripData.weatherInfo.recommendation}</p>
                        <p className="text-sm text-orange-600">{tripData.weatherInfo.uvIndex}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Info className="mr-2 h-5 w-5" />
                    Local Tips
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {tripData.localTips?.map((tip: string, index: number) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="text-blue-600 mt-1">•</span>
                        <span className="text-sm">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="packing">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Packing List</h2>
              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Backpack className="mr-2 h-5 w-5" />
                    Essential Items
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-2">
                    {tripData.packingList?.map((item: string, index: number) => (
                      <div key={index} className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Save Trip Button */}
        <div className="mt-12 text-center">
          <Button 
            onClick={handleSaveTrip}
            size="lg"
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 mr-4"
          >
            <Heart className="mr-2 h-5 w-5" />
            Save This Trip
          </Button>
          
          <Button 
            onClick={handleShareTrip}
            size="lg"
            variant="outline"
            className="px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Share2 className="mr-2 h-5 w-5" />
            Share Trip
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TripItinerary;
