import { styled } from "@mui/system";
import { useDrawingArea } from "@mui/x-charts";

export const PieCenterLabel = ({ children }: { children: React.ReactNode }) => {
  const { width, height, left, top } = useDrawingArea();

  const StyledText = styled("text")(({ theme }) => ({
    fill: theme.palette.text,
    textAnchor: "middle",
    dominantBaseline: "central",
    fontSize: 20,
  }));

  return (
    <StyledText x={left + width / 2} y={top + height / 2}>
      {children}
    </StyledText>
  );
};
