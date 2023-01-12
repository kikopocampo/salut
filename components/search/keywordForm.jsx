import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import SearchContainer from "./searchContainer";

const KeywordForm = (props) => {
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <TextField
        id="outlined-basic"
        label={
          props.nonAlcoholic
            ? "Search Non-Alcoholic Drinks"
            : "Search By Keyword"
        }
        variant="outlined"
        value={props.enteredSearch}
        onChange={props.changeHandler}
        sx={{
          width: {sm: "50vw", xs: "80vw"},
        }}
      />
      <Button
        variant="contained"
        onClick={props.submitHandler}
        sx={{
          width: "200px",
          height: "50px",
          marginTop: 3,
          color: "#fff",
          borderRadius: "30px",
        }}
      >
        Search
      </Button>
    </Box>
  );
};

export default KeywordForm;
