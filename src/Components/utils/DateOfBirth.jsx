import { DateRangeOutlined } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";


export default function DateOfBirth({error, setError, setDate, providedDate}) {
  const dateProvided = providedDate ? new Date(providedDate) : new Date();
  const [startDate, setStartDate] = useState(dateProvided);
  const day = startDate.getDate();
  const month = startDate.getMonth() + 1;
  const year = startDate.getFullYear();

  useEffect(() => {
      if(startDate.getFullYear() === new Date().getFullYear()) setError('Date of birth should not earlier than 8 years');
      if(year > 2014) setError('Date of birth should not earlier than 8 years');
      if(year > new Date().getFullYear()) setError('Date of birth cannot input date in future');
      if(month > new Date().getMonth() + 1) setError('Date of birth cannot input date in future');
      if(day > new Date().getDate() && year === new Date().getFullYear()) setError('Date of birth cannot input date in future');
      setDate(month + '/' + day + '/' + year);
  }, [year, month, day,setDate, setError, startDate]);

  return (
    <>
    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
      <DateRangeOutlined sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
      <Box sx={{ minWidth: 120 }}>
          <DatePicker 
            selected={startDate} 
            value={startDate}
            onChange={(date) => {
              if(date.getFullYear() === 2000 && date.getMonth() === 0 && date.getDate() === 1){
                setError('cannot input date in future');
                return;
              }
              setStartDate(date)
              setError('')
            }} 
          />
      </Box>
    </Box>
    {error && <Typography variant='h6' pl={5} fontSize={13} color='error.main' mr={.5}>{error}</Typography>}
    </>
  );
}
