import { SignIn, SignUp } from "@clerk/clerk-react";

const ClerkAuth = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
      <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" />
    </div>
  );
};

export default ClerkAuth;
