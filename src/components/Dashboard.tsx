import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Clock, Calendar, AlertCircle, ArrowRight, Upload, Bot } from "lucide-react";
import ProgressTracker from "./ProgressTracker";

const Dashboard = () => {
  const studentName = "Rahul"; // This would come from user context

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="text-center space-y-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-primary">
            Hi {studentName}, Ready to Fly? ✈️
          </h1>
          <p className="text-lg text-muted-foreground">
            Your journey to study in Germany starts here
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Progress Tracker */}
        <div className="lg:col-span-2">
          <ProgressTracker />
        </div>

        {/* Right Column - Quick Actions & Notifications */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center space-x-2">
                <ArrowRight className="w-5 h-5 text-accent" />
                <span>Quick Actions</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="accent" className="w-full justify-start" size="sm">
                <Upload className="w-4 h-4 mr-2" />
                Upload Documents
              </Button>
              <Button variant="outline" className="w-full justify-start" size="sm">
                <FileText className="w-4 h-4 mr-2" />
                Download APS Form
              </Button>
              <Button variant="outline" className="w-full justify-start" size="sm">
                <Bot className="w-4 h-4 mr-2" />
                Generate SOP
              </Button>
            </CardContent>
          </Card>

          {/* Notifications Panel */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center space-x-2">
                <AlertCircle className="w-5 h-5 text-accent" />
                <span>Recent Updates</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start space-x-3 p-3 border border-success/20 bg-success/5 rounded-lg">
                  <div className="w-2 h-2 bg-success rounded-full mt-2 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-success">Documents Verified</p>
                    <p className="text-xs text-muted-foreground">Your academic transcripts have been approved</p>
                    <p className="text-xs text-muted-foreground mt-1 flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      2 hours ago
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3 border border-accent/20 bg-accent/5 rounded-lg">
                  <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-accent">APS Update</p>
                    <p className="text-xs text-muted-foreground">Your APS application is under review</p>
                    <p className="text-xs text-muted-foreground mt-1 flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      1 day ago
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3 border border-border bg-muted/50 rounded-lg">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full mt-2 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Visa Consultation</p>
                    <p className="text-xs text-muted-foreground">Schedule a call with our visa expert</p>
                    <p className="text-xs text-muted-foreground mt-1 flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      3 days ago
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Deadlines */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-destructive" />
                <span>Important Dates</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center p-3 border border-destructive/20 bg-destructive/5 rounded-lg">
                <div>
                  <p className="text-sm font-medium">APS Interview</p>
                  <p className="text-xs text-muted-foreground">Pending scheduling</p>
                </div>
                <Badge variant="outline" className="text-destructive border-destructive">
                  Urgent
                </Badge>
              </div>
              
              <div className="flex justify-between items-center p-3 border border-accent/20 bg-accent/5 rounded-lg">
                <div>
                  <p className="text-sm font-medium">University Applications</p>
                  <p className="text-xs text-muted-foreground">Opens in 2 months</p>
                </div>
                <Badge variant="outline" className="text-accent border-accent">
                  Soon
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Call to Action */}
      <Card className="bg-gradient-primary text-primary-foreground">
        <CardContent className="p-6 text-center">
          <h3 className="text-xl font-bold mb-2">Ready for the Next Step?</h3>
          <p className="mb-4 opacity-90">
            Complete your APS application to unlock university applications
          </p>
          <Button variant="secondary" size="lg" className="bg-white text-primary hover:bg-white/90">
            Continue APS Process
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;