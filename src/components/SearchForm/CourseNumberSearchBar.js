import React, {Component} from "react";
import {
  TextField,
} from "@material-ui/core";

class CourseNumberSearchBar extends Component
{
  constructor(props) {
    super(props);
    this.state = {
      courseCode: "",
    }
  }

  handleChange = name => event => {
    if (name === "endTime" || name === "startTime") {
      if (event.target.value !== "") {
        if (parseInt(event.target.value.slice(0, 2), 10) > 12)
          this.setState({[name]: (parseInt(event.target.value.slice(0, 2), 10) - 12) + ":00pm"}, () => {
            this.props.onAdvancedSearchChange(this.state)
          });
        else
          this.setState({[name]: parseInt(event.target.value.slice(0, 2), 10) + ":00am"}, () => {
            this.props.onAdvancedSearchChange(this.state)
          });
      } else {
        this.setState({[name]: ""}, () => {
          this.props.onAdvancedSearchChange(this.state)
        });
      }
    } else if (name === "online"){
      if (event.target.checked){
        this.setState({ building: "ON" }, () => {
          this.props.onAdvancedSearchChange(this.state)
        });
      } else {
        this.setState({ building: "" }, () => {
          this.props.onAdvancedSearchChange(this.state)
        });
      }
    } else {
      this.setState({[name]: event.target.value}, () => {
        this.props.onAdvancedSearchChange(this.state)
      });
    }
  };

  render() {
    //const {classes} = this.props;

    return (
        
        <div>
          <TextField
           id="course-num"
           label="Course Number(s)"
           type="search"
           value={this.state.courseNum}
           onChange={this.handleChange('courseNum')}
           helperText="ex. 6B, 17, 30-40"
          />
        </div>
    
      );
  }
}

export default CourseNumberSearchBar;