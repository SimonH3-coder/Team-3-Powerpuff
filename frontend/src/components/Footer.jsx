import Container from "./Container";

export default function Footer() {
  return (
    <footer className="bg-navy pt-16 pb-8">
      <Container>
        <div className="flex flex-col items-center text-center">
          <h3 className="text-sm font-semibold text-white uppercase mb-4">Follow Us</h3>
          <ul className="flex gap-6">
            <li><a href="#" className="text-sm text-slate-400 hover:text-sky">Github</a></li>
            <li><a href="#" className="text-sm text-slate-400 hover:text-sky">Canva</a></li>
            <li><a href="#" className="text-sm text-slate-400 hover:text-sky">Figma</a></li>
          </ul>
        </div>
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col items-center gap-2">
          <p className="text-sm text-slate-400">© 2026 Raíces. All rights reserved.</p>
          <p className="text-sm text-slate-500">Made with 💚 for the Canary Islands</p>
        </div>
      </Container>
    </footer>
  );
}
