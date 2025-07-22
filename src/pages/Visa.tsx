import { useState } from "react";
import { Check, Clock, AlertCircle, Upload, Download, ExternalLink, Calendar, CreditCard, Shield, Plane } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Layout from "@/components/Layout";

type VisaStepStatus = "completed" | "current" | "pending" | "blocked";
type DocumentStatus = "pending" | "uploaded" | "verified" | "rejected";

interface VisaStep {
  id: string;
  title: string;
  description: string;
  status: VisaStepStatus;
  icon: any;
  estimatedTime: string;
}

interface VisaDocument {
  id: string;
  name: string;
  description: string;
  status: DocumentStatus;
  required: boolean;
  uploadedDate?: string;
  rejectionReason?: string;
}

interface BankPartner {
  id: string;
  name: string;
  logo: string;
  fee: string;
  processingTime: string;
  features: string[];
}

const Visa = () => {
  const [visaSteps] = useState<VisaStep[]>([
    {
      id: "aps",
      title: "APS Certificate",
      description: "Academic credential verification completed",
      status: "completed",
      icon: Check,
      estimatedTime: "6-8 weeks"
    },
    {
      id: "offer",
      title: "Offer Letter",
      description: "University admission confirmation received",
      status: "completed",
      icon: Check,
      estimatedTime: "2-4 weeks"
    },
    {
      id: "block_account",
      title: "Block Account",
      description: "Financial proof setup in progress",
      status: "current",
      icon: CreditCard,
      estimatedTime: "1-2 weeks"
    },
    {
      id: "visa_docs",
      title: "Visa Documents",
      description: "Prepare and upload required documents",
      status: "pending",
      icon: Upload,
      estimatedTime: "1 week"
    },
    {
      id: "appointment",
      title: "Visa Appointment",
      description: "Schedule consulate visit",
      status: "pending",
      icon: Calendar,
      estimatedTime: "2-3 weeks"
    },
    {
      id: "approval",
      title: "Visa Approval",
      description: "Final decision and passport return",
      status: "pending",
      icon: Plane,
      estimatedTime: "4-6 weeks"
    }
  ]);

  const [visaDocuments] = useState<VisaDocument[]>([
    {
      id: "visa_form",
      name: "Visa Application Form",
      description: "Completed and signed application form",
      status: "verified",
      required: true,
      uploadedDate: "2024-01-20"
    },
    {
      id: "passport",
      name: "Passport",
      description: "Valid passport with at least 6 months validity",
      status: "verified",
      required: true,
      uploadedDate: "2024-01-18"
    },
    {
      id: "aps_cert",
      name: "APS Certificate",
      description: "Academic credential verification certificate",
      status: "verified",
      required: true,
      uploadedDate: "2024-01-15"
    },
    {
      id: "block_account_proof",
      name: "Block Account Proof",
      description: "Financial guarantee documentation",
      status: "pending",
      required: true
    },
    {
      id: "travel_insurance",
      name: "Travel Insurance",
      description: "Health insurance coverage for Germany",
      status: "uploaded",
      required: true,
      uploadedDate: "2024-01-22"
    },
    {
      id: "admission_letter",
      name: "Admission Letter",
      description: "Official university acceptance letter",
      status: "verified",
      required: true,
      uploadedDate: "2024-01-16"
    }
  ]);

  const [bankPartners] = useState<BankPartner[]>([
    {
      id: "deutsche",
      name: "Deutsche Bank",
      logo: "🏦",
      fee: "€150",
      processingTime: "5-7 days",
      features: ["Online application", "24/7 support", "English service"]
    },
    {
      id: "coracle",
      name: "Coracle",
      logo: "💳",
      fee: "€100",
      processingTime: "2-3 days",
      features: ["Digital-first", "Instant approval", "Student-friendly"]
    },
    {
      id: "expatrio",
      name: "Expatrio",
      logo: "🎓",
      fee: "€149",
      processingTime: "3-5 days",
      features: ["Student specialist", "Insurance included", "Free transfers"]
    }
  ]);

  const getStepProgress = () => {
    const completedSteps = visaSteps.filter(step => step.status === "completed").length;
    return (completedSteps / visaSteps.length) * 100;
  };

  const getDocumentStatusColor = (status: DocumentStatus) => {
    switch (status) {
      case "verified": return "default";
      case "uploaded": return "secondary";
      case "rejected": return "destructive";
      default: return "outline";
    }
  };

  const getDocumentStatusIcon = (status: DocumentStatus) => {
    switch (status) {
      case "verified": return <Check className="w-4 h-4" />;
      case "uploaded": return <Clock className="w-4 h-4" />;
      case "rejected": return <AlertCircle className="w-4 h-4" />;
      default: return <Upload className="w-4 h-4" />;
    }
  };

  const completedDocs = visaDocuments.filter(doc => doc.status === "verified").length;
  const totalDocs = visaDocuments.length;

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col space-y-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Visa Assistant</h1>
            <p className="text-muted-foreground">Track your German student visa application</p>
          </div>

          {/* Progress Overview */}
          <Card className="bg-gradient-primary">
            <CardContent className="p-6">
              <div className="text-primary-foreground space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Visa Progress</h3>
                  <Badge variant="secondary" className="bg-white/20 text-white">
                    {Math.round(getStepProgress())}% Complete
                  </Badge>
                </div>
                <Progress value={getStepProgress()} className="h-2 bg-white/20" />
                <p className="text-sm opacity-90">
                  You're making great progress! Keep uploading documents to move forward.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Visa Timeline */}
        <Card>
          <CardHeader>
            <CardTitle>Visa Process Timeline</CardTitle>
            <CardDescription>Track each step of your visa application</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {visaSteps.map((step, index) => {
                const IconComponent = step.icon;
                const isLast = index === visaSteps.length - 1;
                
                return (
                  <div key={step.id} className="flex items-start space-x-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        step.status === "completed" ? "bg-success text-success-foreground" :
                        step.status === "current" ? "bg-accent text-accent-foreground" :
                        "bg-muted text-muted-foreground"
                      }`}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                      {!isLast && (
                        <div className={`w-0.5 h-8 mt-2 ${
                          step.status === "completed" ? "bg-success" : "bg-muted"
                        }`} />
                      )}
                    </div>
                    <div className="flex-1 pb-8">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-semibold">{step.title}</h4>
                         <Badge variant={
                           step.status === "completed" ? "default" :
                           step.status === "current" ? "secondary" :
                           "outline"
                         } className="text-xs">
                          {step.status === "completed" ? "Done" :
                           step.status === "current" ? "In Progress" :
                           "Pending"}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{step.description}</p>
                      <p className="text-xs text-muted-foreground mt-2">
                        Estimated time: {step.estimatedTime}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Block Account Partners */}
        <Card>
          <CardHeader>
            <CardTitle>Block Account Partners</CardTitle>
            <CardDescription>Choose a partner to open your financial guarantee account</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {bankPartners.map((partner) => (
                <Card key={partner.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="text-center space-y-4">
                      <div className="text-4xl">{partner.logo}</div>
                      <div>
                        <h4 className="font-semibold">{partner.name}</h4>
                        <p className="text-sm text-muted-foreground">Processing: {partner.processingTime}</p>
                        <p className="text-lg font-bold text-accent mt-2">{partner.fee}</p>
                      </div>
                      <div className="space-y-1">
                        {partner.features.map((feature, index) => (
                          <p key={index} className="text-xs text-muted-foreground">✓ {feature}</p>
                        ))}
                      </div>
                      <Button variant="accent" size="sm" className="w-full">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Open Account
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Document Checklist */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Document Checklist</CardTitle>
                <CardDescription>Upload and verify your visa documents</CardDescription>
              </div>
              <Badge variant="outline">
                {completedDocs}/{totalDocs} Complete
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {visaDocuments.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      doc.status === "verified" ? "bg-success text-success-foreground" :
                      doc.status === "uploaded" ? "bg-secondary text-secondary-foreground" :
                      doc.status === "rejected" ? "bg-destructive text-destructive-foreground" :
                      "bg-muted text-muted-foreground"
                    }`}>
                      {getDocumentStatusIcon(doc.status)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium">{doc.name}</h4>
                        {doc.required && (
                          <Badge variant="outline" className="text-xs">Required</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{doc.description}</p>
                      {doc.uploadedDate && (
                        <p className="text-xs text-muted-foreground mt-1">
                          Uploaded: {doc.uploadedDate}
                        </p>
                      )}
                      {doc.rejectionReason && (
                        <p className="text-xs text-destructive mt-1">{doc.rejectionReason}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {doc.status === "pending" && (
                      <Button variant="outline" size="sm">
                        <Upload className="w-4 h-4 mr-2" />
                        Upload
                      </Button>
                    )}
                    {doc.status === "rejected" && (
                      <Button variant="outline" size="sm">
                        <Upload className="w-4 h-4 mr-2" />
                        Re-upload
                      </Button>
                    )}
                    {doc.status !== "pending" && (
                      <Button variant="ghost" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="border-accent bg-accent/5">
            <CardContent className="p-6 text-center space-y-4">
              <Calendar className="w-12 h-12 text-accent mx-auto" />
              <div>
                <h3 className="font-semibold">Schedule Appointment</h3>
                <p className="text-sm text-muted-foreground">Book your visa interview slot</p>
              </div>
              <Button variant="accent" disabled>
                Complete Documents First
              </Button>
            </CardContent>
          </Card>
          
          <Card className="border-secondary bg-secondary/5">
            <CardContent className="p-6 text-center space-y-4">
              <Shield className="w-12 h-12 text-secondary-foreground mx-auto" />
              <div>
                <h3 className="font-semibold">Travel Insurance</h3>
                <p className="text-sm text-muted-foreground">Get comprehensive coverage</p>
              </div>
              <Button variant="outline">
                <ExternalLink className="w-4 h-4 mr-2" />
                Compare Plans
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Visa;