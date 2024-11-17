// import React from 'react';

// interface NewsArticleProps {
//   image: string;
//   title: string;
//   content: string;
//   date: string; // New date property
//   reverse?: boolean;
// }

// const NewsArticle: React.FC<NewsArticleProps> = ({ image, title, content, date, reverse = false }) => (
//   <div className={`flex flex-col md:flex-row items-center gap-4 p-4 border-b  ${reverse ? 'md:flex-row-reverse' : ''}`}>
//     <div className="md:w-1/2">
//       <img src={image} alt="news" className="w-full h-auto  border border-gray-400" />
//     </div>
//     <div className="md:w-2/3 text-left">
//       <h2 className="text-4xl font-bold text-black hover:text-blue-600 transition duration-200">{title}</h2>
//       <p className="text-xl font-semibold text-red-600 mt-1 mb-2">{date}</p> {/* Highlighted date */}
//       <p className="text-base text-gray-800 leading-7">{content}</p>
//     </div>
//   </div>
// );

// interface Article {
//   image: string;
//   title: string;
//   content: string;
//   date: string; // New date property
//   reverse?: boolean;
// }

// const Newspaper: React.FC = () => {
//     const articles: Article[] = [
//         {
//           image: "https://plus.unsplash.com/premium_photo-1707080369554-359143c6aa0b?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fG5ld3N8ZW58MHx8MHx8fDA%3D",
//           title: "இந்திய அணியின் புதிய பயிற்சியாளர் நியமனம்",
//           content: "டெல்லி: இந்திய கிரிக்கெட் அணியின் புதிய பயிற்சியாளராக முன்னாள் வீரர் நியமிக்கப்பட்டுள்ளார். அவர் அணியின் வெற்றிக்கான புதிய யோசனைகளை கொண்டு வருவார் என எதிர்பார்க்கப்படுகிறது...",
//           date: "2024-03-01", // Example date
//           reverse: false,
//         },
//         {
//           image: "https://plus.unsplash.com/premium_photo-1707080369554-359143c6aa0b?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fG5ld3N8ZW58MHx8MHx8fDA%3D",
//           title: "ஒலிம்பிக் போட்டிகளில் இந்திய வீரர்களின் சாதனைகள்",
//           content: "டோக்கியோ: 2020 ஒலிம்பிக் போட்டிகளில் இந்திய வீரர்கள் பல சாதனைகளை நிகழ்த்தியுள்ளனர். சிலர் தங்கம் மற்றும் வெள்ளி பதக்கம் வென்றுள்ளனர்...",
//           date: "2024-03-02", // Example date
//           reverse: true,
//         },
      
//       ];

//   return (
//     <div className="w-full mx-auto my-2 p-4 bg-white m-1  rounded-lg shadow-lg">
//       <header className="text-center py-4 border-b-4 border-black">
//         <h1 className="text-4xl font-bold text-black">GameOnSolution</h1> {/* Updated heading */}
//         <p className="text-lg text-gray-600">உலக அளவிலான நம்பகமான விளையாட்டு செய்திகள்</p>
//       </header>
      
//       {articles.map((article, index) => (
//         <NewsArticle 
//           key={index} 
//           image={article.image} 
//           title={article.title} 
//           content={article.content} 
//           date={article.date} // Pass the date to NewsArticle
//           reverse={article.reverse} 
//         />
//       ))}

//       <footer className="text-center py-4 border-t-4 border-black text-gray-600">
//         &copy; 2024 GameOnSolution - அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை
//       </footer>
//     </div>
//   );
// };

// export default Newspaper;

import React, { useEffect, useState, useRef } from 'react';

