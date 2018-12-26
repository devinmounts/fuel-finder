import React, {Component} from 'react';
import './styles.css';

class StickyNav extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      scroll: null,
      top: null,
      height: null,
    }

    this.handleScroll = this.handleScroll.bind(this);
  }

  handleScroll() {
    this.setState({
      scroll: window.scrollY
    });
  }

  componentDidMount(){
    const el = document.querySelector('#sticky');
    this.setState({
      top: el.offsetTop, 
      height: el.offsetHeight,
    });
    window.addEventListener('scroll', this.handleScroll);
  }

  
  render(){
    return(
        <div className='sticky-container'>
          <div id='sticky' className={this.state.scroll > this.state.top ? 'fixed-nav' : 'unfixed-nav'}>
            <h1 className='title'>Hy<sup>+</sup>ion_</h1>
          </div>
        </div>
    );
  }
}

export default StickyNav;

// {this.state.scroll > this.state.top ? 'sticky-title'
//           : 'unfixed-title'}