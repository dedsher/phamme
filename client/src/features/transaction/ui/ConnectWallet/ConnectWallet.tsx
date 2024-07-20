import { useEffect, useState } from "react";
import { Button } from "antd";
import { PublicKey } from "@solana/web3.js";
import { useSelector, useDispatch } from "@shared/hooks/useRedux";
import {
  useAddWalletMutation,
  useDeleteWalletMutation,
} from "@features/transaction/model/transactionApi";
import { useUserId } from "@entities/user/hooks/useUserId";
import { setWallet } from "@entities/user/model/userSlice";

export const ConnectWallet = () => {
  const userId = useUserId();
  const [publicKey, setPublicKey] = useState<PublicKey | null>(null);
  const userWallet = useSelector((state) => state.user.user.wallet);
  const [addWallet] = useAddWalletMutation();
  const [deleteWallet] = useDeleteWalletMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!publicKey && userWallet) {
      setPublicKey(new PublicKey(userWallet));
    }
  }, [userWallet, publicKey]);

  const connectWallet = async () => {
    if ((window as any).solana && !userWallet) {
      try {
        const response = await (window as any).solana.connect();
        setPublicKey(new PublicKey(response.publicKey.toString()));
        addWallet({
          userId,
          wallet: response.publicKey.toString(),
        });
        dispatch(setWallet(response.publicKey.toString()));
      } catch (err) {
        console.error("Wallet connection failed", err);
      }
    } else {
      console.log(
        "Phantom wallet is not installed or wallet already connected"
      );
    }
  };

  const disconnectWallet = async () => {
    if ((window as any).solana) {
      try {
        await (window as any).solana.disconnect();
        setPublicKey(null);
        deleteWallet(userId);
        dispatch(setWallet(null));
      } catch (err) {
        console.error("Wallet disconnection failed", err);
      }
    } else {
      console.log("Phantom wallet is not installed");
    }
  };

  return (
    <>
      <Button onClick={connectWallet}>
        {userWallet ? `Кошелек: ${userWallet}` : "Подключить кошелек Phantom"}
      </Button>
      {userWallet && (
        <Button onClick={disconnectWallet}>Отвязать кошелек</Button>
      )}
    </>
  );
};
