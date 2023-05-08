import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ethers } from "ethers";

import { mockedWallet } from "./mocks";

import App from "../../../../App";

jest.mock("ethers", () => {
  return {
    ...jest.requireActual("ethers"),
    ethers: {
      InfuraProvider: jest.fn(),
      formatEther: (value) => value,

      Wallet: {
        createRandom: () => mockedWallet,
        fromEncryptedJsonSync: () => true
      },
    },
  };
});


describe('Wallet Tests', () => {
  beforeEach(() => {
    localStorage.clear();
  
    const mockInfuraProvider = {
      getBalance: jest.fn().mockResolvedValue("1000000000000000000"),
    };
  
    ethers.InfuraProvider.mockImplementation(() => mockInfuraProvider);
  });
  
  test("User should see create password screen if wallet is not created", async () => {
    render(<App />);
  
    expect(
      screen.getByText("Create a new password to generate a new wallet!")
    ).toBeInTheDocument();
  
    expect(
      await waitFor(() => screen.getByText("Create new password"))
    ).toBeInTheDocument();
  });
  
  test("Wallet should automatically be created after user creates password", async () => {
    render(<App />);
  
    // open create password screen
    fireEvent.click(screen.getByText("Create new password"));
  
    expect(screen.getByText("Create Password")).toBeInTheDocument();
    expect(
      screen.getByText("Please enter a strong password")
    ).toBeInTheDocument();
  
    const passwordInput = screen.getByTestId("password");
    const confirmPasswordInput = screen.getByTestId("confirmPassword");
  
    // Submit the form
    fireEvent.change(passwordInput, { target: { value: "P@ssw0rd1111" } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: "P@ssw0rd1111" },
    });
    const submitButton = screen.getByText("Create");

    fireEvent.click(submitButton);
  
    expect(await waitFor(() => screen.getByText("Address"))).toBeInTheDocument();
    expect(screen.getByText("Balance")).toBeInTheDocument();
  
    const wallets = JSON.parse(localStorage.getItem("wallets") || "");
  
    expect(wallets.length).toEqual(1);
  });
  
  test("User should be able to create multiple wallets", async () => {
    render(<App />);
  
    // open create password screen
    fireEvent.click(screen.getByText("Create new password"));
  
    expect(screen.getByText("Create Password")).toBeInTheDocument();
    expect(
      screen.getByText("Please enter a strong password")
    ).toBeInTheDocument();
  
    const passwordInput = screen.getByTestId("password");
    const confirmPasswordInput = screen.getByTestId("confirmPassword");
  
    // Submit the form
    fireEvent.change(passwordInput, { target: { value: "P@ssw0rd1111" } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: "P@ssw0rd1111" },
    });
    const submitButton = screen.getByText("Create");
    fireEvent.click(submitButton);
  
    expect(await waitFor(() => screen.getByText("Address"))).toBeInTheDocument();
  
    fireEvent.click(screen.getByText("Add new wallet"));
  
    expect(await waitFor(() => screen.getByText("Please enter your password to create a new wallet"))).toBeInTheDocument();
  
    const confirmPassword = screen.getByTestId("confirmPassword");
  
    fireEvent.change(confirmPassword, { target: { value: "P@ssw0rd1111" } });
    fireEvent.click(screen.getByText("Enter"));
  
    expect(await waitFor(() => screen.getByText("Address"))).toBeInTheDocument();
  
    const wallets = JSON.parse(localStorage.getItem("wallets") || "");
    expect(wallets.length).toEqual(2);
  });
})

