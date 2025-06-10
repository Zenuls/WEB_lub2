import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import books from "../../data";
import BookCard from './BookCard';

const cardData = [books[0], books[3]];

function Content() {
  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
      <Grid container spacing={{ xs: 3, md: 6 }}>
        {cardData.map((item, index) => (
          <Grid key={index} size={{ xs: 12, md: 6 }} >
            <BookCard book={item} index={index}/>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Content;