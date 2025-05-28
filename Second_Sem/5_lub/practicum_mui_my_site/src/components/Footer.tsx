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
    <FooterContainer>
      <Typography variant="body1">Иванов В. А., группа 5, 2024-2025</Typography>
      <Typography variant="body1">✉ Контакты</Typography>
    </FooterContainer>
  );
}

export default Footer;