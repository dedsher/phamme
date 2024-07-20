import "./Search.scss";
import { Input } from "antd";
import classNames from "classnames";
import { useCallback, useState } from "react";
import { debounce } from "lodash";
import { useSelector } from "@shared/hooks/useRedux";
import { SearchIcon } from "@shared/assets/icons";
import { useLazyGetUsersForSearchQuery } from "@entities/user/model/userApi";
import SearchItem from "../SearchItem/SearchItem";
import { useGetUserChatsQuery } from "@features/chat/model/chatApi";

const Search = () => {
  const userId = useSelector((state) => state.user.user.id);
  const [triggerGetUsers, { data: users = [], isLoading: isUsersLoading }] = useLazyGetUsersForSearchQuery();
  const [foundUsers, setFoundUsers] = useState([]);
  const { data: userChats } = useGetUserChatsQuery(userId);

  const handleSearch = (value: string) => {
    if (!value) {
      setFoundUsers([]);
      return;
    }

    const lowerCaseQuery = value.toLowerCase();

    const filteredUsers = users.filter((user: any) => {
      const fullName = `${user.firstname} ${user.lastname}`.toLowerCase();
      return fullName.includes(lowerCaseQuery);
    });

    setFoundUsers(filteredUsers);
  };

  const debouncedSearch = useCallback(
    debounce((value) => {
      handleSearch(value);
    }, 400),
    [users]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };

  const handleInputFocus = () => {
    if (!users.length) {
      triggerGetUsers(userId);
    }
  };

  return (
    <div className="search">
      <div className="search__wrapper">
        <Input
          placeholder="Search"
          style={{
            width: 200,
          }}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
        />
        <div className="search__icon">
          <SearchIcon />
        </div>
      </div>
      <div
        className={classNames(
          "search__found-users",
          !foundUsers.length && "search__found-users--hidden"
        )}
      >
        {foundUsers.map((user: any) => (
          <SearchItem key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default Search;