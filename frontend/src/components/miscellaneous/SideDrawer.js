import React, { useState } from "react";
import { Box, Button, Tooltip } from "@chakra-ui/react";

const SideDrawer = () => {
  const [search, setSearch] = useState();
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();
  return (
    <>
      <Box>
        {/* <Tooltip
          label="search Users to chat"
          hasArrow
          placement="bottom-end">
            <Button variant="ghost">
                okkokok
            </Button>
          </Tooltip> */}
      </Box>
    </>
  );
};

export default SideDrawer;
