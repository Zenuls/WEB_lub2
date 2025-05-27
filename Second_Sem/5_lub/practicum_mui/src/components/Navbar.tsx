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
                Самые высокие здания и сооружения
              </Typography>
              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <Button color="info" size="medium" variant={active === "1" ? "contained" : "text"} >
                  Главная
                </Button>
                <Button color="info" size="medium" variant={active === "2" ? "contained" : "text"} >
                  Список зданий
                </Button>
                <Button color="info" size="medium" variant={active === "3" ? "contained" : "text"} >
                  Контакты
                </Button>
              </Box>
              <Box sx={{ display: { xs: 'flex', md: 'none' }}}>    
                <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
                  <MenuIcon />
                </IconButton>              
                <Drawer
                  anchor="top"
                  open={ open }
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
                   <MenuItem className='item_main' selected={active === "1"}> Главная </MenuItem>
                   <MenuItem selected={active === "2"}>Список зданий</MenuItem>
                   <MenuItem selected={active === "3"}>Контакты</MenuItem>  
                  </Box>
                </Drawer>      
              </Box>
            </StyledToolbar>
          </Container>  
        </AppBar>
    );
}

export default Navbar;