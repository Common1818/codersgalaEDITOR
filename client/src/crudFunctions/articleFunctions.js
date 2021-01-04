import firebase from "../config/fbConfig";
import axios from "axios";

export const getArticles = async (dispatch) => {
  const res = await axios.get("/api/article/all");
  const { articles } = res.data;

  dispatch({ type: "FETCH_ARTICLES", articles });
};

export const addArticle = async (state, dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(state);
  console.log(body);
  try {
    const res = await axios.post(
      `/api/article/add/${localStorage.userId}`,
      body,
      config
    );
    console.log(res.data);
    dispatch({
      type: "ADD_ARTICLE",
      message: "Article added successfully",
      color: "success",
      complete: true,
    });
  } catch (err) {
    console.error(err);
    dispatch({
      type: "ADD_ARTICLE",
      message: "Error adding article",
      color: "danger",
    });
  }
};

export const UpdateArticleFunction = async (state, ArticleId, dispatch) => {
  console.log(state);
  console.log(ArticleId);

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(state);
  console.log(body);
  try {
    const res = await axios.put(
      `/api/article/update/${ArticleId}/${localStorage.userId}`,
      body,
      config
    );
    console.log(res.data);
    dispatch({
      type: "UPDATE_ARTICLE",
      color: "success",
      message: "Article updated successfully",
      complete: true,
    });
  } catch (err) {
    console.error(err);
    dispatch({
      type: "UPDATE_ARTICLE",
      color: "danger",
      message: "Error updating article",
      complete: true,
    });
  }

  // firebase
  //   .firestore()
  //   .collection("Articles")
  //   .doc(ArticleId)
  //   .update({
  //     ...state,
  //   })
  //   .then(() => {
  //     dispatch({
  //       type: "UPDATE_ARTICLE",
  //       color: "success",
  //       message: "Article updated successfully",
  //       complete: true,
  //     });
  //   })
  //   .catch(() => {
  // dispatch({
  //   type: "UPDATE_ARTICLE",
  //   color: "danger",
  //   message: "Error updating article",
  //   complete: true,
  // });
  //   });
};
