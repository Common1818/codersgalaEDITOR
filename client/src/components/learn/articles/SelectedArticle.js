/* eslint-disable */
import React, { useState, useContext, useEffect } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Row, Col, Tooltip, OverlayTrigger } from "react-bootstrap";
import { Redirect, Link } from "react-router-dom";
import { Helmet } from "react-helmet";

import { ArticlesContext } from "../../../contexts/articleContext";
import { TopicsContext } from "../../../contexts/topicContext";
import { SpecialityContext } from "../../../contexts/specialityContext";
import { AuthContext } from "../../../contexts/authContext";

import "./css/article.css";
import "react-quill/dist/quill.snow.css";
import $ from "jquery";
import Footer from "../../layout/Footer/Footer";
import ShareArticle from "./shareArticle";

const SelectedArticle = (props) => {
  const Articles = useContext(ArticlesContext);
  const articles = Articles.articles.articles;
  const { specialities } = useContext(SpecialityContext).specialities;

  var value;

  if (typeof window !== "undefined") {
    const [value, setValue] = useState(window.location.href);
  }

  const [copied, setCopied] = useState(false);
  const [show, setShow] = useState(false);
  const [locked, setLocked] = useState(false);

  // const { articles } = useContext(ArticlesContext);
  const { authState, authData } = useContext(AuthContext);
  const { topics } = useContext(TopicsContext);

  // const Articles = articles && articles.articles;
  const { specialityId, topicId, Id } = props.match.params;
  const NId = Id.replace(/-/g, " ");
  var url;
  if (typeof window !== "undefined") {
    url = window.location.href;
  }
  console.log(props.match.params);
  const goToTop = () => {
    $("html, body").animate({ scrollTop: 10 }, 200);
  };

  topics.topics &&
    authData.userProfile &&
    topics.topics.map((item) => {
      if (item._id == topicId && item.locked) {
        setLocked(true);
        authState.uid == null ? (
          <Redirect to="/signup" />
        ) : (
          authData.userProfile.UnlockedTopicId.map((idItem) => {
            if (idItem == topicId) setShow(true);
          })
        );
      }
    });

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     $(window).scroll(() => {
  //       console.log("scroll");
  //     });
  //   }
  // });

  // Add React Helmet Regardless of locked since its already taken care of

  return !locked || (locked && show) ? (
    <div>
      <div className="selected-article">
        {Id === "before-you-start"
          ? specialities &&
            specialities.map((article) => {
              if ((article.Name = props.match.params.specialityId)) {
                return (
                  <div>
                    <Helmet>
                      <title>{article.Name}</title>
                      <meta name="description" content={article.keywords} />
                      <meta name="robots" content="index follow" />
                    </Helmet>
                    <Row key={article._id} className="full-view-article p-2">
                      <Col sm={2}>
                        {/* ads here
                    <br />
                    ads here
                    <br />
                    ads here
                    <br />
                    ads here
                    <br />
                    ads here
                    <br />
                    ads here
                    <br /> */}
                      </Col>

                      <Col id="top" style={{ padding: "0px" }} sm={8}>
                        <div className="ql-snow">
                          <div
                            className="full-article ql-editor"
                            dangerouslySetInnerHTML={{
                              __html: article.ArticleContent,
                            }}
                          ></div>
                        </div>
                        <a rel="nofollow" href="#">
                          <img
                            onClick={goToTop}
                            className="top-icon"
                            id="go-to-top"
                            style={{ width: "30px" }}
                            src="https://www.svgrepo.com/show/247787/up-arrow-upload.svg"
                            alt={"Go on Top of " + article.Name}
                          />
                        </a>
                      </Col>
                    </Row>
                  </div>
                );
              }
            })
          : articles &&
            articles.map((article) => {
              if (article.ArticleName === NId) {
                return (
                  <div>
                    <Helmet>
                      <title>{article.ArticleName}</title>
                      <meta name="description" content={article.keywords} />
                      <meta name="robots" content="index follow" />
                    </Helmet>
                    <Row key={article._id} className="full-view-article p-2">
                      <Col sm={2}>
                        {/* ads here
                    <br />
                    ads here
                    <br />
                    ads here
                    <br />
                    ads here
                    <br />
                    ads here
                    <br />
                    ads here
                    <br /> */}
                      </Col>

                      <Col id="top" style={{ padding: "0px" }} sm={8}>
                        <div className="ql-snow">
                          <div
                            className="full-article ql-editor"
                            dangerouslySetInnerHTML={{
                              __html: article.ArticleContent,
                            }}
                          ></div>
                        </div>
                        <a rel="nofollow" href="#">
                          <img
                            onClick={goToTop}
                            className="top-icon"
                            id="go-to-top"
                            style={{ width: "30px" }}
                            src="https://www.svgrepo.com/show/247787/up-arrow-upload.svg"
                            alt={"Go on Top of " + article.ArticleName}
                          />
                        </a>
                      </Col>
                    </Row>
                  </div>
                );
              }
              return null;
            })}
      </div>
      <Link to={"/learn/" + specialityId}>
        <img
          className="back-btn"
          src="https://www.svgrepo.com/show/50213/back.svg"
          alt="back button"
        />
      </Link>
      <ShareArticle NId={NId} url={url} />
      <Footer />
    </div>
  ) : (
    <Redirect to="/signup" />
  );
};

export default SelectedArticle;
