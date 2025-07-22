import { useState } from "react";
import Layout from "@/components/Layout";
import Dashboard from "@/components/Dashboard";
import Onboarding from "@/components/Onboarding";

const Index = () => {
  // In a real app, this would come from authentication state
  const [isAuthenticated] = useState(false);

  if (!isAuthenticated) {
    return <Onboarding />;
  }

  return (
    <Layout>
      <Dashboard />
    </Layout>
  );
};

export default Index;
