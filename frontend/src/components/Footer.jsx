import Container from "./Container";

export default function Footer() {
  return (
    <footer className="bg-navy pt-16 pb-8">
      <Container>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-sm font-semibold text-white uppercase mb-4">Follow Us</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-slate-400 hover:text-sky">Github</a></li>
              <li><a href="#" className="text-sm text-slate-400 hover:text-sky">Instagram</a></li>
              <li><a href="#" className="text-sm text-slate-400 hover:text-sky">Figma</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white uppercase mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-slate-400 hover:text-sky">About</a></li>
              <li><a href="#" className="text-sm text-slate-400 hover:text-sky">Blog</a></li>
              <li><a href="#" className="text-sm text-slate-400 hover:text-sky">Careers</a></li>
              <li><a href="#" className="text-sm text-slate-400 hover:text-sky">Press</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white uppercase mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-slate-400 hover:text-sky">Documentation</a></li>
              <li><a href="#" className="text-sm text-slate-400 hover:text-sky">Help Center</a></li>
              <li><a href="#" className="text-sm text-slate-400 hover:text-sky">Community</a></li>
              <li><a href="#" className="text-sm text-slate-400 hover:text-sky">Tutorials</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white uppercase mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-slate-400 hover:text-sky">Privacy Policy</a></li>
              <li><a href="#" className="text-sm text-slate-400 hover:text-sky">Terms of Service</a></li>
              <li><a href="#" className="text-sm text-slate-400 hover:text-sky">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-400">© 2026 Raíces. All rights reserved.</p>
          <p className="text-sm text-slate-500">Made with 💚 for the Canary Islands</p>
        </div>
      </Container>
    </footer>
  );
}
