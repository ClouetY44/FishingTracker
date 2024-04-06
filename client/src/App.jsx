// import { useDispatch, useSelector } from "react-redux";
// import { useEffect } from "react";

import UserRoutes from "./Router/User.routes";
// import { checkToken } from "./store/slice/checkToken";
// import { login } from "./store/slice/user";

function App() {
  // const dispatch = useDispatch();
  // const userType = useSelector((state) => state.user.role);
  // const { data } = useSelector((state) => state.token);

  // useEffect(() => {
  //   dispatch(checkToken());
  // }, [userType]);

  // useEffect(() => {
  //   console.log(data)
  //   dispatch(login(data));
  // }, [data]);

  return <UserRoutes />;
}

export default App;
