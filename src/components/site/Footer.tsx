export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <span>© {new Date().getFullYear()} Tony Anglesey</span>
        <span>Chicago and New York</span>
        <span>Built with Next.js and Tailwind</span>
      </div>
    </footer>
  );
}
