import React, { Component } from "react";
import api from "../service/api";
import io from "socket.io-client";

import "./Feed.css";

import more from "../assets/more.svg";
import like from "../assets/like.svg";
import comment from "../assets/comment.svg";
import send from "../assets/send.svg";

class Feed extends Component {
  state = {
    feed: []
  };

  registerToSocket = () => {
    const socket = io("http://localhost:3333");

    // post, like
    socket.on("post", newPost => {
      this.setState({ feed: [newPost, ...this.state.feed] });
    });

    socket.on("like", postLike => {
      this.setState({
        feed: this.state.feed.map(post =>
          post._id === postLike._id ? postLike : post
        )
      });
    });
  };

  async componentDidMount() {
    this.registerToSocket();
    const response = await api.get("posts");

    this.setState({ feed: response.data });
  }

  handleClick = async id => {
    api.post(`/posts/${id}/like`);
  };

  render() {
    const { feed } = this.state;

    return (
      <section id="post-list">
        {feed.map(post => (
          <article key={post._id}>
            <header>
              <div className="user-info">
                <span>{post.author}</span>
                <span className="place">{post.place}</span>
              </div>

              <img src={more} alt="Ver mais" />
            </header>

            <img
              src={`http://localhost:3333/files/${post.image}`}
              alt={post.image}
            />

            <footer>
              <div className="actions">
                <button
                  type="button"
                  onClick={() => this.handleClick(post._id)}
                >
                  <img src={like} alt="Like" />
                </button>

                <img src={comment} alt="Comment" />
                <img src={send} alt="Send" />
              </div>
              <strong>{post.like} curtidas</strong>
              <p>
                {post.description}
                <span>{post.hashtags}</span>
              </p>
            </footer>
          </article>
        ))}
      </section>
    );
  }
}

export default Feed;
