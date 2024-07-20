import { useState } from "react";
import { Modal, Form, Input, Button } from "antd";
import {
  PublicKey,
  Transaction,
  SystemProgram,
  Connection,
  clusterApiUrl,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import { Buffer } from "buffer";
import { useSelector } from "@shared/hooks/useRedux";
import { useCreateTransactionMutation } from "@features/transaction/model/transactionApi";

window.Buffer = Buffer;

interface TransactionFormProps {
  isVisible: boolean,
  onCancel: () => void,
  recipient: any,
};

export const TransactionForm = ({ isVisible, onCancel, recipient }: TransactionFormProps) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const userWallet = useSelector((state) => state.user.user.wallet);
  const userId = useSelector((state) => state.user.user.id);
  const [sendTransaction, { isLoading: isTransactionLoading }] =
    useCreateTransactionMutation();

  const handleSend = async (values: any) => {
    setLoading(true);

    try {
      if (!window.solana || !window.solana.isPhantom) {
        throw new Error("Phantom wallet is not connected");
      }

      const user = await window.solana.connect();
      const userPublicKey = user.publicKey;

      const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

      const { blockhash } = await connection.getLatestBlockhash("finalized");

      const transaction = new Transaction({
        recentBlockhash: blockhash,
        feePayer: userPublicKey,
      }).add(
        SystemProgram.transfer({
          fromPubkey: userPublicKey,
          toPubkey: new PublicKey(recipient.wallet),
          lamports: Number(values.amount) * LAMPORTS_PER_SOL,
        })
      );

      const signedTransaction = await window.solana.signTransaction(
        transaction
      );

      const signature = await connection.sendRawTransaction(
        signedTransaction.serialize()
      );

      const confirmation = await connection.confirmTransaction(
        signature,
        "confirmed"
      );

      if (confirmation.value.err) {
        throw new Error("Transaction failed");
      }

      await sendTransaction({
        userId,
        transaction: {
          from: userId,
          to: recipient.id,
          amount: values.amount,
          signature: signature,
        },
      });

      form.resetFields();
      onCancel();
    } catch (err) {
      console.error("Transaction failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={isVisible} onCancel={onCancel} footer={null}>
      <h2>{`Отправить SOL ${recipient.firstname} ${recipient.lastname}`}</h2>
      <Form form={form} layout="vertical" onFinish={handleSend}>
        <Form.Item
          name="amount"
          label="Количество (SOL)"
          rules={[{ required: true, message: "Please input the amount!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Перевести
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
