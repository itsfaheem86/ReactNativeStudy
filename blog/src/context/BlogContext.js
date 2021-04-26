import createDataContext from "./createDataContext";
const ADD_BLOGPOST = "ADD_BLOGPOST";

const blogReducer = (state, action) => {
  switch (action.type) {
    case ADD_BLOGPOST:
      return [...state, { title: `Blog post #${state.length + 1}` }];
    default:
      return state;
  }
};

const addBlogPost = (dispatch) => {
  return () => {
    dispatch({ type: ADD_BLOGPOST });
  };
};

export const { Context, Provider } = createDataContext(
  blogReducer,
  { addBlogPost },
  []
);
