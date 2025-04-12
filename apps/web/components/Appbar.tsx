import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { ModeToggle } from "./ui/theme-toggle";

const Appbar = () => {
  return (
    <div className="flex items-center justify-between px-4 py-2">
      <div>
        <h1 className="text-xl">imageGen</h1>
      </div>
      <div className="flex items-center gap-4">
        <div>
          <ModeToggle />
        </div>
        <div>
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </div>
  );
};

export default Appbar;
