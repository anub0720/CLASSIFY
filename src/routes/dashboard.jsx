import { Link } from "react-router-dom";

export default function DashboardPage() {
  return (
    <div>
      <h1>Dashboard Page</h1>
      <p>This is a protected page.</p>
      <ul>
        <li><Link to="/dashboard/invoices">Invoices</Link></li>
        <li><Link to="/">Return to Index</Link></li>
      </ul>
    </div>
  );
}
