# xwitch

`xwitch` replaces `switch` statement with function call.

`xwitch` is short for `expression switch`.

## Installation

```shell script
yarn add xwitch
```

or

```shell script
npm install xwitch
```

## Usage

```typescript jsx
import xwitch from 'xwitch';
import {AdminIcon, UserIcon, AnonymousIcon} from './some-icon-path';

type UserType = 'admin' | 'normal' | 'anonymous';
const user: UserType = 'admin';

// icon is inferred as ReactElement | null
const icon = xwitch(user)
  .case('admin', () => <AdminIcon />)
  .case('normal', () => <UserIcon />)
  .case('anonymous', () => <AnonymousIcon />)
  .default(() => null);
```

## API

TODO

## Motivation

`switch` syntax in JavaScript has following disadvantage.

1. `switch` is not expression but statement. So, Sometimes, You must declare variable as `let` even if the variable will never changed.
1. `case` statement does not create a block scope. that specification makes it difficult to name a variable used in statements associated with that `case`.
1. if you forget `break` statement, that causes unexpected behaviors.
