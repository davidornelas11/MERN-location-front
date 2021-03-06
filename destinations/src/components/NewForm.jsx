import React, { Component } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const baseURL = "https://destinations-api-project3.herokuapp.com";

export default class NewForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      image: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch(baseURL + "/locations", {
      method: "POST",
      body: JSON.stringify({
        name: this.state.name,
        description: this.state.description,
        image: this.state.image,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        this.props.handleAddLocations(data);
        this.setState({
          name: "",
          description: "",
          image: "",
        });
      });
  }





  render() {
    return (
      <>
        <Header />

        <div className="container">
          <h1>New Destination</h1>

          <form onSubmit={this.handleSubmit}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={this.handleChange}
              value={this.state.name}
              placeholder="name"
            />

            <label htmlFor="description">description</label>
            <input
              type="text"
              id="description"
              name="description"
              onChange={this.handleChange}
              value={this.state.description}
              placeholder="description"
            />

            <label htmlFor="image">image</label>
            <input
              type="text"
              id="image"
              name="image"
              onChange={this.handleChange}
              value={this.state.image}
              placeholder="image"
            />
            <input
              id="adddestination"
              className="waves-effect waves-light btn orange darken-4 white-text"
              type="submit"
              value="Add Destination"
            />
          </form>
<div>
<table className="centered responsive-table">
            <thead>
              <tr>
                <th className="left">Name</th>
                <th>Description</th>
              
                <th className="right">  <i class="material-icons">add</i>   <i class="material-icons">delete</i></th>
              </tr>
            </thead>
            </table>
         
              {
                  
                // Renders locations if there are any. If not, it tells user to add some
                this.props.locations.length > 0 ? (
                  this.props.locations.map((location) => {
                    return (
                        <table className="centered responsive-table">
            
            <tbody>
                      <tr key={location._id}>
                        <td>
                          {" "}
                          <p>{location.name}</p>{" "}
                        </td>
                        <td>
                          {" "}
                          <p>{location.description}</p>{" "}
                        </td>
                        <td>
                          {" "}
                          <img id='newform'src={location.image} alt={location.name}></img>
                        </td>
                        <td
                            className="waves-effect waves-light btn orange darken-4 white-text"
                            onClick={() => {
                              // Deletes entry from database
                              this.props.deleteLocation(location._id);
                            }}
                          >
                            DELETE

                        </td>
                          <td className='btn waves-effect waves-light brown lighten-2' onClick={() => {this.props.toggleFavorite(location)}}
                          >
                             {/* checks to see locations has been favorited, then displays a heart or minus sign */}
                            { location.favorite == false ? (<p>&hearts;</p>) : (<p>━</p>) }
                        </td>

                      </tr>
                      </tbody>
          </table>
                    );
                  })
                ) : (
                  <div className="row">
                    <div className="col s12 m5 ">
                      <div className="card-panel brown lighten-3 ">
                        <span className="white-text">
                          No locations to display. Try Adding one with the form
                          above
                        </span>
                      </div>
                    </div>
                  </div>
                )
              }
              </div>
        </div>
        <Footer />
      </>
    );
  }
}

