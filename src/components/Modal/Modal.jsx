import React, { Component } from 'react';
import css from './Modal.module.css';

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = e => {
    if (e.currentTagret === e.Target) {
      this.props.onClose();
    }
  };

  render() {
    return (
      <div className={css.backdrop} onClick={this.handleBackdropClick}>
        <div className={css.contents}>{this.props.children}</div>
      </div>
    );
  }
}
