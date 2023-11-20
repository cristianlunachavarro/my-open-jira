import { useContext } from "react";
import { InboxOutlined, MailOutlined } from "@mui/icons-material";
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  Typography,
} from "@mui/material";

import { UIContext } from "../../context/ui";

const menuItems: string[] = ["Inbox", "Starred", "Send Mail", "Drafts"];

export const Sidebar = () => {
  const { sideMenuOpen, closeSideMenu } = useContext(UIContext);

  return (
    <Drawer anchor="left" open={sideMenuOpen} onClose={closeSideMenu}>
      <Box sx={{ width: 250 }}>
        <Box sx={{ padding: "5px 5px" }}>
          <Typography variant="h4">Menu</Typography>
          <List>
            {menuItems.map((text, index) => (
              <ListItem button key={index}>
                <ListItemIcon>
                  {index % 2 ? <InboxOutlined /> : <MailOutlined />}
                </ListItemIcon>
              </ListItem>
            ))}
            <Divider />
          </List>
        </Box>
      </Box>
    </Drawer>
  );
};
