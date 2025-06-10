import Navbar from '../components/Navbar';
import "../styles/App.css";
import Gallery from './components/Gallery';
import Content from './components/Content';
import Footer from '../components/Footer';
import RoundCards from './components/RoundCards';

function Main() {
  return (
    <div>
      <Navbar active="1"/>
      <Gallery/>
      <RoundCards/>
      <Content/>
      <Footer /> 
    </div>
  );
}
 
export default Main;