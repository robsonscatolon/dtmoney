import { useState } from "react";
import Modal from "react-modal";
import logoImg from "../../assets/logo.svg";
import { Container, Content } from "./styles";


interface HeaderProps{
  onOpenNewTransactionModal: () => void;
}

export function Header(props:HeaderProps) {


  return (
    <Container>
      <Content>
        <img src={logoImg} alt="Logo dtmoney" />
        <button type="button" onClick={props.onOpenNewTransactionModal}>
          Nova transação
        </button>
      </Content>
    </Container>
  );
}
