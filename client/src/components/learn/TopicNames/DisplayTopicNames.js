/* eslint-disable */
import React, { useContext, useState } from "react";
import { Accordion, Button } from "react-bootstrap";

import AddTopicName from "./AddTopicName";
import DeleteButton from "../../layout/Button/DeleteButton";
import UpdateTopicName from "./UpdateTopicName";

import LockedUnlockedTopic from "../../referralSystem/lockedUnlockedTopics";
import { AuthContext } from "../../../contexts/authContext";

import "./css/Article-names.css";
import $ from "jquery";
import Plus from "./DisplayTopicNamesComp/add";
import Article from "./DisplayTopicNamesComp/article";
import { HomeContext } from "../../../contexts/homeContext";

const DisplayTopicNames = (props) => {
  const {
    displayMode,
    SpecialityId,
    TopicNames,
    Articles,
    displayArticle,
    referralArticle,
  } = props;
  const { home } = useContext(HomeContext);
  const { authData } = useContext(AuthContext);
  const { isAdmin } = authData;
  // For dark mode
  // made a function that updates the state to re render the component

  //
  const [firstRender, setFirstRender] = useState(true);
  const [unhideToggleId, setUnhideToggleId] = useState({});

  const checkLocked = (topic) => {
    //Check if the article is locked and show referral article. Unhide toggle is a condition to check if it is unlocked by user.
    if (topic.locked === true && unhideToggleId[topic._id] == null) {
      referralArticle(topic._id);
    }
  };

  const UnhideToggle = (id) => {
    setUnhideToggleId({
      ...unhideToggleId,
      [id]: true,
    });
  };

  var Arrow;
  // const Mode = localStorage.getItem("mode");

  if (firstRender) {
    authData.userProfile &&
      authData.userProfile.UnlockedTopicId &&
      authData.userProfile.UnlockedTopicId.map((id) => {
        setUnhideToggleId({
          ...unhideToggleId,
          [id.id]: true,
        });
      });
    setFirstRender(false);
  }

  const readArticle = (article) => {
    displayArticle(article);
    if (typeof window !== "undefined") {
      if (window.innerWidth <= 569) {
        console.log($(".card-container").position());
        $("html, body").animate({ ScrollTop: 585 }, 100);
      }
    }
  };

  // const [Arrow, setArrow] = useState(
  //   "https://www.svgrepo.com/show/60060/down-arrow.svg"
  // );

  return (
    <div>
      {TopicNames &&
        TopicNames.map((item) => {
          if (SpecialityId === item.SpecialityId) {
            return (
              <div
                className="p-0 speciality-topic-container m-1"
                key={item._id}
                onClick={() => checkLocked(item)}
              >
                {/* When user clicked on the locked topic box referral article shows*/}
                <h4 className="float-left topicName">{item.Name}</h4>

                <Accordion>
                  {item.locked != true || unhideToggleId[item._id] != null ? (
                    <Accordion.Toggle
                      as={Button}
                      variant="link"
                      className="float-right arrow-down"
                      eventKey={item.Name.split(/\s/).join("")} // to remove spaces
                      onClick={() => {
                        $(
                          `.fa-angle-down#${item.Name.split(/\s/).join("")}`
                        ).toggleClass("rotate");
                      }}
                    >
                      <svg
                        id={item.Name.split(/\s/).join("")}
                        viewBox="0 0 32 32"
                        className=" icon icon-chevron-bottom article-dwn article-toggle fa-angle-down"
                        viewBox="0 0 32 32"
                        aria-hidden="true"
                      >
                        <path d="M16.003 18.626l7.081-7.081L25 13.46l-8.997 8.998-9.003-9 1.917-1.916z" />
                      </svg>
                    </Accordion.Toggle>
                  ) : (
                    <LockedUnlockedTopic
                      topic={item}
                      unhideToggle={UnhideToggle}
                    />
                  )}
                  <div>
                    <div className="clearflex"></div>

                    <div className="float-right">
                      {isAdmin ? (
                        <DeleteButton
                          key={"del" + item._id}
                          collectionName="TopicNames"
                          DocId={item._id}
                          size="small"
                        />
                      ) : null}
                    </div>
                    <div className="clearflex"></div>
                    {isAdmin ? (
                      <div className="float-right">
                        <UpdateTopicName Topic={item} />
                      </div>
                    ) : null}
                    <div className="clearflex"></div>
                    <div className="float-right">
                      {isAdmin ? (
                        <Plus
                          SpecialityId={item.SpecialityId}
                          id={item._id}
                          Name={item.Name}
                        />
                      ) : null}
                    </div>
                  </div>
                  <br />
                  <hr />
                  <Accordion.Collapse eventKey={item.Name.split(/\s/).join("")}>
                    <div>
                      <ol>
                        {Articles &&
                          Articles.map((article) => {
                            if (item._id == article.TopicId) {
                              return (
                                <div className="read-icon" key={article._id}>
                                  <br />
                                  <br />
                                  <Article
                                    displayMode={displayMode}
                                    readArticle={readArticle}
                                    article={article}
                                    item={item}
                                    isAdmin={isAdmin}
                                  />
                                </div>
                              );
                            } else {
                              return null;
                            }
                          })}
                      </ol>
                    </div>
                  </Accordion.Collapse>
                </Accordion>
                <br />
              </div>
            );
          }
        })}
      {isAdmin ? <AddTopicName SpecialityId={SpecialityId} /> : null}
    </div>
  );
};

export default DisplayTopicNames;
