import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import {
  doc,
  setDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { auth, db } from "../firebase/firebase";

//  material ui
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Select from "@material-ui/core/Select";
import { FormControl, InputLabel } from "@material-ui/core";
import MovieFilterIcon from "@material-ui/icons/MovieFilter";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  formControl: {
    minWidth: 265,
  },
  success: {
    color: "#fff101",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.success.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function createTheatreData(tid, tname) {
  return { tid, tname };
}
function createScreenData(sid, screenType) {
  return { sid, screenType };
}

const AddMovie = () => {
  const history = useHistory();
  const classes = useStyles();

  const [theatres, setTheatres] = useState([]);
  const [screens, setScreens] = useState([]);
  const [mrows, setMRows] = useState([]);
  const [rows, setRows] = useState([]);
  const [details, setDetails] = useState({
    mid: "",
    mname: "",
    url: "",
    time: "",
    director: "",
    cast: "",
    description: "",
    theatre: "",
    screen: "",
  });

  useEffect(async () => {
    console.log("theatre:- ");
    setTheatres([]);
    getDocs(
      query(collection(db, "users"), where("type", "==", "theatre"))
    ).then((query) => {
      query.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        theatres.push(createTheatreData(doc.data().tid, doc.data().tname));
      });
      setMRows(theatres);
      console.log(theatres.tid + " " + theatres.length);
    });
    setScreens([]);
    console.log("Screen:- ");
    getDocs(
      query(
        collection(db, "users"),
        where("theatre", "==", details.theatre, "&&", "type", "==", "screen")
      )
    ).then((query) => {
      query.forEach((docS) => {
        console.log(docS.id, " => ", docS.data());
        screens.push(createScreenData(docS.data().sid, docS.data().screenType));
      });
      setRows(screens);
      //console.log(theatres[0].tid + " "+ theatres.length);
    });
  }, [details]);

  const setValue = (e) =>
    setDetails((details) => ({ ...details, [e.target.name]: e.target.value }));
  const handleReset = () => {
    setDetails(() => ({
      mname: "",
      url: "",
      time: "",
      director: "",
      cast: "",
      description: "",
      theatre: "",
      screen: "",
    }));
  };

  const [open, setOpen] = React.useState(false);

  const handleSubmit = () => {
    console.log(details);

    const moviedocRef = doc(collection(db, "Movie"));

    setDoc(moviedocRef, {
      mid: moviedocRef.id,
      mname: details.mname,
      director: details.director,
      cast: details.cast,
      description: details.description,
      theatre: details.theatre,
      screen: details.screen,
    });

    setOpen(true);
    console.log("created: " + details);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
    setTimeout(() => {
      console.log("Hello, World!");
    }, 2000);
    history.push("movie-list");
  };

  return (
    <Container style={{ height: "100vh" }} maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <MovieFilterIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Add Movie
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="mname"
                name="mname"
                variant="outlined"
                color={classes.success}
                required
                fullWidth
                id="mname"
                label="Movie Name"
                value={details.mname}
                autoFocus
                onChange={setValue}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                id="time"
                label="time"
                name="time"
                fullWidth
                type="time"
                defaultValue="10:30 AM"
                className={classes.textField}
                value={details.time}
                onChange={setValue}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 1800, // 5 min
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="url"
                label="URL"
                name="url"
                autoComplete="url"
                value={details.url}
                onChange={setValue}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel htmlFor="outlined-age-native-simple">
                  Theatre
                </InputLabel>
                <Select
                  id="standard-select-movie-native"
                  select
                  fullWidth
                  name="theatre"
                  label="Theatre"
                  value={details.theatre}
                  onChange={setValue}
                >
                  {mrows.map((theatre) => (
                    <option key={theatre.tid} value={theatre.tid}>
                      {theatre.tname}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel htmlFor="outlined-age-native-simple">
                  Screen
                </InputLabel>
                <Select
                  variant="outlined"
                  required
                  label="Screen"
                  value={details.screen}
                  name="screen"
                  id="screen"
                  onChange={setValue}
                >
                  {rows.map((screen) => (
                    <option key={screen.sid} value={screen.sid}>
                      {screen.screenType}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="director"
                label="Deriected By"
                name="director"
                autoComplete="director"
                value={details.director}
                onChange={setValue}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="cast"
                label="Cast"
                name="cast"
                autoComplete="cast"
                value={details.cast}
                onChange={setValue}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="description"
                label="Description"
                name="description"
                autoComplete="description"
                value={details.description}
                onChange={setValue}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Button
                fullWidth
                size="large"
                variant="contained"
                bgcolor="error.main"
                className={classes.submit}
                onClick={handleSubmit}
                style={{ backgroundColor: "#00c853" }}
              >
                Add Movie
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                fullWidth
                size="large"
                variant="contained"
                color="warning"
                className={classes.submit}
                onClick={handleReset}
                style={{ backgroundColor: "#f44336" }}
              >
                Clear
              </Button>
              <Snackbar
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message="New Movie Added Succefully!"
                action={
                  <React.Fragment>
                    <IconButton
                      size="small"
                      aria-label="close"
                      color="inherit"
                      onClick={handleClose}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </React.Fragment>
                }
              />
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};
export default AddMovie;
