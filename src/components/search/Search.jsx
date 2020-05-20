import React from "react";
import { GoLocation } from "react-icons/go";
// import { IoMdCloseCircleOutline } from "react-icons/io";
import { FaSearchLocation } from "react-icons/fa";
class Search extends React.Component {
  state = {
    isInputOpen: false,
  };

  toggleInputHandler = () => {
    this.setState((prevState) => {
      return {
        isInputOpen: !prevState.isInputOpen,
        serchTerm: "",
      };
    });
  };

  handleChange = (e) => {
    this.setState({ searchTerm: e.target.value });
  };
  searchForCity = () => {
    if (this.state.searchTerm) {
      this.props.search(this.state.searchTerm);
    }
    this.toggleInputHandler();
  };
  render() {
    const updateTime = new Date(this.props.updateTime);
    const { isInputOpen } = this.state;
    const input = (
      <input
        type='search'
        placeholder='Enter city name'
        className={isInputOpen ? "show" : "hide"}
        onChange={this.handleChange}
      />
    );
    const icon = isInputOpen ? (
      <FaSearchLocation size={"24px"} onClick={this.searchForCity} style={{ cursor: "pointer" }} />
    ) : (
      <GoLocation size={"18px"} onClick={this.toggleInputHandler} style={{ cursor: "pointer" }} />
    );
    return (
      <div className='search'>
        <div className='search__input'>
          {input}
          {icon}
        </div>
        {this.props.updateTime ? (
          <div className='search__time'>
            Updated at <span>{updateTime.toLocaleTimeString()}</span>
          </div>
        ) : null}
      </div>
    );
  }
}
export default Search;
