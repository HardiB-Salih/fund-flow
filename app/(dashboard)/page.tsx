"use client";

import { Button } from "@/components/ui/button";
import { useNewAccount } from "@/features/accounts/hooks/use-new-account";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
  const { onOpen } = useNewAccount();

  return (
    <main>
      <Button onClick={onOpen}>Click me</Button>
      <UserButton />
    </main>
  );
}
