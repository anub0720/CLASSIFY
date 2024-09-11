import { Link } from "react-router-dom";

export default function InvoicesPage() {
  return (
    <div>
      <h1>Invoices Page</h1>
      <p>This is a protected page.</p>
      <ul>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/">Return to Index</Link></li>
      </ul>
    </div>
  );
}
