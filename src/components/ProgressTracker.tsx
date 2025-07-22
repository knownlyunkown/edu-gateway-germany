import { CheckCircle, Clock, Circle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Step {
  id: string;
  title: string;
  description: string;
  status: "completed" | "current" | "pending";
}

const steps: Step[] = [
  {
    id: "documents",
    title: "Documents",
    description: "Upload academic & personal documents",
    status: "completed"
  },
  {
    id: "aps",
    title: "APS",
    description: "Academic evaluation process",
    status: "current"
  },
  {
    id: "applications",
    title: "College Applications",
    description: "Apply to German universities",
    status: "pending"
  },
  {
    id: "offers",
    title: "Offers",
    description: "Receive acceptance letters",
    status: "pending"
  },
  {
    id: "visa",
    title: "Visa",
    description: "Student visa processing",
    status: "pending"
  },
  {
    id: "fly",
    title: "Fly",
    description: "Ready for Germany!",
    status: "pending"
  }
];

const ProgressTracker = () => {
  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="flex flex-col space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-primary mb-2">Your Journey to Germany</h2>
            <p className="text-muted-foreground">Track your progress step by step</p>
          </div>

          {/* Progress Steps */}
          <div className="relative">
            {/* Progress Line */}
            <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-border" />
            
            <div className="space-y-6">
              {steps.map((step, index) => (
                <div key={step.id} className="relative flex items-start space-x-4">
                  {/* Step Icon */}
                  <div className={cn(
                    "relative z-10 flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-200",
                    step.status === "completed" && "bg-success border-success",
                    step.status === "current" && "bg-accent border-accent animate-pulse",
                    step.status === "pending" && "bg-background border-border"
                  )}>
                    {step.status === "completed" && (
                      <CheckCircle className="w-6 h-6 text-success-foreground" />
                    )}
                    {step.status === "current" && (
                      <Clock className="w-6 h-6 text-accent-foreground" />
                    )}
                    {step.status === "pending" && (
                      <Circle className="w-6 h-6 text-muted-foreground" />
                    )}
                  </div>

                  {/* Step Content */}
                  <div className="flex-1 min-w-0 pb-6">
                    <div className="flex items-center space-x-3">
                      <h3 className={cn(
                        "text-lg font-semibold transition-colors",
                        step.status === "completed" && "text-success",
                        step.status === "current" && "text-accent",
                        step.status === "pending" && "text-muted-foreground"
                      )}>
                        {step.title}
                      </h3>
                      <Badge variant={
                        step.status === "completed" ? "default" :
                        step.status === "current" ? "secondary" : "outline"
                      } className={cn(
                        "text-xs",
                        step.status === "completed" && "bg-success text-success-foreground",
                        step.status === "current" && "bg-accent text-accent-foreground"
                      )}>
                        {step.status === "completed" ? "Complete" :
                         step.status === "current" ? "In Progress" : "Pending"}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Progress Stats */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
            <div className="text-center">
              <div className="text-2xl font-bold text-success">1</div>
              <div className="text-sm text-muted-foreground">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">1</div>
              <div className="text-sm text-muted-foreground">In Progress</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-muted-foreground">4</div>
              <div className="text-sm text-muted-foreground">Remaining</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressTracker;