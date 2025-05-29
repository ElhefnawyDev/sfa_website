"use client";

import type React from "react";

import { useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  Users,
  BarChart3,
  Settings,
  Phone,
  CheckCircle2,
  Clock,
  Database,
  Globe,
  Laptop,
  Mail,
  Shield,
  Smartphone,
} from "lucide-react";
import Image from "next/image";
import { Button } from "./components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import Footer from "./components/footer";
import Link from "next/link";
import { ThreeDMarquee } from "./components/ui/3d-marquee";
import Pricing from "./components/responsive-pricing-table";
// Animation component for fade-in effects
const FadeIn = ({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default function Component() {
  const baseImages = [
    "images/SFAweb.png",
    "images/SFAweb2.png",
    "images/SFAweb3.png",
    "images/SFAweb4.png",
    "images/SFAweb5.png",
    "images/SFAweb6.png",
  ];
  const mobileImages = [
    "images/1.png",
    "images/2.png",
    "images/3.png",
    "images/4.png",
    "images/5.png",
    "images/6.png",
    "images/7.png",
  ];

  const randomImages = Array.from({ length: 30 }, () => {
    const randomIndex = Math.floor(Math.random() * baseImages.length);
    return baseImages[randomIndex];
  });
  const randomImagesMobile = Array.from({ length: 30 }, () => {
    const randomIndex = Math.floor(Math.random() * mobileImages.length);
    return mobileImages[randomIndex];
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [scrolled, setScrolled] = useState(false)
  const { scrollYProgress } = useScroll()
  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0.95])
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -100])

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }

      const sections = ["home", "business", "product", "features", "pricing", "contact"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu when clicking outside or on escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (isMenuOpen && !target.closest(".mobile-menu-container")) {
        setIsMenuOpen(false)
      }
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isMenuOpen) {
        setIsMenuOpen(false)
      }
    }

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      document.addEventListener("keydown", handleEscape)
      // Prevent body scroll when menu is open
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "unset"
    }
  }, [isMenuOpen])

  const navItems = [
    { id: "home", label: "Home", icon: BarChart3 },
    { id: "business", label: "Solutions", icon: Users },
    { id: "product", label: "Product", icon: Laptop },
    { id: "features", label: "Features", icon: Settings },
    { id: "pricing", label: "Pricing", icon: Database },
    { id: "contact", label: "Contact", icon: Phone },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-cyan-50 pt-16">
      {/* Header */}
      <motion.header
        style={{ opacity: headerOpacity }}
        className={`fixed top-0 left-0 right-0 z-50 w-full border-b backdrop-blur-md transition-all duration-300 ${
          scrolled ? "bg-white/95 shadow-sm" : "bg-white/50"
        }`}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 text-2xl font-bold z-50"
            >
              <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">SFA</span>
              <span className="text-red-500">365</span>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => scrollToSection(item.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
                    activeSection === item.id
                      ? "bg-gradient-to-r from-cyan-100 to-blue-100 text-blue-700"
                      : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </motion.button>
              ))}
            </nav>

            <div className="hidden md:block">
              <Link href="/book-demo">
                <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white transition-all duration-300 hover:scale-105">
                  Book a Demo
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-blue-100 text-blue-700 z-50 relative"
              aria-label="Toggle mobile menu"
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
                onClick={() => setIsMenuOpen(false)}
              />

              {/* Mobile Menu */}
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="mobile-menu-container fixed top-20 left-4 right-4 bg-white/95 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl z-50 md:hidden max-h-[calc(100vh-6rem)] overflow-y-auto"
              >
                <div className="p-6 space-y-1">
                  {navItems.map((item, index) => (
                    <motion.button
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => scrollToSection(item.id)}
                      className={`flex items-center space-x-3 w-full px-4 py-4 rounded-xl text-left transition-all duration-300 ${
                        activeSection === item.id
                          ? "bg-gradient-to-r from-cyan-100 to-blue-100 text-blue-700 shadow-sm"
                          : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                      }`}
                    >
                      <item.icon className="w-5 h-5 flex-shrink-0" />
                      <span className="font-medium">{item.label}</span>
                    </motion.button>
                  ))}

                  {/* Mobile CTA Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: navItems.length * 0.1 }}
                    className="pt-4 border-t border-gray-200 mt-4"
                  >
                    <Link href="/book-demo" className="block">
                      <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white py-4 text-lg font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                        Book a Demo
                      </Button>
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.header>

      <main className="flex-1">
        {/* Hero Section with Video */}
        <section
          id="home"
          className="relative min-h-screen flex items-center overflow-hidden"
        >
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute w-full h-full bg-gradient-to-br from-cyan-400/20 via-blue-500/20 to-blue-800/20"></div>
            <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-cyan-400/20 animate-pulse [animation-duration:6s]"></div>
            <div className="absolute top-60 -left-20 w-60 h-60 rounded-full bg-blue-500/20 animate-pulse [animation-duration:8s]"></div>
            <div className="absolute bottom-20 right-20 w-40 h-40 rounded-full bg-red-400/20 animate-pulse [animation-duration:10s]"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gradient-to-r from-cyan-400/10 to-blue-600/10 blur-3xl"></div>
          </div>

          <motion.div
            style={{ y: heroY }}
            className="relative z-10 container mx-auto px-4 py-20"
          >
            <div className="flex flex-col items-center justify-center space-y-8 text-center">
              <FadeIn>
                <div className="space-y-6">
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                    <span className="bg-gradient-to-r from-[#405de3] to-blue-600 bg-clip-text text-transparent">
                      SFA365: BUILT FOR TEAMS
                    </span>
                    <br />
                    <span className="bg-gradient-to-r from-blue-600 to-red-500 bg-clip-text text-transparent">
                      OF ALL SIZES
                    </span>
                  </h1>
                  <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl">
                    Smart. Fast. Accurate. Transform your sales process with our
                    comprehensive sales automation solution.
                  </p>
                </div>
              </FadeIn>

              <FadeIn delay={200}>
                <div className="flex flex-col gap-4 min-[400px]:flex-row">
                  <Link href="/book-demo">
                    <Button
                      size="lg"
                      className="gap-2 group bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                    >
                      Book a Demo
                      <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </Button>
                  </Link>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-blue-300 text-blue-700 hover:bg-blue-50 px-8 py-4 text-lg rounded-full"
                    onClick={() => scrollToSection("business")}
                  >
                    Learn More
                  </Button>
                </div>
              </FadeIn>

              <FadeIn delay={400} className="w-full max-w-5xl mt-8">
                <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden shadow-2xl transition-all duration-500 hover:shadow-cyan-500/20 hover:scale-[1.01]">
                  {/* Video Element */}
                  <video
                    className="w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    poster="/images/Hero.png"
                  >
                    <source src="/video/sfaHero.mp4" type="video/mp4" />
                    {/* Fallback image if video doesn't load */}
                    Your browser does not support the video tag.
                  </video>

                  {/* Video Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                    <div className="p-6 text-white text-left">
                      <h3 className="text-xl font-bold">SFA365 in Action</h3>
                      <p className="text-white/80">
                        See how our platform transforms sales operations
                      </p>
                    </div>
                  </div>

                  {/* Play/Pause Button (Optional) */}
                  <div className="absolute top-4 right-4">
                    <button className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300">
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </FadeIn>
            </div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              className="text-blue-600 cursor-pointer"
              onClick={() => scrollToSection("business")}
            >
              <ChevronDown className="w-8 h-8" />
            </motion.div>
          </motion.div>
        </section>

        {/* Business Solutions Section with Background Images */}
        <section
          id="business"
          className="w-full py-16 md:py-24 lg:py-32 bg-white"
        >
          <div className="container px-4 md:px-6">
            <FadeIn>
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-gradient-to-r from-cyan-600 to-blue-700 bg-clip-text text-transparent">
                    Solutions for Every Business Size
                  </h2>
                  <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl">
                    SFA365 adapts to your business needs, whether you're a small
                    startup or a large enterprise.
                  </p>
                </div>
              </div>
            </FadeIn>
            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-3 lg:gap-12 mt-12">
              {/* Small Business Card */}
              <FadeIn delay={100}>
                <div className="relative overflow-hidden rounded-2xl shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 group h-80">
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <Image
                      src="/images/small.jpeg"
                      alt="Small Business Background"
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/90 via-cyan-800/60 to-cyan-600/30"></div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10 p-8 h-full flex flex-col justify-end text-white">
                    <div className="space-y-4">
                      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <Users className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold">Small Business</h3>
                      <p className="text-white/90 text-sm leading-relaxed">
                        Automate email marketing and track lead activity,
                        enabling efficient growth and scalability for emerging
                        enterprises.
                      </p>
                    </div>
                  </div>
                </div>
              </FadeIn>

              {/* Medium Business Card */}
              <FadeIn delay={200}>
                <div className="relative overflow-hidden rounded-2xl shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 group h-80">
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <Image
                      src="/images/medium.jpeg"
                      alt="Medium Business Background"
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-800/60 to-blue-600/30"></div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10 p-8 h-full flex flex-col justify-end text-white">
                    <div className="space-y-4">
                      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <BarChart3 className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold">Medium Business</h3>
                      <p className="text-white/90 text-sm leading-relaxed">
                        Streamline sales processes and improve team
                        collaboration, fostering better communication and
                        synergy among departments.
                      </p>
                    </div>
                  </div>
                </div>
              </FadeIn>

              {/* Enterprise Card */}
              <FadeIn delay={300}>
                <div className="relative overflow-hidden rounded-2xl shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 group h-80">
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <Image
                      src="/images/enterprise.jpeg"
                      alt="Enterprise Background"
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-900/90 via-purple-800/60 to-purple-600/30"></div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10 p-8 h-full flex flex-col justify-end text-white">
                    <div className="space-y-4">
                      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <Settings className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold">Enterprise</h3>
                      <p className="text-white/90 text-sm leading-relaxed">
                        Integrate with existing CRM systems and optimize sales
                        performance across multiple departments. Maximize sales
                        potential with a connected strategy.
                      </p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        <section
      id="product"
      className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-br from-cyan-50 to-blue-100 relative"
    >
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 right-20 w-80 h-80 rounded-full bg-cyan-300/20 animate-pulse [animation-duration:7s]"></div>
        <div className="absolute bottom-20 left-20 w-60 h-60 rounded-full bg-blue-400/20 animate-pulse [animation-duration:9s]"></div>
      </div>

      <div className="container px-4 md:px-6 relative z-10">
        <FadeIn>
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-gradient-to-r from-cyan-600 to-blue-700 bg-clip-text text-transparent">
                Experience SFA365 Anywhere
              </h2>
              <p className="mx-auto max-w-[700px] text-gray-700 md:text-xl">
                Access your sales data from our powerful web portal or on-the-go with our mobile app
              </p>
            </div>
          </div>
        </FadeIn>

        {/* Web Portal Section */}
        <div className="mb-24">
          <FadeIn delay={100}>
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-blue-800 mb-4">Powerful Web Portal</h3>
              <p className="mx-auto max-w-[800px] text-gray-700 text-lg">
                Our comprehensive web portal gives you full control over your sales pipeline, team performance, and
                customer data with intuitive dashboards and powerful reporting tools.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={200}>
            <div className="mx-auto max-w-7xl rounded-3xl bg-gray-950/5 p-2 ring-1 ring-neutral-700/10 dark:bg-neutral-800 mb-12">
              <ThreeDMarquee images={randomImages} mobile={false} />
            </div>
          </FadeIn>

          <FadeIn delay={300}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-6 w-6 text-cyan-600 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">Comprehensive dashboards and analytics</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-6 w-6 text-cyan-600 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">Team performance tracking</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-6 w-6 text-cyan-600 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">Advanced reporting and forecasting</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-6 w-6 text-cyan-600 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">Customer relationship management</span>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Divider */}
        <FadeIn delay={400}>
          <div className="flex items-center justify-center mb-24">
            <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent w-full max-w-md"></div>
            <div className="mx-8 p-3 rounded-full bg-white shadow-lg">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600"></div>
            </div>
            <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent w-full max-w-md"></div>
          </div>
        </FadeIn>

        {/* Mobile App Section */}
        <div>
          <FadeIn delay={500}>
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-blue-800 mb-4">Mobile App</h3>
              <p className="mx-auto max-w-[800px] text-gray-700 text-lg">
                Stay connected to your sales data wherever you go. Update deals, check team performance, and respond to
                customer inquiries in real-time from your smartphone or tablet.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={600}>
            <div className="mx-auto max-w-7xl rounded-3xl bg-gray-950/5 p-2 ring-1 ring-neutral-700/10 dark:bg-neutral-800 mb-12">
              <ThreeDMarquee images={randomImagesMobile} mobile={true} />
            </div>
          </FadeIn>

          <FadeIn delay={700}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-6 w-6 text-blue-600 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">Real-time notifications and alerts</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-6 w-6 text-blue-600 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">On-the-go deal updates</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-6 w-6 text-blue-600 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">Quick access to customer information</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-6 w-6 text-blue-600 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">Offline mode for field sales teams</span>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>

    
        {/* Features Section */}
        <section
          id="features"
          className="w-full py-16 md:py-24 lg:py-32 bg-white relative"
        >
          <div className="absolute inset-0 overflow-hidden opacity-5">
            <div className="absolute top-0 left-0 w-full h-full">
              {Array.from({ length: 20 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute bg-cyan-500 rounded-md opacity-20"
                  style={{
                    width: `${Math.random() * 100 + 50}px`,
                    height: `${Math.random() * 100 + 50}px`,
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    transform: `rotate(${Math.random() * 360}deg)`,
                    animation: `float ${
                      Math.random() * 10 + 20
                    }s linear infinite`,
                    animationDelay: `${Math.random() * 5}s`,
                  }}
                />
              ))}
            </div>
          </div>
          <div className="container px-4 md:px-6 relative z-10">
            <FadeIn>
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-gradient-to-r from-cyan-600 to-blue-700 bg-clip-text text-transparent">
                    Key Features
                  </h2>
                  <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl">
                    Discover how SFA365 can transform your sales operations with
                    these powerful features.
                  </p>
                </div>
              </div>
            </FadeIn>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 mt-12">
              {[
                {
                  icon: Laptop,
                  title: "Streamlined Sales Management",
                  description:
                    "Easily track and manage sales activities, information, and project updates with an intuitive interface designed for efficiency.",
                  color: "cyan",
                },
                {
                  icon: Database,
                  title: "Accurate Data Tracking",
                  description:
                    "Simplify sales funnel consolidation, ensuring reliable data collection and smoother tracking across all stages of the sales process.",
                  color: "blue",
                },
                {
                  icon: Clock,
                  title: "Faster Reporting",
                  description:
                    "Accelerate report generation, reducing dependency on email communications and saving valuable time for your sales team.",
                  color: "red",
                },
                {
                  icon: BarChart3,
                  title: "Management Dashboard",
                  description:
                    "User-friendly dashboard for comprehensive performance monitoring, including revenue statistics, sales stage analysis, and more.",
                  color: "cyan",
                },
                {
                  icon: Shield,
                  title: "Advanced Reporting",
                  description:
                    "Generate clear, detailed reports in PDF or Excel formats with integrated tables and charts for better decision-making.",
                  color: "blue",
                },
                {
                  icon: Smartphone,
                  title: "Mobile Accessibility",
                  description:
                    "Access SFA365 anytime, anywhere via mobile app or web portal for quick updates and real-time sales management on the go.",
                  color: "red",
                },
              ].map((feature, index) => (
                <FadeIn key={index} delay={100 * (index + 1)}>
                  <Card className="group bg-white overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 hover:-translate-y-1 border-gray-200">
                    <CardHeader className="flex flex-row items-center gap-4">
                      <div
                        className={`p-2 rounded-full transition-all duration-300 group-hover:scale-110 ${
                          feature.color === "cyan"
                            ? "bg-cyan-100 text-cyan-600 group-hover:bg-cyan-500 group-hover:text-white"
                            : feature.color === "blue"
                            ? "bg-blue-100 text-blue-600 group-hover:bg-blue-500 group-hover:text-white"
                            : "bg-red-100 text-red-600 group-hover:bg-red-500 group-hover:text-white"
                        }`}
                      >
                        <feature.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <CardTitle className="text-gray-800">
                          {feature.title}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-r from-cyan-500 via-blue-600 to-blue-700 text-white overflow-hidden relative">
          {/* Animated background elements */}
          <div className="absolute inset-0">
            <div className="absolute top-20 right-20 w-80 h-80 rounded-full bg-white/10 animate-pulse [animation-duration:7s]"></div>
            <div className="absolute bottom-20 left-20 w-60 h-60 rounded-full bg-white/10 animate-pulse [animation-duration:9s]"></div>
          </div>

          <div className="container relative px-4 md:px-6">
            <FadeIn>
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    Work Seamlessly with SFA365!
                  </h2>
                  <p className="mx-auto max-w-[700px] md:text-xl">
                    <strong>Smart. Fast. Accurate.</strong>
                  </p>
                  <p className="mx-auto max-w-[700px] md:text-xl">
                    Ready to transform your sales process? Book your demo now
                    and discover how SFA365 can streamline your business
                    operations.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button
                    size="lg"
                    variant="secondary"
                    className="gap-1 group transition-all duration-300 hover:scale-105 hover:shadow-lg bg-white text-blue-700 hover:bg-gray-100"
                  >
                    Book a Demo
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Pricing Section */}
        <section
          id="pricing"
          className="w-full py-16 md:py-24 lg:py-32 bg-gray-50"
        >
          <div className="container px-4 md:px-6">
            <FadeIn>
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-gradient-to-r from-cyan-600 to-blue-700 bg-clip-text text-transparent">
                    Pricing Plans
                  </h2>
                  <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl">
                    Choose The Right Solution For Your Business
                  </p>
                </div>
              </div>
            </FadeIn>

            {/* Modern Pricing Table */}
            <Pricing></Pricing>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-br from-cyan-50 to-blue-100 overflow-hidden relative">
          {/* Animated background elements */}
          <div className="absolute inset-0">
            <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-cyan-400/20 animate-pulse [animation-duration:8s]"></div>
            <div className="absolute bottom-40 right-20 w-60 h-60 rounded-full bg-blue-400/20 animate-pulse [animation-duration:10s]"></div>
          </div>

          <div className="container relative px-4 md:px-6">
            <FadeIn>
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-gradient-to-r from-cyan-600 to-blue-700 bg-clip-text text-transparent">
                    Ready to Transform Your Sales?
                  </h2>
                  <p className="mx-auto max-w-[700px] text-gray-700 md:text-xl">
                    Unlock the full potential of your sales team with SFA365.
                    Our all-in-one solution is designed to supercharge your
                    sales and drive revenue growth!
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button
                    size="lg"
                    className="gap-1 group transition-all duration-300 hover:scale-105 hover:shadow-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
                  >
                    Get Started Today
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          className="w-full py-16 md:py-24 lg:py-32 bg-white"
        >
          <div className="container px-4 md:px-6">
            <FadeIn>
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-gradient-to-r from-cyan-600 to-blue-700 bg-clip-text text-transparent">
                    Contact Information
                  </h2>
                  <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl">
                    Get in touch today to schedule your personalized demo and
                    see how SFA365 can revolutionize your sales operations.
                  </p>
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={200}>
              <div className="mx-auto max-w-md mt-12">
                <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 border-cyan-200">
                  <CardHeader>
                    <CardTitle className="text-blue-800">
                      Isianpadu Systems Sdn Bhd
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3 group">
                      <div className="p-2 rounded-full bg-cyan-100 text-cyan-600 transition-all duration-300 group-hover:bg-cyan-500 group-hover:text-white">
                        <Mail className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">Email</p>
                        <a
                          href="mailto:sales@isianpadu.com"
                          className="text-sm text-gray-600 hover:text-cyan-600 transition-colors"
                        >
                          sales@isianpadu.com
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 group">
                      <div className="p-2 rounded-full bg-blue-100 text-blue-600 transition-all duration-300 group-hover:bg-blue-500 group-hover:text-white">
                        <Phone className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">Sales Contact</p>
                        <a
                          href="tel:+60173819695"
                          className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                        >
                          +60 17 - 381 9695
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 group">
                      <div className="p-2 rounded-full bg-red-100 text-red-600 transition-all duration-300 group-hover:bg-red-500 group-hover:text-white">
                        <Globe className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">Website</p>
                        <a
                          href="https://www.isianpadu.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-gray-600 hover:text-red-600 transition-colors"
                        >
                          www.isianpadu.com
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />

      <style jsx global>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }
      `}</style>
    </div>
  );
}
