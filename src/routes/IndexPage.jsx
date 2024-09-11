import { Link } from 'react-router-dom';

export default function IndexPage() {
  return (
    <div>
      <h1>Welcome to Classify</h1>
      <div>
        <ul>
          <li><Link to="/sign-up">Sign Up</Link></li>
          <li><Link to="/sign-in">Sign In</Link></li>
        </ul>
      </div>
    </div>
  );
}
