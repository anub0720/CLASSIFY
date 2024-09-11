import { SignUp } from '@clerk/clerk-react';

export default function SignUpPage() {
  return (
    <SignUp
      path="/sign-up"
      routing="path"
      fallbackRedirectUrl="/" // Redirect to the home page after sign-up
    />
  );
}
