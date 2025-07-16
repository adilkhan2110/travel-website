import { Button, CircularProgress } from "@mui/material";

const LoadingButton = ({
  loading = false,
  children,
  disabled,
  startIcon,
  endIcon,
  ...props
}) => {
  return (
    <Button
      type="submit"
      variant="contained"
      disabled={loading || disabled}
      startIcon={
        loading ? <CircularProgress size={20} color="inherit" /> : startIcon
      }
      endIcon={!loading ? endIcon : null}
      {...props}
    >
      {loading ? "Loading..." : children}
    </Button>
  );
};

export default LoadingButton;
