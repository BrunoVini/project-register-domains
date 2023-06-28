import styled from "styled-components";

export const container = {
  maxWidth: "800px",
  margin: "0 auto",
  padding: "20px",
};

export const box = {
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  paddingTop: "20px",
};

export const title = {
  fontSize: "24px",
  fontWeight: "bold",
  marginBottom: "20px",
};

export const form = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
  height: 100vh;
`;

export const labelError = styled.label`
  font-size: 14px;
  color: red;
`;

export const Content = styled.div`
  gap: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  box-shadow: 0 1px 2px #0003;
  background-color: white;
  max-width: 450px;
  padding: 20px;
  border-radius: 5px;
`;

export const label = {
  fontSize: "18px",
  marginBottom: "10px",
};

export const input = {
  padding: "10px",
  marginBottom: "20px",
  width: "300px",
};

export const button = {
  padding: "10px 20px",
  backgroundColor: "#046ee5",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "16px",
};
