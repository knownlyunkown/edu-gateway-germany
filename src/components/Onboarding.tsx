import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Upload, ArrowRight, CheckCircle } from "lucide-react";

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signup");

  const handleStepComplete = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-accent/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
              <GraduationCap className="w-7 h-7 text-primary-foreground" />
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-primary">UNI 360°</h1>
            <p className="text-muted-foreground">Your Gateway to German Universities</p>
          </div>

          {/* Step Indicator */}
          <div className="flex items-center justify-center space-x-2">
            <div className={`w-3 h-3 rounded-full transition-colors ${
              currentStep >= 1 ? 'bg-success' : 'bg-border'
            }`} />
            <div className={`w-8 h-0.5 transition-colors ${
              currentStep >= 2 ? 'bg-success' : 'bg-border'
            }`} />
            <div className={`w-3 h-3 rounded-full transition-colors ${
              currentStep >= 2 ? 'bg-success' : 'bg-border'
            }`} />
          </div>
        </div>

        {/* Step 1: Authentication */}
        {currentStep === 1 && (
          <Card className="shadow-lg border-0">
            <CardHeader className="text-center">
              <CardTitle className="text-xl">Join Thousands of Students</CardTitle>
              <p className="text-sm text-muted-foreground">Start your journey to German universities</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <Tabs value={authMode} onValueChange={(value) => setAuthMode(value as "signin" | "signup")}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                  <TabsTrigger value="signin">Sign In</TabsTrigger>
                </TabsList>

                <TabsContent value="signup" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input id="fullName" placeholder="Enter your full name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="Enter your email" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" placeholder="+91 9876543210" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" placeholder="Create a strong password" />
                  </div>
                </TabsContent>

                <TabsContent value="signin" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="loginEmail">Email</Label>
                    <Input id="loginEmail" type="email" placeholder="Enter your email" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="loginPassword">Password</Label>
                    <Input id="loginPassword" type="password" placeholder="Enter your password" />
                  </div>
                </TabsContent>
              </Tabs>

              <Button 
                variant="journey" 
                className="w-full" 
                size="lg"
                onClick={handleStepComplete}
              >
                {authMode === "signup" ? "Start My Journey" : "Sign In"}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                By continuing, you agree to our Terms of Service and Privacy Policy
              </p>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Student Details */}
        {currentStep === 2 && (
          <Card className="shadow-lg border-0">
            <CardHeader className="text-center">
              <CardTitle className="text-xl flex items-center justify-center space-x-2">
                <CheckCircle className="w-5 h-5 text-success" />
                <span>Complete Your Profile</span>
              </CardTitle>
              <p className="text-sm text-muted-foreground">Help us personalize your experience</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="educationLevel">Education Level</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your current education level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="12th">Class 12th (Pursuing/Completed)</SelectItem>
                      <SelectItem value="bachelor">Bachelor's Degree (Pursuing/Completed)</SelectItem>
                      <SelectItem value="master">Master's Degree (Pursuing/Completed)</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="coursePreference">Course Preference</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="What would you like to study?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="engineering">Engineering</SelectItem>
                      <SelectItem value="computer-science">Computer Science</SelectItem>
                      <SelectItem value="business">Business & Management</SelectItem>
                      <SelectItem value="medicine">Medicine</SelectItem>
                      <SelectItem value="arts">Arts & Humanities</SelectItem>
                      <SelectItem value="sciences">Natural Sciences</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Target Country</Label>
                  <div className="flex items-center space-x-2 p-3 bg-secondary/50 rounded-lg border">
                    <div className="text-lg">🇩🇪</div>
                    <div className="flex-1">
                      <p className="font-medium">Germany</p>
                      <p className="text-xs text-muted-foreground">Pre-selected based on our expertise</p>
                    </div>
                    <Badge variant="secondary">Default</Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Upload Documents</Label>
                  <div className="space-y-3">
                    <div className="border-2 border-dashed border-border hover:border-accent transition-colors rounded-lg p-4 text-center cursor-pointer">
                      <Upload className="w-6 h-6 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm font-medium">Upload Your Photo</p>
                      <p className="text-xs text-muted-foreground">JPG, PNG up to 2MB</p>
                    </div>
                    
                    <div className="border-2 border-dashed border-border hover:border-accent transition-colors rounded-lg p-4 text-center cursor-pointer">
                      <Upload className="w-6 h-6 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm font-medium">Upload KYC Document</p>
                      <p className="text-xs text-muted-foreground">Aadhar Card or Passport</p>
                    </div>
                  </div>
                </div>
              </div>

              <Button variant="journey" className="w-full" size="lg">
                Proceed to Dashboard
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Footer */}
        <div className="text-center text-xs text-muted-foreground">
          <p>Join 10,000+ students who chose UNI 360° for their German education journey</p>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;