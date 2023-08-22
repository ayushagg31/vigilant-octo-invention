import React from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'


export const TabComponent = ({ tabConfig }) => {
    if (tabConfig == undefined) {
        return <div>Provide defined config</div>
    }
    const tabKeys = Object.keys(tabConfig);
    const tabComponents = Object.values(tabConfig);

    return (
        <div id="upload-tabs">
            <Tabs variant='soft-rounded' colorScheme='green'>
                <TabList>
                    {
                        React.Children.toArray(tabKeys.map((el) => <Tab>{el}</Tab>))
                    }
                </TabList>
                <TabPanels>
                    {
                         React.Children.toArray(tabComponents.map((component) => <TabPanel>{component}</TabPanel>))
                    }
                </TabPanels>
            </Tabs>
        </div>
    );
};
