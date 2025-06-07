# Implementing an NgRx-Based Modular Application

## Application Overview

The application consists of three core modules:
1. **User Module**: Manages user details such as `userId` and `name`.
2. **Subscription Module**: Manages subscriptions, with fields like `subId`, `subscriptionName`, `userId`, and `thirdPartyId`.
3. **Third Party Module**: Manages third-party entities, including `id`, `name`, and `userId`.

The application should follow the NgRx architecture for state management, including actions, reducers, effects, and selectors.

### Key Features
- Modular architecture with lazy-loaded modules.
- Normalized state using NgRx Entity for efficient state management.
- Cross-module communication using selectors.
- Lazy-loading for optimized performance.

---

## Implementation Plan

### 1. Root Module (`AppModule`)
- Configure the **root-level state** using `StoreModule.forRoot` and `EffectsModule.forRoot`.
- Define lazy-loaded routes for the **UserModule**, **SubscriptionModule**, and **ThirdPartyModule**.

### 2. User Module
#### State
- Define the `UserState` using NgRx Entity.
- Include fields for `userId` and `name`.

#### Actions
- Implement CRUD actions (`loadUsers`, `addUser`, `updateUser`, `deleteUser`, etc.).

#### Reducer
- Use `userAdapter` to handle entity operations in the `userReducer`.

#### Selectors
- Create selectors to query the user state, such as `selectAllUsers` and `selectSelectedUser`.

#### Effects
- Implement effects for side effects like API calls (`loadUsers`, `addUser`, etc.).

#### Components
- Build components like `UserListComponent` and `UserProfileComponent`.

#### Routing
- Use lazy-loaded routes for components (`/users`, `/users/:id`).

---

### 3. Subscription Module
#### State
- Define the `SubscriptionState` using NgRx Entity.
- Include fields for `subId`, `subscriptionName`, `userId`, and `thirdPartyId`.

#### Actions
- Implement CRUD actions (`loadSubscriptions`, `addSubscription`, etc.).

#### Reducer
- Use `subscriptionAdapter` to handle entity operations in the `subscriptionReducer`.

#### Selectors
- Create selectors to query the subscription state, e.g., `selectSubscriptionsByUserId`.

#### Effects
- Implement effects for API calls related to subscriptions.

#### Components
- Create components like `SubscriptionListComponent` and `SubscriptionDetailComponent`.

#### Routing
- Use lazy-loaded routes for components (`/subscriptions`, `/subscriptions/:id`).

---

### 4. Third Party Module
#### State
- Define the `ThirdPartyState` using NgRx Entity.
- Include fields for `id`, `name`, and `userId`.

#### Actions
- Implement CRUD actions (`loadThirdParties`, `addThirdParty`, etc.).

#### Reducer
- Use `thirdPartyAdapter` to handle entity operations in the `thirdPartyReducer`.

#### Selectors
- Create selectors like `selectThirdPartiesByUserId`.

#### Effects
- Implement effects for API calls related to third-party entities.

#### Components
- Create components like `ThirdPartyListComponent` and `ThirdPartyDetailComponent`.

#### Routing
- Use lazy-loaded routes for components (`/third-party`, `/third-party/:id`).

---

## Lazy Loading & Cross-Module Communication

### Lazy Loading
- Use `StoreModule.forFeature` and `EffectsModule.forFeature` in each feature module (`UserModule`, `SubscriptionModule`, `ThirdPartyModule`) to register feature stores and effects only when the module is loaded.

### Cross-Module Communication
- Use global selectors to access data across modules (e.g., `selectSubscriptionsByUserId` in the `UserModule`).

### Example: Display Subscriptions in User Profile
- In `UserProfileComponent`, use `selectSubscriptionsByUserId` from the `SubscriptionStore` to display subscriptions for a specific user.

---

## File Structure