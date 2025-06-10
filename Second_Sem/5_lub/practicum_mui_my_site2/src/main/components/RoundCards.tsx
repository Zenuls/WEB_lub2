import { Box, Typography, styled } from '@mui/material';
import books from "../../data";

let roundCards = [books[4], books[5], books[6]];


const RoundCards = () => {
  const RoundImage = styled('img')(({ theme }) => ({
    width: 150,
    height: 150,
    borderRadius: '50%',
    objectFit: 'cover',
    border: `3px solid ${theme.palette.primary.main}`,
    [theme.breakpoints.down('sm')]: {
      width: 120,
      height: 120
    }
  }));

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: { xs: 'column', sm: 'row' },
      justifyContent: 'center',
      alignItems: 'center',
      gap: 8,
      my: 6,
      px: 2
    }}>
      {roundCards.map((card, index) => (
        <Box key={index} sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          maxWidth: 400,
          textAlign: 'center'
        }}>
          <RoundImage src={card.img} alt={card.title} />
          <Typography variant="h6" sx={{ mt: 2, fontWeight: 'bold' }}>
            {card.title}
          </Typography>
          <Typography variant="subtitle2" sx={{ mb: 1, fontStyle: 'italic' }}>
            {card.author}
          </Typography>
          <Typography variant="body2">
            {card.description}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default RoundCards;