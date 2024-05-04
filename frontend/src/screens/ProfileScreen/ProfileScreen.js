import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { LinkContainer } from "react-router-bootstrap";
import { Button } from "react-bootstrap"
import Message from '../../components/Message/Message'
import Loader from '../../components/Loader/Loader'
import { getUserDetails } from '../../store/actions/UserAuthActions/userDetails'
import { updateProfile } from '../../store/actions/UserAuthActions/updateProfile'
import { listMyOrders } from "../../store/actions/OrderActions/orderListMy"
import * as actionTypes from "../../store/actions/actionTypes"
import styles from "./ProfileScreen.module.css";

const ProfileScreen = (props) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    if (!props.userInfo) {
      props.history.push('/login')
    } else {
      if (!props.user || !props.user.name || props.success) {
        props.onUserProfileReset();
        props.onGetUserDetails("profile");
        props.onListMyOrders();
      } else {
        setName(props.user.name)
        setEmail(props.user.email)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.history, props.userInfo, props.user, props.success])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      props.onUpdateUser({ id: props.user._id, name, email, password })
    }
  }

  return (
    <div className={styles.ProfileSection}>
      <div className={styles.Container}>
        <div>
          <h2 className={styles.FormHeading}>User Profile</h2>
          {message && <Message>{message}</Message>}
          {props.loading ? (
            <Loader />
          ) : props.error ? (
            <Message variant='danger'>{props.error}</Message>
          ) : (
            <form>
              <label htmlFor='name' className={styles.Label}>Name</label>
              <input
                className={styles.Input}
                id='name'
                type='text'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></input>
              <label htmlFor='email' className={styles.Label}>Email Address</label>
              <input
                className={styles.Input}
                id='email'
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
              <label htmlFor='password' className={styles.Label}>Password</label>
              <input
                className={styles.Input}
                id='password'
                type='password'
                placeholder='Enter password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></input>

              <label htmlFor='confirm-password' className={styles.Label}>Confirm Password</label>
              <input
                className={styles.Input}
                id='confirm-password'
                type='password'
                placeholder='Confirm password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></input>
              <input
                type="submit"
                onClick={submitHandler}
                value="Update"
                className={styles.Button}
              />
            </form>
          )}
        </div>
        <div style={{ overflow: "auto" }}>
          <h2 className={styles.FormHeading}>My Orders</h2>
          {props.loadingOrders ? (
            <Loader />
          ) : props.errorOrders ? (
            <Message variant='danger'>{props.errorOrders}</Message>
          ) : (
            <table className={styles.Table}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                  <th>PAID</th>
                  <th>DELIVERED</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {props.orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>{order.totalPrice}</td>
                    <td>
                      {order.isPaid ? (
                        order.paidAt.substring(0, 10)
                      ) : (
                        <i className='fas fa-times' style={{ color: 'red' }}></i>
                      )}
                    </td>
                    <td>
                      {order.isDelivered ? (
                        order.deliveredAt.substring(0, 10)
                      ) : (
                        <i className='fas fa-times' style={{ color: 'red' }}></i>
                      )}
                    </td>
                    <td>
                      <LinkContainer to={`/order/${order._id}`}>
                        <Button className="btn-lg" variant='light'>
                          Details
                        </Button>
                      </LinkContainer>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div >
  )
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.login.userInfo,
    user: state.userDetails.user,
    loading: state.userDetails.loading,
    error: state.userDetails.error,
    success: state.updateProfile.success,
    loadingOrders: state.orderListMy.loading,
    errorOrders: state.orderListMy.error,
    orders: state.orderListMy.orders
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetUserDetails: (id) => dispatch(getUserDetails(id)),
    onListMyOrders: () => dispatch(listMyOrders()),
    onUpdateUser: (user) => dispatch(updateProfile(user)),
    onUserProfileReset: () => dispatch({ type: actionTypes.USER_UPDATE_PROFILE_RESET })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);