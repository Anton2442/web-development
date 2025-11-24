import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Care from './components/Care.jsx';
import Success from './components/Success.jsx';
import Team from './components/Team.jsx';
import Services from './components/Services.jsx';
import Professional from './components/Professional.jsx';
import Footer from './components/Footer.jsx';
import Copyright from './components/Copyright.jsx';

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Care />
        <Success />
        <Team />
        <Services />
        <Professional />
      </main>
      <Footer />
      <Copyright />
    </>
  );
}

