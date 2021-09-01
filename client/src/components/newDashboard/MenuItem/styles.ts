import styled from 'styled-components';

export const List = styled.li`
@media only screen and (min-width: 768px) {
  .menu-item {
    @include displayFlex(flex-start, center, row);
    width: 100%;
    decoration: none;
    padding: 1.5em 0 1.5em 2em;

    img {
      margin-right: 1.5em;
      max-width: 1.5em;
      max-height: 1.5em;
    }

    &:hover {
      opacity: 0.75;
      background-color: $col-dark-2;
    }
  }

  .menu-item--selected {
    @include displayFlex(flex-start, center, row);
    width: 100%;
    decoration: none;
    background-color: $col-dark-2;
    color: $col-medium;
    padding: 1.5em 0 1.5em 2em;
    -moz-box-shadow:    inset 0 0 0.2em #000000;
    -webkit-box-shadow: inset 0 0 0.2em #000000;
    box-shadow:         inset 0 0 0.2em #000000;
    color: white;

    img {
      color: white;
      max-width: 1.5em;
      max-height: 1.5em;
      margin-right: 1.5em;
    }

    &:hover {
      opacity: 0.8;
    }
  }
}
`

