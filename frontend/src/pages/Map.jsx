import { Frame } from "../components/MapGuide";
import Container from "../components/Container";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Map = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white font-sans text-slate-800 antialiased">
      <Header />
      <main className="flex-1 py-16">
        <Container>
          <div className="flex items-center justify-center">
            <Frame />
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
};

export default Map;