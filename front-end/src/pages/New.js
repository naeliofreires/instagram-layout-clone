import React, { Component } from "react";
import api from "../service/api";

import "./New.css";

class New extends Component {
  state = {
    image: null,
    author: "",
    place: "",
    description: "",
    hashtags: ""
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = async event => {
    event.preventDefault();

    const data = new FormData();

    data.append("image", this.state.image);
    data.append("author", this.state.author);
    data.append("place", this.state.place);
    data.append("description", this.state.description);
    data.append("hashtags", this.state.hashtags);

    await api.post("posts", data);

    this.props.history.push("/");
  };

  handleChangeImage = event => {
    this.setState({ image: event.target.files[0] });
  };

  render() {
    return (
      <form id="new-post" onSubmit={this.handleSubmit}>
        <input type="file" onChange={this.handleChangeImage} />

        <input
          type="text"
          name="author"
          value={this.state.author}
          placeholder="Autor  do post"
          onChange={this.handleChange}
        />

        <input
          type="text"
          name="place"
          value={this.state.place}
          placeholder="Local do post"
          onChange={this.handleChange}
        />

        <input
          type="text"
          name="description"
          value={this.state.description}
          placeholder="Descrição do post"
          onChange={this.handleChange}
        />

        <input
          type="text"
          name="hashtags"
          value={this.state.hashtags}
          placeholder="Hashtags do post"
          onChange={this.handleChange}
        />

        <button type="submit">ENVIAR</button>
      </form>
    );
  }
}

export default New;
