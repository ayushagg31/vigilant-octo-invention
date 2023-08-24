import React from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel, useTabsStyles } from '@chakra-ui/react'


export const TabComponent = ({ tabConfig }) => {
    if (tabConfig == undefined) {
        return <div>Provide defined config</div>
    }
    const tabKeys = Object.keys(tabConfig);
    const tabComponents = Object.values(tabConfig);
    const tabStyle = {
        color: "white",
        bg: "black",
    }

    return (
        <div id="upload-tabs">
            <Tabs variant='soft-rounded' >
                <TabList >
                    {
                        tabKeys.map((el) => <Tab _selected={tabStyle}>{el}</Tab>)
                    }
                </TabList>
                <TabPanels>
                    {
                        tabComponents.map((component) => <TabPanel>{component}</TabPanel>)
                    }
                </TabPanels>
            </Tabs>
        </div>
    );
};
