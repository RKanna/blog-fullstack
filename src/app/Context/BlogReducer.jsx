import axios from "axios";
const blogReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_INIT":
      // console.log(action);
      return action.payload.data;
    case "CREATE_BLOG":
      axios.post("http://localhost:3001/api/v1/blogs", action.payload);
      return [...state, action.payload];
    case "UPDATE_BLOG":
      axios.put(
        `http://localhost:3001/api/v1/blogs/${action.payload._id}`,
        action.payload
      );
      return state.map((blog) =>
        blog._id === action.payload._id ? action.payload : blog
      );
    case "DELETE_BLOG":
      // axios.delete(
      //   `http://localhost:3001/api/v1/blogs/${action.payload}`,
      //   action.payload
      // );
      axios.delete(`http://localhost:3001/api/v1/blogs/${action.payload}`);
      return state.filter((blog) => blog._id !== action.payload);

    default:
      return state;
  }
};

export default blogReducer;

/////////////////////////////////////////////

// const blogReducer = async (state, action) => {
//   switch (action.type) {
//     case "FETCH_INIT":
//       // console.log(action);
//       return action.payload.data;
//     case "CREATE_BLOG":
//       try {
//         const response = await fetch("http://localhost:3001/api/v1/blogs", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(action.payload),
//         });

//         if (response.ok) {
//           return [...state, action.payload];
//         } else {
//           console.error("Error creating blog:", response.statusText);
//           return state;
//         }
//       } catch (error) {
//         console.error("Error creating blog:", error.message);
//         return state;
//       }

//     case "UPDATE_BLOG":
//       try {
//         const response = await fetch(
//           `http://localhost:3001/api/v1/blogs/${action.payload._id}`,
//           {
//             method: "PUT",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify(action.payload),
//           }
//         );

//         if (response.ok) {
//           return state.map((blog) =>
//             blog._id === action.payload._id ? action.payload : blog
//           );
//         } else {
//           console.error("Error updating blog:", response.statusText);
//           return state;
//         }
//       } catch (error) {
//         console.error("Error updating blog:", error.message);
//         return state;
//       }

//     case "DELETE_BLOG":
//       try {
//         const response = await fetch(
//           `http://localhost:3001/api/v1/blogs/${action.payload}`,
//           {
//             method: "DELETE",
//           }
//         );

//         if (response.ok) {
//           return state.filter((blog) => blog._id !== action.payload);
//         } else {
//           console.error("Error deleting blog:", response.statusText);
//           return state;
//         }
//       } catch (error) {
//         console.error("Error deleting blog:", error.message);
//         return state;
//       }

//     default:
//       return state;
//   }
// };

// export default blogReducer;
