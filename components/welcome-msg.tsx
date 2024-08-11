"use client";

import { useUser } from "@clerk/nextjs";

interface WelcomeMsgProps {
  // Define your props here
}

export default function WelcomeMsg({}: WelcomeMsgProps) {
  const { user, isLoaded } = useUser();
  return (
    <div className="mb-4 space-y-2">
      <h2 className="text-2xl font-medium text-white lg:text-4xl">
        Welcome back{isLoaded ? ", " : " "}
        {user?.firstName}
      </h2>
      <p className="text-sm text-sky-200 lg:text-base">
        This is financial overview report
      </p>
    </div>
  );
}
