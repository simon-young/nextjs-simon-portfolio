'use client'

import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { allWorks } from "contentlayer/generated";
import { Card } from "../../components/card";
import { Folio } from "./folio";



interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      className='text-gray-400'
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default async function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'rgba(255,255,255,0.0)'}}>
        <Tabs 
          value={value} 
          onChange={handleChange} 
          aria-label="work tabs"
          sx={{
            '& .MuiTab-root.Mui-selected': {
              color: '#F470AE'
            },
            '& .MuiTabs-indicator': {
              backgroundColor: '#B83573'
            },
            '& .MuiTab-root': {
              color: 'rgba(255,255,255,0.6)'
            }
          }}
        >
          <Tab label="UX" {...a11yProps(0)} />
          <Tab label="Motion" {...a11yProps(1)} />
          <Tab label="Design" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        Item One
      </CustomTabPanel>

      <CustomTabPanel value={value} index={1}>
        Item Two
      </CustomTabPanel>

      <CustomTabPanel value={value} index={2}>
        Item Three
      </CustomTabPanel>
    </Box>
  );
}