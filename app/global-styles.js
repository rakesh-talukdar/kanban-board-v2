import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    width: 100%;
    background-color: #063634;
    min-height: 100vh;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  body.fontLoaded {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #app {
    min-height: 100vh;
    min-width: 100%;
  }

  p,
  label {
    font-family: Georgia, Times, 'Times New Roman', serif;
    line-height: 1.5em;
  }


  ul {
    list-style: none;
  }
  input, button {
    outline: none;
    border: none;
  }
  
  /* Style for header section */
  .header {
    display: flex;
    justify-content: space-around;
    background-color: #157570;
    padding: 0 12%;
    padding-top: 0.5em;
    align-items: flex-start;
  }
  
  .heading {
    text-transform: uppercase;
    font-weight: 600;
    color: rgb(236, 218, 218);
    margin-right: 2em;
  }
  
  .search-and-filter-wrapper {
    flex-basis: 35%;
    display: flex;
    align-items: center;
    margin-right: 10em;
  }
  
  
  .search-container {
    flex-basis: 60%;
    flex-grow: 1;
  }
  .search-form {
    display: flex;
    align-items: center;
  }
  .search-input {
    padding: 0.6em;
    width: 90%;
    border-radius: 5px;
  }
  .search-btn {
    margin-left: 0.6em; 
    border-radius: 8px;
    color: #fff;
    cursor: pointer;
    font-size:1.4em;
    background-color: transparent;
  }
  
  .search-btn:hover {
    transform: scale(1.2);
    color: rgb(233, 55, 129);
  }
  
  .filter-container {
    flex-basis: 50%;
    padding: 0em;
  }
  .filter-select {
    padding: 0.3em 0.5em;
    border: none;
    outline: none;
    font-size: 1em;
    width: 100%;
    border-radius: 5px;
    background-color: #fff;
    cursor: pointer;
  }
  .filter-select option {
    cursor: pointer;
    font-size: 1.2em;
  }
  
  .filter-select:focus, .search-input:focus {
    box-shadow: 0px 0px 3px 3px #66e4dd;
    color: #000;
  }
  
  /* Style for task section */
  .task-list-container {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin-top: 3em;
  }
  
  .task-list-card {
    flex-basis: 22em;
    margin: 0.5em;
    padding-bottom: 2em;
    border-radius: 10px;
    background-color: #EBECF0;
  }
  
  .task-list-header {
    display: flex;
    justify-content: center;
  }
  
  .task-list-header h3 {
    color: rgb(75, 70, 70);
    font-size: 1.4em; 
    padding-top: 0.5em;
    text-transform: capitalize;
  }
  
  .task-list {
    display: flex;
    flex-flow: column;
    padding: 0.8em; 
    margin: 0;
    list-style: none;
  }
  .task-card {
    display: flex;
    justify-content: space-between;
    flex-basis: 100%;
    padding: 0.7em;
    box-shadow: 0px 0px 3px 3px #ccc;
    background-color: #fff;
    margin-bottom: 0.5em;
    border-radius: 5px;
    overflow: hidden;
    min-height: 3em;
    cursor: pointer;
  }
  .task-card:hover {
    transform: scale(1.02);
  }
  .task-title {
    flex-grow: 1;
    cursor: pointer;
    margin: 0;
  }
  
  .task-card-username-and-drop-btn {
    display: flex;
    flex-flow: column;
    margin: 0;
  }
  
  .task-card-username {
    align-self: flex-end;
    font-size: 0.7em;
    border-radius: 50%;
    background-color:  rgb(31, 105, 128);
    color: #fff;
    padding: 0.6em;
    margin-top: 1em;
    cursor: pointer;
    min-width: 2em;
    min-height: 1em;
  }
  
  .task-card-username:hover {
    background-color:  rgb(14, 146, 187);
    font-size: 0.72em;
    font-weight: 600;
    color: #fff;
  }
  
  .add-task-card-btn {
    background-color:  rgb(31, 105, 128);
    padding: 0.1em 0.6em;
    margin: 0.5em 26%;
    font-size: 1.1em;
    color: #fff;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .add-task-card-btn:hover {
    background-color: rgb(23, 76, 92);
  }
  .searchIcon {
    margin-left: 0.4em;
  }
  
  /* Style for delete task button */
  .delete-task-btn {
    color: rgb(202, 4, 4);
    background-color: #fff;
    cursor: pointer;
  }
  .delete-task-btn:hover {
    background-color: rgb(202, 4, 4);
    color: #fff;
    border-radius: 10px;
    transform: scale(1.1);
  }
  .dropIcon {
    pointer-events:none;
  }
  /* Style for modal */
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0,0,0,0.4);
    z-index: 1; 
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    transition: all ease 1s;
  }
  
  .modal-content {
    margin-top: 6em;
    padding: 1.5em;
    width: 35%;
    height: 65vh;
    background-color: #fff;
    border-radius: 10px;
  
    /* Modal animation */
    animation-name: show-modal;
    animation-duration: 0.5s;
    animation-timing-function: ease-in-out;
  }
  
  /* Modal animation */
  @keyframes show-modal {
    0% {opacity: 0.2;}
    25%{opacity: 0.4;}
    50%{opacity: 0.6;}
    75%{opacity: 0.8;}
    100%{opacity: 1;}
  }
  
  .modal-content header {
    display: flex;
    justify-content: flex-end;
  }
  .modal-close-btn {
    background-color: rgb(202, 4, 4);
    color: #fff;
    font-size: 1.3em;
    align-self: flex-start;
    cursor: pointer;
    border-radius: 5px;
  }
  .modal-close-btn:hover {
    background-color: rgb(228, 2, 2);
    color: #fff;
    transform: scale(1.1);
  }
  
  /* Add task form  style*/
  .add-task-form {
    display: flex;
    flex-flow: column;
    justify-content: space-between;
    padding: 0 0.2em; 
    margin: 4em 0;
  }
  
  label {
    padding: 0 0.6em;
    margin-top: 0.5em;
  }
  
  .add-task-input, .select-input {
    margin:  1em 0.5em;
    padding: 0.6em;
    background-color: #fff;
    box-shadow: 0px 0px 3px 3px #ccc;
    border-radius: 5px;
    outline: none;
    border: none;
    cursor: pointer;
  }
  
  .add-task-input:focus, .select-input:focus {
      border-color: #aaa;
      box-shadow: 0 0 3px 3px rgb(173, 58, 58);
    color: #000;
  }
  .task-submit-btn {
    margin:  2em 0.5em;
    padding: 0.7em 1em;
    font-size: 1em;
    background-color: rgb(173, 58, 58);
    color: #fff;
    align-self: center;
    border-radius: 5px;
    outline: none;
    border: none;
    cursor: pointer;
  }
  
  .task-submit-btn:hover {
    background-color: rgb(219, 57, 57);
  }
  
  .error-display {
    color: rgb(248, 11, 11);;
    padding: 0 0.5em;
  }
  
  @media (max-width: 1600px) {
    .header {
      padding: 0%;
      padding-top: 0.7em;    
    }
  }
`;

export default GlobalStyle;
