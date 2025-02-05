"use client"

import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { IoIosArrowDown } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";

export default function ProfileMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{textTransform:"none"}}
        className='text-white gap-2 hover:text-amber-300 transition duration-300'
      >
        <FaRegUser size={25}/><IoIosArrowDown size={25} /> 
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem component="a" href='/' target='_blank' onClick={handleClose} className='gap-3 hover:text-[#2263A3] transition duration-300'>Perfil<FaRegUser/></MenuItem>
        <MenuItem onClick={handleClose} className='gap-3 hover:text-[#2263A3] transition duration-300'>Logout <IoIosLogOut/></MenuItem>
      </Menu>
    </div>
  );
}