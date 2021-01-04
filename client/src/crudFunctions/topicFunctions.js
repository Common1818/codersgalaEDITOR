import firebase from "../config/fbConfig";
import axios from "axios";

export const getTopics = async (dispatch) => {
  const res = await axios.get("/api/topic/all");
  const { topics } = res.data;

  dispatch({ type: "FETCH_TOPICS", topics });
};

export const AddTopic = async (state, dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(state);
  console.log(body);
  try {
    const res = await axios.post(
      `/api/topic/add/${localStorage.userId}`,
      body,
      config
    );
    console.log(res.data);
    dispatch({
      type: "ADD_TOPIC",
      message: "Added topic Successfully",
      color: "success",
    });
  } catch (err) {
    console.error(err);
    dispatch({
      type: "ADD_TOPIC",
      message: "Error Adding Topic",
      color: "danger",
    });
  }
};

export const UpdateTopic = (state, dispatch) => {
  console.log(state);
  // firebase
  //   .firestore()
  //   .collection("TopicNames")
  //   .doc(state.id)
  //   .update({
  //     ...state,
  //   })
  //   .then(() => {
  //     dispatch({
  //       type: "UPDATE_TOPIC",
  //       message: "Updated topic Successfully",
  //       color: "success",
  //     });
  //   })
  //   .catch((err) => {
  //     dispatch({
  //       type: "UPDATE_TOPIC",
  //       message: "Error Updating Topic",
  //       color: "danger",
  //     });
  //   });
};

export const DeleteTopicFunction = async (collectionName, id, dispatch) => {
  try {
    const res = await axios.delete(
      `/api/topic/remove/${id}/${localStorage.userId}`
    );
    console.log(res.data);
    dispatch({
      type: "TOPIC_DELETE",
      message: "Topic deleted successfully",
      complete: true,
    });
  } catch (error) {
    dispatch({
      type: "TOPIC_DELETE",
      message: "Error deleteting topic",
      complete: true,
    });
  }
};
