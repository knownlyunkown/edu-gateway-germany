import { useState } from "react";
import { Bot, Send, Download, User, Sparkles, FileText, Clock, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Layout from "@/components/Layout";

type MessageType = "user" | "assistant";
type DocumentType = "sop" | "lor" | "cover_letter";

interface Message {
  id: string;
  type: MessageType;
  content: string;
  timestamp: Date;
}

interface GeneratedDocument {
  id: string;
  type: DocumentType;
  title: string;
  content: string;
  createdAt: Date;
  status: "draft" | "review" | "final";
}

interface QuickPrompt {
  id: string;
  title: string;
  description: string;
  icon: any;
  prompt: string;
}

const AIAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "assistant",
      content: "Hi Shashank! 👋 I'm your AI assistant for study abroad applications. I can help you with:\n\n• Writing compelling SOPs (Statement of Purpose)\n• Crafting professional LORs (Letters of Recommendation)\n• Timeline planning and deadlines\n• University application guidance\n• Visa process questions\n\nWhat would you like to work on today?",
      timestamp: new Date()
    }
  ]);

  const [currentMessage, setCurrentMessage] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeDocumentType, setActiveDocumentType] = useState<DocumentType>("sop");

  const [generatedDocuments] = useState<GeneratedDocument[]>([
    {
      id: "1",
      type: "sop",
      title: "SOP for M.Sc. Mechanical Engineering at RWTH Aachen",
      content: "As an aspiring mechanical engineer with a passion for sustainable technology...",
      createdAt: new Date("2024-01-20"),
      status: "review"
    },
    {
      id: "2",
      type: "lor",
      title: "Academic LOR from Prof. Kumar",
      content: "It is with great pleasure that I recommend Mr. Shashank Sharma...",
      createdAt: new Date("2024-01-18"),
      status: "final"
    }
  ]);

  const [quickPrompts] = useState<QuickPrompt[]>([
    {
      id: "sop_cs",
      title: "Computer Science SOP",
      description: "Help me write an SOP for Computer Science programs",
      icon: FileText,
      prompt: "I need help writing a Statement of Purpose for Computer Science Master's programs in Germany. Can you guide me through the process?"
    },
    {
      id: "timeline",
      title: "Application Timeline",
      description: "Create a timeline for my applications",
      icon: Clock,
      prompt: "Can you help me create a detailed timeline for applying to German universities for Fall 2025 intake?"
    },
    {
      id: "lor_academic",
      title: "Academic LOR",
      description: "Draft a Letter of Recommendation from professor",
      icon: Star,
      prompt: "I need to draft a Letter of Recommendation from my academic supervisor. Can you help me with the structure and content?"
    },
    {
      id: "visa_help",
      title: "Visa Process",
      description: "Questions about German student visa",
      icon: Bot,
      prompt: "I have questions about the German student visa process. Can you walk me through the requirements and timeline?"
    }
  ]);

  const handleSendMessage = async () => {
    if (!currentMessage.trim()) return;

    const newUserMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: currentMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newUserMessage]);
    setCurrentMessage("");
    setIsGenerating(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: "I'd be happy to help you with that! Let me provide you with detailed guidance...\n\nFor your Statement of Purpose, I recommend structuring it as follows:\n\n1. **Opening Hook** - Start with your motivation\n2. **Academic Background** - Highlight relevant coursework\n3. **Professional Experience** - Connect work to your goals\n4. **Why Germany & This Program** - Show research and fit\n5. **Future Goals** - Demonstrate clear vision\n\nWould you like me to help you draft any specific section?",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsGenerating(false);
    }, 2000);
  };

  const handleQuickPrompt = (prompt: string) => {
    setCurrentMessage(prompt);
  };

  const getDocumentTypeColor = (type: DocumentType) => {
    switch (type) {
      case "sop": return "accent";
      case "lor": return "secondary";
      case "cover_letter": return "success";
      default: return "muted";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "final": return "success";
      case "review": return "secondary";
      default: return "muted";
    }
  };

  return (
    <Layout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-12rem)]">
        {/* Chat Interface */}
        <div className="lg:col-span-2 flex flex-col">
          <Card className="flex-1 flex flex-col">
            <CardHeader className="border-b">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-accent rounded-full flex items-center justify-center">
                  <Bot className="w-5 h-5 text-accent-foreground" />
                </div>
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <span>AI Study Abroad Assistant</span>
                    <Sparkles className="w-4 h-4 text-accent" />
                  </CardTitle>
                  <CardDescription>Get personalized help with your applications</CardDescription>
                </div>
              </div>
            </CardHeader>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] p-3 rounded-lg ${
                    message.type === "user" 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-muted text-muted-foreground"
                  }`}>
                    <div className="flex items-start space-x-2">
                      {message.type === "assistant" && (
                        <Bot className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      )}
                      {message.type === "user" && (
                        <User className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      )}
                      <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                    </div>
                    <div className="text-xs opacity-70 mt-2">
                      {message.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))}
              
              {isGenerating && (
                <div className="flex justify-start">
                  <div className="bg-muted text-muted-foreground p-3 rounded-lg max-w-[80%]">
                    <div className="flex items-center space-x-2">
                      <Bot className="w-4 h-4 animate-pulse" />
                      <span className="text-sm">AI is typing...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="border-t p-4">
              <div className="flex space-x-2">
                <Textarea
                  placeholder="Ask me anything about your study abroad journey..."
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  className="flex-1 min-h-[60px] resize-none"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <Button 
                  onClick={handleSendMessage}
                  disabled={!currentMessage.trim() || isGenerating}
                  className="self-end"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Prompts */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Start</CardTitle>
              <CardDescription>Common tasks to get you started</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {quickPrompts.map((prompt) => {
                const IconComponent = prompt.icon;
                return (
                  <Button
                    key={prompt.id}
                    variant="outline"
                    className="w-full justify-start h-auto p-3"
                    onClick={() => handleQuickPrompt(prompt.prompt)}
                  >
                    <div className="flex items-start space-x-3">
                      <IconComponent className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <div className="text-left">
                        <div className="font-medium text-sm">{prompt.title}</div>
                        <div className="text-xs text-muted-foreground">{prompt.description}</div>
                      </div>
                    </div>
                  </Button>
                );
              })}
            </CardContent>
          </Card>

          {/* Document Generator */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Document Generator</CardTitle>
              <CardDescription>Create professional documents</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Select value={activeDocumentType} onValueChange={(value: DocumentType) => setActiveDocumentType(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sop">Statement of Purpose</SelectItem>
                  <SelectItem value="lor">Letter of Recommendation</SelectItem>
                  <SelectItem value="cover_letter">Cover Letter</SelectItem>
                </SelectContent>
              </Select>
              
              <Input placeholder="Course/Program name" />
              <Input placeholder="University name" />
              
              <Button 
                variant="accent" 
                className="w-full"
                onClick={() => handleQuickPrompt(`Help me create a ${activeDocumentType.toUpperCase()} for my application`)}
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Generate Draft
              </Button>
            </CardContent>
          </Card>

          {/* Generated Documents */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">My Documents</CardTitle>
              <CardDescription>Previously generated content</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {generatedDocuments.map((doc) => (
                <div key={doc.id} className="p-3 border border-border rounded-lg space-y-2">
                  <div className="flex items-start justify-between">
                    <Badge variant={getDocumentTypeColor(doc.type) as any} className="text-xs">
                      {doc.type.toUpperCase()}
                    </Badge>
                    <Badge variant={getStatusColor(doc.status) as any} className="text-xs">
                      {doc.status}
                    </Badge>
                  </div>
                  <h4 className="font-medium text-sm leading-tight">{doc.title}</h4>
                  <p className="text-xs text-muted-foreground">{doc.content.substring(0, 60)}...</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {doc.createdAt.toLocaleDateString()}
                    </span>
                    <Button variant="ghost" size="sm">
                      <Download className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default AIAssistant;