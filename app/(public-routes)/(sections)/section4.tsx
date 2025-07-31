import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

import { CheckIcon, MinusIcon } from "lucide-react";
import React from "react";

type Plan = {
  description?: string;
  mostPopular?: boolean;
  price: number;
  type?: string;
  features: string[];
};

const plans: Plan[] = [
  {
    type: "free",
    description: "Forever free",
    price: 0,
    features: [
      "1 interview per month",
      "10 minutes per interview",
      "Feedback on performance",
      "Track progress",
    ],
  },
  {
    type: "standard",
    price: 25,
    description: "All the basics plus resume review",
    mostPopular: true,
    features: [
      "5 interview per month",
      "15-20 minutes per interview",
      "All features from free plan",
      "Resume review",
    ],
  },
  {
    type: "advanced",
    price: 50,
    description: "Everything you need to prepare for interviews",
    features: [
      "10 interview per month",
      "15-20 minutes per interview",
      "All features from standard plan",
      "Interviews based on your resume",
    ],
  },
];

export default function PricingSectionCards() {
  return (
    <div className="w-full min-h-[100%] relative flex flex-row items-center gap-5 md:flex-row p-10 md:px-50 md:py-20 box-border">
      <div className="z-1 w-full h-full flex flex-col justify-center items-start gap-5">
        <Button
          className="rounded-full p-5 bg-transparent border-stone-300 hover:bg-transparent text-xl tracking-wide"
          variant="outline"
        >
          Pricing
        </Button>
        <div className="text-2xl md:text-3xl text-black flex flex-col w-full gap-5 tracking-wider max-w-[800px]  my-10">
          Whatever your status, our offers evolve according to your needs.
        </div>

        <div className="flex flex-col items-start gap-5 flew-wrap md:flex-row w-full">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`${
                plan.mostPopular ? "border-primary" : ""
              } flex-1 flex flex-col border-none shadow-lg`}
            >
              <CardHeader className="text-center pb-2 relative">
                {plan.mostPopular && (
                  <Badge className="uppercase w-max absolute top-0 left-20 -translate-x-1/2 -translate-y-1/2">
                    Most popular
                  </Badge>
                )}
                <span className="font-bold text-5xl">{"$" + plan.price}</span>
              </CardHeader>
              <CardDescription className="text-center w-11/12 mx-auto">
                {plan.description || "No description available"}
              </CardDescription>
              <CardContent className="flex-1">
                <ul className="mt-7 space-y-2.5 text-sm">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex space-x-2">
                      <CheckIcon className="flex-shrink-0 mt-0.5 h-4 w-4" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  variant={plan.mostPopular ? "default" : "outline"}
                >
                  Sign up
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
      <img
        className="w-full h-full p-0 object-cover absolute top-0 left-0"
        src="section2.jpg"
      />
    </div>
  );
}
