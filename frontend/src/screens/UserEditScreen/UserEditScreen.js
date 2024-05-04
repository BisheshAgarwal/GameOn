import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actionTypes from "../../store/actions/actionTypes"
import Message from '../../components/Message/Message'
import Loader from '../../components/Loader/Loader'
import { getUserDetails } from "../../store/actions/UserAuthActions/userDetails"
import { updateUser } from "../../store/actions/UserAuthActions/userUpdate"
import styles from "./UserEditScreen.module.css";

const UserEditScreen = (props) => {
  const userId = props.match.params.id

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    if (props.successUpdate) {
      props.onUserProfileReset();
      props.history.push('/admin/userlist')
    } else {
      if (!props.user.name || props.user._id !== userId) {
        props.onGetUserDetails(userId)
      } else {
        setName(props.user.name)
        setEmail(props.user.email)
        setIsAdmin(props.user.isAdmin)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.history, userId, props.user, props.successUpdate])

  const submitHandler = (e) => {
    e.preventDefault();
    props.onUpdateUser({ _id: userId, name, email, isAdmin });
  }

  return (
    <section className={styles.UserEditSection}>
      <form className={styles.Form}>
        <Link to='/admin/userlist' className={styles.Link}>
          Go Back
        </Link>
        <h1>Edit <span style={{ color: "var(--color-primary)" }}>
          User
        </span></h1>
        {props.loadingUpdate && <Loader />}
        {props.errorUpdate && <Message variant='danger'>{props.errorUpdate}</Message>}
        {props.loading ? (
          <Loader />
        ) : props.error ? (
          <Message variant='danger'>{props.error}</Message>
        ) : (
          <>
            <label className={styles.Label} htmlFor='name'>Name</label>
            <input
              className={styles.Input}
              id='name'
              type='text'
              placeholder='Enter name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></input>

            <label className={styles.Label} htmlFor='email'>Email Address</label>
            <input
              className={styles.Input}
              id='email'
              type='email'
              placeholder='Enter email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
            <div>
              <input
                id='isAdmin'
                type='checkbox'
                checked={isAdmin}
                style={{ marginRight: "10px" }}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></input>
              <label className={styles.Label} htmlFor='isAdmin'>Is Admin</label>
            </div>
            <input
              type="submit"
              onClick={submitHandler}
              value="Update"
              className={styles.Button}
            />
          </>
        )}
      </form>
    </section>
  )
}

const mapStateToProps = (state) => {
  return {
    loadingUpdate: state.userUpdate.loading,
    errorUpdate: state.userUpdate.error,
    successUpdate: state.userUpdate.success,
    loading: state.userDetails.loading,
    error: state.userDetails.error,
    user: state.userDetails.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetUserDetails: (id) => dispatch(getUserDetails(id)),
    onUpdateUser: (user) => dispatch(updateUser(user)),
    onUserProfileReset: () => dispatch({ type: actionTypes.USER_ADMIN_UPDATE_RESET })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserEditScreen);