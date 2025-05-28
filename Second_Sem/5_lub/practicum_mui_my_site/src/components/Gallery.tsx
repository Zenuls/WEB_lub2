import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Box from '@mui/material/Box';
import books from "../data";
import Container from '@mui/material/Container';
import ImageListItemBar from '@mui/material/ImageListItemBar';

const imgData = books.slice(0, 4);

function Gallery() {
  return ( 
    <Container maxWidth="lg">
      <Box sx={{ height: 480, overflowY: 'scroll', m: '20px auto'}}>
        <ImageList 
          variant="masonry" 
          sx={{
            columnCount: {
              xs: '1 !important',
              sm: '2 !important',
              lg: '4 !important',
            },
          }} 
          gap={8}
        >
          {imgData.map((item) => (
            <ImageListItem key={item.img}>
              <img
                srcSet={item.img}
                src={item.img}
                alt={item.title}
                loading="lazy"
              />
              <ImageListItemBar position="bottom" title={item.title} />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
    </Container>
  );
}

export default Gallery;