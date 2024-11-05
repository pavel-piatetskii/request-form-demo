import { Controller, useFieldArray, useForm } from "react-hook-form";
import { ReqFormState } from "../types/request-form";
import {
  TextField,
  Button,
  Select,
  Stack,
  FormControl,
  MenuItem,
  InputLabel,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";

export default function RequestForm() {
  const form = useForm<ReqFormState>({
    defaultValues: {
      fullName: "",
      email: "",
      issueType: "",
      tags: [],
      steps: [],
    },
  });
  const { control, handleSubmit } = form;
  // const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const {
    fields: steps,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "steps",
  });

  const onSubmit = (data: ReqFormState) => {
    console.log(data);
  };

  return (
    <div>
      {/* <form onSubmit={onSubmit}> */}
      <h2>Request Form</h2>
      {/* <FormControl> */}
      <Stack spacing={3} width={400}>
        <Controller
          name="fullName"
          control={control}
          render={({ field }) => (
            <TextField label="Full Name" {...field} type="text" />
          )}
        ></Controller>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField label="E-mail" {...field} type="text" />
          )}
        ></Controller>

        <FormControl>
          <Controller
            name="issueType"
            control={control}
            render={({ field }) => (
              <>
                <InputLabel id="issue-label">Issue Type</InputLabel>
                <Select {...field} label="Issue Type" labelId="issue-label">
                  <MenuItem value="bug">Bug Report</MenuItem>
                  <MenuItem value="feature">Feature Request</MenuItem>
                  <MenuItem value="general">General Inquiry</MenuItem>
                </Select>
              </>
            )}
          ></Controller>
        </FormControl>

        <FormControl>
          <Controller
            name="tags"
            control={control}
            render={({ field }) => (
              <>
                <InputLabel id="tags-label">Tags</InputLabel>
                <Select
                  {...field}
                  label="Tags"
                  labelId="tags-label"
                  multiple
                  renderValue={(selected) => selected.join(", ")}
                >
                  <MenuItem value="UI">UI</MenuItem>
                  <MenuItem value="Backend">Backend</MenuItem>
                  <MenuItem value="Performance">Performance</MenuItem>
                  <MenuItem value="Incorrect Data">Incorrect Data</MenuItem>
                </Select>
              </>
            )}
          ></Controller>
        </FormControl>

        <FormControl>
          {/* <InputLabel>Steps to reproduce</InputLabel> */}
          {!steps.length && (
            <Typography>Describe steps to reproduce the issue</Typography>
          )}
          {steps.map((step, i) => (
            <Box key={`step-${i + 1}`} display="flex" flexDirection="row">
              <Controller
                name={`steps.${i}.step`}
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    multiline
                    maxRows={4}
                    label={`Step ${i + 1}`}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                  />
                )}
              />
              <Box display="flex" justifyContent="flex-end" marginTop={1}>
                {steps.length > 0 && (
                  <IconButton
                    onClick={() => remove(i)}
                    color="secondary"
                    aria-label="remove step"
                  >
                    <Remove />
                  </IconButton>
                )}
              </Box>
            </Box>
          ))}

          <Button
            onClick={() => append({ step: "" })}
            startIcon={<Add />}
            sx={{ marginBottom: 2 }}
          >
            Add Step
          </Button>

          {/* <Controller
            name={`items.${index}.value`}
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label={`Item ${index + 1}`}
                variant="outlined"
                fullWidth
              />
            )}
          />
          <Button>Describe how to reproduce the issue</Button> */}
        </FormControl>

        <Button variant="contained" onClick={handleSubmit(onSubmit)}>
          Submit
        </Button>
      </Stack>
      {/* </form> */}
    </div>
  );
}
