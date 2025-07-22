import { useState } from "react";
import Layout from "@/components/Layout";
import Dashboard from "@/components/Dashboard";
import Onboarding from "@/components/Onboarding";

const Index = () => {
  // In a real app, this would come from authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleOnboardingComplete = () => {
    setIsAuthenticated(true);
  };

  if (!isAuthenticated) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  return (
    <Layout>
      <Dashboard />
    </Layout>
  );
};

export default Index;
