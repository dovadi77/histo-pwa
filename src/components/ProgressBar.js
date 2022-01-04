import * as React from "react";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import create from "zustand";

const useTimer = create((set) => ({
  userTime: 0,
  increaseTime: () => set((state) => ({ userTime: state.userTime + 1 })),
}));

export const getUserTime = () => {
  return useTimer.getState().userTime;
};

export default function ProgressBar({ maxTime }) {
  const normalize = (value) => (value * 100) / maxTime;
  const userTime = useTimer((state) => state.userTime);
  const increaseTime = useTimer((state) => state.increaseTime);

  // flush data
  React.useEffect(() => {
    useTimer.setState({
      userTime: 0,
    });
  }, []);

  React.useEffect(() => {
    const timer = setInterval(() => {
      if (userTime / 60 > maxTime) clearInterval(timer);
      increaseTime();
    }, 1000);
    return () => {
      clearInterval(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box sx={{ width: "100%", position: "fixed", bottom: 0, left: 0 }}>
      <LinearProgress sx={{ height: 20 }} variant="determinate" value={normalize(userTime / 60)} />
    </Box>
  );
}