const NewsPaper = () => {
  const [active, setActive] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const playerRef = useRef(null);
  const newsItems = [
    {
      id: 1,
      imgSrc: "https://plus.unsplash.com/premium_photo-1707080369554-359143c6aa0b?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fG5ld3N8ZW58MHx8MHx8fDA%3D",
      text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odio, veritatis!",
      date: "November 6, 2024",
      videoSrc: "https://www.youtube.com/watch?v=HNlNcOWH4xg" // Example YouTube video link
    },
    {
      id: 2,
      imgSrc: "https://cdn.pixabay.com/photo/2017/06/26/19/03/news-2444778_960_720.jpg",
      text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odio, veritatis!",
      date: "November 6, 2024",
      videoSrc: "https://www.youtube.com/watch?v=dZV22FFKUUI" // Example YouTube video link
    },
    {
      id: 3,
      imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1TkomunZDeJey7-o6mPI5Lie-D5JSgaEV0kxfLSs0_WD50XXeaYcA7brZJQNaSbt9ZI4&usqp=CAU",
      text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odio, veritatis!",
      date: "November 6, 2024",
      videoSrc: "https://www.youtube.com/watch?v=HNlNcOWH4xg" // Example YouTube video link
    },
    {
      id: 4,
      imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5F81DAj8AFq-aAhcVlOXdQdlQoFcsA57G7hM5_UK9Tw0gS46BEO1sezLJRKtdteyJreU&usqp=CAU",
      text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odio, veritatis!",
      date: "November 6, 2024",
      videoSrc: "https://www.youtube.com/watch?v=dZV22FFKUUI" // Example YouTube video link
    }
  ];

  useEffect(() => {
    // Only set the interval if isPlaying is false
    if (!isPlaying) {
      const timer = setInterval(() => {
        setActive(prev => (prev + 1) % newsItems.length);
      }, 5000); // Change news every 5 seconds
  
      return () => {
        clearInterval(timer);
      };
    }
  }, [isPlaying, newsItems.length]);
  
  useEffect(() => {
    const handleScroll = () => {
      if (!isPlaying) {
        setActive(prev => (prev + 1) % newsItems.length);
      }
    };
  
    window.addEventListener('scroll', handleScroll);
  
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isPlaying]);

  const handleItemClick = (index:number) => {
    setActive(index);
    if (playerRef.current) {
        //@ts-ignore
      playerRef.current.pauseVideo();
    }
  };

  function getCurrentDay() {
    const monthsOfYear = [
      "January", "February", "March", "April", "May", "June", 
      "July", "August", "September", "October", "November", "December"
    ];

    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const today = new Date();
    const dayIndex = today.getDay();
    const day = today.getDate();
    const monthIndex = today.getMonth();
    const monthName = monthsOfYear[monthIndex];
    const getCurrentYear = today.getFullYear();

    return { day: daysOfWeek[dayIndex], monthWithDate: `${monthName} ${day}`, currentYear: getCurrentYear };
  }

  const onYouTubeIframeAPIReady = () => {
    //@ts-ignore
    playerRef.current = new window.YT.Player('youtube-player', {
      height: '390',
      width: '640',
      videoId: 'dZV22FFKUUI',
      events: {
        'onStateChange': onPlayerStateChange,
        'onReady': (event:any) => {
          event.target.playVideo();
        }
      }
    });
  };
  const onPlayerStateChange = (event: any) => {
    //@ts-ignore
    if (event.data === window.YT.PlayerState.PLAYING) {
        setIsPlaying(true)
      console.log("Video is playing.");
      //@ts-ignore
    } else if (event.data === window.YT.PlayerState.PAUSED) {
        setIsPlaying(false)
      console.log("Video is paused.");
      //@ts-ignore
    } else if (event.data === window.YT.PlayerState.ENDED) {
     setIsPlaying(false)
      console.log("Video has ended.");
    }
  };
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(script);
    //@ts-ignore
    window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;

    return () => {
      if (playerRef.current) {
        //@ts-ignore
        playerRef.current.destroy();
      }
    };
  }, []);

  useEffect(() => {
    if (playerRef.current) {
        //@ts-ignore
      playerRef.current.loadVideoById(newsItems[active].videoSrc.split('v=')[1]);
    }
  }, [active]);

  return (
    <div className="w-full p-3 mx-auto overflow-y-scroll" style={{ height: '100vh', scrollBehavior: 'smooth' }}>
      <header>
        <h1 className="text-4xl uppercase">Game on solution</h1>
        <div className="flex items-center mb-8 border-b border-gray-300 pb-2">
          <p className="font-bold capitalize mr-2">{getCurrentDay().day} <span className="text-gray-500 font-light border-r border-gray-300 pr-2">{getCurrentDay().monthWithDate} {getCurrentDay().currentYear}</span></p>
          <p className="text-crimson uppercase font-light">news & awards</p>
        </div>
      </header>

      <div className="w-full flex flex-col md:grid md:grid-cols-[2fr_1fr] h-[90%] gap-6">
        <div className="left flex flex-col">
          <div id="youtube-player" className="w-full h-64 md:h-[90%] transition-transform duration-500"></div>
          <h2 className="text-2xl md:text-3xl leading-tight mb-2">{newsItems[active].text}</h2>
          <p className="text-gray-500">{newsItems[active].date}</p>
        </div>

        <div className="right flex flex-col">
          <h3 className="text-2xl uppercase text-crimson mb-2">Latest News</h3>
          <div className="grid grid-cols-1 gap-5">
            {newsItems.map((item, index) => (
              <div 
                key={item.id} 
                className={`flex list transition-transform duration-500 cursor-pointer ${active === index ? 'bg-gray-100' : ''}`} 
                onClick={() => handleItemClick(index)}
              >
                <img src={item.imgSrc} alt={`photo ${item.id}`} className="w-20 h-20 mr-3 object-cover"/>
                <div>
                  <p className="text-sm md:text-base">{item.text}</p>
                  <p className="text-gray-500 text-xs md:text-sm">{item.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewsPaper;