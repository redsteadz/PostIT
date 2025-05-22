"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Lottie from "lottie-react";
import error_lottie from "./error_lottie.json";

export default function ErrorPage() {
  return (
    <>
      <div className="flex justify-center items-center">
        <Card className="text-center">
          <CardHeader>
            <CardTitle className="font-bold underline">
              YOU ARE NOT THE PERSON
            </CardTitle>
            <CardDescription>
              You must login with a{" "}
              <span className="italic">
                specific email to get authorization
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center items-center">
            <Lottie animationData={error_lottie} className="w-36" />
          </CardContent>
          <CardFooter className="flex justify-center items-center">
            <p>Login from the correct account please and thank you</p>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
