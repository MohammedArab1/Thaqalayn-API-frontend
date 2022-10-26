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

  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ['Droid Sans', 'Abel', 'Source Sans Pro']
      }
    });
  }, []);
  const books = [
    {value: 'allBooks', text: 'All Books'},
    {value: 'Al-Amali', text: 'Al-Amālī'},
    {value: 'Al-Khisal', text: 'Al-Khiṣāl'},
    {value: 'Al-Kafi-Volume1', text: 'Al-Kāfi - Volume 1'},
    {value: 'Al-Kafi-Volume2', text: 'Al-Kāfi - Volume 2'},
    {value: 'Al-Kafi-Volume3', text: 'Al-Kāfi - Volume 3'},
    {value: 'Al-Kafi-Volume4', text: 'Al-Kāfi - Volume 4'},
    {value: 'Al-Kafi-Volume5', text: 'Al-Kāfi - Volume 5'},
    {value: 'Al-Kafi-Volume6', text: 'Al-Kāfi - Volume 6'},
    {value: 'Al-Kafi-Volume7', text: 'Al-Kāfi - Volume 7'},
    {value: 'Al-Kafi-Volume8', text: 'Al-Kāfi - Volume 8'},
    {value: 'Al-Tawhid', text: 'Al-Tawḥīd'},
    {value: 'Fadail-al-Shia', text: 'Faḍaʾil al-Shīʿa'},
    {value: 'Kamil-Al-Ziyarat', text: 'Kāmil al-Ziyārāt'},
    {value: 'Kitab-Al-Ghayba-numani', text: 'Kitāb al-Ghayba al-Nuʿmānī'},
    {value: 'Kitab-Al-Ghayba-Tusi', text: 'Kitāb al-Ghayba al-Ṭūsī'},
    {value: 'Mujam-al-Ahadith-al-Mutabara', text: 'Muʿjam al-Aḥādīth al-Muʿtabara'},
    {value: 'Rijal-Ibn-al-Ghadairi', text: "Rijāl Ibn al-Ghaḍā'irī"},
    {value: 'Sifat-Al-Shia', text: 'Ṣifāt al-Shīʿa'},
    {value: 'Thawab-al-Amal-waiqab-al-Amal', text: 'Thawāb al-Aʿmāl wa ʿiqāb al-Aʿmāl'},
    {value: 'Uyun-akhbar-al-Rida-Volume1', text: 'ʿUyūn akhbār al-Riḍā - Volume 1'},
    {value: 'Uyun-akhbar-al-Rida-Volume2', text: 'ʿUyūn akhbār al-Riḍā - Volume 2'},
  ];

  const [englishText, setEnglishText] = React.useState("")
  const [arabicText, setArabicText] = React.useState("")
  const [book, setBook] = React.useState("")
  const [behdudiGrading, setBehdudiGrading] = React.useState("")
  const [majlisiGrading, setMajlisiGrading] = React.useState("")
  const [mohseniGrading, setMohseniGrading] = React.useState("")
  const [chapter, setChapter] = React.useState("")
  const [URL, setURL] = React.useState("")
  const [chosenBook, setChosenBook] = React.useState(books[0].value)

  //used by getBookElementText to return the proper name of the book based on the "english name"
  const getBookText = (book) => {
    const element = books.find(item => item.value === book)
    return element
  }
  //takes an item from 'fullHadithKit' array, if we're looking at a book or a URL, we return something special. Else, just return the normal text
  const getBookElementText = (item) => {
    if (item.text === "Book") {
      return getBookText(book).text
    } 
    else if (item.text === "URL") {
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
    if (chosenBook === "allBooks") {
      request = await axios.get("/api/random")
      data = request.data
    }
    else {
      const requestURL = "/api/" + chosenBook+"/" +"random"
      request = await axios.get(requestURL)
      data = request.data[0]
    }
    setEnglishText(data.englishText)
    setArabicText(data.arabicText)
    setBook(data.book)
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
              {books.map(book => (
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
              return item.item.length > 0 &&
              <Grid item xs={6} md={6} key={item.text}>
                <div>
                  <h3>
                    {item.text}
                  </h3>
                  <span style={{fontFamily: "Source Sans Pro",fontSize:"1.2rem"}}>{getBookElementText(item)}</span>
                </div>
              </Grid>
              // style={{fontSize:fontSize, fontWeight:fontWeight}}
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
