const warna = {
    grey: (opacity = 1) => `rgba(139, 104, 66, ${opacity})`,
    blue: (opacity = 1) => `rgba(101, 67, 33, ${opacity})`,   
    white: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, 
    black: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,       
    darkModeBlack: (opacity = 1) => `rgba(25, 25, 25, ${opacity})`, 
    darkModeBlue: (opacity = 1) => `rgba(70, 38, 20, ${opacity})`,  
    gold: (opacity = 1) => `rgba(255, 215, 0, ${opacity})`,  
  }
  
  export default warna;
  
