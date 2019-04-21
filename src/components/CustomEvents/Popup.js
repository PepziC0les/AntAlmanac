import React, { Component, Fragment } from "react";
import DaySelector from "./DaySelector";
import {
  Button,
  Dialog,
  TextField,
  DialogActions,
  DialogContent,
  MenuItem,
  Menu,
  FormControl,
  Input,
  InputLabel,
  Typography
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Add, Create } from "@material-ui/icons";

const styles = () => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    minWidth: 120
  }
});

function dayToNum(day) {
  switch (day) {
    case "monday":
      return 1;
    case "tuesday":
      return 2;
    case "wednesday":
      return 3;
    case "thursday":
      return 4;
    default: //case "friday" cuz friday's always the best
      return 5;
  }
}

class DialogSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      start: this.props.editMode ? this.props.event.start.toTimeString().slice(0,5) : "10:30",
      end: this.props.editMode ? this.props.event.end.toTimeString().slice(0,5) : "15:30",
      eventName: this.props.editMode ? this.props.event.title : null,
      days: {
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false
      },
      anchorEl: null,
      id: 0
    };
  }

  handleClose = calendarIndex => {
    if (calendarIndex !== -1) this.handleAddToCalendar(calendarIndex);
    this.setState({
      open: false,
      start: this.props.editMode ? this.props.event.start.toTimeString().slice(0,5) : "10:30",
      end: this.props.editMode ? this.props.event.end.toTimeString().slice(0,5) : "15:30",
      eventName: this.props.editMode ? this.props.event.title : null,
      days: {
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false
      },
      anchorEl: null
    });
  };

  handleEventNameChange = event => {
    this.setState({ eventName: event.target.value });
  };

  handleEndTimeChange = event => {
    this.setState({ end: event.target.value });
  };

  handleStartTimeChange = event => {
    this.setState({ start: event.target.value });
  };

  handleDayChange = days => {
    this.setState({ days: days });
  };

  handleAddToCalendar = scheduleIndex => {
    this.props.editMode ? this.editEvent(scheduleIndex) : this.addEvent(scheduleIndex);
  };

  handleAddEventButtonClicked = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClickAway = () => {
    this.setState({
      open: false,
    });
  };

  addEvent = scheduleIndex => {
    const startHour = parseInt(this.state.start.slice(0, 2), 10);
    const startMin = parseInt(this.state.start.slice(3, 5), 10);
    const endHour = parseInt(this.state.end.slice(0, 2), 10);
    const endMin = parseInt(this.state.end.slice(3, 5), 10);

    const events = [];
    const id = Math.floor(Math.random() * 1000000);

    Object.keys(this.state.days).forEach(day => {
      if (this.state.days[day]) {
        events.push({
          color: "#551a8b",
          title: this.state.eventName ? this.state.eventName : "Untitled",
          scheduleIndex: scheduleIndex,
          start: new Date(2018, 0, dayToNum(day), startHour, startMin),
          end: new Date(2018, 0, dayToNum(day), endHour, endMin),
          isCustomEvent: true,
          customEventID: id
        });
      }
    });

    if (events.length > 0) this.props.onAddCustomEvent(events)
  };

  editEvent = scheduleIndex => {
    this.addEvent(scheduleIndex);
    this.props.onClassDelete(this.props.event);
  };

  render() {
    const { anchorEl } = this.state;

    return (
      <Fragment>
        <Button disableRipple={true} className={"menu-button"} onClick={() => this.setState({ open: true })} style={{width: "100%"}}>
          {this.props.editMode ? (
              <Create />
            ) : (
              <div><Add/>Add Custom</div>
          )}
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClickAway}
        >
          <DialogContent>
            <FormControl>
              <InputLabel htmlFor="EventNameInput">Event Name</InputLabel>
              <Input
                required={true}
                value={this.state.eventName}
                onChange={this.handleEventNameChange}
                id="EventNameInput"
              />
            </FormControl>
            <form noValidate>
              <TextField
                onChange={this.handleStartTimeChange}
                id="time"
                label="Start Time"
                type="time"
                defaultValue={this.state.start}
                InputLabelProps={{
                  shrink: true
                }}
                className="textField"
                inputProps={{
                  step: 300
                }}
                style={{marginRight: 5, marginTop:5}}
              />
              <TextField
                onChange={this.handleEndTimeChange}
                id="time"
                label="End Time"
                type="time"
                defaultValue={this.state.end}
                InputLabelProps={{
                  shrink: true
                }}
                className="textField"
                inputProps={{
                  step: 300
                }}
                style={{marginRight: 5, marginTop:5}}
              />
            </form>
            <DaySelector onSelectDay={this.handleDayChange} event={this.props.event}/>

          </DialogContent>

          <DialogActions>
            <Button onClick={() => this.handleClose(-1)} color="primary">
              Cancel
            </Button>

            <Button
              onClick={this.handleAddEventButtonClicked}
              variant="contained"
              color="primary"
              style={{boxShadow:"none"}}
            >
              {" "}
              {this.props.editMode ? "Save Changes" : "Add Event"}
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() => this.setState({ anchorEl: null })}
            >
              <MenuItem value={0} onClick={() => this.handleClose(0)}>
                Schedule 1
              </MenuItem>
              <MenuItem value={1} onClick={() => this.handleClose(1)}>
                Schedule 2
              </MenuItem>
              <MenuItem value={2} onClick={() => this.handleClose(2)}>
                Schedule 3
              </MenuItem>
              <MenuItem value={3} onClick={() => this.handleClose(3)}>
                Schedule 4
              </MenuItem>
              <MenuItem value={4} onClick={() => this.handleClose(4)}>
                All Schedules
              </MenuItem>
            </Menu>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

export default withStyles(styles)(DialogSelect);
