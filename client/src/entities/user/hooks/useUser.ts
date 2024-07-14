import { useGetUserQuery } from "../model/userApi";

const useUser = (userId: number) => {
    const { data: user = {}, refetch: refetchUser, isLoading: isUserLoading } = useGetUserQuery(userId);
    
    return { user, refetchUser, isUserLoading };
}

export default useUser;