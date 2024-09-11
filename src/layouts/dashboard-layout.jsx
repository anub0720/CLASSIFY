import { Link, Outlet } from 'react-router-dom';
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';

export default function DashboardLayout() {
  return (
    <>
      <header className="header">
        <div>
          <p>Clerk + React + React Router App</p>
          <nav>
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <Link to="/sign-in">Sign In</Link>
            </SignedOut>
          </nav>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}
