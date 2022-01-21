import { FormEvent, useContext, useState } from "react";
import Modal from "react-modal";
import { Container, TransactionTypeContainer, RadioBox } from "./styles";
import closeImg from "../../assets/close.svg";
import incomeImg from "../../assets/income.svg";
import outcomeImg from "../../assets/outcome.svg";

import {
  TransactionProvider,
  useTransactions
} from "../../hooks/useTransactionsContext";

interface NewTransactionalModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}
export function NewTransactionalModal(props: NewTransactionalModalProps) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("");
  const [type, setType] = useState("deposit");
  const { createTransaction } = useTransactions();

  async function handleSubmitNewTransaction(event: FormEvent) {
    event.preventDefault();
    await createTransaction({ title, amount, category, type });

    setTitle('');
    setAmount(0);
    setCategory('');
    setType('deposit');

    props.onRequestClose();
  }

  return (
    <Modal
      isOpen={props.isOpen}
      onRequestClose={props.onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button
        className="react-modal-close"
        type="button"
        onClick={props.onRequestClose}
      >
        <img src={closeImg} alt="Fechar" />
      </button>

      <Container onSubmit={handleSubmitNewTransaction}>
        <h2>Cadastrar Transação</h2>

        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Titulo"
        />
        <input
          type="number"
          value={amount}
          onChange={(event) => setAmount(Number(event.target.value))}
          placeholder="Valor"
        />
        <TransactionTypeContainer>
          <RadioBox
            type="button"
            colorActive="green"
            isActive={type === "deposit"}
            onClick={() => setType("deposit")}
          >
            <img src={incomeImg} alt="Entrada" />
            <span>Entrada</span>
          </RadioBox>
          <RadioBox
            type="button"
            colorActive="red"
            isActive={type === "withdraw"}
            onClick={() => setType("withdraw")}
          >
            <img src={outcomeImg} alt="Saída" />
            <span>Saída</span>
          </RadioBox>
        </TransactionTypeContainer>
        <input
          type="text"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          placeholder="Categoria"
        />
        <button type="submit">Cadastrar</button>
      </Container>
    </Modal>
  );
}
