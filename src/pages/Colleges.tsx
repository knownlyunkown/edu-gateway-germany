import { useState } from "react";
import { MapPin, Clock, Star, Download, Heart, Plus, Filter, Search, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Layout from "@/components/Layout";

type ApplicationStatus = "not_applied" | "in_review" | "offer_received" | "rejected";

interface College {
  id: string;
  name: string;
  location: string;
  course: string;
  language: string;
  testRequirement: string;
  deadline: string;
  ranking: number;
  logo: string;
  isFavorited: boolean;
  applicationStatus: ApplicationStatus;
  tuitionFee: string;
  description: string;
}

const Colleges = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCourse, setFilterCourse] = useState("all");
  const [filterLocation, setFilterLocation] = useState("all");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const [colleges, setColleges] = useState<College[]>([
    {
      id: "rwth",
      name: "RWTH Aachen University",
      location: "Aachen, Germany",
      course: "M.Sc. in Mechanical Engineering",
      language: "German + English",
      testRequirement: "IELTS 6.5",
      deadline: "Jan 15, 2025",
      ranking: 1,
      logo: "🏛️",
      isFavorited: true,
      applicationStatus: "in_review",
      tuitionFee: "€500/semester",
      description: "Leading technical university with excellent research facilities."
    },
    {
      id: "tum",
      name: "Technical University of Munich (TUM)",
      location: "Munich, Germany",
      course: "M.Sc. in Data Engineering and Analytics",
      language: "English",
      testRequirement: "IELTS 6.5 / GRE Optional",
      deadline: "Dec 1, 2024",
      ranking: 2,
      logo: "🎓",
      isFavorited: true,
      applicationStatus: "offer_received",
      tuitionFee: "€3,000/semester",
      description: "Premier university for technology and innovation."
    },
    {
      id: "stuttgart",
      name: "University of Stuttgart",
      location: "Stuttgart, Germany",
      course: "MSc in Integrated Urbanism",
      language: "English",
      testRequirement: "TOEFL/IELTS",
      deadline: "Feb 28, 2025",
      ranking: 3,
      logo: "🏫",
      isFavorited: false,
      applicationStatus: "not_applied",
      tuitionFee: "€1,500/semester",
      description: "Excellence in engineering and urban planning."
    },
    {
      id: "humboldt",
      name: "Humboldt University of Berlin",
      location: "Berlin, Germany",
      course: "M.A. Global Studies",
      language: "English",
      testRequirement: "IELTS 7",
      deadline: "Jan 31, 2025",
      ranking: 4,
      logo: "📚",
      isFavorited: false,
      applicationStatus: "not_applied",
      tuitionFee: "€300/semester",
      description: "Historic university with strong humanities programs."
    },
    {
      id: "freiburg",
      name: "University of Freiburg",
      location: "Freiburg, Germany",
      course: "MSc in Environmental Governance",
      language: "English",
      testRequirement: "TOEFL 95",
      deadline: "March 15, 2025",
      ranking: 5,
      logo: "🌿",
      isFavorited: true,
      applicationStatus: "rejected",
      tuitionFee: "€1,200/semester",
      description: "Leading research in environmental sciences."
    }
  ]);

  const getStatusColor = (status: ApplicationStatus) => {
    switch (status) {
      case "offer_received": return "success";
      case "in_review": return "secondary";
      case "rejected": return "destructive";
      default: return "muted";
    }
  };

  const getStatusText = (status: ApplicationStatus) => {
    switch (status) {
      case "offer_received": return "Offer Received";
      case "in_review": return "In Review";
      case "rejected": return "Rejected";
      default: return "Not Applied";
    }
  };

  const toggleFavorite = (collegeId: string) => {
    setColleges(colleges.map(college => 
      college.id === collegeId 
        ? { ...college, isFavorited: !college.isFavorited }
        : college
    ));
  };

  const filteredColleges = colleges.filter(college => {
    const matchesSearch = college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         college.course.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse = filterCourse === "all" || college.course.toLowerCase().includes(filterCourse.toLowerCase());
    const matchesLocation = filterLocation === "all" || college.location.toLowerCase().includes(filterLocation.toLowerCase());
    const matchesFavorites = !showFavoritesOnly || college.isFavorited;
    
    return matchesSearch && matchesCourse && matchesLocation && matchesFavorites;
  });

  const favoriteCount = colleges.filter(c => c.isFavorited).length;
  const appliedCount = colleges.filter(c => c.applicationStatus !== "not_applied").length;

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col space-y-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">College Explorer</h1>
            <p className="text-muted-foreground">Discover and apply to German universities</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Heart className="w-5 h-5 text-destructive" />
                  <div>
                    <p className="text-2xl font-bold">{favoriteCount}</p>
                    <p className="text-sm text-muted-foreground">Favorites</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-secondary" />
                  <div>
                    <p className="text-2xl font-bold">{appliedCount}</p>
                    <p className="text-sm text-muted-foreground">Applications</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-accent" />
                  <div>
                    <p className="text-2xl font-bold">1</p>
                    <p className="text-sm text-muted-foreground">Offers</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Find Your Perfect University</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search universities or courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10"
                />
              </div>
              <Select value={filterCourse} onValueChange={setFilterCourse}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Course" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Courses</SelectItem>
                  <SelectItem value="engineering">Engineering</SelectItem>
                  <SelectItem value="data">Data Science</SelectItem>
                  <SelectItem value="environmental">Environmental</SelectItem>
                  <SelectItem value="global">Global Studies</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterLocation} onValueChange={setFilterLocation}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Cities</SelectItem>
                  <SelectItem value="munich">Munich</SelectItem>
                  <SelectItem value="berlin">Berlin</SelectItem>
                  <SelectItem value="aachen">Aachen</SelectItem>
                  <SelectItem value="stuttgart">Stuttgart</SelectItem>
                  <SelectItem value="freiburg">Freiburg</SelectItem>
                </SelectContent>
              </Select>
              <Button 
                variant={showFavoritesOnly ? "default" : "outline"}
                onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
              >
                <Heart className="w-4 h-4 mr-2" />
                Favorites
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* College Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredColleges.map((college) => (
            <Card key={college.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="text-3xl">{college.logo}</div>
                    <div className="flex-1">
                      <CardTitle className="text-lg leading-tight">{college.name}</CardTitle>
                      <div className="flex items-center space-x-1 mt-1">
                        <MapPin className="w-3 h-3 text-muted-foreground" />
                        <CardDescription className="text-xs">{college.location}</CardDescription>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleFavorite(college.id)}
                    className="p-1"
                  >
                    <Heart 
                      className={`w-4 h-4 ${college.isFavorited ? 'fill-destructive text-destructive' : 'text-muted-foreground'}`} 
                    />
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-sm">{college.course}</h4>
                  <p className="text-xs text-muted-foreground mt-1">{college.description}</p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Language:</span>
                    <span className="font-medium">{college.language}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Test Required:</span>
                    <span className="font-medium">{college.testRequirement}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Deadline:</span>
                    <span className="font-medium text-destructive">{college.deadline}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Tuition:</span>
                    <span className="font-medium">{college.tuitionFee}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Badge variant={getStatusColor(college.applicationStatus) as any} className="text-xs">
                    {getStatusText(college.applicationStatus)}
                  </Badge>
                  <div className="flex items-center space-x-1">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star 
                        key={i} 
                        className={`w-3 h-3 ${i < college.ranking ? 'fill-accent text-accent' : 'text-muted-foreground'}`}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Download className="w-4 h-4 mr-2" />
                    Brochure
                  </Button>
                  {college.applicationStatus === "not_applied" ? (
                    <Button variant="accent" size="sm" className="flex-1">
                      <Plus className="w-4 h-4 mr-2" />
                      Apply
                    </Button>
                  ) : (
                    <Button variant="outline" size="sm" className="flex-1">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredColleges.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">No colleges found matching your criteria.</p>
              <Button variant="outline" className="mt-4" onClick={() => {
                setSearchTerm("");
                setFilterCourse("all");
                setFilterLocation("all");
                setShowFavoritesOnly(false);
              }}>
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default Colleges;