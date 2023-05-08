## Available Scripts

In the project directory, you can run:

### `yarn install`

To install project dependencies

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

To run application tests

## User Experience (UX)

The app has 5 views as following:

### Initial View

- Initial view to show if no wallets created with a CTA to create password.

### Create Password view

- A password form view to enter and confirm password.
- User should enter a strong password that includes small and capital letters, special characters, numbers and at least 8 characters
- Once password is created a new wallet will automatically be created for the user.

### Wallet Home View

- From the home view, user can see wallet address and balance
- User can switch between different wallets
- User can switch between different networks
- User has CTAs to create a new wallet and show private key for current wallet

### Add New Wallet view

- User has to enter his password to create a new wallet.
- If password is incorrect we show error message.
- If password is correct, new wallet is generated and set to be the current active wallet.
- User switch back to wallet home view.

### Show private key view

- User has to enter his password to create a show wallet private key.
- If password is incorrect we show error message.
- If password is correct, we show private key for the user.

## Code Style and quality

- Typescript is used to define all the app types

- ESlint and Prettier are used to force a specific style rules

## Test Coverage

React testing library and Jest are used for testing Wallet screens.

## Code Structure

The project structure is implemented around Domain Driven Design principles.
<br />

Benefits of that structure are:
<br />

- Promote strongly typed domains models to make imposible state imposible (https://www.youtube.com/watch?v=IcgmSRJHu_8).
- Enforce code & domain ownership.
- Simplify code discoverability to reduce code duplication.
  <br />

What is a domain? <br />

- 'Domain' is a TypeScript type that represents business domain. For example: Wallet.
- Each domain contains all code that relative to the domain this includes api, components, hooks, features etc
- ui-kit folder is used For the UI component that doesn't belong to any specific domain ex. Header component

## State Management

- Redux toolkit is used for managing global wallet states
- React hooks is used for managing internal components states.
- Local storage is used to persist wallets data (passwords are not persisted in the storage and private keys are stored encrypted)

## Supprted Networks

User can swich between 4 networks

- ETH Mainnet
- ETH Goerli
- BNB Mainnet
- BNB Testnet

## General notes

- The Layout is quite simple. No UI-Kit is used. Giving the focus more on the functionality and code structure.

Thanks a lot :)
