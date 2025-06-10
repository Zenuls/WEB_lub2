import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import MenuItem from '@mui/material/MenuItem';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { Link } from 'react-router-dom';

interface ComponentProps {
  active: string;
}

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  border: '1px solid',
  borderColor: theme.palette.divider,
  padding: '8px 12px',
}));

function Navbar({ active }: ComponentProps) {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <AppBar
      position="static"
      sx={{
        boxShadow: 0,
        bgcolor: 'transparent',
        mt: '28px',
      }}
    >
      <Container maxWidth="xl">
        <StyledToolbar>
          <Typography variant="h6" sx={{ color: '#5d8aa8' }}>
            Самые популярные книги
          </Typography>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Link to="/">
              <Button color="info" size="medium" variant={active === "1" ? "contained" : "text"}>
                Самые популярные книги
              </Button>
            </Link>
            <Link to="/list">
              <Button color="info" size="medium" variant={active === "2" ? "contained" : "text"}>
                Список наиболее популярных книг
              </Button>
            </Link>


            <Link to="/chart">
              <Button color="info" size="medium" variant={active === "3" ? "contained" : "text"} >
                Диаграммы
              </Button>
            </Link>
            <Button color="info" size="medium" variant={active === "4" ? "contained" : "text"}>
              Меню_4
            </Button>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="top"
              open={open}
              onClose={toggleDrawer(false)}
            >
              <Box className='list'>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                  }}
                >
                  <IconButton onClick={toggleDrawer(false)}>
                    <CloseRoundedIcon />
                  </IconButton>
                </Box>
                <MenuItem className='item_main' selected={active === "1"}>Самые популярные книги</MenuItem>
                <MenuItem selected={active === "2"}>Список наиболее популярных книг</MenuItem>
                <MenuItem selected={active === "3"}>Меню_3</MenuItem>
                <MenuItem selected={active === "4"}>Меню_4</MenuItem>
              </Box>
            </Drawer>
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;