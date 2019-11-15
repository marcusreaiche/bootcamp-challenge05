import styled from "styled-components";

export const Loading = styled.div`
  color: #FFF;
  font-size: 30px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const Owner = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;

  a {
    text-decoration: none;
    font-size: 16px;
    color: #7159c1;
    margin-bottom: 10px;
  }

  img {
    border-radius: 50%;
    width: 120px;
  }

  h1 {
    font-size: 24px;
    margin-top: 10px;
  }

  p {
    font-size: 14px;
    margin-top: 5px;
    max-width: 400px;
    line-height: 1.4;
    text-align: center;
    color: #666;
  }
`;

export const IssueList = styled.ul`
  list-style: none;
  padding-top: 30px;
  margin-top: 30px;
  border-top: 1px solid #eee;

  li {
    display: flex;
    padding: 15px 10px;
    border: 1px solid #eee;
    border-radius: 4px;

    & + li {
      margin-top: 10px;
    }

    img {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: 2px solid #eee;
    }
  }

  div {
    flex: 1;
    margin-left: 15px;

    strong {
      font-size: 16px;

      a {
        text-decoration: none;
        color: #333;

        &:hover {
          color: #7159c1;
        }
      }

      span {
        background-color: #eee;
        color: #333;
        border-radius: 2px;
        font-size: 12px;
        font-weight: 600;
        height: 20px;
        padding: 3px 4px;
        margin-left: 10px;
      }
    }

    p {
      color: #999;
      margin-top: 5px;
      font-size: 12px;
    }
  }
`;
