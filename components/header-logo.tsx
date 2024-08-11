import Image from "next/image";
import Link from "next/link";

interface HeaderLogoProps {
  // Define your props here
}

export default function HeaderLogo({}: HeaderLogoProps) {
  return (
    <Link href="/">
      <div className="hidden items-baseline justify-center lg:flex">
        <Image src="/logo.svg" alt="Logo" height={28} width={28} />
        <p className="ml-2.5 text-2xl font-semibold text-white">FundFlow</p>
      </div>
    </Link>
  );
}
