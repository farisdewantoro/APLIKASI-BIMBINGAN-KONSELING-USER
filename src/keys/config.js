let URL_API;

if (process.env.NODE_ENV === 'production') {
  URL_API = 'https://stark-inlet-37255.herokuapp.com';
} else {
  URL_API = 'http://localhost:5050';
}

export  {
    URL_API}; 