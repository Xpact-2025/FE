
import 'swiper/css';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Section1 from '../components/LandingPage/Section1';
import Section2 from '../components/LandingPage/Section2';
import Section3 from '../components/LandingPage/Section3';
import Section4 from '../components/LandingPage/Section4';
import Section5 from '../components/LandingPage/Section5';
import Section6 from '../components/LandingPage/Section6';
import Section7 from '../components/LandingPage/Section7';


export default function LandingPage() {
  return (
    <>
      <NavBar />
      <div className='mb-[100px]'/>
      <Section1/>
      <Section2/>
      <Section3/>
      <Section4/>
      <Section5/>
      <Section6/>
      <Section7/>
      <Footer/>      
    </>
  );
}
