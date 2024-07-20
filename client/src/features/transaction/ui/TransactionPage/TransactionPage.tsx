import { useState } from "react";
import { Select, List, Spin } from "antd";
import { useSelector } from "@shared/hooks/useRedux";
import { TransactionForm } from "@features/transaction/ui/TransactionForm/TransactionForm";
import {
  useGetFriendssWithWalletsQuery,
  useGetTransactionsQuery,
} from "@features/transaction/model/transactionApi";

const TransactionPage = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const userId = useSelector((state) => state.user.user.id);
  
    const {
      data: transactions,
      isLoading: isTransactionsLoading,
      isError: isTransactionsError,
    } = useGetTransactionsQuery(userId);
  
    const {
      data: friends,
      isLoading: isFriendsLoading,
      isError: isFriendsError,
    } = useGetFriendssWithWalletsQuery(userId);
  
    const handleUserChange = (value) => {
      const user = friends.find((user) => user.id === value);
      setSelectedUser(user);
      setIsModalVisible(true);
    };
  
    const handleCancel = () => {
      setIsModalVisible(false);
      setSelectedUser(null);
    };
  
    if (isTransactionsLoading || isFriendsLoading) {
      return <Spin />;
    }
  
    if (isTransactionsError || isFriendsError) {
      return <div>Ошибка загрузки данных</div>;
    }
  
    return (
      <div>
        <h1>История переводов</h1>
        <List
          dataSource={transactions}
          renderItem={(item, index) => (
            <List.Item key={index}>
              <List.Item.Meta
                title={`Перевод ${item.amount} SOL`}
                description={`От: ${item.from_firstname} ${item.from_lastname} К: ${item.to_firstname} ${item.to_lastname}`}
              />
            </List.Item>
          )}
        />
        <h2>Создать перевод</h2>
        <Select
          style={{ width: 200 }}
          placeholder="Выберите пользователя"
          onChange={handleUserChange}
          value={selectedUser ? selectedUser.id : undefined}
        >
          {friends.map((user) => (
            <Select.Option key={user.id} value={user.id}>
              {`${user.firstname} ${user.lastname}`}
            </Select.Option>
          ))}
        </Select>
  
        {isModalVisible && selectedUser && (
          <TransactionForm
            isVisible={isModalVisible}
            onCancel={handleCancel}
            recipient={selectedUser}
          />
        )}
      </div>
    );
  };
  
  export default TransactionPage;
  