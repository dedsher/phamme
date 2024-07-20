import { useEffect } from "react";
import { useDispatch, useSelector } from "@shared/hooks/useRedux";
import { useGetUserProfileQuery } from "@entities/user/model/userApi";
import { setUser, clearUser } from "@entities/user/model/userSlice";

const useUser = (userId: number) => {
  const dispatch = useDispatch();
  const { data, error, isLoading } = useGetUserProfileQuery(userId);

  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    if (data) {
      dispatch(setUser(data));
    } else if (error) {
      dispatch(clearUser());
      console.log("Failed to fetch user", error);
    }
  }, [data, error, dispatch]);

  return { user, error, isLoading };
};

export default useUser;
