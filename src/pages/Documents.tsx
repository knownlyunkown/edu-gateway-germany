import { useState } from "react";
import { Upload, Check, Clock, AlertCircle, Download, Eye, FileText, GraduationCap, User, Plane, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/Layout";

type DocumentStatus = "pending" | "submitted" | "verified" | "rejected";

interface Document {
  id: string;
  name: string;
  category: string;
  icon: any;
  status: DocumentStatus;
  uploadedDate?: string;
  rejectionReason?: string;
  required: boolean;
}

const Documents = () => {
  const [documents] = useState<Document[]>([
    {
      id: "passport",
      name: "Passport",
      category: "Identity",
      icon: User,
      status: "verified",
      uploadedDate: "2024-01-15",
      required: true
    },
    {
      id: "transcript",
      name: "Academic Transcript",
      category: "Academic",
      icon: GraduationCap,
      status: "submitted",
      uploadedDate: "2024-01-20",
      required: true
    },
    {
      id: "lor1",
      name: "Letter of Recommendation 1",
      category: "Academic",
      icon: FileText,
      status: "verified",
      uploadedDate: "2024-01-18",
      required: true
    },
    {
      id: "lor2",
      name: "Letter of Recommendation 2",
      category: "Academic",
      icon: FileText,
      status: "pending",
      required: true
    },
    {
      id: "resume",
      name: "Resume/CV",
      category: "Professional",
      icon: FileText,
      status: "submitted",
      uploadedDate: "2024-01-22",
      required: true
    },
    {
      id: "aps",
      name: "APS Certificate",
      category: "Certification",
      icon: Plane,
      status: "rejected",
      uploadedDate: "2024-01-19",
      rejectionReason: "Document quality is unclear. Please upload a higher resolution scan.",
      required: true
    }
  ]);

  const getStatusColor = (status: DocumentStatus) => {
    switch (status) {
      case "verified": return "success";
      case "submitted": return "secondary";
      case "rejected": return "destructive";
      default: return "muted";
    }
  };

  const getStatusIcon = (status: DocumentStatus) => {
    switch (status) {
      case "verified": return <Check className="w-4 h-4" />;
      case "submitted": return <Clock className="w-4 h-4" />;
      case "rejected": return <AlertCircle className="w-4 h-4" />;
      default: return <Upload className="w-4 h-4" />;
    }
  };

  const categories = ["Identity", "Academic", "Professional", "Certification"];

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col space-y-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Document Center</h1>
            <p className="text-muted-foreground">Upload and track your required documents</p>
          </div>
          
          {/* Student ID */}
          <Card className="bg-gradient-primary">
            <CardContent className="p-4">
              <div className="flex items-center justify-between text-primary-foreground">
                <div>
                  <p className="text-sm opacity-90">Your Student ID</p>
                  <p className="text-lg font-bold">UNI360-2024-SH001</p>
                </div>
                <Badge variant="secondary" className="bg-white/20 text-white">
                  Active
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Progress Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Upload Progress</CardTitle>
            <CardDescription>Track your document submission status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-success/10 rounded-lg">
                <div className="text-2xl font-bold text-success">2</div>
                <div className="text-sm text-muted-foreground">Verified</div>
              </div>
              <div className="text-center p-4 bg-secondary/10 rounded-lg">
                <div className="text-2xl font-bold text-secondary-foreground">2</div>
                <div className="text-sm text-muted-foreground">Under Review</div>
              </div>
              <div className="text-center p-4 bg-destructive/10 rounded-lg">
                <div className="text-2xl font-bold text-destructive">1</div>
                <div className="text-sm text-muted-foreground">Rejected</div>
              </div>
              <div className="text-center p-4 bg-muted/10 rounded-lg">
                <div className="text-2xl font-bold text-muted-foreground">1</div>
                <div className="text-sm text-muted-foreground">Pending</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Document Categories */}
        {categories.map((category) => {
          const categoryDocs = documents.filter(doc => doc.category === category);
          
          return (
            <Card key={category}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span>{category} Documents</span>
                  <Badge variant="outline">{categoryDocs.length}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {categoryDocs.map((doc) => {
                    const IconComponent = doc.icon;
                    return (
                      <div key={doc.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                            <IconComponent className="w-5 h-5 text-muted-foreground" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <h3 className="font-medium">{doc.name}</h3>
                              {doc.required && (
                                <Badge variant="outline" className="text-xs">Required</Badge>
                              )}
                            </div>
                            <div className="flex items-center space-x-2 mt-1">
                              <Badge variant={getStatusColor(doc.status) as any} className="text-xs">
                                {getStatusIcon(doc.status)}
                                <span className="ml-1 capitalize">{doc.status}</span>
                              </Badge>
                              {doc.uploadedDate && (
                                <span className="text-xs text-muted-foreground">
                                  Uploaded: {doc.uploadedDate}
                                </span>
                              )}
                            </div>
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
                            <>
                              <Button variant="ghost" size="sm">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Download className="w-4 h-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          );
        })}

        {/* Help Section */}
        <Card className="border-accent bg-accent/5">
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <h3 className="text-lg font-semibold text-accent">Need Help?</h3>
              <p className="text-muted-foreground">
                Having trouble with your documents? Our AI assistant can help guide you through the process.
              </p>
              <Button variant="accent">
                <Bot className="w-4 h-4 mr-2" />
                Get Document Help
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Documents;