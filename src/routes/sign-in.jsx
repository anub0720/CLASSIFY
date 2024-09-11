import { SignIn } from '@clerk/clerk-react';

export default function SignInPage() {
  return (
    <SignIn
      path="/sign-in"
      routing="path"
      redirectUrl="/" // Redirect to the home page after sign-in
    />
  );
}
