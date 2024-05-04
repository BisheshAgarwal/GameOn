import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import styles from "./UserListScreen.module.css";
import Loader from "../../components/Loader/Loader";
import Message from "../../components/Message/Message";
import { listUsers } from "../../store/actions/UserAuthActions/userList";
import { deleteUser } from "../../store/actions/UserAuthActions/userDelete";

const UserListScreen = (props) => {
    useEffect(() => {
        if (props.userInfo && props.userInfo.isAdmin) {
            props.onListAllUsers();
        } else {
            props.history.push("/login");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.successDelete]);

    const deleteHandler = (id) => {
        if (window.confirm("Are you sure ?")) {
            props.onDeleteUser(id);
        }
    };

    return (
        <section className={styles.UserListSection}>
            <div className={styles.Container}>
                <div className={styles.Users}>
                    <h1 className={styles.PrimaryHeading}>USERS</h1>
                    <div className={styles.UsersContainer}>
                        {props.loading ? (
                            <Loader />
                        ) : props.error ? (
                            <Message>{props.error}</Message>
                        ) : (
                            <table className={styles.Table}>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>NAME</th>
                                        <th>EMAIL</th>
                                        <th>ADMIN</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {props.users.map((user) => (
                                        <tr key={user._id}>
                                            <td>{user._id}</td>
                                            <td>{user.name}</td>
                                            <td>
                                                <a
                                                    href={`mailto: ${user.email}`}
                                                    className={styles.Email}
                                                >
                                                    {user.email}
                                                </a>
                                            </td>
                                            <td>
                                                {user.isAdmin ? (
                                                    <i
                                                        className="fas fa-check"
                                                        style={{
                                                            color: "green"
                                                        }}
                                                    />
                                                ) : (
                                                    <i
                                                        className="fas fa-times"
                                                        style={{
                                                            color: "red"
                                                        }}
                                                    />
                                                )}
                                            </td>
                                            <td>
                                                <Link
                                                    className={styles.Edit}
                                                    to={`/admin/user/${user._id}/edit`}
                                                >
                                                    <i className="fas fa-edit" />
                                                </Link>
                                                <button
                                                    className={styles.Delete}
                                                    onClick={() =>
                                                        deleteHandler(user._id)
                                                    }
                                                >
                                                    <i className="fas fa-trash" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

const mapStateToProps = (state) => {
    return {
        loading: state.userList.loading,
        error: state.userList.error,
        users: state.userList.users,
        userInfo: state.login.userInfo,
        successDelete: state.userDelete.success
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onListAllUsers: () => dispatch(listUsers()),
        onDeleteUser: (id) => dispatch(deleteUser(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserListScreen);
