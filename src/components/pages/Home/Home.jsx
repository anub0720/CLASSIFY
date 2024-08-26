import  { useEffect, useState } from 'react';
import './Home.css';
import Footer from '../Footer/Footer';

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
        <div>{formattedDate}</div>
        <div>{formattedTime}</div>
      </div>
      <div className="intro-content">
        <h1>Welcome to Classify</h1>
        <p>
          Step into a modern Gurukul where learning transcends traditional
          boundaries. At Classify, we blend the timeless wisdom of ancient
          education with the innovative tools of today, providing a seamless and
          enriching experience for both teachers and students. Join us in
          revolutionizing education, one click at a time.
        </p>
      </div>
      <div className="footer-container">
        <Footer />
      </div>
    </div>
  );
}

export default Home;
