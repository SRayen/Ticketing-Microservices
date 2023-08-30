import Link from "next/link";

export default ({ currentUser }) => {
  const options = [
    !currentUser && { label: "Sign Up", href: "/auth/signup" }, //false case user sign in
    !currentUser && { label: "Sign In", href: "/auth/signin" }, //false case user sign in
    currentUser && { label: "Sign Out", href: "/auth/signout" }, //exp null case user is not signed in
  ];
  const links = options
    .filter((linkConfig) => linkConfig)
    .map(({ label, href }) => {
      return (
        <li key={href} className="nav-item">
          <Link href={href}>
            <div className="nav-link">{label}</div>
          </Link>
        </li>
      );
    });

  return (
    <nav className="navbar navbar-light bg-light">
      <Link href="/">
        <div className="navbar-brand">GitTix</div>
      </Link>
      <div className="d-flex justify-content-end">
        <ul className="nav d-flex align-items-center">{links}</ul>
      </div>
    </nav>
  );
};
