"use client";

import { useState } from "react";
import {
  Users,
  Settings,
  Database,
  Shield,
  BarChart3,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";

const plans = [
  {
    name: "Basic",
    color: "cyan",
    bgColor: "bg-white",
    userLimit: "Up to 10 users",
    additionalUsers: {
      price: "RM 100/user/month",
      note: "(beyond 10 users)",
    },
    infrastructure: "Cloud included",
    licenseType: "Annual",
    features: ["Basic Dashboard", "Email Support", "Mobile App"],
  },
  {
    name: "Professional",
    color: "blue",
    bgColor: "bg-blue-50",
    userLimit: "Up to 25 users",
    additionalUsers: {
      price: "RM 50/user/month",
      note: "(beyond 25 users)",
    },
    infrastructure: "Cloud included",
    licenseType: "Annual",
    features: [
      "Advanced Dashboard",
      "Priority Support",
      "API Access",
      "Custom Reports",
    ],
  },
  {
    name: "Enterprise",
    color: "green",
    bgColor: "bg-white",
    userLimit: "Unlimited users",
    additionalUsers: {
      price: "RM 5,000/year",
      note: "for subsequent years",
    },
    infrastructure: "Cloud (1st year) or on-premise",
    licenseType: "Perpetual",
    features: [
      "Full Customization",
      "24/7 Support",
      "Dedicated Manager",
      "On-premise Option",
    ],
  },
];

const features = [
  {
    icon: Users,
    iconColor: "text-cyan-600",
    iconBg: "bg-cyan-100",
    title: "User Limit",
    key: "userLimit",
  },
  {
    icon: Settings,
    iconColor: "text-blue-600",
    iconBg: "bg-blue-100",
    title: "Additional Users",
    key: "additionalUsers",
  },
  {
    icon: Database,
    iconColor: "text-green-600",
    iconBg: "bg-green-100",
    title: "Infrastructure",
    key: "infrastructure",
  },
  {
    icon: Shield,
    iconColor: "text-purple-600",
    iconBg: "bg-purple-100",
    title: "License Type",
    key: "licenseType",
  },
  {
    icon: BarChart3,
    iconColor: "text-orange-600",
    iconBg: "bg-orange-100",
    title: "Key Features",
    key: "features",
  },
];

export default function Component() {
  const [expandedCards, setExpandedCards] = useState<{
    [key: number]: boolean;
  }>({});

  const toggleCard = (index: number) => {
    setExpandedCards((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      {/* Desktop Table View */}
      <div className="hidden lg:block">
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-4 gap-0 bg-gray-50 border-b border-gray-200">
            <div className="p-6 border-r border-gray-200">
              <span className="font-semibold text-gray-900">Features</span>
            </div>
            <div className="p-6 border-r border-gray-200 text-center">
              <span className="font-semibold text-gray-900">Basic</span>
            </div>
            <div className="p-6 border-r border-gray-200 text-center bg-blue-50">
              <span className="font-semibold text-gray-900">Professional</span>
            </div>
            <div className="p-6 text-center">
              <span className="font-semibold text-gray-900">Enterprise</span>
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-100">
            {features.map((feature, featureIndex) => {
              const Icon = feature.icon;
              return (
                <div
                  key={featureIndex}
                  className="grid grid-cols-4 gap-0 hover:bg-gray-50 transition-colors"
                >
                  <div className="p-6 border-r border-gray-100">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-8 h-8 ${feature.iconBg} rounded-full flex items-center justify-center`}
                      >
                        <Icon className={`w-4 h-4 ${feature.iconColor}`} />
                      </div>
                      <span className="font-medium text-gray-900">
                        {feature.title}
                      </span>
                    </div>
                  </div>

                  {plans.map((plan, planIndex) => (
                    <div
                      key={planIndex}
                      className={`p-6 ${
                        planIndex < plans.length - 1
                          ? "border-r border-gray-100"
                          : ""
                      } ${plan.bgColor} ${
                        feature.key === "features" ? "" : "text-center"
                      }`}
                    >
                      {feature.key === "userLimit" && (
                        <span className="text-gray-700 font-medium">
                          {plan.userLimit}
                        </span>
                      )}
                      {feature.key === "additionalUsers" && (
                        <div>
                          <span className="text-sm text-gray-600">
                            {plan.additionalUsers.price}
                          </span>
                          <p className="text-xs text-gray-500">
                            {plan.additionalUsers.note}
                          </p>
                        </div>
                      )}
                      {feature.key === "infrastructure" && (
                        <div className="flex items-center justify-center space-x-2">
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                          <span className="text-gray-700">
                            {plan.infrastructure}
                          </span>
                        </div>
                      )}
                      {feature.key === "licenseType" && (
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
                            plan.licenseType === "Annual"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {plan.licenseType}
                        </span>
                      )}
                      {feature.key === "features" && (
                        <div className="space-y-2">
                          {plan.features.map((feat, featIndex) => (
                            <div
                              key={featIndex}
                              className="flex items-center space-x-2"
                            >
                              <CheckCircle2 className="w-4 h-4 text-green-500" />
                              <span className="text-sm text-gray-600">
                                {feat}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden space-y-4">
        {plans.map((plan, index) => (
          <Card
            key={index}
            className={`${plan.bgColor} border-2 ${
              plan.color === "blue" ? "border-blue-200" : "border-gray-200"
            }`}
          >
            <CardContent className="p-0">
              {/* Card Header */}
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {plan.name}
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleCard(index)}
                    className="p-1"
                  >
                    {expandedCards[index] ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </Button>
                </div>

                {/* Quick Overview */}
                <div className="mt-2 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Users:</span>
                    <span className="text-sm font-medium">
                      {plan.userLimit}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">License:</span>
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                        plan.licenseType === "Annual"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {plan.licenseType}
                    </span>
                  </div>
                </div>
              </div>

              {/* Expandable Details */}
              {expandedCards[index] && (
                <div className="p-4 space-y-4">
                  {/* Additional Users */}
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Settings className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 mb-1">
                        Additional Users
                      </h4>
                      <p className="text-sm text-gray-600">
                        {plan.additionalUsers.price}
                      </p>
                      <p className="text-xs text-gray-500">
                        {plan.additionalUsers.note}
                      </p>
                    </div>
                  </div>

                  {/* Infrastructure */}
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Database className="w-4 h-4 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 mb-1">
                        Infrastructure
                      </h4>
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-gray-600">
                          {plan.infrastructure}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <BarChart3 className="w-4 h-4 text-orange-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 mb-2">
                        Key Features
                      </h4>
                      <div className="space-y-2">
                        {plan.features.map((feature, featIndex) => (
                          <div
                            key={featIndex}
                            className="flex items-center space-x-2"
                          >
                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                            <span className="text-sm text-gray-600">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
