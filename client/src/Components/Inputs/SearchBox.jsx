import { InputAdornment, makeStyles, TextField } from "@material-ui/core";
import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import MakeModel from "../../assets/data/MakeModel.js";
import { useAutocomplete } from "@material-ui/lab";
import { useHistory, useLocation } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  label: {
    display: "block",
    width: "25rem",
    height: 0,
    margin: "0 auto",
  },
  input: {
    width: "100%",
    background: "rgba(255,255,255,1)",
    borderRadius: 5,
  },
  listbox: {
    width: "100%",
    margin: 0,
    padding: 0,
    zIndex: 1,
    position: "absolute",
    listStyle: "none",
    backgroundColor: theme.palette.background.paper,
    overflow: "auto",
    maxHeight: 200,
    border: "1px solid rgba(0,0,0,.25)",
    borderRadius: 5,
    "& li": {
      padding: "0.5rem",
      textAlign: "left",
      color: "#000",
      transition: "background-color 0.2s",
    },
    '& li[data-focus="true"]': {
      backgroundColor: "#eee",
      color: "#000",
      cursor: "pointer",
    },
    "& li:active": {
      backgroundColor: "#eee",
      color: "#000",
    },
  },
}));

const getAllMakers = () => {
  return MakeModel.map((item) => item.Make);
};
function useQuery() {
  return new URLSearchParams(useLocation().search);
}
function SearchBox({ type, label }) {
  const query = useQuery();
  //const [search,setSearch] = useState();
  const classes = useStyles();
  const history = useHistory();
  //console.log(getAllMakers());
  // const handleChange = (e) => {
  //   setSearch(.value);
  // }
  const {
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
  } = useAutocomplete({
    id: "use-autocomplete-demo",
    options: getAllMakers(),
    value: query.get("search") || "",
    getOptionLabel: (option) => option,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(getInputProps())
    history.push(`/buy-car?search=${getInputProps().value}`);
  };
  // console.log(getInputProps())
 
  return (
    <form onSubmit={handleSubmit} style={{ position: "relative" }}>
      <div {...getRootProps()}>
        {/* <label className={classes.label} {...getInputLabelProps()}>
          useAutocomplete
        </label> */}
        <TextField
          {...getInputProps()}
          // defaultValue={search}
          //  onChange={handleChange}
          InputProps={{
            endAdornment: (
              <InputAdornment
                position="start"
                onClick={handleSubmit}
                style={{ cursor: "pointer" }}
              >
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          label={label}
          className={classes.input}
        />
      </div>
      {groupedOptions.length > 0 ? (
        <ul className={classes.listbox} {...getListboxProps()}>
          {groupedOptions.map((option, index) => (
            <li {...getOptionProps({ option, index })}>{option}</li>
          ))}
        </ul>
      ) : null}
    </form>
    // <Autocomplete
    //   id="search-box"
    //   options={getAllMakers()}
    //   filterOptions={(options, params) => {
    //     const filtered = options.filter((maker) =>
    //       new RegExp(params.inputValue).test(maker)
    //     );
    //     return filtered;
    //   }}
    //   getOptionLabel={(option) => option}
    //   renderInput={(params) => (
    //     <TextField
    //       {...params}
    //       style={{ width: "25rem" }}

    //       InputProps={{
    //         endAdornment: (
    //           <InputAdornment position="start">
    //             <SearchIcon />
    //           </InputAdornment>
    //         ),
    //       }}
    //       label="Search Cars"
    //       variant="outlined"
    //     />
    //   )}
    // />
  );
}

export default SearchBox;
