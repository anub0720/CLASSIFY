import './Home.css'; // Import the CSS file for Home component styling
import Footer from './Footer'; // Import the Footer component
import  { useEffect, useState } from 'react';
function Home() {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formattedDate = dateTime.toLocaleDateString();
  const formattedTime = dateTime.toLocaleTimeString();
  return (
    <div className="home-container">
      <div id="calendar">
          <div>Date:-{formattedDate}</div>
          <div>Time:-{formattedTime}</div>
        </div>
      <div className="intro-content">
      
        <h1>Welcome to Classify</h1>
        <br/>
        <br/>
        <br/>
        <br/>
        <p>
          Step into a modern Gurukul where learning transcends traditional
          boundaries. At Classify, we blend the timeless wisdom of ancient
          education with the innovative tools of today, providing a seamless and
          enriching experience for both teachers and students. Join us in
          revolutionizing education, one click at a time.
        </p>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
