import React, { PropTypes } from 'react';
import ReactOnRails from 'react-on-rails';
import { compose, createStore, applyMiddleware, combineReducers } from 'redux';
import { bindActionCreators } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';
import { connect } from 'react-redux';
import mirrorCreator from 'mirror-creator';
import Immutable from 'immutable';

import EditableTable from './editableTable'
import Table from './table'

const UserInfo = ({ user, editing, onEditClick }) => {
  const table = editing ? <EditableTable /> : <Table />;
  const save = editing 
    ? <button form="userForm" type="submit" className="btn btn-primary">Save</button>
    : null;
  const color = editing ? 'default' : 'primary';
  const text = editing ? 'Cancel' : 'Edit User';
  return (
    <div className='col-md-6'>
      <div className="well">
        <div className='row'>
          {table}
        </div>
        <div className="row">
          <div className="col-md-offset-1 btn-group">
            {save}
            <button 
              className={`btn btn-${color}`}
              onClick={() => { onEditClick() }}>
              {text}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    editing: state.editMode,
    user: state.user,
  }
}

const mapDispatchToProps = (dispatch) => {
  return { onEditClick: () => { dispatch({ type: 'TOGGLE_EDIT_MODE' }) }, }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo)