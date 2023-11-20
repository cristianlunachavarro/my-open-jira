import { FC, ReactElement } from "react";

import Head from "next/head";

import { Box } from "@mui/material";
import { NavBar, Sidebar } from "../ui";

interface LayoutProps {
  title?: string;
  children: ReactElement;
}

export const Layout: FC<LayoutProps> = ({ title = "Open Jira", children }) => {
  return (
    <Box sx={{ flexFlow: 1 }}>
      <Head>
        <title>{title}</title>
      </Head>
      <NavBar />
      <Sidebar />
      <Box sx={{ padding: "20px 20px" }}> {children}</Box>
    </Box>
  );
};
