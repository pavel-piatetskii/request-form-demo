import { Controller, useFieldArray, useForm } from "react-hook-form";
import { ReqFormData } from "../types/request-form";
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
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormHelperText } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setReqFormData } from "../features/requestForm";
import type { RootState } from "../app/store";
import { useNavigate } from "react-router-dom";

export default function RequestForm() {
  const reqFormData: ReqFormData = useSelector(
    (state: RootState) => state.requestForm.data
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formSchema = z.object({
    fullName: z.string().trim().min(1, {
      message: "Name cannot be empty",
    }),
    email: z
      .string()
      .trim()
      .min(1, {
        message: "E-mail cannot be empty",
      })
      .email({
        message: "E-mail is not valid",
      }),
    issueType: z.string().trim().min(1, {
      message: "Select issue type",
    }),
    tags: z.array(z.string()),
    steps: z
      .array(
        z.object({
          step: z.string().min(1, { message: "Step cannot be empty" }),
        })
      )
      .min(1, {
        message: "Describe at least one step",
      }),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ReqFormData>({
    defaultValues: reqFormData,
    resolver: zodResolver(formSchema),
  });

  const {
    fields: steps,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "steps",
  });

  const onSubmit = (data: ReqFormData) => {
    dispatch(setReqFormData(data));
    navigate("/data");
  };

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
        <Typography variant="h4">Request Form</Typography>
        <Controller
          name="fullName"
          control={control}
          render={({ field }) => (
            <TextField
              label="Full Name"
              {...field}
              type="text"
              error={!!errors.fullName}
              helperText={errors.fullName?.message}
            />
          )}
        ></Controller>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              label="E-mail"
              {...field}
              type="text"
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          )}
        ></Controller>

        <FormControl>
          <Controller
            name="issueType"
            control={control}
            render={({ field }) => (
              <>
                <InputLabel id="issue-label">Issue Type</InputLabel>
                <Select
                  {...field}
                  label="Issue Type"
                  labelId="issue-label"
                  error={!!errors.issueType}
                >
                  <MenuItem value="Bug Report">Bug Report</MenuItem>
                  <MenuItem value="Feature Request">Feature Request</MenuItem>
                  <MenuItem value="General Inquiry">General Inquiry</MenuItem>
                </Select>
                {!!errors.issueType && (
                  <FormHelperText error={!!errors.issueType}>
                    {errors.issueType?.message}
                  </FormHelperText>
                )}
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
          <Box display="flex" flexDirection="column" alignItems="left">
            {!steps.length && (
              <Typography align="left" sx={{ paddingLeft: 1.5 }}>
                Describe steps to reproduce the issue
              </Typography>
            )}
            {steps.map((step, i) => (
              <Box key={step.id} display="flex" flexDirection="row">
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
                      error={!!errors.steps?.[i]?.step}
                      helperText={errors.steps?.[i]?.step?.message}
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
              sx={{
                marginBottom: 0,
                width: 150,
                justifyContent: "left",
                paddingLeft: 2,
              }}
            >
              Add Step
            </Button>
            {!!errors.steps && (
              <FormHelperText error={!!errors.steps}>
                {errors.steps?.message}
              </FormHelperText>
            )}
          </Box>
        </FormControl>

        <Button variant="contained" onClick={handleSubmit(onSubmit)}>
          Submit
        </Button>
      </Stack>
    </Box>
  );
}
