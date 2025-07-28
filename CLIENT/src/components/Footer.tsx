import React from "react";
import {
  Box,
  Container,
  Grid,
  Link,
  Typography,
  IconButton,
} from "@mui/material";
import {
  GitHub,
  Twitter,
  LinkedIn,
  AddCircleOutline,
  Home,
  CheckCircle,
  AccountCircle,
} from "@mui/icons-material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import { Link as RouterLink } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #4c67ddff 0%, #683c94ff 70%)",
        color: "#fff",
        py: 4,
        mt: "auto",
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={4}
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 3,
                flexWrap: "wrap",
                justifyContent: { xs: "center", md: "flex-start" },
              }}
            >
              <Link
                component={RouterLink}
                to="/tasks"
                color="inherit"
                underline="hover"
              >
                <Home fontSize="small" sx={{ mr: 0.5 }} /> Tasks
              </Link>
              <Link
                component={RouterLink}
                to="/new-task"
                color="inherit"
                underline="hover"
              >
                <AddCircleOutline fontSize="small" sx={{ mr: 0.5 }} /> New Task
              </Link>
              <Link
                component={RouterLink}
                to="/completed-tasks"
                color="inherit"
                underline="hover"
              >
                <CheckCircle fontSize="small" sx={{ mr: 0.5 }} /> Completed
              </Link>
              <Link
                component={RouterLink}
                to="/profile"
                color="inherit"
                underline="hover"
              >
                <AccountCircle fontSize="small" sx={{ mr: 0.5 }} /> Profile
              </Link>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: "flex",
                justifyContent: { xs: "center", md: "flex-center" },
                gap: 2,
              }}
            >
              <IconButton
                color="inherit"
                href="https://github.com/your-username"
                target="_blank"
              >
                <GitHub />
              </IconButton>
              <IconButton
                color="inherit"
                href="https://twitter.com/your-username"
                target="_blank"
              >
                <Twitter />
              </IconButton>
              <IconButton
                color="inherit"
                href="https://linkedin.com/in/your-username"
                target="_blank"
              >
                <LinkedIn />
              </IconButton>
              <IconButton
                color="inherit"
                href="https://gmail.com/your-username"
                target="_blank"
              >
                <EmailOutlinedIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        <Box mt={3} textAlign="center">
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} Tasky.Developed by Carlos. All rights
            reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
