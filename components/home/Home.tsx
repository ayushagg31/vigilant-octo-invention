// import React, { useState } from "react";

// import Tabs from "@mui/material/Tabs";
// import Tab from "@mui/material/Tab";
// import Box from "@mui/material/Box";
// import { AppBar } from "@mui/material";
// import Card from "@mui/material/Card";
// import CardContent from '@mui/material/CardContent';

// import { FromUrl } from "./FromUrl";
// import { FileUploadSection } from "./FileUploadSection";
// import FromText from "./FromText";

// import style from "../../styles/TabsSection.module.css";

// const a11yProps = (index) => {
//   return {
//     id: `simple-tab-${index}`,
//     "aria-controls": `simple-tabpanel-${index}`,
//   };
// };

// type RenderPanelProps = {
//   value: number;
//   children: any;
//   index: number;
//   other?: any;
// };

// const RenderPanel = ({
//   value,
//   children,
//   index,
//   other = {},
// }: RenderPanelProps) => {
//   return (
//     <div
//       className={style.tabBackground}
//       role="tabpanel"
//       hidden={value !== index}
//       id={`simple-tabpanel-${index}`}
//       aria-labelledby={`simple-tab-${index}`}
//       {...other}
//     >
//       {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
//     </div>
//   );
// };

// const TabsSection = () => {
//   const [value, setValue] = useState(0);
//   const handleChange = (e, newValue) => {
//     setValue(newValue);
//   };

//   return (
//     <Card variant="outlined"   sx={{ marginTop: 5 }}>
//       <CardContent>
//         <AppBar position="static">
//           <Tabs
//             value={value}
//             onChange={handleChange}
//             variant="fullWidth"
//             indicatorColor="secondary"
//             textColor="inherit"
//             className={style.tabs}
//             aria-label="basic tabs example"
//           >
//             <Tab label="Upload a file" {...a11yProps(0)} />
//             <Tab label="PDF source from URL" {...a11yProps(1)} />
//             <Tab label="Paste plain text" {...a11yProps(2)} />
//           </Tabs>
//         </AppBar>
//         <RenderPanel value={value} index={0}>
//           <FileUploadSection />
//         </RenderPanel>
//         <RenderPanel value={value} index={1}>
//           <FromUrl />
//         </RenderPanel>
//         <RenderPanel value={value} index={2}>
//           <FromText />
//         </RenderPanel>
//       </CardContent>
//     </Card>
//   );
// };

// export default TabsSection;

import React from "react";
import Fame from "./Fame";
import Example from "./Example";
import TabsSection from "./TabsSection";

const Home = () => {
  return (
    <div className="my-4">
      <Fame />
      <div className="my-3">
        <div className="columns">
          <div className="column is-one-third">
            <Example />
          </div>
          <div className="column">
            <TabsSection />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
