import { Box, Typography, styled } from '@mui/material';

const FooterContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.grey[300], 
  padding: theme.spacing(2),
  marginTop: "20px", 
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',

}));

function Footer() {
  return (
    <FooterContainer >
      <Typography variant="body1">Иванов В. А.</Typography>
      <Typography variant="body1">Б9122-09.03.04</Typography>
    </FooterContainer>
  );
}

export default Footer;