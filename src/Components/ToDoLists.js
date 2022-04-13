import React, { useEffect } from "react";
import "./ToDoLists.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteList, fetchList } from "../Redux/Action";

const ToDoLists = () => {
  const dispatch = useDispatch();
  const lists = useSelector((state) => state.Reducer.lists);
  const fetchData = async () => {
    const response = await fetch(
      "https://redux-to-do-app-7e58a-default-rtdb.firebaseio.com/todo.json"
    );
    const responseData = await response.json();
    console.log(responseData);
    const loadedLists = [];
    for (const key in responseData) {
      loadedLists.push({
        key: key,
        id: responseData[key].id,
        title: responseData[key].title,
      });
    }
    dispatch(fetchList(loadedLists));
  };
  useEffect(() => {
    fetchData();
  }, []);
  const deleteListHandler = async (key, id) => {
    dispatch(deleteList(id));
    await fetch(
      `https://redux-to-do-app-7e58a-default-rtdb.firebaseio.com/todo/${key}.json`,
      {
        method: "DELETE",
      }
    );
  };
  return (
    <div>
      {lists.map((list, index) => (
        <div
          className="list"
          key={index}
          onClick={() => deleteListHandler(list.key, index)}
        >
          {/* <div className="id">{list.id}</div> */}
          <div className="title">{list.title}</div>
        </div>
      ))}
    </div>
  );
};
export default ToDoLists;
