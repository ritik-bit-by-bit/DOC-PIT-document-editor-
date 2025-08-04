'use client'
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Zap, Users, Star, DockIcon, Edit2Icon, Bell, MessageCircleIcon, PersonStanding, Command } from "lucide-react";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
const Index = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const router=useRouter();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation
      gsap.fromTo(".hero-title", 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      );
      
      gsap.fromTo(".hero-subtitle", 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, delay: 0.3, ease: "power3.out" }
      );
      
      gsap.fromTo(".hero-buttons", 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, delay: 0.6, ease: "power3.out" }
      );

      // Features animation
      gsap.fromTo(".feature-card", 
        { opacity: 0, y: 30, scale: 0.9 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1, 
          duration: 0.8, 
          stagger: 0.2, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".features-section",
            start: "top 80%",
          }
        }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const features = [
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Smart Document Editing",
      description: "Organize, categorize, and manage all your documents with Rich Text Editor."
    },
    {
      icon: <Edit2Icon className="w-8 h-8" />,
      title: "Easy to Use",
      description: "Easy design even Kids can use editor and download Documents"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Lightning Fast",
      description: "Access your documents at the speed of thought with our optimized infrastructure."
    },
    {
      icon: <DockIcon className="w-8 h-8" />,
      title: "Document Templates",
      description: "Most widely used Document templates available at finger tips"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Export (PDF, HTML, TXT, JSON)",
      description: "Free Download without requiring any Credentials"
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "  Free Premium Features",
      description: <span className="flex flex-col justify-between gap-y-1">
        <span className="items-center flex flex-row"><Bell/>Notifications System</span>
        
      <span className="items-center flex flex-row" ><MessageCircleIcon/> Organization Invites</span>
      <span className="items-center flex flex-row"><PersonStanding/>Real-time Collaboration & Database </span>
      <span className="items-center flex flex-row"><Command/> Replies and Mention</span></span>
    }
  ];

  return (
    <div ref={heroRef} className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary opacity-10 blur-3xl"></div>
        <div className="container max-w-6xl mx-auto text-center relative z-10">
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors">
            ✨ Revolutionary Document Platform
          </Badge>
          
          <h1 className="hero-title text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent leading-tight">
            Doc-Pit
          </h1>
          
          <p className="hero-subtitle text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            The ultimate document management platform that transforms how you store, search, and collaborate on your most important files. Experience the future of digital document organization.
          </p>
          
          <div className="hero-buttons flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button size="lg" className=" text-white transition-all duration-300 hover:shadow-glow  hover:scale-105 px-8 py-6 text-lg"
            onClick={()=>router.push("/home")}>
              Start Using 
            </Button>
            <Button variant="outline" size="lg" className="border-primary/30 text-primary hover:bg-primary/10 px-8 py-6 text-lg">
              Watch Demo
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <p className="text-3xl font-bold text-primary">10+ Most Popular</p>
              <p className="text-muted-foreground"> Code Language Support</p>
            </div>
            <div className="space-y-2">
              <p className="text-3xl font-bold text-accent-foreground">99.9%</p>
              <p className="text-muted-foreground">Uptime Guarantee</p>
            </div>
            <div className="space-y-2">
              <p className="text-3xl font-bold text-secondary">Free</p>
              <p className="text-muted-foreground">No SignUp Required</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="features-section py-24 px-4 bg-gradient-to-b from-background to-muted/20">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-accent/10 text-black border-accent/80">
              🚀 Powerful Features
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Everything you need for document mastery
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover the comprehensive suite of tools designed to revolutionize your document workflow
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="feature-card group bg-card/50 backdrop-blur border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-elegant hover:-translate-y-2">
                <CardContent className="p-8 text-center">
                  <div className="mb-6 text-primary group-hover:text-accent transition-colors duration-300 flex justify-center">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-foreground group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10">
        <div className="container max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Ready to transform your workflow?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who have revolutionized their document management with Doc-Pit
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
           
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-muted/30 border-t border-border/50">
        <div className="container max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Doc-Pit
              </h3>
              <p className="text-muted-foreground">
                Revolutionary document management for the modern workplace.
              </p>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground">Product</h4>
              <div className="space-y-2 text-muted-foreground">
                <p className="hover:text-primary cursor-pointer transition-colors">Features</p>
                <p className="hover:text-primary cursor-pointer transition-colors">Pricing</p>
                <p className="hover:text-primary cursor-pointer transition-colors">Integrations</p>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground">Company</h4>
              <div className="space-y-2 text-muted-foreground">
                <p className="hover:text-primary cursor-pointer transition-colors">About</p>
                <p className="hover:text-primary cursor-pointer transition-colors">Careers</p>
                <p className="hover:text-primary cursor-pointer transition-colors">Contact</p>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground">Support</h4>
              <div className="space-y-2 text-muted-foreground">
                <p className="hover:text-primary cursor-pointer transition-colors">Help Center</p>
                <p className="hover:text-primary cursor-pointer transition-colors">Documentation</p>
                <p className="hover:text-primary cursor-pointer transition-colors">Status</p>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-border/50 text-center text-muted-foreground">
            <p>&copy; 2025 Doc-Pit. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
