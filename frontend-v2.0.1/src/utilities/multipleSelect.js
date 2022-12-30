import { styled } from "@mui/system";

const useStyles = styled((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    width: 300,
  },
  indeterminateColor: {
    color: "#f50057",
  },
  selectAllText: {
    fontWeight: 500,
  },
  selectedAll: {
    backgroundColor: "rgba(0, 0, 0, 0.08)",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.08)",
    },
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
  getContentAnchorEl: null,
  anchorOrigin: {
    vertical: "bottom",
    horizontal: "center",
  },
  transformOrigin: {
    vertical: "top",
    horizontal: "center",
  },
  variant: "menu",
};

    const data = [
    {
      value: "Web Development",
      label: "Web Development",
    },
    {
      value: "Mobile Development",
      label: "Mobile Development",
    },
    {
      value: "UI/UX",
      label: "UI/UX",
    },
    {
      value: "Data Science",
      label: "Data Science",
    },
    {
      value: "Business",
      label: "Business",
    },
    {
      value: "Software Engineering",
      label: "Software Engineering",
    },
    {
      value: "FRONT-END Web Development",
      label: "Front-end Web Development",
    },
    {
      value: "BACK-END Web Development",
      label: "Back-end Web Development",
    },
    {
      value: "FULL_STACK Web Development",
      label: "Full-stack Web Development",
    },
    {
      value: "Dev Ops",
      label: "Dev Ops",
    },
    {
      value: "Web Design & Development",
      label: "Web Design & Development",
    },
    {
      value: "Data Science Program",
      label: "Data Science Program",
    },
    {
      value: "Software QA",
      label: "Software QA",
    },
    {
      value: "Mastering Web Designing",
      label: "Mastering Web Designing",
    },
    {
      value: "Android App Web Development",
      label: "Android App Web Development",
    },
    {
      value: "Meta",
      label: "Meta",
    },
    {
      value: "IBM Data Science",
      label: "IBM Data Science",
    },
    {
      value: "Apple iOS Web Apps Development",
      label: "Apple iOS Web Apps Development",
    },
    {
      value: "Back-end",
      label: "Back-end Web Development",
    },
    {
      value: "Other",
      label: "Other",
    },
  ];

export default data;
