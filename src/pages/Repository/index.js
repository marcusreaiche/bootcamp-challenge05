import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";

import api from "../../services/api";
import Container from "../../components/Container";
import { Loading, Owner, IssueList, IssueFilter } from "./styles";

class Repository extends Component {
  // eslint-disable-next-line react/sort-comp
  constructor(props) {
    super(props);
    this.state = {
      repository: {},
      issues: [],
      loading: true,
      issueType: "open",
      page: 1,
    };
    this.handleIssueFilterChange = this.handleIssueFilterChange.bind(this);
    this.handlePageUp = this.handlePageUp.bind(this);
    this.handlePageDown = this.handlePageDown.bind(this);
  }

  // eslint-disable-next-line react/static-property-placement
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repository: PropTypes.string,
      }),
    }).isRequired,
  };

  async componentDidMount() {
    const { issueType } = this.state;
    const { match } = this.props;
    const repoName = decodeURIComponent(match.params.repository);

    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: issueType,
          per_page: 5,
          page: 1,
        },
      }),
    ]);

    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false,
    });
  }

  async handleIssueFilterChange(e) {
    const issueType = e.target.value;
    const { match } = this.props;

    this.setState({
      loading: true,
    });

    const repoName = decodeURIComponent(match.params.repository);

    const issues = await api.get(`/repos/${repoName}/issues`, {
      params: {
        per_page: 5,
        state: issueType,
      },
    });

    this.setState({
      loading: false,
      issueType,
      issues: issues.data,
    });
  }

  async handlePageUp(e) {
    const { page: actualPage, issueType } = this.state;
    const { match } = this.props;
    const repoName = decodeURIComponent(match.params.repository);

    const issues = await api.get(`/repos/${repoName}/issues`, {
      params: {
        per_page: 5,
        state: issueType,
        page: actualPage + 1,
      },
    });

    this.setState({
      page: actualPage + 1,
      issues: issues.data,
    });
  }

  async handlePageDown(e) {
    const { page: actualPage, issueType } = this.state;
    const { match } = this.props;
    const repoName = decodeURIComponent(match.params.repository);

    const issues = await api.get(`/repos/${repoName}/issues`, {
      params: {
        per_page: 5,
        state: issueType,
        page: actualPage - 1,
      },
    });

    this.setState({
      page: actualPage - 1,
      issues: issues.data,
    });
  }

  render() {
    const { repository, issues, loading, issueType, page } = this.state;
    if (loading) {
      return <Loading>Loading</Loading>;
    }

    return (
      <Container>
        <Owner>
          <Link to="/">back to repositories</Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>

        <IssueList>
          {issues.map(issue => (
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                  <a href={issue.html_url}>{issue.title}</a>
                  {issue.labels.map(label => (
                    <span key={String(label.id)}>{label.name}</span>
                  ))}
                </strong>
                <p>{issue.user.login}</p>
              </div>
            </li>
          ))}
        </IssueList>
        <IssueFilter id="issueType" onChange={this.handleIssueFilterChange}>
          {page > 1 && <FaCaretLeft onClick={this.handlePageDown} />}
          <label htmlFor="issueType">Issue type:</label>
          <select id="issueType">
            <option value="open" selected={issueType === "open"}>
              open
            </option>
            <option value="closed" selected={issueType === "closed"}>
              closed
            </option>
            <option value="all" selected={issueType === "all"}>
              all
            </option>
          </select>
          <FaCaretRight onClick={this.handlePageUp} />
        </IssueFilter>
      </Container>
    );
  }
}

export default Repository;
