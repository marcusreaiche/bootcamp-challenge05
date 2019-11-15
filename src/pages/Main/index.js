import React, { Component } from "react";
import { FaGithubAlt, FaPlus, FaSpinner } from "react-icons/fa";
import { Link } from "react-router-dom";

import api from "../../services/api";
import Container from "../../components/Container";

import { Form, SubmitButton, List } from "./styles";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newRepo: "",
      repositories: [],
      loading: false,
      repoNotFound: false,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // load data from localStorage when component mounts
  componentDidMount() {
    const repos = JSON.parse(localStorage.getItem("repos"));
    if (repos) {
      this.setState({
        repositories: repos,
      });
    }
  }

  // update localStorage whenever a new repository is added
  componentDidUpdate(_, prevState) {
    const { repositories } = this.state;
    if (prevState.repositories !== repositories) {
      localStorage.setItem("repos", JSON.stringify(repositories));
    }
  }

  handleInputChange(e) {
    const v = e.target.value;
    this.setState({
      newRepo: v,
    });
  }

  async handleSubmit(e) {
    e.preventDefault();
    const { newRepo } = this.state;
    // change loading to true
    this.setState({
      loading: true,
    });

    // try {
      const response = await api.get(`/repos/${newRepo}`);
      const data = {
        name: response.data.full_name,
       };

      this.setState(prevState => ({
        newRepo: "",
        repositories: [...prevState.repositories, data],
        loading: false,
      }));
    // } catch (error) {
    //   this.setState({
    //     repoNotFound: true,
    //     loading: false,
    //   });
    //   console.log(`${newRepo} was not found...`);
    // }
  }

  render() {
    const { newRepo, loading, repositories } = this.state;

    return (
      <Container>
        <h1>
          <FaGithubAlt />
          My Favorite Github Repos
        </h1>

        <Form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Add repo"
            value={newRepo}
            onChange={this.handleInputChange}
          />

          <SubmitButton loading={loading}>
            {loading ? (
              <FaSpinner color="#FFF" size={14} />
            ) : (
              <FaPlus color="#FFF" size={14} />
            )}
          </SubmitButton>
        </Form>

        <List>
          {repositories.map(repository => (
            <li key={repository.name}>
              <span>{repository.name}</span>
              <Link to={`/repository/${encodeURIComponent(repository.name)}`}>
                Details
              </Link>
            </li>
          ))}
        </List>
      </Container>
    );
  }
}

export default Main;
