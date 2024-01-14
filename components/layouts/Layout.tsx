import { FC, ReactElement, useContext } from "react";

import Head from "next/head";

import { Box } from "@mui/material";

import { NavBar, Sidebar } from "../ui";

import { EntriesContext } from "../../context/entries";

import Loader from "../ui/Loader";
import Error from "./Error";

interface LayoutProps {
  title?: string;
  children: ReactElement;
}

export const Layout: FC<LayoutProps> = ({ title = "Open Jira", children }) => {
  const { isLoading } = useContext(EntriesContext);

  return (
    <Box sx={{ flexFlow: 1 }}>
      <Head>
        <title>{title}</title>
      </Head>
      <NavBar />
      <Sidebar />
      {isLoading && <Loader />}
      <Box sx={{ padding: "20px 20px" }}> {children}</Box>
      <Error />
    </Box>
  );
};
