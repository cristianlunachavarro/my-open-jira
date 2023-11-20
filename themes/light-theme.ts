import { createTheme } from "@mui/material";
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';

export const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
  components: {
    MuiAppBar: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          backgroundColor: "#d9c7f0",
          color: "#8948d9",
        },
      },
    },
  },
});
