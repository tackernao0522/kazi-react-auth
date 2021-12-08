## 228 Laravel passport Authentication React Project

`$ npx create-react-app react-auth`を実行<br>

`$ npm install react-router-dom@5.3.0`を実行<br>

`$ npm install axios`を実行<br>

## 229 Larave Passport Authentication : React Router & Component Setup

+ `public/index.html`を編集<br>

```
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8" />
  <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="theme-color" content="#000000" />
  <meta name="description" content="Web site created using create-react-app" />
  <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />

  <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />

  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"
    integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l" crossorigin="anonymous">

  <title>React App</title>
</head>

<body>
  <noscript>You need to enable JavaScript to run this app.</noscript>
  <div id="root"></div>

  <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
    integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"
    crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"
    integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN"
    crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.min.js"
    integrity="sha384-+YQ4JLhjyBLPDQt//I+STsc9iw4uQqACwlvpslubQzn4u2UU2UFM80nGisd026JF"
    crossorigin="anonymous"></script>
</body>

</html>
```

+ `src/components`ディレクトリを作成<br>

+ `src/common`ディレクトリを作成<br>

+ `src/common/Header.jsx`コンポーネントを作成<br>

```
import { Component } from "react";

class Header extends Component {
  render() {
    return (
      <div>
        <h1>Easy Learning</h1>
      </div>
    )
  }
}

export default Header
```

+ `src/common/Nav.jsx`コンポーネントを作成<br>

```
import React, { Component } from 'react'

class Nav extends Component {
  render() {
    return (
      <div>

      </div>
    )
  }
}

export default Nav

```

+ `VS CODEの拡張機能 ES7 React/Redux/GraphQL/React-Native snippetsを入れる<br>

+ `src/index.js`を編集<br>

```
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Header from './common/Header';

ReactDOM.render(
  <React.StrictMode>
    <Header /> // 編集
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```

+ `src/common/Nav.jsc`を編集<br>

```
import React, { Component } from 'react'

class Nav extends Component {
  render() {
    return (
      <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <a class="navbar-brand" href="#">
            Navbar w/ text
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarText">
            <ul class="navbar-nav mr-auto">
              <li class="nav-item active">
                <a class="nav-link" href="#">
                  Home <span class="sr-only">(current)</span>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  Features
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  Pricing
                </a>
              </li>
            </ul>
            <span class="navbar-text">Navbar text with an inline element</span>
          </div>
        </nav>
      </div>
    )
  }
}

export default Nav
```

+ `src/common/Header.jsx`を編集<br>

```
import { Component } from "react";
import Nav from "./Nav";

class Header extends Component {
  render() {
    return (
      <div>
        <Nav />
      </div>
    )
  }
}

export default Header
```

+ `src/common/Nav.jsx`を編集<br>

```
import React, { Component } from 'react'

class Nav extends Component {
  render() {
    return (
      <div>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
          <a class="navbar-brand" href="#">
            Easy Learning
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarText">
            <ul class="navbar-nav mr-auto">
              <li class="nav-item active">
                <a class="nav-link" href="#">
                  Home <span class="sr-only">(current)</span>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  Profile
                </a>
              </li>
            </ul>
            <span class="navbar-text">
              <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                  <a class="nav-link" href="#">
                    Login
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">
                    Register
                  </a>
                </li>
              </ul>
            </span>
          </div>
        </nav>
      </div>
    )
  }
}

export default Nav
```

+ `src/common/Header.jsx`を編集<br>

```
import { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from '../components/Home'
import Nav from './Nav'

class Header extends Component {
  render() {
    return (
      <Router>
        <div>
          <Nav />
          <Switch>
            <Route exact path="/" component={Home} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default Header
```

+ `src/Home.jsx`コンポーネントを作成<br>

```
import React, { Component } from 'react'

class Home extends Component {
  render() {
    return (
      <div>
        <h1>Home Page</h1>
      </div>
    )
  }
}

export default Home
```


