import Link from "next/link";

export default ({ currentUser }) => {
  const options = [
    !currentUser && { label: "Sign Up", href: "/auth/signup" }, //false case user sign in
    !currentUser && { label: "Sign In", href: "/auth/signin" }, //false case user sign in
    currentUser && { label: `Sell Tickets`, href: "/tickets/new" },
    currentUser && { label: `My Orders`, href: "/orders" },
    currentUser && { label: "Sign Out", href: "/auth/signout" }, //exp null case user is not signed in
  ];
  const links = options
    .filter((linkConfig) => linkConfig)
    .map(({ label, href }) => {
      return (
        <li key={href} className="nav-item">
          <Link href={href} style={{ textDecoration: "none" }}>
            <div className="nav-link ">{label}</div>
          </Link>
        </li>
      );
    });

  return (
    <nav
      className="navbar navbar-expand-lg bg-dark fs-2"
      data-bs-theme="dark"
    >
      <div class="container-fluid">
        <Link href="/" style={{ textDecoration: "none" }}>
          <div className="navbar-brand">SRayen</div>
        </Link>
        <div className="d-flex justify-content-end">
          <ul className="nav d-flex align-items-center">{links}</ul>
        </div>
      </div>
    </nav>
  );
};
