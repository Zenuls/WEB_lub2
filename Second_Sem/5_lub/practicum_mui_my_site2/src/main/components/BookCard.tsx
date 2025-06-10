import Card from '@mui/material/Card';

import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

interface ComponentProps {
    book: {
        img: string, 
        title: string,
        author: string,
        description: string[],
    };
    index: number;
}

const StyledTypography = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.secondary,
    textAlign: 'justify',
    marginBottom: theme.spacing(2),
}));

function BookCard({ book, index }: ComponentProps) {
    let pos = index % 2 === 0;
    return (
      <Card sx={{ display: 'flex', flexDirection: pos ? 'row' : 'row-reverse', mb: 3 }}>
        <CardMedia
            component="img"
            alt={book.title}
            image={book.img}
            sx={{ width: 200, objectFit: 'cover' }}
        />
        <Box sx={{ flex: 1 }}>
          <CardContent>
            <Typography gutterBottom variant="h5">
              {book.title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              {book.author}
            </Typography>
            {book.description.map((item, ind) => (
              <StyledTypography key={ind} variant="body2">    
                {item}
              </StyledTypography>
            ))}
          </CardContent>
        </Box>
      </Card>
    )
}

export default BookCard;