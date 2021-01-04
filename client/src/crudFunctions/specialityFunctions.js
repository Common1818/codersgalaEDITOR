import firebase from "../config/fbConfig";
import axios from "axios";

export const getSpecialities = async (dispatch) => {
  const res = await axios.get("/api/speciality/all");
  const { specialities } = res.data;

  dispatch({ type: "FETCH_SPECIALITIES", specialitites: specialities });
};

export const UpdateCard = (state, dispatch) => {
  console.log(state);
  firebase
    .firestore()
    .collection("Specialities")
    .doc(state.id)
    .update({
      ...state,
    })
    .then(() => {
      firebase
        .firestore()
        .collection("Articles")
        .doc(state.articleId)
        .update({
          ArticleContent: state.ArticleContent,
        })
        .then(() => {
          dispatch({
            type: "UPDATE_CARD",
            message: "Article updated successfully",
            color: "success",
            complete: true,
          });
        });
    })
    .catch(() => {
      dispatch({
        type: "UPDATE_CARD",
        message: "Error updating article",
        color: "danger",
        complete: true,
      });
    });
};

export const AddCardFunction = async (state, dispatch) => {
  const { imageUrl, Loading, Name, ArticleContent } = state;
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(state);
  try {
    const res = await axios.post(
      `/api/speciality/add/${localStorage.userId}`,
      body,
      config
    );
    dispatch({
      type: "ADD_CARD",
      message: "Article added successfully",
      color: "success",
      complete: true,
    });
  } catch (wee) {
    dispatch({
      type: "UPDATE_CARD",
      message: "Error adding article",
      color: "danger",
      complete: true,
    });
  }
};
