import * as React from 'react';
import { InputLabel, FormControl, Button, Select, MenuItem, Box, Grid, ThemeProvider, createTheme} from '@mui/material';
import axios from 'axios'
import Linkify from 'react-linkify';
import WebFont from 'webfontloader';
import CssBaseline from '@mui/material/CssBaseline';
import GitHubIcon from '@mui/icons-material/GitHub';

function App() {
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });
  const baseUrl = `https://www.thaqalayn-api.net/api/v2`
  let books = [ {value: 'allBooks', text: 'All Books'}];

  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ['Droid Sans', 'Abel', 'Source Sans Pro']
      }
    });
    const fetchData = async () => {
      const data = await axios.get(`${baseUrl}/allbooks`)
      for (let i = 0;i<data.data.length;i++) {
        let someBook = data.data[i]
        let newAuthor = someBook.author.split("al-");
        books.push({value:someBook.bookId,text:someBook.BookName+" al-"+newAuthor[newAuthor.length-1]})
      }
      setAllBooks(books)
    }
    fetchData()
  }, []);


  const [englishText, setEnglishText] = React.useState("")
  const [arabicText, setArabicText] = React.useState("")
  const [book, setBook] = React.useState("")
  const [behdudiGrading, setBehdudiGrading] = React.useState("")
  const [majlisiGrading, setMajlisiGrading] = React.useState("")
  const [mohseniGrading, setMohseniGrading] = React.useState("")
  const [chapter, setChapter] = React.useState("")
  const [URL, setURL] = React.useState("")
  const [chosenBook, setChosenBook] = React.useState(books[0].value)
  const [allBooks, setAllBooks] = React.useState([])
  const [author, setAuthor] = React.useState("")

  const getBookElementText = (item) => {
    if (item.text === "URL") {
      return <Linkify><a target="blank" style={{color:"#FFFBDB"}} href={URL}>{URL}</a></Linkify>
    }
    else {
      return item.item
    }
  }
  const fullHadithKit = [
    {item:englishText, text: "English Text"},
    {item:arabicText, text: "Arabic Text"},
    {item:book, text: "Book"},
    {item:author,text: "Author"},
    {item:chapter, text: "Chapter"},
    {item:majlisiGrading, text: "Majlisi Grading"},
    {item:behdudiGrading, text: "Behdudi Grading"},
    {item:mohseniGrading, text: "Mohseni Grading"},
    {item:URL, text: "URL"},
  ]

  const handleBookChange = (event) => {
    setChosenBook(event.target.value)
  };
  const generateRandomHadith = async () => {
    let request = undefined
    let data = undefined
    console.log("chosenBook: ",chosenBook);
    if (chosenBook === "allBooks") {
      request = await axios.get(`${baseUrl}/random`)
      data = request.data
      console.log("data after clicking button: ",data);
    }
    else {
      const requestURL = baseUrl +"/"+ chosenBook+"/random" 
      request = await axios.get(requestURL)
      data = request.data[0]
      console.log("data after clicking button: ",data);
    }
    setEnglishText(data.englishText)
    setArabicText(data.arabicText)
    setBook(data.book)
    setAuthor(data.author)
    setChapter(data.chapter)
    setMajlisiGrading(data.majlisiGrading)
    setBehdudiGrading(data.behdudiGrading)
    setMohseniGrading(data.mohseniGrading)
    setURL(data.URL)
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
    <div className="App">
      <Grid container>
        <Grid item xs={2} md={3}></Grid>
        <Grid item xs={8} md={6}>
          <Box display="flex" justifyContent="center"
          alignItems="center">
            <h1 style={{fontFamily: "Source Sans Pro"}}>Random hadith generator from hadiths found on Thaqalayn.net</h1>
          </Box>
          <Box display="flex" justifyContent="center"
          alignItems="center">
            <p style={{fontFamily: "Source Sans Pro"}}>
              This page is a simple UI showcasing one endpoint from an API created to retrieve hadiths found on Thaqalayn.net. 
              API details can be found on my  <a href="https://github.com/MohammedArab1/ThaqalaynAPI" style={{color:"#FFFBDB"}} target="_blank">github page</a>.
            </p>
          </Box>
        </Grid>
        <Grid item xs={2} md={3}>
        </Grid>
      </Grid>

      <Box
        m={1}
        display="flex"
        justifyContent="center"
        alignItems="center"

      >
        <FormControl variant="standard" sx={{ m: 1, minWidth: 150 }} size="small">
            <InputLabel id="chooseBook">Choose a book</InputLabel>
            <Select
              labelId="chooseBook"
              id="chooseBookSelect"
              value={chosenBook}
              onChange={handleBookChange}
              autoWidth
            >
              {allBooks.map(book => (
                <MenuItem value={book.value} key={book.value}>
                  {book.text}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        <Button variant="contained" color="primary" disableElevation onClick={() => {generateRandomHadith()}} >Generate Hadith</Button>
      </Box>
      <Grid container>
        <Grid item xs={1} md={2}></Grid>
        <Grid item xs={10} md={8}>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="stretch"
            spacing={4}
            >
            {fullHadithKit.map(item => {
              return item.item &&
              <Grid item xs={6} md={6} key={item.text}>
                <div>
                  <h3>
                    {item.text}
                  </h3>
                  <span style={{fontFamily: "Source Sans Pro",fontSize:"1.2rem"}}>{getBookElementText(item)}</span>
                </div>
              </Grid>
            })}
          </Grid>
        </Grid>
        <Grid item xs={1} md={2}>
        </Grid>
      </Grid>
      <Grid container
            direction="row-reverse"
            justifyContent="flex-start"
            alignItems="flex-end">
            <Grid item>
            <Button color="primary" size="large" startIcon={<GitHubIcon fontSize="large"></GitHubIcon> } onClick={(e) => {
              window.open('https://github.com/MohammedArab1/ThaqalaynAPI', "_blank")}}>
              
            </Button>
            </Grid>
          </Grid>
      
    </div>
    </ThemeProvider>
  );
}

export default App;
