import { useSelector } from "react-redux";
import type { RootState } from "../app/store";
import { Box, Stack, Typography } from "@mui/material";
import { ReqFormData } from "../types/request-form";

export default function DataViewer() {
  const reqFormData: ReqFormData = useSelector(
    (state: RootState) => state.requestForm.data
  );

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Stack spacing={3} width={400}>
        <Typography variant="h4">Data Viewer</Typography>
        {reqFormData.issueType ? (
          <Typography style={{ whiteSpace: "pre-wrap", textAlign: "left" }}>
            {JSON.stringify(reqFormData, null, 2)}
          </Typography>
        ) : (
          <Typography>Data has not been submitted yet</Typography>
        )}
      </Stack>
    </Box>
  );
}
